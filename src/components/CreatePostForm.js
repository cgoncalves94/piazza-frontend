import React, { useState } from 'react';
import { createPost } from '../services/postService';
import '../styles/CreatePostForm.css';

const CreatePostForm = ({ user, onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('Politics'); // Default to 'Politics'
    const [expirationTime, setExpirationTime] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!title || !body || !topic || !expirationTime) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const clearForm = () => {
        setTitle('');
        setBody('');
        setTopic('Politics');
        setExpirationTime('');
    };

    const handlePostCreation = async (postData) => {
        try {
            const newPost = await createPost(postData, user.token);
            onPostCreated(newPost); // Parent component will handle the new post
            clearForm();
        } catch (err) {
            setError(err.response?.data || 'An error occurred while creating the post.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        const expirationMinutes = parseInt(expirationTime, 10);
        const postData = {
            title,
            body,
            topic,
            expirationTime: expirationMinutes,
        };

        handlePostCreation(postData);
    };

    return (
        <div className="create-post-form-container">
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="create-post-form-header">
                    <h2>Create New Post</h2>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    required
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Post content"
                    required
                />
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>z
                    <option value="Politics">Politics</option>
                    <option value="Health">Health</option>
                    <option value="Sport">Sport</option>
                    <option value="Tech">Tech</option>
                </select>
                <input
                    type="number"
                    value={expirationTime}
                    onChange={(e) => setExpirationTime(e.target.value)}
                    placeholder="Expiration time in minutes"
                    required
                />
                <button type="submit" className="create-post-submit-btn">
                    Create Post
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CreatePostForm;
