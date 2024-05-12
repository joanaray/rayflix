import React, { forwardRef } from "react";

const Header = forwardRef(({ handleClick }, ref) => {
  return (
    <header ref={ref}>
      <div className="logo-block">
        <button type="button" onClick={() => handleClick("home")}>
          Rayflix logo
        </button>
      </div>
      <div className="nav-block">
        <a className="screen-reader-text screen-reader-focusable" href="#main">
          Skip to the main content
        </a>
        <nav>
          <ul>
            <li>
              <button type="button" onClick={() => handleClick("tv")}>
                Shows
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleClick("movies")}>
                Movies
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});
export default Header;
