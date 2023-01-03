import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    for await (const item of entity.items) {
      await OrderItemModel.update(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        },
        { where: { id: item.id } }
      );
    }

    await OrderModel.update(
      {
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    const orderItems = order.items.map(
      ({ id, name, price, product_id, quantity }) =>
        new OrderItem(id, name, price, product_id, quantity)
    );

    return new Order(order.id, order.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"] });

    return orders.map((order) => {
      const orderItems = order.items.map(
        ({ id, name, price, product_id, quantity }) =>
          new OrderItem(id, name, price, product_id, quantity)
      );

      return new Order(order.id, order.customer_id, orderItems);
    });
  }
}
