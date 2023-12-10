// postService.js
import axios from 'axios';

// The API URL is different depending on the VM external IP address, make sure to change it
const API_URL = 'http://34.42.65.92/api/posts/'; 

// Function to handle getting all posts
const getPosts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { 'auth-token': token }
    });
    return response.data;
};

// Function to handle getting posts by topic
const getPostsByTopic = async (topic, token) => {
    const response = await axios.get(`${API_URL}${topic}`, {
        headers: { 'auth-token': token }
    });
    return response.data;
};

// Function to handle creating a new post
const createPost = async (postData, token) => {
    const response = await axios.post(API_URL, postData, {
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

/// Function to handle adding a comment to a post
const addComment = async (postId, comment, token) => {
    try {
        const response = await axios.post(`${API_URL}${postId}/comment`, { comment }, {
            headers: { 'auth-token': token }
        });
        return response.data; // Return the successful response data
    } catch (error) {
        // Handle HTTP errors from the server as well as network errors
        console.error('Add comment error:', error);
        throw error; // Rethrow the error to be handled where the function is called
    }
};


// Export the functions
export { getPosts, likePost, dislikePost, addComment, createPost, getPostsByTopic };

