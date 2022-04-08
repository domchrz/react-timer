import { useRef, useEffect, useState } from 'react';
import { secondsToUnits } from '../helpers/timeHelpers';

const useTimer = (initTime) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(secondsToUnits(initTime));

  const time = useRef(null);
  const interval = useRef(null);

  const resetTimer = () => {
    clearInterval(interval.current);
    setCurrentTime(secondsToUnits(time.current));
  };

  const pauseTimer = () => {
    clearInterval(interval.current);
  };

  const playInterval = () => {
    return (interval.current = setInterval(() => {
      time.current--;
      setCurrentTime(secondsToUnits(time.current));
      if (time.current === 0) {
        resetTimer();
      }
    }, 1000));
  };

  useEffect(() => {
    time.current = initTime;
    setCurrentTime(secondsToUnits(time.current));
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

  return [
    {
      currentTime,
      isPlaying,
    },
    {
      resetTimer,
      setIsPlaying,
    },
  ];
};

export default useTimer;
