import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});


export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error("failed to signup");
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error("failed to Login");
  }
};

export const updatePassword = async (token, password) => {
  try {
    const response = await api.put("/auth/password", { password }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update password");
  }
};
export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve user profile");
  }
};