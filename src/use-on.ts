import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Callback = (...rest: any) => any;

interface Methods {
  who: (dispatcher: any) => Methods;
  when: (eventName: string) => Methods;
  what: (callback: Callback) => Methods;
}

function useRerender() {
  const [count, setCounter] = useState(0);

  const rerender = useCallback(() => {
    setCounter(count + 1);
  }, [count]);

  return useMemo(() => ({ rerender, count }), [rerender, count]);
}

export default function useOn() {
  const unloadRef = useRef<Function>();
  const callbackRef = useRef<Callback>();
  const eventNameRef = useRef<string>();
  const dispatcherRef = useRef<any>();
  const prevIsReady = useRef(false);
  const { rerender, count } = useRerender();

  const isReady = useCallback(() => {
    return (
      !!dispatcherRef.current && !!eventNameRef.current && !!callbackRef.current
    );
  }, []);

  useEffect(() => {
    if (isReady()) {
      const dispatcher = dispatcherRef.current;
      const eventName = eventNameRef.current;
      const callback = callbackRef.current;

      console.log('adding listener', eventName, callback);
      dispatcher.addEventListener(eventName, callback);

      unloadRef.current = () => {
        console.log('removing listener', eventName, callback);
        dispatcher.removeEventListener(eventName, callback);
      };
    }

    prevIsReady.current = isReady();

    return () => unloadRef.current?.();
  }, [isReady, count]);

  return useMemo(
    () =>
      ({
        who: function (dispatcher) {
          const isChanged = dispatcherRef.current !== dispatcher;
          dispatcherRef.current = dispatcher;

          if (prevIsReady.current !== isReady() || isChanged) {
            prevIsReady.current = isReady();
            rerender();
          }

          return this;
        },

        when: function (eventName) {
          const isChanged = eventNameRef.current !== eventName;
          eventNameRef.current = eventName;

          if (prevIsReady.current !== isReady() || isChanged) {
            prevIsReady.current = isReady();
            rerender();
          }

          return this;
        },

        what: function (callback: Callback) {
          callbackRef.current = callback;

          if (prevIsReady.current !== isReady()) {
            rerender();
          }

          return this;
        },
      } as Methods),
    [rerender, isReady]
  ) as Methods;
}
