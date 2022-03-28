import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './theme/ThemeProvider';
import PopUpProvider from 'pop-ups/PopUpProvider';
import DataProvider from './data/DataProvider';
import MainViewProvider from 'components/MainView/MainViewProvider';
import { Provider } from 'react-redux';
import store from 'store/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <MainViewProvider>
        <PopUpProvider>
          <DataProvider>
            <Provider store={store}>
              <App />
            </Provider>̥
          </DataProvider>
        </PopUpProvider>
      </MainViewProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
