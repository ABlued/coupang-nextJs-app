'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default ToastProvider;
