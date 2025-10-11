import React from "react";

const PreloaderComponent: React.FC = () => {
  return (
    <div id="preloader">
    <div className="logoWrap">
                <h1 className="logo">BeuFilm</h1>
              </div>
      <div id="status">
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default PreloaderComponent;
