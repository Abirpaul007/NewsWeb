import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countries from "./Countries";
import "./Header.css";
import { IoInvertMode } from "react-icons/io5";
import { ImMenu3 } from "react-icons/im";
import { IoMenu } from "react-icons/io5";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("paper-theme");

  let category = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "politics",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "paper-theme" ? "light-theme" : "paper-theme");
  }

  function toggleMenu() {
    setActive(!active);
  }

  function closeMenu() {
    setActive(false);
    setShowCategoryDropdown(false);
    setShowCountryDropdown(false);
  }

  const today = new Date().toDateString();

  return (
    <header className="paper-header">
      <nav className="navbar paper-navbar">
        <h2 className="date">{today}</h2>
        <h3 className="heading paper-heading">News Potrika</h3>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <IoMenu />
        </div>

        <ul className={active ? "nav-ul active paper-nav" : "nav-ul paper-nav"}>
          <li>
            <Link to="/" onClick={closeMenu}>
              All News
            </Link>
          </li>

          {/* Category Dropdown */}
          <li className="dropdown-li">
            <Link
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines{" "}
              <ImMenu3 className={showCategoryDropdown ? "icon-active" : ""} />
            </Link>
            <ul
              className={
                showCategoryDropdown
                  ? "dropdown show-dropdown paper-dropdown"
                  : "dropdown paper-dropdown"
              }
            >
              {category.map((element, index) => (
                <li key={index} onClick={closeMenu}>
                  <Link
                    to={`/top-headlines/${element}`}
                    className="capitalize paper-link"
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Country Dropdown */}
          <li className="dropdown-li">
            <Link
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country{" "}
              <ImMenu3 className={showCountryDropdown ? "icon-active" : ""} />
            </Link>
            <ul
              className={
                showCountryDropdown
                  ? "dropdown show-dropdown paper-dropdown"
                  : "dropdown paper-dropdown"
              }
            >
              {countries.map((element, index) => (
                <li key={index} onClick={closeMenu}>
                  <Link
                    to={`/country/${element.iso_2_alpha}`}
                    className="country-item paper-link"
                  >
                    <img
                      src={`https://flagcdn.com/32x24/${element.iso_2_alpha}.png`}
                      alt={element.countryName}
                    />
                    <span>{element.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Theme Toggle */}
          <li>
            <button className="theme-toggle paper-button" onClick={toggleTheme}>
              <IoInvertMode /> Mode
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
