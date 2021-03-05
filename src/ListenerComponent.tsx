import { useState } from 'react';
import useOn from './use-on';

export default function ListenerComponent() {
  const [eventName, setEventName] = useState('keydown');

  useOn()
    .who(window)
    .when(eventName)
    .what(() => {
      console.log(`${eventName} handler!`);
    });

  function handleToggleEventName() {
    setEventName(eventName === 'keydown' ? 'mousedown' : 'keydown');
  }

  return (
    <div>
      <pre style={{ marginBottom: '1em', width: 'auto' }}>
        Listening to {eventName === 'keydown' ? 'key-down' : 'mouse-down'}...
      </pre>
      <div className="gutter">
        <button onClick={handleToggleEventName}>
          Listen to {eventName === 'keydown' ? 'MouseDown' : 'Keydown'}
        </button>
      </div>
    </div>
  );
}
