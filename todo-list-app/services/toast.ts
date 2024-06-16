import dayjs from "dayjs";

import { EventEmitter, EVENT_EMITTER_NAME } from "@app/utils/event-emitter";

export type ToastMsg = {
  id?: number;
  message: string;
  header: string;
  status: "success" | "danger" | "warning" | "info"
};

let messages: ToastMsg[] = [];

const onChange = (): void => {
  EventEmitter.emit(EVENT_EMITTER_NAME.TOAST_UPDATE, messages);
};

export const pushMsg = (msg: ToastMsg): void => {
  let { id } = msg;
  if (!id) {
    id = dayjs().valueOf();
  }
  messages = [...messages, {
    ...msg,
    id
  }];
  onChange();
};

export const closeMsg = (id: number): void => {
  messages = messages.filter((msg) => msg.id !== id);
  onChange();
};

export const subscribe = (callback: (messages: ToastMsg[]) => void): void => {
  EventEmitter.subscribe(EVENT_EMITTER_NAME.TOAST_UPDATE, callback);
};

export const unsubscribe = (callback: (messages: ToastMsg[]) => void): void => {
  EventEmitter.unsubscribe(EVENT_EMITTER_NAME.TOAST_UPDATE, callback);
};

export const getData = (): ToastMsg[] => messages;
