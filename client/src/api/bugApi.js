import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bugs';

const bugApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const getBugs = async () => {
    try {
        const response = await bugApi.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching bugs:', error.response?.data || error.message);
        throw error;
    }
};

const getBugById = async (id) => {
    try {
        const response = await bugApi.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching bug ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

const createBug = async (bugData) => {
    try {
        const response = await bugApi.post('/', bugData);
        return response.data;
    } catch (error) {
        console.error('Error creating bug:', error.response?.data || error.message);
        throw error;
    }
};

const updateBug = async (id, bugData) => {
    try {
        const response = await bugApi.put(`/${id}`, bugData);
        return response.data;
    } catch (error) {
        console.error(`Error updating bug ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

const deleteBug = async (id) => {
    try {
        await bugApi.delete(`/${id}`);
        return { success: true };
    } catch (error) {
        console.error(`Error deleting bug ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export { getBugs, getBugById, createBug, updateBug, deleteBug };