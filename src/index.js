import { createTheme, ThemeProvider } from '@mui/material';
import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
