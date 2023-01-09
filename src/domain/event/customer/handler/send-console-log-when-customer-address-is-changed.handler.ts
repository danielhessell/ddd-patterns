import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class SendConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface
{
  handle({ eventData }: EventInterface): void {
    console.log(
      `Customer address: ${eventData.id}, ${eventData.name} changed to: ${eventData.address}."`
    );
  }
}
