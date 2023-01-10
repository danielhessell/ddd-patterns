import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class SendConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle({ eventData }: CustomerAddressChangedEvent): void {
    console.log(
      `Customer address: ${eventData.id}, ${eventData.name} changed to: ${eventData.address}."`
    );
  }
}
