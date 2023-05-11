import React from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import { ProSidebarProvider } from "react-pro-sidebar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </>
  );
}

export default App