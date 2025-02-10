import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importuj BrowserRouter
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter base="/https://github.com/stecuproductions/torebki"> {/* Otaczamy App komponentem BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
