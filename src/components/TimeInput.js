import styles from './TimeInput.module.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import Button from './Button';

export default function TimeInput({ setTime, setIsPlaying, setShowInput }) {
  const hoursInput = useRef();
  const minutesInput = useRef();
  const secondsInput = useRef();

  const validateAndCorrectInput = (value) => {
    switch (true) {
      case !Number.isInteger(value):
        return parseInt(value);
      case value < 0 || value === null || value === undefined:
        return 0;
      case value > 60:
        return 60;
      default:
        return value;
    }
  };

  const handleInputChange = (e) => {
    let value = validateAndCorrectInput(+e.target.value);
    e.target.value = value < 10 ? `0${value}` : `${value}`;
  };

  const setTimer = () => {
    const seconds = secondsInput.current.value;
    const minutes = minutesInput.current.value;
    const hours = hoursInput.current.value;
    const time = +hours * 3600 + +minutes * 60 + +seconds;
    if (time === 0) return;
    setTime(time);
    setIsPlaying(true);
    setShowInput(false);
  };

  useEffect(() => {
    hoursInput.current.value = '00';
    minutesInput.current.value = '00';
    secondsInput.current.value = '00';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <label>
          <span>Hours: </span>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            min="0"
            max="60"
            step="1"
            ref={hoursInput}
          />
        </label>
        <label>
          <span>Minutes: </span>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            min="0"
            max="60"
            step="1"
            ref={minutesInput}
          />
        </label>
        <label>
          <span>Seconds: </span>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            min="0"
            max="60"
            step="1"
            ref={secondsInput}
          />
        </label>
      </div>
      <Button handleClick={setTimer}>SET</Button>
    </div>
  );
}
