import { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Router } from './Router';
import { Provider as AuthProvider } from './context/AuthContext';

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
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
