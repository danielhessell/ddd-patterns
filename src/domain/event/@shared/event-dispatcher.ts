import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

type EventHandlersTyping = { [eventName: string]: EventHandlerInterface[] };

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandlersTyping = {};

  get getEventHandlers(): EventHandlersTyping {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    throw new Error("Method not implemented.");
  }

  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}
