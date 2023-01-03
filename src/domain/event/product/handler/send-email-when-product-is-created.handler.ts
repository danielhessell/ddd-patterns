import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class SendMailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: EventInterface): void {
    console.log(`Sending email to *****@domain.com.`);
  }
}
