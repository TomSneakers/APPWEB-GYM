import ExerciseItem from "./ExerciseItem";
import { FetchRequest } from "../../services/fetchRequest";
import { toast } from "react-toastify";

const ExerciseList = ({
  exercises,
  isEditing,
  setWorkout,
  workout,
  clientId,
  workoutId,
}) => {
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = workout.exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      const response = await FetchRequest.delete(
        `/api/clients/${clientId}/workouts-coach/${workoutId}/exercises/${exerciseId}`
      )
        .withAuthorization()
        .send();
      setWorkout(response);
      toast.success("Exercice supprimé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'exercice.");
    }
  };

  return (
    <ul className="workout-exercise-list">
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise._id}
          exercise={exercise}
          index={index}
          isEditing={isEditing}
          handleExerciseChange={handleExerciseChange}
          handleDeleteExercise={handleDeleteExercise}
        />
      ))}
    </ul>
  );
};

export default ExerciseList;
