import { useRef, useEffect, useState } from 'react';
import { secondsToUnits } from '../helpers/timeHelpers';

const useTime = (initTime, toUnits = false) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    toUnits ? secondsToUnits(initTime, true) : initTime
  );

  const time = useRef(null);
  const interval = useRef(null);

  const resetTimer = () => {
    clearInterval(interval.current);
    setCurrentTime(toUnits ? secondsToUnits(time.current, true) : time.current);
  };

  const pauseTimer = () => {
    clearInterval(interval.current);
  };

  const playInterval = () => {
    return (interval.current = setInterval(() => {
      time.current--;
      setCurrentTime(
        toUnits ? secondsToUnits(time.current, true) : time.current
      );
      if (time.current === 0) {
        resetTimer();
      }
    }, 1000));
  };

  useEffect(() => {
    time.current = initTime;
    setCurrentTime(toUnits ? secondsToUnits(time.current, true) : time.current);
  }, [initTime]);

  useEffect(() => {
    if (!isPlaying || time.current === 0) {
      setIsPlaying(false);
      return;
    }

    playInterval();

    if (time.current > 0) {
      return pauseTimer;
    } else {
      return resetTimer;
    }
  }, [isPlaying]);

  return {
    resetTimer,
    setIsPlaying,
    currentTime,
    isPlaying,
  };
};

export default useTime;
