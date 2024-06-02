import React, { useState, useEffect } from 'react';

const Timer = ({ running, reset }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0); // Reseta os segundos sempre que reset muda
  }, [reset]);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      {new Date(seconds * 1000).toISOString().substr(11, 8)}
    </div>
  );
};

export default Timer;
