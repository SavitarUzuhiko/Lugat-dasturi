import { useEffect, useRef } from 'react';

const useIdleTimer = (onIdle: () => void, timeout = 300000) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onIdle, timeout);
  };

  const handleActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    resetTimer(); // start the timer

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
};

export default useIdleTimer;
