import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class SendConsoleLogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: EventInterface): void {
    console.log(
      "This is the first console.log for the event: CustomerCreated."
    );
  }
}
