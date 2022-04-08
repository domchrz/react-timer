import styles from './SetTimeForm.module.scss';
import { useReducer } from 'react';
import TimeInput from '../TimeInput/TimeInput';
import { unitsToSeconds } from '../../helpers/timeHelpers';
import timeFormReducer from '../../reducers/timeFormReducer';
import Button from '../Button/Button';

export default function SetTimeForm({ setInitTime, setShowInput }) {
  const [inputValues, dispatch] = useReducer(timeFormReducer, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setInputHandler = (type) => {
    return (payload) => dispatch({ type, payload });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInitTime(unitsToSeconds(inputValues));
    setShowInput(false);
    dispatch({ type: 'RESET_VALUES' });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <TimeInput
          title="Hours: "
          setValue={setInputHandler('SET_HOURS')}
          value={inputValues.hours}
        />
        <TimeInput
          title="Minutes: "
          setValue={setInputHandler('SET_MINUTES')}
          value={inputValues.minutes}
        />
        <TimeInput
          title="Seconds: "
          setValue={setInputHandler('SET_SECONDS')}
          value={inputValues.seconds}
        />
      </div>
      <div>
        <Button>SET</Button>
      </div>
    </form>
  );
}
