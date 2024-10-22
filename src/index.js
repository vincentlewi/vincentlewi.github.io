import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdiMape from './components/AdiMape';
import MarkdownComponent from './components/ra/MarkdownComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/adi/mape",
    element: <AdiMape />
  },
  {
    path: "/ra/updates_24_10_22",
    element: <MarkdownComponent filePath='/ra/updates_24_10_22/updates_24_10_22.md'/>
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
