interface Events {
  [key: string]: SubscriptionCallback[];
}

const events: Events = {};

export const EVENT_EMITTER_NAME = {
  EVENT_UNAUTHORIZED_USER: "EVENT_UNAUTHORIZED_USER",
  TOAST_UPDATE: "TOAST_UPDATE"
};

export interface SubscriptionCallback {
  (data: unknown): void;
}

const emitCallback = async (callbackFn: SubscriptionCallback, data: unknown): Promise<void> => {
  if (callbackFn) callbackFn(data);
};

export const EventEmitter = {
  emit(
    event: string,
    data?: unknown
  ): void {
    const emitEvents = events[event];
    if (emitEvents) emitEvents.forEach((callback: SubscriptionCallback) => emitCallback(callback, data));
  },
  subscribe(
    event: string,
    callback: (data: unknown) => void
  ): void {
    if (callback) {
      let emitEvents = events[event];
      if (!emitEvents) {
        emitEvents = [];
        events[event] = emitEvents;
      }

      emitEvents.push(callback);
    }
  },
  unsubscribe(
    event: string,
    unsubscribeCallback: (data: unknown) => void
  ): void {
    const emitEvents = events[event];

    if (emitEvents) {
      for (let i = emitEvents.length; i >= 0; i -= 1) {
        if (emitEvents[i] === unsubscribeCallback) {
          emitEvents.splice(i, 1);
        }
      }
    }
  }
};
