import React from "react";


interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`overlay ${isOpen ? "openform" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="login-wrapper" id="signup-content">
        <div className="login-content">
          <a href="#" className="close" onClick={onClose}>
            x
          </a>
          <h3>sign up</h3>
          <form method="post" action="#">
            <div className="row">
              <label htmlFor="username-2">
                Username:
                <input
                  type="text"
                  name="username"
                  id="username-2"
                  placeholder="Hugh Jackman"
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\\.]{8,20}$"
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="email-2">
                Your email:
                <input
                  type="email"
                  name="email"
                  id="email-2"
                  placeholder="example@mail.com"
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="password-2">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="repassword-2">
                Re-type Password:
                <input
                  type="password"
                  name="repassword"
                  id="repassword-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
                />
              </label>
            </div>

            <div className="row">
              <button type="submit">sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
