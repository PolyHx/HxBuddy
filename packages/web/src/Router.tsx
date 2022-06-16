import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Register } from './views/Register';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
