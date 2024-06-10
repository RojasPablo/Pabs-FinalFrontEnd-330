import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { createMilestone, updateMilestone } from "../api/milestoneApi";

const MilestoneForm = ({
  onMilestoneCreated,
  existingMilestone,
  onMilestoneUpdated,
}) => {
  const [milestone, setMilestone] = useState(
    existingMilestone?.milestone || ""
  );
  const [exercise, setExercise] = useState(existingMilestone?.exercise || "");
  const [timeElapsed, setTimeElapsed] = useState(
    existingMilestone?.timeElapsed || ""
  );
  const [points, setPoints] = useState(existingMilestone?.points || "");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (existingMilestone) {
      setMilestone(existingMilestone.milestone);
      setExercise(existingMilestone.exercise);
      setTimeElapsed(existingMilestone.timeElapsed);
      setPoints(existingMilestone.points);
    }
  }, [existingMilestone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const milestoneData = { milestone, exercise, timeElapsed, points };
      if (existingMilestone) {
        await updateMilestone(existingMilestone._id, milestoneData, token);
        onMilestoneUpdated();
      } else {
        await createMilestone(milestoneData, token);
        onMilestoneCreated();
      }
      setMilestone("");
      setExercise("");
      setTimeElapsed("");
      setPoints("");
    } catch (error) {
      setError("Failed to save milestone");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Milestone"
        value={milestone}
        onChange={(e) => setMilestone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Time Required (min.)"
        value={timeElapsed}
        onChange={(e) => setTimeElapsed(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        required
      />
      <button type="submit">
        {existingMilestone ? "Update Milestone" : "Create Milestone"}
      </button>
    </form>
  );
};

export default MilestoneForm;
