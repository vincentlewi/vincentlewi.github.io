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
  },
  {
    path: "/ra/updates_24_11_08",
    element: <MarkdownComponent filePath='/ra/updates_24_11_08/updates_24_11_08.md'/>
  },
  {
    path: "/ra/updates_25_03_17",
    element: <MarkdownComponent filePath='/ra/updates_25_03_17/updates_25_03_17.md'/>
  },
  {
    path: "/ra/updates_25_03_24",
    element: <MarkdownComponent filePath='/ra/updates_25_03_24/updates_25_03_24.md'/>
  },
  {
    path: "/ra/updates_25_04_28",
    element: <MarkdownComponent filePath='/ra/updates_25_04_28/updates_25_04_28.md'/>
  }

]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
