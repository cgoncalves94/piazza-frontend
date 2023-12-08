import axios from 'axios';

const API_URL = 'http://35.239.57.95/api/users/login';

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, { email, password });
        if (response.data.token) {
            // Save the logged-in user's token
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export { login };
