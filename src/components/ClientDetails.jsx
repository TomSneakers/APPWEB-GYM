import { useEffect, useState } from "react";
import { FetchRequest } from "../services/fetchRequest";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ClientDetails = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const [showForm, setShowForm] = useState(false); // État pour gérer l'affichage du formulaire
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    exercises: [],
  });

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientResponse = await FetchRequest.get(`/api/users/${clientId}`)
          .withAuthorization()
          .send();
        setClient(clientResponse);

        const workoutsResponse = await FetchRequest.get(
          `/api/clients/${clientId}/workouts-coach`
        )
          .withAuthorization()
          .send();
        setWorkouts(workoutsResponse);
      } catch (error) {
        toast.error(
          "Erreur lors de la récupération des informations du client."
        );
      }
    };

    fetchClientDetails();
  }, [clientId]);

  const handleCreateWorkout = async () => {
    try {
      const response = await FetchRequest.post("/api/workouts-coach")
        .withAuthorization()
        .withBody({ ...newWorkout, clientId })
        .send();
      setWorkouts([...workouts, response]); // Ajoute le nouvel entraînement à la liste
      setNewWorkout({ name: "", exercises: [] });
      setShowForm(false);
      toast.success("Entraînement créé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la création de l'entraînement.");
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet entraînement ?")
    ) {
      return;
    }

    try {
      await FetchRequest.delete(`/api/workouts-coach/${workoutId}`)
        .withAuthorization()
        .send();
      setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      toast.success("Entraînement supprimé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'entraînement.");
    }
  };

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, name: e.target.value });
  };

  if (!client) {
    return <p>Chargement des détails du client...</p>;
  }

  return (
    <div>
      <h2>Détails du Client</h2>
      <p>
        Nom : {client.firstName} {client.lastName}
      </p>
      <p>Email : {client.email}</p>
      <p>Téléphone : {client.phone}</p>

      <h3>Liste des entraînements</h3>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <Link to={`/clients/${clientId}/workouts/${workout._id}`}>
                {workout.name} - Durée totale :{" "}
                {workout.exercises.reduce(
                  (total, exercise) => total + exercise.duration,
                  0
                )}{" "}
                min
              </Link>
              <button onClick={() => handleDeleteWorkout(workout._id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun entraînement trouvé pour ce client.</p>
      )}

      {/* Bouton pour afficher le formulaire de création d'entraînement */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annuler" : "Créer un nouvel entraînement"}
      </button>

      {/* Formulaire de création d'entraînement */}
      {showForm && (
        <div>
          <h4>Créer un nouvel entraînement</h4>
          <input
            type="text"
            value={newWorkout.name}
            onChange={handleInputChange}
            placeholder="Nom de l'entraînement"
          />
          <button onClick={handleCreateWorkout}>Créer l'entraînement</button>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
