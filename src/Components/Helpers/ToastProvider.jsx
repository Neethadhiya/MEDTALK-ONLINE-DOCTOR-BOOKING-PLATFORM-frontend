import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer position="top-right" autoClose={3600} />{" "}
      {/* Adjust options as needed */}
    </div>
  );
};

export default ToastProvider;
