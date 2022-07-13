import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './Navbar';
import { Register } from './views/Register';
import ChallengesDashboard from './components/ChallengesDashboard';

export const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges" element={<ChallengesDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
