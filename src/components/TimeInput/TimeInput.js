import styles from './TimeInput.module.scss';
import { timeUnitToString } from '../../helpers/timeHelpers';

export default function TimeInput({ title, value, setValue }) {
  return (
    <label className={styles['time-input']}>
      <span>{title}</span>
      <input
        onChange={(e) => setValue(timeUnitToString(e.target.value))}
        type="number"
        min="0"
        max="59"
        step="1"
        value={value}
      />
    </label>
  );
}
