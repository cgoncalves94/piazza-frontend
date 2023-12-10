import axios from 'axios';

// The API URL is different depending on the VM external IP address, make sure to change it
const API_URL = 'http://35.222.59.206/api/users/login';

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

export default login ;
