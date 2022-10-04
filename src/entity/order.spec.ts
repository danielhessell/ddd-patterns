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
    const item1 = new OrderItem("I001", "Item 1", 100, "P001", 2);
    const item2 = new OrderItem("I002", "Item 2", 200, "P002", 2);
    const order = new Order("O001", "C001", [item1]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("O001", "C001", [item1, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("I001", "Item 1", 100, "P001", 0);
      new Order("O001", "C001", [item]);
    }).toThrowError("Quantity must be greater than zero.");
  });
});
