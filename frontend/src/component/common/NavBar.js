import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../asset/img/Logo_of_College_of_Commerce,_Arts_and_Science.png";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-dark ${
        scrolled ? "scrolled-navbar" : "custom-navbar"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
		  <img src={Logo} alt="College Logo" height="40" className="me-2" />
          <span className="ms-2">IMS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Section */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
			<li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
			
            {/* Dropdown Menu */}
            <li className="nav-item dropdown custom-dropdown">
              <span className="nav-link dropdown-toggle" role="button">
                Issue
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/view-issues">
                    View Issue
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/edit-student">
                    Add Issue
                  </Link>
                </li>
              </ul>
            </li>

			 <li className="nav-item dropdown custom-dropdown">
              <span className="nav-link dropdown-toggle" role="button">
                Student
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add-students">
                    View Student
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/edit-student">
                    Add Student
                  </Link>
                </li>
              </ul>
            </li>
			<li className="nav-item">
              <Link className="nav-link" to="/contact">
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                About us
              </Link>
            </li>
			<li className="nav-item">
              <Link className="nav-link" to="/contact">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;