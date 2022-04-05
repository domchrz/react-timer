import { useState } from 'react';
import './App.scss';
import AddTimerForm from './components/AddTimerForm/AddTimerForm';
import IconButton from './components/IconButton/IconButton';
import Timer from './components/Timer/Timer';

export default function App() {
  const [timers, setTimers] = useState([]);

  const addTimer = (task) => {
    const options = {
      id: Math.random(),
      task,
    };
    setTimers((prevState) => [...prevState, options]);
  };

  const removeTimer = (id) => {
    return () =>
      setTimers((prevState) => prevState.filter((timer) => timer.id !== id));
  };

  return (
    <div className="app">
      <header>
        <AddTimerForm addTimer={addTimer} />
      </header>
      <main>
        {timers.length > 0 &&
          timers.map((timer) => (
            <Timer key={timer.id} task={timer.task}>
              <IconButton icon="close" handleClick={removeTimer(timer.id)} />
            </Timer>
          ))}
      </main>
    </div>
  );
}
