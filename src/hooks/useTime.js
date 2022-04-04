import { useRef, useCallback, useEffect, useState } from 'react';

const useTime = (initTime) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initTime);

  const time = useRef(initTime);
  const interval = useRef(null);
  const timerInterval = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(interval.current);
    setCurrentTime(0);
  }, [interval.current]);

  const stopTimer = useCallback(() => {
    clearInterval(interval.current);
  }, [interval.current]);

  useEffect(() => {
    time.current = initTime;
    timerInterval.current = () => {
      interval.current = setInterval(() => {
        time.current--;
        setCurrentTime(time.current);
        if (time.current === 0) {
          resetTimer();
        }
      }, 1000);
    };
  }, [initTime]);

  useEffect(() => {
    if (!isPlaying) return;

    timerInterval.current();

    if (initTime) {
      return stopTimer;
    } else {
      return resetTimer;
    }
  }, [isPlaying]);


  return { resetTimer, setIsPlaying, currentTime, isPlaying };
};

export default useTime;
