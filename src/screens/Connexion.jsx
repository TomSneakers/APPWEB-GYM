import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/connexion.css";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { authService } from "../services/authService";
import Load from "../components/Load";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await authService.signIn(email, password);
      toast.success("Connexion réussie");
      login(); // Mettre à jour l'état d'authentification global
      navigate("/dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Load />;
  }

  return (
    <div className="container connexion-container mt-3">
      <ToastContainer />
      <div className="row connexion-row">
        <div className="col-md-6 connexion-image-container"></div>
        <div className="col-md-6 connexion-form-container">
          <h1 className="connexion-title">Connexion</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="connexion-mail-container">
              <label htmlFor="email">Mail</label>
              <input
                className="input-connexion"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="xxxxxx@xxxxxx.xx"
              />
            </div>
            <div className="connexion-password-container">
              <label htmlFor="password">Mot de passe</label>
              <div className="password-input-container">
                <input
                  className="input-connexion"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="************"
                />
                <span className="toggle-password" onClick={toggleShowPassword}>
                  {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
                </span>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="submit-button" type="submit">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
