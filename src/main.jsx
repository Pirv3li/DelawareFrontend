import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound, Home, Login, Bestellingen, Profiel } from './pages.jsx';
import PrivateRoute from './Componenten/PrivateRoute.jsx'
import { TokenProvider } from './Componenten/context/TokenContext.jsx';
import Layout from './Componenten/Layout.jsx';
import { AuthProvider } from './Componenten/contexts/Auth.contexts.jsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <NotFound /> },
      { path: 'login', element: <Login /> },
      {
        path: 'bestellingen',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Bestellingen />
          }
        ]
      },
      {
        path: 'profiel',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profiel />
          }
        ]
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <TokenProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </TokenProvider>
    </ChakraProvider>
  </React.StrictMode>,
)