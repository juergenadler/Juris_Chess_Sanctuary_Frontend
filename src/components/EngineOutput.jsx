
import { useEnv } from '../context/EnvContext.jsx'; 
import './EngineOutput.css';

import { useEffect, useState } from "react";

const EngineOutput = () => {
  const { backEndSseApiUrl } = useEnv();
  const [log, setLog] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(backEndSseApiUrl);

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);

      // Append the data to the log state with the timestamp
      let timestamp = new Date().toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false      
      });

      timestamp = timestamp.replace(/\//g, '-');   
      setLog((prevLog) => [...prevLog, `${timestamp}:  ${data}`]);
    };

    // Handle connection errors
    eventSource.onerror = function (event) {
      console.error("EventSource failed:", event);
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">Stockfish Output</h1>
      <textarea
        readOnly
        className="textarea"
        value={log.join('\n')}
      />
    </div>
  );
};

export default EngineOutput;
