import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("ID is required.");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("001", "", []);
    }).toThrowError("CustomerId is required.");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("001", "123", []);
    }).toThrowError("Items quantity must be greater than 0.");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("I001", "Item 1", 100);
    const item2 = new OrderItem("I002", "Item 2", 200);
    const order = new Order("O001", "C001", [item1]);

    let total = order.total();

    expect(total).toBe(100);

    const order2 = new Order("O001", "C001", [item1, item2]);
    total = order2.total();
    expect(total).toBe(300);
  });
});
