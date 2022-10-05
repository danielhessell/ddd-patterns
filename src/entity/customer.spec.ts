import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("ID is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("001", "");
    }).toThrowError("Name is required.");
  });

  it("should chame name", () => {
    // Arrange
    const customer = new Customer("001", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("001", "John Doe");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("001", "John Doe");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer.");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("001", "John Doe");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("001", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
