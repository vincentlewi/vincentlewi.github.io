import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdiMape from './components/AdiMape';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/adi/mape",
    element: <AdiMape />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
