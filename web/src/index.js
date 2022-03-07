import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';
import ResponsiveAppBar from './components/ResponsiveNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeOptions = createTheme({
  typography: {
    fontFamily: [
      'Saira',
      'Saira Condensed',
    ].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
  <div>
    <Router>
      <ThemeProvider theme={themeOptions}>
        <div>
          <ResponsiveAppBar />
        </div>
        <div style={{height:"80vh", overflowY:"auto", paddingLeft: "50px", paddingRight: "50px", paddingTop:"20px" }}>
          <App />
        </div>
        <div className="spacer curve1"></div>
      </ThemeProvider>
    </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
