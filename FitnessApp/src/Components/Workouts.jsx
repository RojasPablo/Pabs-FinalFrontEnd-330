import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getAllWorkoutLogs, deleteWorkoutLog } from "../api/workoutApi";
import WorkoutForm from "./WorkoutForm";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading } = useContext(AuthContext);

  const fetchWorkouts = async (query = "") => {
    if (user) {
      const token = localStorage.getItem("token");
      try {
        const workoutLogs = await getAllWorkoutLogs(token, query);
        setWorkouts(Array.isArray(workoutLogs) ? workoutLogs : []);
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }
    }
  };

  const handleDelete = async (workoutId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteWorkoutLog(workoutId, token);
      fetchWorkouts(); // Refresh the list of workouts
    } catch (error) {
      console.error("Failed to delete workout", error);
    }
  };

  const handleEdit = (workout) => {
    setEditMode(workout);
  };

  const handleUpdate = () => {
    setEditMode(null);
    fetchWorkouts(); // Refresh the list of workouts
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchWorkouts(searchQuery); // Perform search with the query
  };

  useEffect(() => {
    fetchWorkouts();
  }, [user]);
  if (loading) {
    return <div>Loading...</div>; // Display loading message while checking the token
  }

  if (!user) {
    return (
      <>
        <h4>Login to view your Workouts</h4>
      </>
    );
  }
  return (
    <div>
      <h2 className="workouts-h2">Log a Workout</h2>
      {editMode ? (
        <WorkoutForm
          existingWorkout={editMode}
          onWorkoutUpdated={handleUpdate}
        />
      ) : (
        <WorkoutForm onWorkoutCreated={() => fetchWorkouts()} />
      )}

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search workouts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Workout Logs</h2>
      {workouts.length > 0 ? (
        <ul className="workout-containers">
          {workouts.slice(0, 12).map((workout) => (
            <li key={workout._id} className="workout-item">
              <div className="workout-item-content">
                <div>
                  <span>Exercise: </span> {workout.exercise}
                </div>
                {workout.sets && (
                  <div>
                    <span>Sets: </span> {workout.sets}
                  </div>
                )}
                {workout.reps && (
                  <div>
                    <span>Reps: </span> {workout.reps}
                  </div>
                )}
                {workout.weight && (
                  <div>
                    <span>Weight: </span> {workout.weight} lbs
                  </div>
                )}
                <div>
                  <span>Time Elapsed: </span>
                  {workout.timeElapsed} minutes
                </div>
                <div>
                  <span>Date Performed:</span>{" "}
                  {new Date(workout.datePerformed).toLocaleDateString()}
                </div>
              </div>
              <div className="button-container">
                <button
                  className="update-button"
                  onClick={() => handleEdit(workout)}
                >
                  <div className="icon">
                    <CiEdit />
                  </div>
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(workout._id)}
                >
                  <div className="icon">
                    <MdDeleteForever />
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found</p>
      )}
    </div>
  );
};

export default Workouts;
