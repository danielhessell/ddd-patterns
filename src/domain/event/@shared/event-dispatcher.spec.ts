import { Address } from "../../entity/address";
import { Customer } from "../../entity/customer";
import { CustomerAddressChangedEvent } from "../customer/customer-address-changed.event";
import { CustomerCreatedEvent } from "../customer/customer-created.event";
import { SendConsoleLogWhenCustomerAddressIsChangedHandler } from "../customer/handler/send-console-log-when-customer-address-is-changed.handler";
import { SendFirstConsoleLogWhenCustomerIsCreatedHandler } from "../customer/handler/send-first-console-log-when-customer-is-created.handler";
import { SendSecondConsoleLogWhenCustomerIsCreatedHandler } from "../customer/handler/send-second-console-log-when-customer-is-created.handler";
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should send console log when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendFirstConsoleLogWhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    const eventHandler2 =
      new SendSecondConsoleLogWhenCustomerIsCreatedHandler();
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customer = new Customer("001", "John Doe");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    customer.address = address;

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should send console log when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler =
      new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("001", "John Doe");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    customer.address = address;

    const addressToChange = new Address(
      "Street 3",
      1234,
      "12345-678",
      "São Paulo"
    );
    customer.changeAddress(addressToChange);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
