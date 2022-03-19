import './App.css';
import { useState } from 'react';
import TaskPopUp from './components/PopUps/TaskPopUp';
import TasksPanel from './components/TasksPanel';
import TaskView from './components/TaskView';
import { useTheme } from './theme/ThemeProvider';
import { usePopUp, useTaskPopUp } from './pop-ups/PopUpProvider';

function App() {
  const [selected, setSelected] = useState(undefined);

  const darkMode = useTheme();

  const popUp = usePopUp();

  const appStyle = {
    backgroundColor: darkMode ? selected?.done ? '#3bba9c' : '#2e3047' : '#eaf4f2',
  };

  return (
    <div id="app-container" style={appStyle}>
      {popUp}
      <TasksPanel onChangeSelection={setSelected} />
      <TaskView selected={selected} />
    </div>
  );
}

export default App;
