import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importuj BrowserRouter
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Otaczamy App komponentem BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
