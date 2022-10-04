import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("ID is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("P001", "", 100);
    }).toThrowError("Name is required.");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      new Product("P001", "Product 1", -100);
    }).toThrowError("Price must be greater than zero.");
  });

  it("should change name", () => {
    const product = new Product("P001", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("P001", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
