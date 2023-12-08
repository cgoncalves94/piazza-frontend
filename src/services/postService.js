// postService.js
import axios from 'axios';


const API_URL = 'http://35.239.57.95/api/posts/'; // Update with your actual API endpoint

const getPosts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { 'auth-token': token }
    });
    return response.data;
};

// Function to handle liking a post
const likePost = async (postId, token) => {
    const response = await axios.put(`${API_URL}${postId}/like`, {}, {
        headers: { 'auth-token': token }
    });
    return response.data; // Return the updated like count or the full post object
};

// Function to handle disliking a post
const dislikePost = async (postId, token) => {
    const response = await axios.put(`${API_URL}${postId}/dislike`, {}, {
        headers: { 'auth-token': token }
    });
    return response.data; // Return the updated dislike count or the full post object
};



export { getPosts, likePost, dislikePost };
