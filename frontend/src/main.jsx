import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import { ImageGenerator } from './pages/ImageGenerator.jsx';
import { Feed } from './pages/Feed.jsx';
import { History } from './pages/History.jsx';
import { MyColection } from './pages/MyColection.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';

import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout com Navbar */}
        <Route path="/" element={<App />}>
          {/* rotas filhas */}
          <Route index element={<ImageGenerator />} />
          <Route path="feed" element={<Feed />} />
          <Route path="history" element={<History />} />
          <Route path="my-colection" element={<MyColection />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
