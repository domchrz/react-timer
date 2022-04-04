import styles from './TimeInput.module.scss';
import { useReducer } from 'react';
import TimeInput from '../TimeInput/TimeInput';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOURS':
      return { ...state, hours: action.payload };
    case 'SET_MINUTES':
      return { ...state, minutes: action.payload };
    case 'SET_SECONDS':
      return { ...state, seconds: action.payload };
    case 'RESET_VALUES': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export default function SetTimeForm() {
  const [inputValues, dispatch] = useReducer(inputReducer, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setInputHandler = (type) => {
    return (payload) => dispatch({ type, payload });
  };

  const setInputValue = (value) => {
    switch (true) {
      case value > 10:
        return value.toString();
      case value < 10:
        return `0${value}`;
      default:
        return '00';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
    dispatch({
      type: 'RESET_VALUES',
      payload: { hours: 0, minutes: 0, seconds: 0 },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TimeInput
        title="Hours: "
        setValue={setInputHandler('SET_HOURS')}
        value={setInputValue(inputValues.hours)}
      />
      <TimeInput
        title="Minutes: "
        setValue={setInputHandler('SET_MINUTES')}
        value={setInputValue(inputValues.minutes)}
      />
      <TimeInput
        title="Seconds: "
        setValue={setInputHandler('SET_SECONDS')}
        value={setInputValue(inputValues.seconds)}
      />
      <button>SET</button>
    </form>
  );
}
