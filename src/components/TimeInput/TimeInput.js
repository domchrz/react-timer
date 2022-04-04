export default function TimeInput({ title, value, setValue }) {
  return (
    <label>
      <span>{title}</span>
      <input
        onChange={e => setValue(+e.target.value || 0)}
        type="number"
        min="0"
        max="59"
        step="1"
        value={value}
      />
    </label>
  );
}
