import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendFirstConsoleLogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      "This is the first console.log for the event: CustomerCreated."
    );
  }
}
