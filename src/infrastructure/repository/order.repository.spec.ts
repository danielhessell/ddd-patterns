import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "I001",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("O001", "C001", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "O001",
      customer_id: "C001",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "O001",
          product_id: "P001",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("P001", "Product 1", 10);
    const product2 = new Product("P002", "Product 2", 10);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      "I001",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "I002",
      product2.name,
      product2.price,
      product2.id,
      3
    );

    const order = new Order("O001", "C001", [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.changeItems([orderItem1]);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    console.log(orderModel.toJSON());

    expect(orderModel.toJSON()).toStrictEqual({
      id: "O001",
      customer_id: "C001",
      total: 20,
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          order_id: "O001",
          price: orderItem1.price,
          product_id: "P001",
          quantity: orderItem1.quantity,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          order_id: "O001",
          price: orderItem2.price,
          product_id: "P002",
          quantity: orderItem2.quantity,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "I001",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("O001", "C001", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const foundOrder = await orderRepository.findById(order.id);

    expect(orderModel.toJSON()).toStrictEqual({
      id: "O001",
      customer_id: "C001",
      total: 20,
      items: [
        {
          id: foundOrder.items[0].id,
          name: foundOrder.items[0].name,
          order_id: "O001",
          price: foundOrder.items[0].price,
          product_id: "P001",
          quantity: foundOrder.items[0].quantity,
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "I001",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();

    const order = new Order("O001", "C001", [orderItem]);
    await orderRepository.create(order);

    // const order2 = new Order("O002", "C002", [orderItem]);
    // await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    const orders = [order];

    expect(orders).toStrictEqual(foundOrders);
  });
});
