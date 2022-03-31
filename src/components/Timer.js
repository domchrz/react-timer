import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import MaterialButton from './MaterialButton';
import TimeInput from './TimeInput';
import styles from './Timer.module.scss';

export default function Timer({ children, task, id }) {
  const [time, setTime] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  let num = useRef(0);
  let interval = useRef();

  const splitTime = (currentTime) => {
    const currentSeconds = currentTime % 60;
    const currentMinutes = parseInt(currentTime / 60) % 60;
    const currentHours = parseInt(currentTime / 3600);
    setSeconds(
      currentSeconds < 10 ? `0${currentSeconds}` : `${currentSeconds}`
    );
    setMinutes(
      currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`
    );
    setHours(currentHours < 10 ? `0${currentHours}` : `${currentHours}`);
  };

  const countDown = useCallback(() => {
    num.current = time;
    interval.current = setInterval(() => {
      num.current--;
      splitTime(num.current);
      if (num.current === 0) {
        clearInterval(interval.current);
      }
    }, 1000);
  }, [time]);

  useEffect(() => {
    if (!isPlaying) return;
    countDown();
    return () => clearInterval(interval.current);
  }, [isPlaying, countDown]);

  useEffect(() => {
    splitTime(time);
  }, [time]);

  const handlePlay = () => {
    if (time === 0 || isPlaying) return;
    setIsPlaying(true);
    setShowInput(false);
  };

  const handlePause = () => {
    setTime(num.current);
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    clearInterval(interval.current);
    setTime(0);
  };

  const handleTimer = () => {
    setTime(num.current);
    setIsPlaying(false);
    setShowInput((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.timer}>
        <div className={styles.header}>
          <h3>{task}</h3>
          {children}
        </div>
        <div className={styles.time}>
          <span>
            {hours}:{minutes}:{seconds}
          </span>
        </div>
        <div className={styles.controls}>
          <MaterialButton icon="play_circle_filled" handleClick={handlePlay} />
          <MaterialButton
            icon="pause_circle_filled"
            handleClick={handlePause}
          />
          <MaterialButton icon="stop_circle" handleClick={handleStop} />
          <MaterialButton icon="timer" handleClick={handleTimer} />
        </div>
      </div>
      {showInput && (
        <TimeInput
          setTime={setTime}
          setIsPlaying={setIsPlaying}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
}
