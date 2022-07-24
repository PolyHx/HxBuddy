import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './views/Navbar';
import { Login } from './views/Login';
import { Register } from './views/Register';
import ChallengesDashboard from './views/Challenges/ChallengesDashboard';
import setAuthToken from './utils/setAuthToken';
import { useContext, useEffect } from 'react';
import { Context as AuthContext } from './context/AuthContext';
import { Team } from './views/Team';

const guestItems = [
  {
    route: '/',
    text: 'Challenges',
  },
  {
    route: '/register',
    text: 'Register',
  },
  {
    route: '/login',
    text: 'Login',
  },
];

const participantItems = [
  {
    route: '/',
    text: 'Challenges',
  },
  {
    route: '/team',
    text: 'Team',
  },
];

export const Router = () => {
  const { state, signIn } = useContext<any>(AuthContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      signIn({ token: localStorage.token });
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        navItems={state.token ? participantItems : guestItems}
        logout={state.token}
      />
      <Routes>
        <Route path="/" element={<ChallengesDashboard />} />
        {!state.token ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <Route path="/team" element={<Team />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
