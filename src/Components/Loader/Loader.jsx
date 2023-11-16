import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="full-screen-loader">
      <div className="ball-loader">
        <div className="ball blue"></div>
        <div className="ball red"></div>
        <div className="ball green"></div>
        <div className="ball violet"></div>
        <div className="ball yello"></div>
        <div className="ball maroon"></div>
        <div className="ball pink"></div>
        <div className="ball magenda"></div>
      </div>
    </div>
  );
};

export default Loader;
