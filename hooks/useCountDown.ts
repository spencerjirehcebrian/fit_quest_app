import { useEffect, useRef, useState } from "react";

export default function useCountDown(
  idx: number,
  trigger: number,
  initialCount: number = -1
) {
  const [countDown, setCountDown] = useState(initialCount);
  const intervalRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (idx == -1) {
      return;
    }
    // console.log("trigger countdown");

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          return count - 1;
        });
      }, 1000);
    }
    return cleanup;
  }, [idx, trigger, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    // console.log(isRunning, intervalRef, countDown);
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);

  const cleanup = () => {
    if (intervalRef.current) {
      // console.log("cleanup called");
      setIsRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      // console.log("start");
      setCountDown(count ?? initialCount);
      setIsRunning(false);
      setIsRunning(true);
    },
  };
}
