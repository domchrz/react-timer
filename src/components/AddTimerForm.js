import { useState } from 'react';
import styles from './AddTimerForm.module.scss'
import MaterialButton from './IconButton';

export default function AddTimerForm({addTimer}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = value
    if (inputValue.trim().length === 0) inputValue = 'Timer'
    addTimer(inputValue);
    setValue('')
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
      <label>
          <span>Set timer for: </span>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        </label>
        <MaterialButton icon="add_circle"/>
      </form>
    </>
  )
}
