// src/components/ClientList.js

import { useState, useEffect } from "react";
import { FetchRequest } from "../services/fetchRequest";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ClientList = ({ clients, setClients }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await FetchRequest.get(`/api/users/${userId}/clients`)
          .withAuthorization()
          .send();
        setClients(response);
        setLoading(false);
      } catch (error) {
        toast.error("Erreur lors de la récupération des clients.");
        setLoading(false);
      }
    };

    fetchClients();
  }, [setClients]);

  const handleRemoveClient = async (clientId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      console.log(
        `Removing client. Coach ID: ${userId}, Client ID: ${clientId}`
      );

      await FetchRequest.delete(
        `/api/users/${userId}/remove-client/${clientId}`
      )
        .withAuthorization()
        .send();

      setClients(clients.filter((client) => client._id !== clientId));
      toast.success("Client supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du client:", error);
      toast.error("Erreur lors de la suppression du client.");
    }
  };

  if (loading) {
    return <p>Chargement des clients...</p>;
  }

  return (
    <div className="client-list-container">
      <h2>Mes Clients</h2>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client._id}>
              <Link to={`/clients/${client._id}`}>
                {client.firstName} {client.lastName} - {client.email} -{" "}
                {client.phone}
              </Link>
              <button onClick={() => handleRemoveClient(client._id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas encore de clients.</p>
      )}
    </div>
  );
};

export default ClientList;
