import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { AuthContext } from "../contexts/AuthContext";

const breakpoint = 992;
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  const deconnection = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      role: null,
      id: null,
    });
    navigate("/");
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
      <Link to="/">
        <img src="src/assets/R.png" alt="Logo_R" className="logo" />
      </Link>
      {(toggleMenu || width > breakpoint) && (
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
          {auth.isAuthenticated && (
            <Link to="/admin" className="list">
              Admin
            </Link>
          )}
        </div>
      )}
      <div className="Container-btn">
        {auth.isAuthenticated ? (
          <button
            type="button"
            className="btn_listProfile"
            onClick={deconnection}
          >
            Déconnexion
          </button>
        ) : (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
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
      </div>
    </nav>
  );
}
