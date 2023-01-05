import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "C001" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "C001",
      name: "Customer 1",
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "C001" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "C001",
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("C001", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.findById(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.findById("456ABC");
    }).rejects.toThrow("Customer not found.");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("C001", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("C002", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.address = address2;
    customer2.addRewardPoints(20);
    customer2.activate();

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
