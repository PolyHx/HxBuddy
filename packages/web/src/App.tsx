import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Router } from './Router';
import { Provider as AuthProvider } from './context/AuthContext';

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
