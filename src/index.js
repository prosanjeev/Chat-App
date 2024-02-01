import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import Home from './pages/Home';

const router =createBrowserRouter(
 createRoutesFromElements(
  <>
  <Route path='/' element={<Home/>}/>
  <Route path='/signin' element={<Signin/>}/>
  <Route path='/user' element={<PrivateRoute/>}>
    <Route path='dashboard' element={<Home/>}/>
  </Route>
  </>
 ) )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <RouterProvider router={router}/>
 </React.StrictMode>
);