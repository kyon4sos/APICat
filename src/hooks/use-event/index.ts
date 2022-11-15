import { TreeNode } from "@/type";
import EventEmitter from "eventemitter3";
import { useEffect } from "react";

export const eve = new EventEmitter();

export const Events = {
  newApi: "newApi",
  addTab: "addTab",
  showAppSetting: "showAppSetting",
};

export const useEvent = (option?: MEvent<EventKey>[]) => {
  const on = (event: EventKey, handler: EventHandler) => {
    eve.on(Events[event], handler);
  };

  const emit = (event: EventKey, payload?: unknown) => {
    eve.emit(Events[event], payload);
  };

  const removeListener = (event: EventKey, handler: EventHandler) => {
    eve.removeListener(Events[event], handler);
  };

  const addTab = (tab: Tab) => emit("addTab", tab);

  useEffect(() => {
    const events = option ?? [];
    events.forEach((e) => {
      eve.on(Events[e.event], e.handler);
    });
    return ()=>{
      events.forEach((e) => {
        eve.off(Events[e.event], e.handler);
      });
    }
  }, []);

  return { on, emit, removeListener, addTab };
};

export type EventHandler<T = any> = (arg: T) => void;

export type MEvent<K extends EventKey = any, T = any> = {
  event: K;
  handler: EventHandler<T>;
};

export type EventKey = keyof typeof Events;

export type Tab = TreeNode;

export type AddTabEvent = MEvent<"addTab", Tab>;
