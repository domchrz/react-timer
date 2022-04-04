import styles from './IconButton.module.scss'

export default function MaterialButton({ icon, handleClick }) {
  return (
    <>
      <button className={styles.btn} onClick={handleClick}>
        <i className="material-icons">{icon}</i>
      </button>
    </>
  );
}
