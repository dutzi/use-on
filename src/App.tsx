import React, { useState } from 'react';

import ResizeComponent from './ResizeComponent';
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
        2. Click on "Mount Resize Component"
        3. Resize window

        - You should see "resize!" printed in the console

        4. Click on "Unmount Resize Component"

        - "resize!" messages should stop showing up in the console, but they don't!
      `
            .replace(/  +/g, '')
            .trim()}
        </pre>
        <div className="gutter">
          <button onClick={() => setMount(!mount)}>
            {mount ? 'Unmount Resize Component' : 'Mount Resize Component'}
          </button>
        </div>
        {mount && <ResizeComponent />}
      </div>
    </React.StrictMode>
  );
}
