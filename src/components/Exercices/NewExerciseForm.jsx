import { useState } from "react";
import { toast } from "react-toastify";
import { FetchRequest } from "../../services/fetchRequest";

const NewExerciseForm = ({ setWorkout, clientId, workoutId }) => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    type: "",
    targetMuscles: [],
    equipment: [],
    difficultyLevel: "",
    duration: 0,
    repetitions: 0,
    sets: 0,
    restTime: 0,
    goal: "",
    progressionMode: "",
    resourceLink: "",
  });

  const handleNewExerciseChange = (field, value) => {
    setNewExercise({ ...newExercise, [field]: value });
  };

  const handleAddExercise = async () => {
    try {
      const response = await FetchRequest.put(
        `/api/clients/${clientId}/workouts-coach/${workoutId}/add-exercise`
      )
        .withAuthorization()
        .withBody(newExercise)
        .send();
      setWorkout(response);
      setNewExercise({
        name: "",
        description: "",
        type: "",
        targetMuscles: [],
        equipment: [],
        difficultyLevel: "",
        duration: 0,
        repetitions: 0,
        sets: 0,
        restTime: 0,
        goal: "",
        progressionMode: "",
        resourceLink: "",
      });
      toast.success("Exercice ajouté avec succès!");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'exercice.");
    }
  };

  return (
    <div>
      <h5 className="workout-subtitle">Ajouter un nouvel exercice</h5>
      <div className="workout-form-group">
        <label className="workout-label">Nom de l'exercice</label>
        <input
          type="text"
          value={newExercise.name}
          onChange={(e) => handleNewExerciseChange("name", e.target.value)}
          placeholder="Nom de l'exercice"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Description de l'exercice</label>
        <textarea
          value={newExercise.description}
          onChange={(e) =>
            handleNewExerciseChange("description", e.target.value)
          }
          placeholder="Description de l'exercice"
          className="workout-textarea"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Type d'exercice</label>
        <select
          value={newExercise.type}
          onChange={(e) => handleNewExerciseChange("type", e.target.value)}
          className="workout-select"
        >
          <option value="">Sélectionner le type d'exercice</option>
          <option value="Cardio">Cardio</option>
          <option value="Renforcement musculaire">
            Renforcement musculaire
          </option>
          <option value="Étirement">Étirement</option>
          <option value="Mobilité">Mobilité</option>
        </select>
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Muscles ciblés</label>
        <select
          multiple
          value={newExercise.targetMuscles}
          onChange={(e) =>
            handleNewExerciseChange(
              "targetMuscles",
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="workout-select"
        >
          <option value="Pectoraux">Pectoraux</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Jambes">Jambes</option>
          <option value="Abdominaux">Abdominaux</option>
          <option value="Dos">Dos</option>
        </select>
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Équipement nécessaire</label>
        <select
          multiple
          value={newExercise.equipment}
          onChange={(e) =>
            handleNewExerciseChange(
              "equipment",
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="workout-select"
        >
          <option value="Aucun">Aucun</option>
          <option value="Haltères">Haltères</option>
          <option value="Barres">Barres</option>
          <option value="Kettlebell">Kettlebell</option>
          <option value="Élastiques">Élastiques</option>
        </select>
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Niveau de difficulté</label>
        <select
          value={newExercise.difficultyLevel}
          onChange={(e) =>
            handleNewExerciseChange("difficultyLevel", e.target.value)
          }
          className="workout-select"
        >
          <option value="">Niveau de difficulté</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Durée (min)</label>
        <input
          type="number"
          value={newExercise.duration}
          onChange={(e) => handleNewExerciseChange("duration", e.target.value)}
          placeholder="Durée (min)"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Répétitions</label>
        <input
          type="number"
          value={newExercise.repetitions}
          onChange={(e) =>
            handleNewExerciseChange("repetitions", e.target.value)
          }
          placeholder="Répétitions"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Séries</label>
        <input
          type="number"
          value={newExercise.sets}
          onChange={(e) => handleNewExerciseChange("sets", e.target.value)}
          placeholder="Séries"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Temps de repos (s)</label>
        <input
          type="number"
          value={newExercise.restTime}
          onChange={(e) => handleNewExerciseChange("restTime", e.target.value)}
          placeholder="Temps de repos (s)"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Objectif de l'exercice</label>
        <input
          type="text"
          value={newExercise.goal}
          onChange={(e) => handleNewExerciseChange("goal", e.target.value)}
          placeholder="Objectif de l'exercice"
          className="workout-input"
        />
      </div>
      <div className="workout-form-group">
        <label className="workout-label">Mode de progression</label>
        <select
          value={newExercise.progressionMode}
          onChange={(e) =>
            handleNewExerciseChange("progressionMode", e.target.value)
          }
          className="workout-select"
        >
          <option value="">Mode de progression</option>
          <option value="Augmentation du poids">Augmentation du poids</option>
          <option value="Augmentation du nombre de répétitions">
            Augmentation du nombre de répétitions
          </option>
          <option value="Réduction du temps de repos">
            Réduction du temps de repos
          </option>
        </select>
      </div>
      <div className="workout-form-group">
        <label className="workout-label">
          Lien vers des ressources supplémentaires
        </label>
        <input
          type="url"
          value={newExercise.resourceLink}
          onChange={(e) =>
            handleNewExerciseChange("resourceLink", e.target.value)
          }
          placeholder="Lien vers des ressources supplémentaires"
          className="workout-input"
        />
      </div>
      <button className="workout-button" onClick={handleAddExercise}>
        Ajouter l'exercice
      </button>
    </div>
  );
};

export default NewExerciseForm;
