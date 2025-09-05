import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

interface LogInComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogInComponent: React.FC<LogInComponentProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(identifier, password);
      onClose(); // đóng popup sau khi login thành công
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`overlay ${isOpen ? "openform" : ""}`} onClick={handleOverlayClick}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a className="close" onClick={onClose} style={{ cursor: "pointer" }}>
            x
          </a>
          <h3>Login</h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="username">
                Username or Email:
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Hugh Jackman"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="row">
              <div className="remember">
                <div>
                  <input type="checkbox" name="remember" value="Remember me" />
                  <span>Remember me</span>
                </div>
                <a href="#">Forget password?</a>
              </div>
            </div>

            <div className="row">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="row">
            <p>Or via social</p>
            <div className="social-btn-2">
              <a className="fb" href="#">
                <i className="ion-social-facebook"></i>Facebook
              </a>
              <a className="tw" href="#">
                <i className="ion-social-twitter"></i>Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
