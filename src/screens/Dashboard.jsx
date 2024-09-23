import CircularProgress from "../components/CircularProgress";
import { useState, useEffect } from "react";
import { FetchRequest } from "../services/fetchRequest";
import { toast } from "react-toastify";
import {Heading} from "@chakra-ui/react";
import ClientList from "../components/ClientList.jsx";

export default function Dashboard() {
  const [userLevel, setUserLevel] = useState(null);
  const [clients, setClients] = useState(null);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await FetchRequest.get("/api/users/me/coach-data")
          .withAuthorization()
          .send();

        setUserLevel(response.level);
        setClients(response.clients);
        setLoading(false);
      } catch (error) {
        toast.error("Erreur lors de la récupération des données utilisateur.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userLevel !== null && clients !== null) {
      switch (userLevel) {
        case 1:
          setTotalClients(10);
          break;
        case 2:
          setTotalClients(20);
          break;
        case 3:
          setTotalClients(100); // Pourcentage fixe de 100% pour niveau illimité
          break;
        default:
          setTotalClients(10);
      }
    }
  }, [userLevel, clients]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  const isLevelThree = userLevel === 3;
  const clientCount = isLevelThree ? 100 : clients;

  return (
    <div>
      <h1>Dashboard</h1>
      <CircularProgress
        clients={clientCount}
        totalClients={totalClients}
        isLevelThree={isLevelThree}
      />
      <ClientList/>
    </div>
  );
}
