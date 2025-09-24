import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onLoginOpen: () => void;
  onSignupOpen?: () => void;
}

export default function HeaderComponent({ onLoginOpen, onSignupOpen }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const onLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/"; // hoặc sử dụng useNavigate để chuyển hướng
  }
  useEffect(() => {
    // Lấy token từ localStorage khi load trang
    const storedToken = localStorage.getItem("token"); // đổi key tùy bạn lưu
    setToken(storedToken);

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`ht-header full-width-hd ${isSticky ? "sticky" : ""}`}>
      <div className="row">
        <nav id="mainNav" className="navbar navbar-default navbar-custom">
          <div className="navbar-header logo">
            <NavLink to="/">
              <img className="logo" src="/images/logo1.png" alt="" width="119" height="58" />
            </NavLink>
          </div>

          <div className="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav flex-child-menu menu-left">
              <li className="dropdown first">
                <NavLink
                  className="btn btn-default dropdown-toggle lv1"
                  to="/"
                  style={({ isActive }) => ({ color: isActive ? "#dcf836" : "" })}
                >
                  Home
                </NavLink>
              </li>
              <li className="dropdown first">
                <NavLink
                  className="btn btn-default dropdown-toggle lv1"
                  to="/movies"
                  style={({ isActive }) => ({ color: isActive ? "#dcf836" : "" })}
                >
                  Movies
                </NavLink>
              </li>
              <li className="dropdown first">
                <NavLink
                  className="btn btn-default dropdown-toggle lv1"
                  to="/movie-favorites"
                  style={({ isActive }) => ({ color: isActive ? "#dcf836" : "" })}
                >
                  Favorites
                </NavLink>
              </li>
              <li className="dropdown first">
                <NavLink
                  className="btn btn-default dropdown-toggle lv1"
                  to="/user-profile"
                  style={({ isActive }) => ({ color: isActive ? "#dcf836" : "" })}
                >
                  Profile
                </NavLink>
              </li>
            </ul>

            <ul className="nav navbar-nav flex-child-menu menu-right">
              <li><a href="#">Help</a></li>

              {token ? (
                <>
                <li className="loginLink" onClick={()=>onLogOut()}>
                    <a href="#">LOG Out</a>
                  </li>
                <li className="dropdown first">
                  <NavLink to="/user-profile">
                    <img
                      src="/images/default-avatar.png" // có thể thay bằng avatar từ API
                      alt="avatar"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </NavLink>
                </li>
                </>
                // Nếu có token -> hiện avatar
                  
              ) : (
                // Nếu chưa login -> hiện login/signup
                <>
                  <li className="loginLink" onClick={onLoginOpen}>
                    <a href="#">LOG In</a>
                  </li>
                  <li className="btn signupLink" onClick={onSignupOpen}>
                    <a href="#">Sign up</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
