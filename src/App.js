import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import PostsGrid from './components/PostsGrid';
import CustomModal from './components/CustomModal';
import { login } from './services/authService';
import { getPosts, likePost, dislikePost } from './services/postService';

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  // State variables
  const [user, setUser] = useState(null); // User state
  const [posts, setPosts] = useState([]); // Posts state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(''); // Modal message state
  const [loginError, setLoginError] = useState(''); // Login error state

  // Check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // Fetch posts when user is logged in
  useEffect(() => {
    if (user && user.token) {
      getPosts(user.token)
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [user]);

  // Check posts expiration periodically
  useEffect(() => {
    const intervalId = setInterval(checkPostsExpiration, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response['auth-token'];
      if (token) {
        const loggedInUser = { email, token };
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        setLoginError('');
        console.log('Login successful', loggedInUser);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(`Login failed: ${error.response.data.message}`);
      } else {
        setLoginError('Login failed: An unexpected error occurred');
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setPosts([]);
  };

  const handleLike = async (postId) => {
    try {
      // Make the API call to like the post and get the updated data
      const response = await likePost(postId, user.token);
      // Update the state with the new like count returned from the server response
      if (response && typeof response.likes === 'number') {
        setPosts(currentPosts => {
          const updatedPosts = currentPosts.map(post => 
            post._id === postId ? { ...post, likes: response.likes } : post
          );
          return updatedPosts;
        });
      } 
    } catch (error) {
      // Log the error or set an error state to display
      console.error('Failed to like the post:', error);
  
      // Set an appropriate message based on the error response
      if (error.response && error.response.data) {
        setShowModal(true);
        setModalMessage(error.response.data);
      }
    }
  };
  

// Handle dislike post - similar changes to handleLike
const handleDislike = async (postId) => {
  try {
    // Make the API call to dislike the post and get the updated data
    const response = await dislikePost(postId, user.token);
    // Update the state with the new like count returned from the server response
    if (response && typeof response.dislikes === 'number') {
      setPosts(currentPosts => {
        const updatedPosts = currentPosts.map(post => 
          post._id === postId ? { ...post, dislikes: response.dislikes } : post
        );
        return updatedPosts;
      });
    }  
  } catch (error) {
    // Log the error or set an error state to display
    console.error('Failed to dislike the post:', error);

    // Set an appropriate message based on the error response
    if (error.response && error.response.data) {
      setShowModal(true);
      setModalMessage(error.response.data);
    }
  }
};


  // Check posts expiration
  const checkPostsExpiration = () => {
    const now = new Date();
    setPosts(currentPosts =>
      currentPosts.map(post => {
        const expirationTime = new Date(post.expirationTime);
        if (expirationTime < now && post.status !== 'Expired') {
          return { ...post, status: 'Expired' };
        }
        return post;
      })
    );
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div>
      {user ? (
        // User is logged in
      <>
        <div className="welcome-logout-container">
          <span className="welcome-message">Welcome, {user.email}!</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <PostsGrid posts={posts} onLike={handleLike} onDislike={handleDislike} />
      </>
      ) : (
        // User is not logged in
        <LoginForm onLogin={handleLogin} />
      )}
      {loginError && <div className="error-message">{loginError}</div>}
      {showModal && <CustomModal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default App;


