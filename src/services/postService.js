// postService.js
import axios from 'axios';

// The API URL is different depending on the VM external IP address, make sure to change it
const API_URL = 'http://34.42.65.92/api/posts/'; 

const getPosts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { 'auth-token': token }
    });
    return response.data;
};

const getPostsByTopic = async (topic, token) => {
    const response = await axios.get(`${API_URL}${topic}`, {
        headers: { 'auth-token': token }
    });
    return response.data;
};

const createPost = async (postData, token) => {
    try {
        const response = await axios.post(API_URL, postData, {
            headers: { 'auth-token': token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
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

// Function to handle adding a comment to a post

/**
 * Adds a comment to a post.
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} comment - The comment to add.
 * @param {string} token - The authentication token.
 * @returns {Promise} - A promise that resolves to the response data if successful.
 * @throws {Error} - If an error occurs while adding the comment.
 */
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



export { getPosts, likePost, dislikePost, addComment, createPost, getPostsByTopic };
// You need to provide more details about the missing relevant information.
// Please specify what information is missing and where it should be added.
