import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getAllMilestones = async (token) => {
  try {
    const response = await api.get("/milestones", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve milestones");
  }
};

export const createMilestone = async (milestoneData, token) => {
  try {
    const response = await api.post("/milestones", milestoneData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create milestone");
  }
};

export const updateMilestone = async (milestoneId, milestoneData, token) => {
  try {
    const response = await api.put(`/milestones/${milestoneId}`, milestoneData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update milestone");
  }
};

export const deleteMilestone = async (milestoneId, token) => {
  try {
    const response = await api.delete(`/milestones/${milestoneId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete milestone");
  }
};

export const markMilestoneAsCompleted = async (milestoneId, token) => {
  try {
    const response = await api.post(`/milestones/${milestoneId}/complete`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to mark milestone as completed");
  }
};