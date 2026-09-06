import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <RouteErrorBoundary />,
      children: [
        { path: 'projects', element: null },
        { path: 'about', element: null },
        { path: 'contact', element: null },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
