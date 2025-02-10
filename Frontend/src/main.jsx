import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Importuj BrowserRouter
import App from './App';

createRoot(document.getElementById('root')).render(
    <HashRouter base="/https://github.com/stecuproductions/torebki"> {/* Otaczamy App komponentem BrowserRouter */}
      <App />
    </HashRouter>
);
