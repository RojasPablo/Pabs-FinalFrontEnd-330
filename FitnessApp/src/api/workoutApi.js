import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export const createWorkoutLog = async (workoutData, token) => {
    try {
        const response = await api.post('/workouts/', workoutData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Failed to create workout log';
    }
};


export const getAllWorkoutLogs = async (token, query = "") => {
  try {
    const response = await api.get('/workouts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve workout logs', error);
    throw new Error('Failed to retrieve workout logs');
  }
};

export const getWorkoutLogById = async (workoutId, token) => {
    try {
        const response = await api.get(`/workouts/${workoutId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Failed to retrieve workout log';
    }
};

export const updateWorkoutLog = async (workoutId, workoutData, token) => {
    try {
        const response = await api.put(`/workouts/${workoutId}`, workoutData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Failed to update workout log';
    }
};

export const deleteWorkoutLog = async (workoutId, token) => {
    try {
        const response = await api.delete(`/workouts/${workoutId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Failed to delete workout log';
    }
};

export const searchWorkouts = async (query, token) => {
    try {
        const response = await api.get('/workouts/search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to search workouts', error);
        throw new Error('Failed to search workouts');
    }
};
