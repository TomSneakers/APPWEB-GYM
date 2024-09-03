import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./screens/Home";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Connexion from "./screens/Connexion";
import Tarifs from "./screens/Tarifs";
import Dashboard from "./screens/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./screens/NotFound";
import { AuthProvider } from "./context/authContext";
import Client from "./screens/Client";
import ClientDetails from "./components/ClientDetails";
import { ToastContainer } from "react-toastify";
import WorkoutDetails from "./components/WorkoutDetails";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <ToastContainer />
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/clients/:clientId/workouts/:workoutId"
            element={<WorkoutDetails />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="client" element={<Client />} />
          <Route path="/clients/:clientId" element={<ClientDetails />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
