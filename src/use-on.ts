import { useEffect, useMemo, useRef } from "react";

type Callback = (...rest: any) => any;

interface HiddenFields {
  _eventName: string | null;
  _dispatcher: any | null;
  _callback: Callback | null;
  _setupListener: () => void | null;
}

interface Methods {
  who: (dispatcher: any) => Methods;
  when: (eventName: string) => Methods;
  what: (callback: Callback) => Methods;
}

export default function useOn() {
  const unloadRef = useRef<Function>();

  useEffect(() => {
    return () => unloadRef.current?.(); // eslint-disable-line
  }, []);

  return useMemo(
    () =>
      ({
        _eventName: null,
        _dispatcher: window,
        _callback: null,

        _setupListener: function () {
          console.log("setup-listener");

          if (unloadRef.current) {
            unloadRef.current();
          }

          const callbackWrapper = () => {
            this._callback?.();
          };

          if (this._dispatcher && this._eventName) {
            const dispatcher = this._dispatcher;
            const eventName = this._eventName;
            console.log("adding listener", eventName, callbackWrapper);
            dispatcher.addEventListener(eventName, callbackWrapper);

            unloadRef.current = () => {
              console.log("removing listener", eventName, callbackWrapper);
              dispatcher.removeEventListener(eventName, callbackWrapper);
            };
          }
        },

        who: function (dispatcher) {
          if (this._dispatcher === dispatcher) {
            return this;
          }

          this._dispatcher = dispatcher;
          this._setupListener();

          return this;
        },

        when: function (eventName) {
          if (this._eventName === eventName) {
            return this;
          }

          this._eventName = eventName;
          this._setupListener();

          return this;
        },

        what: function (callback: Callback) {
          this._callback = callback;

          return this;
        },
      } as HiddenFields & Methods),
    []
  ) as Methods;
}
