import React, { useState, useRef } from 'react';

export default function StopwatchWidget() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div>
      <h3>Stopwatch</h3>
      <p>Elapsed Time: {elapsedTime / 1000} seconds</p>
      <button onClick={startStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}
