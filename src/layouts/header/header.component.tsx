import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function HeaderComponent() {
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
            <a href="index-2.html">
              <img
                className="logo"
                src="/images/logo1.png"
                alt=""
                width="119"
                height="58"
              />
            </a>
          </div>
          <div
            className="collapse navbar-collapse flex-parent"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav flex-child-menu menu-left">
              <li className="hidden">
                <a href="#page-top"></a>
              </li>

              {/* Example: Home */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("home")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink className="btn btn-default dropdown-toggle lv1"  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#dcf836" : "inherit"
                  })}
                >
                  Home 
                  {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
                </NavLink>
                {/* <ul
                  className="dropdown-menu level1"
                  style={{ display: activeDropdown === "home" ? "block" : "none" }}
                >
                  <li><a href="index-2.html">Home 01</a></li>
                  <li><a href="homev2.html">Home 02</a></li>
                  <li><a href="homev3.html">Home 03</a></li>
                </ul> */}
              </li>

              {/* Movies */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("movies")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a className="btn btn-default dropdown-toggle lv1">
                  Movies <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <ul
                  className="dropdown-menu level1"
                  style={{
                    display: activeDropdown === "movies" ? "block" : "none",
                  }}
                >
                  <li><a href="moviegrid.html">Movie grid</a></li>
                  <li><a href="moviegridfw.html">Movie grid full width</a></li>
                  <li><a href="movielist.html">Movie list</a></li>
                  <li className="it-last"><a href="moviesingle.html">Movie single</a></li>
                </ul>
              </li>

              {/* Celebrities */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("celebrities")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a className="btn btn-default dropdown-toggle lv1">
                  Celebrities <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <ul
                  className="dropdown-menu level1"
                  style={{
                    display: activeDropdown === "celebrities" ? "block" : "none",
                  }}
                >
                  <li><a href="celebritygrid01.html">Celebrity grid 01</a></li>
                  <li><a href="celebritygrid02.html">Celebrity grid 02</a></li>
                  <li><a href="celebritylist.html">Celebrity list</a></li>
                  <li className="it-last"><a href="celebritysingle.html">Celebrity single</a></li>
                </ul>
              </li>

              {/* News */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("news")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a className="btn btn-default dropdown-toggle lv1">
                  News <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <ul
                  className="dropdown-menu level1"
                  style={{
                    display: activeDropdown === "news" ? "block" : "none",
                  }}
                >
                  <li><a href="bloglist.html">Blog List</a></li>
                  <li><a href="bloggrid.html">Blog Grid</a></li>
                  <li className="it-last"><a href="blogdetail.html">Blog Detail</a></li>
                </ul>
              </li>

              {/* Community */}
              <li
                className="dropdown first"
                onMouseEnter={() => setActiveDropdown("community")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a className="btn btn-default dropdown-toggle lv1">
                  Community <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <ul
                  className="dropdown-menu level1"
                  style={{
                    display: activeDropdown === "community" ? "block" : "none",
                  }}
                >
                  <li><a href="userfavoritegrid.html">User favorite grid</a></li>
                  <li><a href="userfavoritelist.html">User favorite list</a></li>
                  <li><a href="userprofile.html">User profile</a></li>
                  <li className="it-last"><a href="userrate.html">User rate</a></li>
                </ul>
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
              <li className="loginLink"><a href="#">LOG In</a></li>
              <li className="btn signupLink"><a href="#">Sign up</a></li>
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
