import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { createWorkoutLog, updateWorkoutLog } from "../api/workoutApi";

const WorkoutForm = ({
  onWorkoutCreated,
  existingWorkout,
  onWorkoutUpdated,
}) => {
  const [exercise, setExercise] = useState(existingWorkout?.exercise || "");
  const [sets, setSets] = useState(existingWorkout?.sets || "");
  const [reps, setReps] = useState(existingWorkout?.reps || "");
  const [weight, setWeight] = useState(existingWorkout?.weight || "");
  const [timeElapsed, setTimeElapsed] = useState(
    existingWorkout?.timeElapsed || ""
  );
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (existingWorkout) {
      setExercise(existingWorkout.exercise);
      setSets(existingWorkout.sets);
      setReps(existingWorkout.reps);
      setWeight(existingWorkout.weight);
      setTimeElapsed(existingWorkout.timeElapsed);
    }
  }, [existingWorkout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const workoutData = { exercise, sets, reps, weight, timeElapsed };
      if (existingWorkout) {
        await updateWorkoutLog(existingWorkout._id, workoutData, token);
        onWorkoutUpdated();
      } else {
        await createWorkoutLog(workoutData, token);
        onWorkoutCreated();
      }
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
      setTimeElapsed("");
    } catch (error) {
      setError("Failed to save workout log");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Time Elapsed (min.)"
        value={timeElapsed}
        onChange={(e) => setTimeElapsed(e.target.value)}
        required
      />
      <button type="submit">
        {existingWorkout ? "Update Workout Log" : "Create Workout Log"}
      </button>
    </form>
  );
};

export default WorkoutForm;
