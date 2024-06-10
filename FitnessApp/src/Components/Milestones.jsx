import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  getAllMilestones,
  markMilestoneAsCompleted,
  updateMilestone,
  deleteMilestone,
} from "../api/milestoneApi";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import MilestoneForm from "./MilestoneForm";

const Milestone = () => {
  const [milestones, setMilestones] = useState([]);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user, loading, setUser } = useContext(AuthContext);

  const fetchMilestones = async () => {
    if (user) {
      const token = localStorage.getItem("token");
      try {
        const { milestones, completedMilestones } = await getAllMilestones(
          token
        );
        setMilestones(Array.isArray(milestones) ? milestones : []);
        setCompletedMilestones(
          Array.isArray(completedMilestones) ? completedMilestones : []
        );
      } catch (error) {
        console.error("Failed to fetch milestones", error);
      }
    }
  };

  const handleComplete = async (milestoneId) => {
    if (user) {
      const token = localStorage.getItem("token");
      try {
        const { user: updatedUser } = await markMilestoneAsCompleted(
          milestoneId,
          token
        );
        setUser(updatedUser);
        fetchMilestones(); // Refresh milestones after updating
      } catch (error) {
        console.error("Failed to update milestone", error);
      }
    }
  };

  const handleDelete = async (milestoneId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteMilestone(milestoneId, token);
      fetchMilestones(); // Refresh milestones after deleting
    } catch (error) {
      console.error("Failed to delete milestone", error);
    }
  };

  const handleEdit = (milestone) => {
    setEditMode(milestone);
    setShowCreateForm(false);
  };

  const handleCreate = () => {
    setEditMode(null);
    setShowCreateForm(true);
  };

  const handleUpdate = () => {
    setEditMode(null);
    setShowCreateForm(false);
    fetchMilestones(); // Refresh milestones after updating
  };

  const handleCreateMilestone = async () => {
    fetchMilestones();
    setShowCreateForm(false);
  };

  useEffect(() => {
    fetchMilestones();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <>
        <h4>Login to view your Milestones</h4>
      </>
    );
  }

  // Filter out completed milestones from the milestones list
  const incompleteMilestones = milestones.filter(
    (milestone) => !completedMilestones.some((cm) => cm._id === milestone._id)
  );

  return (
    <div>
      <h2 className="h2-milestones">Milestones</h2>
      {user.roles && user.roles.includes("admin") && (
        <>
          <button onClick={handleCreate}>Create New Milestone</button>
          {showCreateForm && (
            <MilestoneForm
              onMilestoneCreated={handleCreateMilestone}
              onMilestoneUpdated={handleUpdate}
            />
          )}
        </>
      )}
      {editMode && (
        <MilestoneForm
          existingMilestone={editMode}
          onMilestoneUpdated={handleUpdate}
        />
      )}
      <ul className="workout-containers">
        {incompleteMilestones.map((milestone) => (
          <li key={milestone._id} className="milestone-item">
            <div className="milestone-item-content">
              <div>
                <span>Milestone: </span>
                {milestone.milestone}
              </div>
              <br />
              <div>
                <span>Exercise: </span>
                {milestone.exercise}
              </div>
              <div>
                <span>Time Required: </span>
                {milestone.timeElapsed} minutes
              </div>
              <div>
                <span>Completed: </span>
                Not Yet
              </div>
              <div>
                <span>Points: </span>
                {milestone.points}
              </div>
            </div>
            <div className="completed-button">
              <button onClick={() => handleComplete(milestone._id)}>
                Mark as Completed
              </button>
            </div>
            {user.roles && user.roles.includes("admin") && (
              <div className="button-container">
                <button
                  className="update-button"
                  onClick={() => handleEdit(milestone)}
                >
                  <div className="icon">
                    <CiEdit />
                  </div>
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(milestone._id)}
                >
                  <div className="icon">
                    <MdDeleteForever />
                  </div>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Completed Milestones</h2>
      <ul className="workout-containers">
        {completedMilestones.map((milestone) => (
          <li key={milestone._id} className="milestone-item">
            <div className="milestone-item-content">
              <div>
                <span>Milestone: </span>
                {milestone.milestone}
              </div>
              <br />
              <div>
                <span>Exercise: </span>
                {milestone.exercise}
              </div>
              <div>
                <span>Time Required: </span>
                {milestone.timeElapsed}
              </div>
              <div>
                <span>Status: </span>
                Completed
              </div>
              <div>
                <span>Points Gained: </span>
                {milestone.points}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Milestone;
