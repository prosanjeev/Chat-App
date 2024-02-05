import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { ProfileProvider } from './context/profile.context';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import About from './pages/About';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    
      {/* <Route path='/' element={<PrivateRoute Component={Home} />} />
      <Route path='/signin' element={<Signin />} /> */}

      <Route path='/about' element={<About/>} />
      <Route path='/signin' element={<Signin />} />

        <Route path='/' element={  <Home />        } />

      
    </>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  </React.StrictMode>
);