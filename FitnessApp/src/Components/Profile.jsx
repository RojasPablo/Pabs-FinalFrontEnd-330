import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user, loading, handlePasswordUpdate } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      handlePasswordUpdate(currentPassword, newPassword);
    } else {
      alert("New passwords do not match");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <h2>Goodbye!</h2>;
  }

  return (
    <div className="profile-container">
      <h2>
        <span>Welcome</span> {user.username}!
      </h2>
      <h4>
        <span>Points Acquired:</span> {user.points}
      </h4>
      <h4>
        <span>Athlete Level:</span> {user.level}
      </h4>
      <h4>Update Password Below</h4>
      <form onSubmit={handleSubmit} className="password-update-form">
        <div>
          <input
            placeholder="Current Password"
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Confirm New Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="update" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
