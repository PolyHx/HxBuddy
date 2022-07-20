import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Router } from './Router';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
