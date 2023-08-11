import cssStyles from "../css/style.css";
import cssGlobal from "../css/global.css";
import sitewebmanifest from "../img/favicon/site.webmanifest";
import { Outlet, Link } from "react-router-dom";
import { useRef } from "react";

function NavBar() {
  const hamburger_ref = useRef(null);
  const navmenu_ref = useRef(null);
  function mobileMenu() {
    hamburger_ref.current.focus();
    hamburger_ref.current.classList.toggle("active");
    navmenu_ref.current.classList.toggle("active");
  }
  const navlink_ref = useRef(null);
  function closeMenu() {
    hamburger_ref.current.focus();
    hamburger_ref.current.remove("active");
    navmenu_ref.current.remove("active");
  }

  return (
    <>
      {/* Style */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link type="text/html" href={cssStyles} />
      <link type="text/html" href={cssGlobal} />
      <link rel="manifest" href={sitewebmanifest} />

      <nav id="navbar-scroll" className="navbar">
        {/* <blockquote className="alert">
              <span>This site is currently being updated</span>
              <i className="fas fa-exclamation-circle" />
            </blockquote> */}
        <h1 className="">
          <Link to="/">Omar</Link>
        </h1>
        <div id="menu">
          <ul className="nav-menu" ref={navmenu_ref} onClick={mobileMenu}>
            <li className="nav-items">
              <Link to="about" className="nav-link">
                <i
                  className="nav-icon fas fa-user"
                  ref={navlink_ref}
                  onClick={closeMenu}
                />{" "}
                ABOUT
              </Link>
            </li>

            <li className="nav-items">
              <Link to="skills" className="nav-link">
                <i className="nav-icon fas fa-cog" /> SKILLS
              </Link>
            </li>
            <li className="nav-items">
              <Link to="projects" className="nav-link">
                <i className="nav-icon fas fa-code" /> PROJECTS
              </Link>
            </li>
            <li className="nav-items">
              <Link
                to="https://shopon.hashnode.dev/"
                target="_blank"
                className="nav-link"
              >
                <i className="nav-icon fas fa-newspaper" /> Blog
              </Link>
            </li>
            <li className="nav-items">
              <Link to="contact" className="nav-link">
                <i className="nav-icon fas fa-address-book" /> CONTACT
              </Link>
            </li>
            {/*
                <div className="theme-switch-wrapper">
                  <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div className="slider round" />
                  </label>
                </div>
                 */}
          </ul>
          <div className="hamburger" ref={hamburger_ref} onClick={mobileMenu}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
export default NavBar;
