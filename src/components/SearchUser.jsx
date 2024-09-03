import { useState } from "react";
import { FetchRequest } from "../services/fetchRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchUser = ({ clients, setClients }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Veuillez entrer un terme de recherche.");
      return;
    }

    setLoading(true);

    try {
      const response = await FetchRequest.get(
        `/api/users/search?query=${query}`
      )
        .withAuthorization()
        .send();
      setResults(response);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors de la recherche.");
      setLoading(false);
    }
  };

  const handleAddClient = async (clientId) => {
    const userId = localStorage.getItem("userId");

    // Vérifiez si l'utilisateur essaie de s'ajouter lui-même
    if (clientId === userId) {
      toast.error("Vous ne pouvez pas vous ajouter vous-même comme client.");
      return;
    }

    // Vérifiez si le client est déjà dans la liste
    const clientAlreadyAdded = clients.some(
      (client) => client._id === clientId
    );

    if (clientAlreadyAdded) {
      toast.error("Ce client a déjà été ajouté.");
      return;
    }

    try {
      await FetchRequest.post(`/api/users/${userId}/add-client`)
        .withBody({ clientId })
        .withAuthorization()
        .send();

      // Recherchez le client ajouté dans les résultats de recherche
      const addedClient = results.find((user) => user._id === clientId);

      // Ajoutez le client à la liste des clients
      setClients([...clients, addedClient]);

      toast.success("Client ajouté avec succès !");
    } catch (error) {
      if (error.message) {
        toast.error(`Erreur : ${error.message}`);
      } else {
        toast.error("Erreur lors de l'ajout du client.");
      }
    }
  };

  return (
    <div className="search-user-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un client par nom, prénom, email ou téléphone"
        />
        <button type="submit">Rechercher</button>
      </form>

      {loading && <p>Recherche en cours...</p>}

      {results.length > 0 && (
        <ul>
          {results.map((user) => (
            <li key={user._id}>
              {user.firstName} {user.lastName} - {user.email} - {user.phone}
              <button onClick={() => handleAddClient(user._id)}>
                Ajouter comme client
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
