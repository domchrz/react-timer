import { useState } from 'react';
import { timeUnitToString } from '../../helpers/timeHelpers';
import useTimer from '../../hooks/useTimer';
import IconButton from '../IconButton/IconButton';
import SetTimeForm from '../SetTimeForm/SetTimeForm';
import styles from './Timer.module.scss';

export default function Timer({ children, task }) {
  const [initTime, setInitTime] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [timer, setTimer] = useTimer(initTime);

  const handlePlay = () => {
    if (timer.isPlaying) return;
    setTimer.setIsPlaying(true);
    setShowInput(false);
  };

  const handlePause = () => {
    setTimer.setIsPlaying(false);
  };

  const handleStop = () => {
    setTimer.setIsPlaying(false);
    setTimer.resetTimer();
    setInitTime(0);
  };

  const handleTimer = () => {
    setTimer.setIsPlaying(false);
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
            {timeUnitToString(timer.currentTime.hours)}:
            {timeUnitToString(timer.currentTime.minutes)}:
            {timeUnitToString(timer.currentTime.seconds)}
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
        <SetTimeForm setInitTime={setInitTime} setShowInput={setShowInput} />
      )}
    </div>
  );
}
