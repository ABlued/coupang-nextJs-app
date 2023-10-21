'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
function ToastProvider() {
  return <ToastContainer autoClose={2000}></ToastContainer>;
}

export default ToastProvider;
