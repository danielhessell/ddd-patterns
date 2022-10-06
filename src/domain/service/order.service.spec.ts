import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("C001", "Customer 1");
    const item = new OrderItem("I001", "Item 1", 10, "P001", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("I001", "Item 1", 100, "P001", 1);
    const item2 = new OrderItem("I002", "Item 2", 200, "P002", 2);

    const order1 = new Order("O001", "C001", [item1]);
    const order2 = new Order("O002", "C001", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
