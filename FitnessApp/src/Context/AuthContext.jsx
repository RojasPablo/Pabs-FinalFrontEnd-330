import React, { createContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  signup as apiSignup,
  updatePassword as apiUpdatePassword,
} from "../api/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);
    }
    setLoading(false); // Set loading to false after checking the token
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await apiLogin({ email, password });
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);
      localStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error.message || "Failed to login");
    }
  };

  const handleSignup = async ({ username, email, password }) => {
    try {
      const { token } = await apiSignup({ username, email, password });
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);
      localStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error.message || "Failed to signup");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const handlePasswordUpdate = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      await apiUpdatePassword(token, { currentPassword, newPassword });
      alert("Password updated successfully");
    } catch (error) {
      alert("Failed to update password: " + error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleSignup,
        handleLogout,
        handlePasswordUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
