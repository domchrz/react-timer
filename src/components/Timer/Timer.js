import { useState } from 'react';
import useTime from '../../hooks/useTime';
import IconButton from '../IconButton/IconButton';
import SetTimeForm from '../SetTimeForm/SetTimeForm';
import styles from './Timer.module.scss';

export default function Timer({ children, task }) {
  const [initTime, setInitTime] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const { resetTimer, setIsPlaying, isPlaying, currentTime } = useTime(
    initTime,
    true
  );

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setShowInput(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    resetTimer();
    setInitTime(0);
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
            {currentTime.hours}:{currentTime.minutes}:{currentTime.seconds}
          </span>
        </div>
        <div className={styles.controls}>
          <IconButton icon="play_circle_filled" handleClick={handlePlay} />
          <IconButton icon="pause_circle_filled" handleClick={handlePause} />
          <IconButton icon="stop_circle" handleClick={handleStop} />
          <IconButton icon="timer" handleClick={handleTimer} />
        </div>
      </div>
      {showInput && (
        <SetTimeForm
          setInitTime={setInitTime}
          setIsPlaying={setIsPlaying}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
}
