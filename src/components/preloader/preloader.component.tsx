import React from "react";

const PreloaderComponent: React.FC = () => {
  return (
    <div id="preloader">
      <img
        className="logo"
        src="/images/logo1.png"
        alt="Logo"
        width={119}
        height={58}
      />
      <div id="status">
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default PreloaderComponent;
