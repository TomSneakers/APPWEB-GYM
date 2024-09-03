import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/authContext"; // Importer le contexte d'authentification
import { MdLogout } from "react-icons/md";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // Utiliser le contexte

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/connexion");
  };

  return (
    <nav className="menu_container container">
      <div className="row">
        <div className="col-2 menu_1_container">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div
            className={`menu_toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`align-self-center col-8 menu_2_container ${
            isMenuOpen ? "active" : ""
          }`}
        >
          <div className="menu_2_sous">
            <ul className="d-flex menu_2">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to="/about" onClick={toggleMenu}>
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={toggleMenu}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/tarifs" onClick={toggleMenu}>
                      Tarifs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" onClick={toggleMenu}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/client" onClick={toggleMenu}>
                      Clients
                    </Link>
                  </li>
                  <li>
                    <Link to="/facture" onClick={toggleMenu}>
                      Factures
                    </Link>
                  </li>
                  <li>
                    <Link to="/liste-entrainement" onClick={toggleMenu}>
                      Entrainements
                    </Link>
                  </li>
                  <li>
                    <Link to="/chat" onClick={toggleMenu}>
                      Chat
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div
          className={`align-self-center col-2 menu_3_container ${
            isMenuOpen ? "active" : ""
          }`}
        >
          <ul className="d-flex menu_3">
            {isAuthenticated ? (
              <li className="logout">
                <button className="logout-button" onClick={handleLogout}>
                  <MdLogout />
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/connexion" onClick={toggleMenu}>
                    Connexion
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
