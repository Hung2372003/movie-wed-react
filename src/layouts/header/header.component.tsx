import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
interface HeaderProps {
  onLoginOpen: () => void;
  onSignupOpen?: () => void;
}
export default function HeaderComponent({ onLoginOpen,onSignupOpen }: HeaderProps) {
const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
 useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
     <header
      className={`ht-header full-width-hd ${isSticky ? "sticky" : ""}`}
    >
      <div className="row">
        <nav id="mainNav" className="navbar navbar-default navbar-custom">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header logo">
            <div
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <div id="nav-icon1">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <NavLink to="/">
              <img className="logo" src="/images/logo1.png" alt="" width="119" height="58"/>
            </NavLink>
          </div>
          <div
            className="collapse navbar-collapse flex-parent"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav flex-child-menu menu-left">
              <li className="hidden">
                <NavLink to="/"></NavLink>
              </li>
              <li className="dropdown first">
                <NavLink className="btn btn-default dropdown-toggle lv1"  to="/" style={({ isActive }) => ({color: isActive ? "#dcf836" : "" })}> Home </NavLink>
              </li>
              <li className="dropdown first">
                <NavLink className="btn btn-default dropdown-toggle lv1"  to="/movies" style={({ isActive }) => ({ color: isActive ? "#dcf836" : ""})}>
                  Movies 
                </NavLink>
              </li>
              <li className="dropdown first">
                <NavLink className="btn btn-default dropdown-toggle lv1" to={"/movie-favorites"} style={({ isActive }) => ({ color: isActive ? "#dcf836" : ""})}>
                  Favorites
                </NavLink>
              </li>
                <li className="dropdown first">
                  <NavLink className="btn btn-default dropdown-toggle lv1" to={"/profile"} style={({ isActive }) => ({ color: isActive ? "#dcf836" : ""})}>
                    Profile
                  </NavLink>
                </li>
            </ul>

            <ul className="nav navbar-nav flex-child-menu menu-right">
              {/* Pages */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("pages")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a className="btn btn-default dropdown-toggle lv1">
                  Pages <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <ul
                  className="dropdown-menu level1"
                  style={{
                    display: activeDropdown === "pages" ? "block" : "none",
                  }}
                >
                  <li><a href="landing.html">Landing</a></li>
                  <li><a href="404.html">404 Page</a></li>
                  <li className="it-last"><a href="comingsoon.html">Coming soon</a></li>
                </ul>
              </li>

              <li><a href="#">Help</a></li>
              <li className="loginLink" onClick={onLoginOpen}><a href="#">LOG In</a></li>
              <li className="btn signupLink" onClick={onSignupOpen}><a href="#">Sign up</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="top-search">
	    	<select>
          <option value="united">TV show</option>
          <option value="saab">Others</option>
			  </select>
		  	<input type="text" placeholder="Search for a movie, TV Show or celebrity that you are looking for"/>
	    </div>
    </header>
  );
}
