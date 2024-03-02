import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound, Home, Login, Bestelling, Profiel, BestellingInfo, ProductInfoMeer, Notificaties, NotificatieInfoMeer } from './pages.jsx';
import PrivateRoute from './Componenten/PrivateRoute.jsx'
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
        path: 'Bestellingen',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Bestelling />
          }
        ]
      },
      {
        path: 'bestellingInfo',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <BestellingInfo />
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
      {
        path: 'productinfo',
        
        children: [
          {
            index: true,
            element: <ProductInfoMeer/>
          }
        ]
      },
      {
        path: 'notificaties',
        
        children: [
          {
            index: true,
            element: <Notificaties/>
          }
        ]
      },
      {
        path: 'notificatie-info',
        
        children: [
          {
            index: true,
            element: <NotificatieInfoMeer/>
          }
        ]
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
            <RouterProvider router={router} />     
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
