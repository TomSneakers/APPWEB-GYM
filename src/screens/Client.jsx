import { useState } from "react";
import SearchUser from "../components/SearchUser";
import ClientList from "../components/ClientList";

const Client = () => {
  const [clients, setClients] = useState([]);

  return (
    <div className="dashboard-container">
      <h1>Tableau de bord du Coach</h1>
      <SearchUser clients={clients} setClients={setClients} />
      <ClientList clients={clients} setClients={setClients} />
    </div>
  );
};

export default Client;
