import { useState, useEffect, useRef, useCallback } from 'react';
import useTime from '../hooks/useTime';
import IconButton from './IconButton';
import TimeInput from './TimeInput';
import styles from './Timer.module.scss';

export default function Timer({ children, task, id }) {
  const [time, setTime] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [showInput, setShowInput] = useState(false);
  const { resetTimer, setIsPlaying, currentTime, isPlaying } = useTime(time);

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

  useEffect(() => {
    splitTime(time);
  }, [time]);

  useEffect(() => {
    splitTime(currentTime);
  }, [currentTime]);

  const handlePlay = () => {
    if (time === 0 || isPlaying) return;
    setIsPlaying(true);
    setShowInput(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    resetTimer();
    setTime(0);
  };

  const handleTimer = () => {
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
          <IconButton icon="play_circle_filled" handleClick={handlePlay} />
          <IconButton
            icon="pause_circle_filled"
            handleClick={handlePause}
          />
          <IconButton icon="stop_circle" handleClick={handleStop} />
          <IconButton icon="timer" handleClick={handleTimer} />
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
