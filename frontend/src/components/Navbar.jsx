import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const breakpoint = 992;
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);

      if (window.innerWidth > breakpoint) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <nav className="Navbar">
      <div>
        <img src="src/assets/R.png" alt="Logo_R" className="logo" />
      </div>
      {(toggleMenu || width > breakpoint) && (
        <>
          <div className="NavLink">
            <Link to="/about" className="list">
              A propos
            </Link>
            <Link to="/project" className="list">
              Projets
            </Link>
            <Link to="/skill" className="list">
              Compétences
            </Link>
            <Link to="/contact" className="list">
              Contact
            </Link>
          </div>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </>
      )}
      {width < breakpoint && (
        <div>
          {toggleMenu === false ? (
            <div className="button-Navbar">
              <button
                type="button"
                onClick={toggleNavSmallScreen}
                className="btn"
              >
                <RxHamburgerMenu className="menuIcon" />
              </button>
            </div>
          ) : (
            <div className="button-Navbar">
              <button
                type="button"
                onClick={toggleNavSmallScreen}
                className="btn"
              >
                <RxCross1 className="menuIcon" />
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
