import React, { useState } from 'react';

import ListenerComponent from './ListenerComponent';
import './App.css';

export default function App() {
  const [mount, setMount] = useState(false);

  return (
    <React.StrictMode>
      <div className="App">
        <pre>
          {`
        Steps to reproduce:

        1. Open the DevTools' Console
        2. Click on "Mount Listener Component"
        3. Press any key...

        - You should see "keydown handler!" printed in the console

        4. Click on "Listen to MouseDown"
        5. Click anywhere

        - You should see "mousedown handler!" printed in the console, but they don't (in production)
      `
            .replace(/  +/g, '')
            .trim()}
        </pre>
        <div className="gutter">
          <button onClick={() => setMount(!mount)}>
            {mount ? 'Unmount Listener Component' : 'Mount Listener Component'}
          </button>
        </div>
        {mount && <ListenerComponent />}
      </div>
    </React.StrictMode>
  );
}
