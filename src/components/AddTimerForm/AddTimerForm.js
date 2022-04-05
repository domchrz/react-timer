import { useState } from 'react';
import styles from './AddTimerForm.module.scss';
import IconButton from '../IconButton/IconButton';

export default function AddTimerForm({ addTimer }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTimer(value.trim().length ? value : 'Timer');
    setValue('');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Set timer for: </span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <IconButton icon="add_circle" />
      </form>
    </>
  );
}
