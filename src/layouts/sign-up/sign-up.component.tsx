import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const { register, login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
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

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Đăng ký
      await register(username, email, password);

      // 2️⃣ Tự động đăng nhập ngay sau khi đăng ký
      await login(username, password);

      // 3️⃣ Đóng modal
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`overlay ${isOpen ? "openform" : ""}`} onClick={handleOverlayClick}>
      <div className="login-wrapper" id="signup-content">
        <div className="login-content">
          <a className="close" onClick={onClose} style={{ cursor: "pointer" }}>
            x
          </a>
          <h3>Sign Up</h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="username-2">
                Username:
                <input
                  type="text"
                  id="username-2"
                  placeholder="Hugh Jackman"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\\.]{8,20}$"
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="email-2">
                Email:
                <input
                  type="email"
                  id="email-2"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="password-2">
                Password:
                <input
                  type="password"
                  id="password-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  id="repassword-2"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  pattern="(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
                />
              </label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="row">
              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
