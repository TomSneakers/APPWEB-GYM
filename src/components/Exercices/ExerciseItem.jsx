const ExerciseItem = ({
  exercise,
  index,
  isEditing,
  handleExerciseChange,
  handleDeleteExercise,
}) => {
  return (
    <li className="workout-exercise-item">
      {isEditing ? (
        <>
          <div className="workout-form-group">
            <label className="workout-label">Nom de l'exercice</label>
            <input
              type="text"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseChange(index, "name", e.target.value)
              }
              placeholder="Nom de l'exercice"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Description de l'exercice</label>
            <textarea
              value={exercise.description}
              onChange={(e) =>
                handleExerciseChange(index, "description", e.target.value)
              }
              placeholder="Description de l'exercice"
              className="workout-textarea"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Type d'exercice</label>
            <select
              value={exercise.type}
              onChange={(e) =>
                handleExerciseChange(index, "type", e.target.value)
              }
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
              value={exercise.targetMuscles}
              onChange={(e) =>
                handleExerciseChange(
                  index,
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
              value={exercise.equipment}
              onChange={(e) =>
                handleExerciseChange(
                  index,
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
              value={exercise.difficultyLevel}
              onChange={(e) =>
                handleExerciseChange(index, "difficultyLevel", e.target.value)
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
              value={exercise.duration}
              onChange={(e) =>
                handleExerciseChange(index, "duration", e.target.value)
              }
              placeholder="Durée (min)"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Répétitions</label>
            <input
              type="number"
              value={exercise.repetitions}
              onChange={(e) =>
                handleExerciseChange(index, "repetitions", e.target.value)
              }
              placeholder="Répétitions"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Séries</label>
            <input
              type="number"
              value={exercise.sets}
              onChange={(e) =>
                handleExerciseChange(index, "sets", e.target.value)
              }
              placeholder="Séries"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Temps de repos (s)</label>
            <input
              type="number"
              value={exercise.restTime}
              onChange={(e) =>
                handleExerciseChange(index, "restTime", e.target.value)
              }
              placeholder="Temps de repos (s)"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Objectif de l'exercice</label>
            <input
              type="text"
              value={exercise.goal}
              onChange={(e) =>
                handleExerciseChange(index, "goal", e.target.value)
              }
              placeholder="Objectif de l'exercice"
              className="workout-input"
            />
          </div>
          <div className="workout-form-group">
            <label className="workout-label">Mode de progression</label>
            <select
              value={exercise.progressionMode}
              onChange={(e) =>
                handleExerciseChange(index, "progressionMode", e.target.value)
              }
              className="workout-select"
            >
              <option value="">Mode de progression</option>
              <option value="Augmentation du poids">
                Augmentation du poids
              </option>
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
              value={exercise.resourceLink}
              onChange={(e) =>
                handleExerciseChange(index, "resourceLink", e.target.value)
              }
              placeholder="Lien vers des ressources supplémentaires"
              className="workout-input"
            />
          </div>
          <button
            className="workout-button delete"
            onClick={() => handleDeleteExercise(exercise._id)}
          >
            Supprimer
          </button>
        </>
      ) : (
        <>
          <strong>{exercise.name}</strong> - {exercise.type}
          <p>Description : {exercise.description}</p>
          <p>
            Muscles ciblés :{" "}
            {exercise.targetMuscles?.length > 0
              ? exercise.targetMuscles.join(", ")
              : "Non spécifié"}
          </p>
          <p>
            Équipement nécessaire :{" "}
            {exercise.equipment?.length > 0
              ? exercise.equipment.join(", ")
              : "Aucun"}
          </p>
          <p>
            Niveau de difficulté : {exercise.difficultyLevel || "Non spécifié"}
          </p>
          <p>Durée: {exercise.duration} min</p>
          <p>Répétitions: {exercise.repetitions}</p>
          <p>Séries: {exercise.sets}</p>
          {exercise.restTime && (
            <p>Temps de repos: {exercise.restTime} secondes</p>
          )}
          {exercise.goal && <p>Objectif: {exercise.goal}</p>}
          {exercise.progressionMode && (
            <p>Mode de progression : {exercise.progressionMode}</p>
          )}
          {exercise.resourceLink && (
            <p>
              Ressources supplémentaires :{" "}
              <a
                href={exercise.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le lien
              </a>
            </p>
          )}
        </>
      )}
    </li>
  );
};

export default ExerciseItem;
