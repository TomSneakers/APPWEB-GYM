// import { useEffect, useState } from "react";
// import { FetchRequest } from "../services/fetchRequest";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../styles/WorkoutDetails.css";

// const WorkoutDetails = () => {
//   const { clientId, workoutId } = useParams();
//   const [workout, setWorkout] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [newExercise, setNewExercise] = useState({
//     name: "",
//     description: "",
//     type: "",
//     targetMuscles: [],
//     equipment: [],
//     difficultyLevel: "",
//     duration: 0,
//     repetitions: 0,
//     sets: 0,
//     restTime: 0,
//     goal: "",
//     progressionMode: "",
//     resourceLink: "",
//   });

//   useEffect(() => {
//     const fetchWorkoutDetails = async () => {
//       try {
//         const response = await FetchRequest.get(
//           `/api/clients/${clientId}/workouts-coach/${workoutId}`
//         )
//           .withAuthorization()
//           .send();
//         setWorkout(response);
//       } catch (error) {
//         toast.error(
//           "Erreur lors de la récupération des détails de l'entraînement."
//         );
//       }
//     };

//     fetchWorkoutDetails();
//   }, [clientId, workoutId]);

//   const handleExerciseChange = (index, field, value) => {
//     const updatedExercises = workout.exercises.map((exercise, i) =>
//       i === index ? { ...exercise, [field]: value } : exercise
//     );
//     setWorkout({ ...workout, exercises: updatedExercises });
//   };

//   const handleNameChange = (value) => {
//     setWorkout({ ...workout, name: value });
//   };

//   const handleNewExerciseChange = (field, value) => {
//     setNewExercise({ ...newExercise, [field]: value });
//   };

//   const handleAddExercise = async () => {
//     try {
//       const response = await FetchRequest.put(
//         `/api/clients/${clientId}/workouts-coach/${workoutId}/add-exercise`
//       )
//         .withAuthorization()
//         .withBody(newExercise)
//         .send();
//       setWorkout(response);
//       setNewExercise({
//         name: "",
//         description: "",
//         type: "",
//         targetMuscles: [],
//         equipment: [],
//         difficultyLevel: "",
//         duration: 0,
//         repetitions: 0,
//         sets: 0,
//         restTime: 0,
//         goal: "",
//         progressionMode: "",
//         resourceLink: "",
//       });
//       toast.success("Exercice ajouté avec succès!");
//     } catch (error) {
//       toast.error("Erreur lors de l'ajout de l'exercice.");
//     }
//   };

//   const handleDeleteExercise = async (exerciseId) => {
//     try {
//       const response = await FetchRequest.delete(
//         `/api/clients/${clientId}/workouts-coach/${workoutId}/exercises/${exerciseId}`
//       )
//         .withAuthorization()
//         .send();
//       setWorkout(response);
//       toast.success("Exercice supprimé avec succès !");
//     } catch (error) {
//       toast.error("Erreur lors de la suppression de l'exercice.");
//     }
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await FetchRequest.put(
//         `/api/clients/${clientId}/workouts-coach/${workoutId}`
//       )
//         .withAuthorization()
//         .withBody(workout)
//         .send();
//       setWorkout(response);
//       setIsEditing(false);
//       toast.success("Entraînement mis à jour avec succès !");
//     } catch (error) {
//       toast.error("Erreur lors de la mise à jour de l'entraînement.");
//     }
//   };

//   if (!workout) {
//     return <p>Chargement des détails de l'entraînement...</p>;
//   }

//   return (
//     <div className="workout-container">
//       <h2 className="workout-title">Détails de l'entraînement</h2>
//       {isEditing ? (
//         <input
//           type="text"
//           value={workout.name}
//           onChange={(e) => handleNameChange(e.target.value)}
//           placeholder="Nom de l'entraînement"
//           className="workout-input"
//         />
//       ) : (
//         <h3 className="workout-subtitle">{workout.name}</h3>
//       )}
//       <p>Date: {new Date(workout.date).toLocaleDateString()}</p>

//       <h3 className="workout-subtitle">Exercices</h3>
//       <ul className="workout-exercise-list">
//         {workout.exercises.map((exercise, index) => (
//           <li key={exercise._id} className="workout-exercise-item">
//             {isEditing ? (
//               <>
//                 {/* Les champs en mode édition */}
//                 <div className="workout-form-group">
//                   <label className="workout-label">Nom de l'exercice</label>
//                   <input
//                     type="text"
//                     value={exercise.name}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "name", e.target.value)
//                     }
//                     placeholder="Nom de l'exercice"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">
//                     Description de l'exercice
//                   </label>
//                   <textarea
//                     value={exercise.description}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "description", e.target.value)
//                     }
//                     placeholder="Description de l'exercice"
//                     className="workout-textarea"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Type d'exercice</label>
//                   <select
//                     value={exercise.type}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "type", e.target.value)
//                     }
//                     className="workout-select"
//                   >
//                     <option value="">Sélectionner le type d'exercice</option>
//                     <option value="Cardio">Cardio</option>
//                     <option value="Renforcement musculaire">
//                       Renforcement musculaire
//                     </option>
//                     <option value="Étirement">Étirement</option>
//                     <option value="Mobilité">Mobilité</option>
//                   </select>
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Muscles ciblés</label>
//                   <select
//                     multiple
//                     value={exercise.targetMuscles}
//                     onChange={(e) =>
//                       handleExerciseChange(
//                         index,
//                         "targetMuscles",
//                         Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         )
//                       )
//                     }
//                     className="workout-select"
//                   >
//                     <option value="Pectoraux">Pectoraux</option>
//                     <option value="Biceps">Biceps</option>
//                     <option value="Triceps">Triceps</option>
//                     <option value="Jambes">Jambes</option>
//                     <option value="Abdominaux">Abdominaux</option>
//                     <option value="Dos">Dos</option>
//                   </select>
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Équipement nécessaire</label>
//                   <select
//                     multiple
//                     value={exercise.equipment}
//                     onChange={(e) =>
//                       handleExerciseChange(
//                         index,
//                         "equipment",
//                         Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         )
//                       )
//                     }
//                     className="workout-select"
//                   >
//                     <option value="Aucun">Aucun</option>
//                     <option value="Haltères">Haltères</option>
//                     <option value="Barres">Barres</option>
//                     <option value="Kettlebell">Kettlebell</option>
//                     <option value="Élastiques">Élastiques</option>
//                   </select>
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Niveau de difficulté</label>
//                   <select
//                     value={exercise.difficultyLevel}
//                     onChange={(e) =>
//                       handleExerciseChange(
//                         index,
//                         "difficultyLevel",
//                         e.target.value
//                       )
//                     }
//                     className="workout-select"
//                   >
//                     <option value="">Niveau de difficulté</option>
//                     <option value="Débutant">Débutant</option>
//                     <option value="Intermédiaire">Intermédiaire</option>
//                     <option value="Avancé">Avancé</option>
//                   </select>
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Durée (min)</label>
//                   <input
//                     type="number"
//                     value={exercise.duration}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "duration", e.target.value)
//                     }
//                     placeholder="Durée (min)"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Répétitions</label>
//                   <input
//                     type="number"
//                     value={exercise.repetitions}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "repetitions", e.target.value)
//                     }
//                     placeholder="Répétitions"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Séries</label>
//                   <input
//                     type="number"
//                     value={exercise.sets}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "sets", e.target.value)
//                     }
//                     placeholder="Séries"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Temps de repos (s)</label>
//                   <input
//                     type="number"
//                     value={exercise.restTime}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "restTime", e.target.value)
//                     }
//                     placeholder="Temps de repos (s)"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">
//                     Objectif de l'exercice
//                   </label>
//                   <input
//                     type="text"
//                     value={exercise.goal}
//                     onChange={(e) =>
//                       handleExerciseChange(index, "goal", e.target.value)
//                     }
//                     placeholder="Objectif de l'exercice"
//                     className="workout-input"
//                   />
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">Mode de progression</label>
//                   <select
//                     value={exercise.progressionMode}
//                     onChange={(e) =>
//                       handleExerciseChange(
//                         index,
//                         "progressionMode",
//                         e.target.value
//                       )
//                     }
//                     className="workout-select"
//                   >
//                     <option value="">Mode de progression</option>
//                     <option value="Augmentation du poids">
//                       Augmentation du poids
//                     </option>
//                     <option value="Augmentation du nombre de répétitions">
//                       Augmentation du nombre de répétitions
//                     </option>
//                     <option value="Réduction du temps de repos">
//                       Réduction du temps de repos
//                     </option>
//                   </select>
//                 </div>
//                 <div className="workout-form-group">
//                   <label className="workout-label">
//                     Lien vers des ressources supplémentaires
//                   </label>
//                   <input
//                     type="url"
//                     value={exercise.resourceLink}
//                     onChange={(e) =>
//                       handleExerciseChange(
//                         index,
//                         "resourceLink",
//                         e.target.value
//                       )
//                     }
//                     placeholder="Lien vers des ressources supplémentaires"
//                     className="workout-input"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 {/* Affichage des champs lorsque non en édition */}
//                 <strong>{exercise.name}</strong> - {exercise.type}
//                 <p>Description : {exercise.description}</p>
//                 <p>
//                   Muscles ciblés :{" "}
//                   {exercise.targetMuscles?.length > 0
//                     ? exercise.targetMuscles.join(", ")
//                     : "Non spécifié"}
//                 </p>
//                 <p>
//                   Équipement nécessaire :{" "}
//                   {exercise.equipment?.length > 0
//                     ? exercise.equipment.join(", ")
//                     : "Aucun"}
//                 </p>
//                 <p>
//                   Niveau de difficulté :{" "}
//                   {exercise.difficultyLevel || "Non spécifié"}
//                 </p>
//                 <p>Durée: {exercise.duration} min</p>
//                 <p>Répétitions: {exercise.repetitions}</p>
//                 <p>Séries: {exercise.sets}</p>
//                 {exercise.restTime && (
//                   <p>Temps de repos: {exercise.restTime} secondes</p>
//                 )}
//                 {exercise.goal && <p>Objectif: {exercise.goal}</p>}
//                 {exercise.progressionMode && (
//                   <p>Mode de progression : {exercise.progressionMode}</p>
//                 )}
//                 {exercise.resourceLink && (
//                   <p>
//                     Ressources supplémentaires :{" "}
//                     <a
//                       href={exercise.resourceLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Voir le lien
//                     </a>
//                   </p>
//                 )}
//               </>
//             )}
//             {isEditing && (
//               <button
//                 className="workout-button delete"
//                 onClick={() => handleDeleteExercise(exercise._id)}
//               >
//                 Supprimer
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>

//       <h5 className="workout-subtitle">Ajouter un nouvel exercice</h5>
//       <div className="workout-form-group">
//         <label className="workout-label">Nom de l'exercice</label>
//         <input
//           type="text"
//           value={newExercise.name}
//           onChange={(e) => handleNewExerciseChange("name", e.target.value)}
//           placeholder="Nom de l'exercice"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Description de l'exercice</label>
//         <textarea
//           value={newExercise.description}
//           onChange={(e) =>
//             handleNewExerciseChange("description", e.target.value)
//           }
//           placeholder="Description de l'exercice"
//           className="workout-textarea"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Type d'exercice</label>
//         <select
//           value={newExercise.type}
//           onChange={(e) => handleNewExerciseChange("type", e.target.value)}
//           className="workout-select"
//         >
//           <option value="">Sélectionner le type d'exercice</option>
//           <option value="Cardio">Cardio</option>
//           <option value="Renforcement musculaire">
//             Renforcement musculaire
//           </option>
//           <option value="Étirement">Étirement</option>
//           <option value="Mobilité">Mobilité</option>
//         </select>
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Muscles ciblés</label>
//         <select
//           multiple
//           value={newExercise.targetMuscles}
//           onChange={(e) =>
//             handleNewExerciseChange(
//               "targetMuscles",
//               Array.from(e.target.selectedOptions, (option) => option.value)
//             )
//           }
//           className="workout-select"
//         >
//           <option value="Pectoraux">Pectoraux</option>
//           <option value="Biceps">Biceps</option>
//           <option value="Triceps">Triceps</option>
//           <option value="Jambes">Jambes</option>
//           <option value="Abdominaux">Abdominaux</option>
//           <option value="Dos">Dos</option>
//         </select>
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Équipement nécessaire</label>
//         <select
//           multiple
//           value={newExercise.equipment}
//           onChange={(e) =>
//             handleNewExerciseChange(
//               "equipment",
//               Array.from(e.target.selectedOptions, (option) => option.value)
//             )
//           }
//           className="workout-select"
//         >
//           <option value="Aucun">Aucun</option>
//           <option value="Haltères">Haltères</option>
//           <option value="Barres">Barres</option>
//           <option value="Kettlebell">Kettlebell</option>
//           <option value="Élastiques">Élastiques</option>
//         </select>
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Niveau de difficulté</label>
//         <select
//           value={newExercise.difficultyLevel}
//           onChange={(e) =>
//             handleNewExerciseChange("difficultyLevel", e.target.value)
//           }
//           className="workout-select"
//         >
//           <option value="">Niveau de difficulté</option>
//           <option value="Débutant">Débutant</option>
//           <option value="Intermédiaire">Intermédiaire</option>
//           <option value="Avancé">Avancé</option>
//         </select>
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Durée (min)</label>
//         <input
//           type="number"
//           value={newExercise.duration}
//           onChange={(e) => handleNewExerciseChange("duration", e.target.value)}
//           placeholder="Durée (min)"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Répétitions</label>
//         <input
//           type="number"
//           value={newExercise.repetitions}
//           onChange={(e) =>
//             handleNewExerciseChange("repetitions", e.target.value)
//           }
//           placeholder="Répétitions"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Séries</label>
//         <input
//           type="number"
//           value={newExercise.sets}
//           onChange={(e) => handleNewExerciseChange("sets", e.target.value)}
//           placeholder="Séries"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Temps de repos (s)</label>
//         <input
//           type="number"
//           value={newExercise.restTime}
//           onChange={(e) => handleNewExerciseChange("restTime", e.target.value)}
//           placeholder="Temps de repos (s)"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Objectif de l'exercice</label>
//         <input
//           type="text"
//           value={newExercise.goal}
//           onChange={(e) => handleNewExerciseChange("goal", e.target.value)}
//           placeholder="Objectif de l'exercice"
//           className="workout-input"
//         />
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">Mode de progression</label>
//         <select
//           value={newExercise.progressionMode}
//           onChange={(e) =>
//             handleNewExerciseChange("progressionMode", e.target.value)
//           }
//           className="workout-select"
//         >
//           <option value="">Mode de progression</option>
//           <option value="Augmentation du poids">Augmentation du poids</option>
//           <option value="Augmentation du nombre de répétitions">
//             Augmentation du nombre de répétitions
//           </option>
//           <option value="Réduction du temps de repos">
//             Réduction du temps de repos
//           </option>
//         </select>
//       </div>
//       <div className="workout-form-group">
//         <label className="workout-label">
//           Lien vers des ressources supplémentaires
//         </label>
//         <input
//           type="url"
//           value={newExercise.resourceLink}
//           onChange={(e) =>
//             handleNewExerciseChange("resourceLink", e.target.value)
//           }
//           placeholder="Lien vers des ressources supplémentaires"
//           className="workout-input"
//         />
//       </div>
//       <button className="workout-button" onClick={handleAddExercise}>
//         Ajouter l'exercice
//       </button>

//       <button
//         className="workout-button"
//         onClick={() => setIsEditing(!isEditing)}
//       >
//         {isEditing ? "Annuler" : "Modifier"}
//       </button>
//       {isEditing && (
//         <button className="workout-button" onClick={handleSaveChanges}>
//           Sauvegarder les modifications
//         </button>
//       )}
//     </div>
//   );
// };

// export default WorkoutDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchRequest } from "../services/fetchRequest";
import ExerciseList from "./Exercices/ExerciseList";
import NewExerciseForm from "./Exercices/NewExerciseForm";
import "../styles/WorkoutDetails.css";

const WorkoutDetails = () => {
  const { clientId, workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await FetchRequest.get(
          `/api/clients/${clientId}/workouts-coach/${workoutId}`
        )
          .withAuthorization()
          .send();
        setWorkout(response);
      } catch (error) {
        toast.error(
          "Erreur lors de la récupération des détails de l'entraînement."
        );
      }
    };

    fetchWorkoutDetails();
  }, [clientId, workoutId]);

  const handleSaveChanges = async () => {
    try {
      const response = await FetchRequest.put(
        `/api/clients/${clientId}/workouts-coach/${workoutId}`
      )
        .withAuthorization()
        .withBody(workout)
        .send();
      setWorkout(response);
      setIsEditing(false);
      toast.success("Entraînement mis à jour avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'entraînement.");
    }
  };

  const handleNameChange = (value) => {
    setWorkout({ ...workout, name: value });
  };

  if (!workout) {
    return <p>Chargement des détails de l'entraînement...</p>;
  }

  return (
    <div className="workout-container">
      <h2 className="workout-title">Détails de l'entraînement</h2>
      {isEditing ? (
        <input
          type="text"
          value={workout.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Nom de l'entraînement"
          className="workout-input"
        />
      ) : (
        <h3 className="workout-subtitle">{workout.name}</h3>
      )}
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>

      <ExerciseList
        exercises={workout.exercises}
        isEditing={isEditing}
        setWorkout={setWorkout}
        workout={workout}
        clientId={clientId}
        workoutId={workoutId}
      />

      <NewExerciseForm
        setWorkout={setWorkout}
        clientId={clientId}
        workoutId={workoutId}
      />

      <button
        className="workout-button"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Annuler" : "Modifier"}
      </button>
      {isEditing && (
        <button className="workout-button" onClick={handleSaveChanges}>
          Sauvegarder les modifications
        </button>
      )}
    </div>
  );
};

export default WorkoutDetails;
