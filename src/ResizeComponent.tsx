import { useEffect, useState } from 'react';
import useOn from './use-on';

export default function ResizeComponent() {
  const [eventName, setEventName] = useState('resize');
  console.log(eventName);
  useOn()
    .who(window)
    .when(eventName)
    .what(() => {
      console.log(`on ${eventName}`);
    });

  useEffect(() => {
    setTimeout(() => {
      setEventName('mousedown');
    }, 1000);
  }, []);

  return null;
}
