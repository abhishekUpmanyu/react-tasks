import './App.css';
import { useState } from 'react';
import TasksPanel from './components/TasksPanel';
import TaskView from './components/MainView';
import { useTheme } from './theme/ThemeProvider';
import { usePopUp } from './pop-ups/PopUpProvider';
import MainView from 'components/MainView/';

function App() {
  const [selected, setSelected] = useState(undefined);

  const darkMode = useTheme();

  const popUp = usePopUp();

  const appStyle = {
    backgroundColor: darkMode ? selected?.done ? '#3bba9c' : '#2e3047' : '#eaf4f2',
  };

  function updateSelected(newSelected) {
    console.log(newSelected);
    setSelected(newSelected);
  }

  return (
    <div id="app-container" style={appStyle}>
      {popUp}
      <TasksPanel onChangeSelection={updateSelected} />
      <MainView />
    </div>
  );
}

export default App;
