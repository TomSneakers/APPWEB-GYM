import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Load.css"; // Assurez-vous de bien importer le fichier CSS

const Load = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
      window.location.reload();
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="load_container">
      <div className="load_spinner"></div>
    </div>
  );
};

export default Load;
