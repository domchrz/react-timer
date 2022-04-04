import { useState } from 'react';
import './App.scss';
import AddTimerForm from './components/AddTimerForm';
import MaterialButton from './components/IconButton';
import Timer from './components/Timer2';

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
              <MaterialButton
                icon="close"
                handleClick={() => removeTimer(timer.id)}
              />
            </Timer>
          ))}
      </main>
    </div>
  );
}
