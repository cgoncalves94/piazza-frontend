// add imports
import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import PostsGrid from './components/PostsGrid';
import CommentModal from './components/CommentModal';
import CustomModal from './components/CustomModal';
import login from './services/authService';
import CreatePostForm from './components/CreatePostForm';
import { getPosts, likePost, dislikePost, addComment, getPostsByTopic } from './services/postService';

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
  const [showCommentModals, setShowCommentModals] = useState({}); // Comment modals visibility state
  const [commentsVisible, setCommentsVisible] = useState({}); // Comments visibility state
  const [isCreatePostFormVisible, setIsCreatePostFormVisible] = useState(false); // CreatePostForm visibility state
  const [selectedTopic, setSelectedTopic] = useState('All'); // Default to 'All' to show all topics



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

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response['auth-token'];
      const username = response['username']
      if (token) {
        const loggedInUser = { email, token, username };
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        setLoginError('');
        console.log('Login successful', loggedInUser);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      setLoginError(`Login failed: ${errorMessage}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setPosts([]);
  };

  // This function will handle the common post-interaction logic for like and dislike
  const handlePostInteraction = async (interactionType, postId) => {
    try {
      // Perform the like or dislike interaction
      const interactionResponse = await (interactionType === 'like' 
        ? likePost(postId, user.token) 
        : dislikePost(postId, user.token));

      // If the interaction was successful, fetch the updated posts
      if (interactionResponse && typeof interactionResponse === 'object') {
        if (('likes' || 'dislikes' in interactionResponse)){
          const updatedPosts = await getPosts(user.token);
          setPosts(updatedPosts);
        }
      } else if (interactionResponse.message) {
        // If the post has expired, update the state to reflect this without fetching
        setShowModal(true);
        setModalMessage(interactionResponse.message);
      }
    } catch (error) {
      console.error(`Failed to ${interactionType} the post:`, error);

      // Set the modal message for any error
      setShowModal(true);
      setModalMessage(error.response?.data || `Failed to ${interactionType} the post.`);
      const updatedPosts = await getPosts(user.token);
      setPosts(updatedPosts);
    }
  };

  // Handle like
  const handleLike = (postId) => {
    handlePostInteraction('like', postId);
  };

  // Handle dislike
  const handleDislike = (postId) => {
    handlePostInteraction('dislike', postId);
  };

  // Handle toggle comments visibility
  const handleToggleComments = (postId) => {
    setCommentsVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

// This function is triggered when the "Add Comment" button is clicked
const handleToggleCommentModal = async (postId) => {
  // Find the post by postId to check if it's expired
  const post = posts.find(post => post._id === postId);

  // If the post is found and it is expired, do not open the modal and show a message instead
  if (post && post.status === 'Expired') {
    setShowModal(true);
    setModalMessage("This post has expired.");
  } else {
    // If the post is not expired, toggle the modal as usual
    setShowCommentModals(prevModals => ({
      ...prevModals,
      [postId]: !prevModals[postId],
    }));
  }
};


  // Handle adding a comment
  const handleAddComment = async (postId, commentText) => {
    try {
      await addComment(postId, commentText, user.token);

      // Fetch the updated list of posts, including the new comments
      const updatedPosts = await getPosts(user.token);
      setPosts(updatedPosts);

      // Close the comment modal
      setShowCommentModals(prevModals => ({
        ...prevModals,
        [postId]: false
      }));
    } catch (error) {
      console.error('Failed to add comment:', error);
      // Handle the error by showing a modal or an error message
      setShowModal(true);
      setModalMessage(error.response?.data || 'Failed to add comment.');
      const updatedPosts = await getPosts(user.token);
      setPosts(updatedPosts);
    }
  };

 // Function to handle new post creation
  const handlePostCreated = (newPost) => {
    getPosts(user.token).then(setPosts).catch(console.error);
  // Update the posts state with the new post at the beginning of the array
  setPosts([newPost, ...posts]);
  // Hide the create post form
  setIsCreatePostFormVisible(false);
};

const handleFilterByTopic = async (topic) => {
  try {
    // If the 'All' option is selected, fetch all posts
    if (topic === 'All') {
      const allPosts = await getPosts(user.token);
      setPosts(allPosts);
    } else {
      // Otherwise, fetch posts by the selected topic
      const filteredPosts = await getPostsByTopic(topic, user.token);
      setPosts(filteredPosts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    // handle error, e.g., set error message in state to display to user
  }
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
          <header>
            <div className="welcome-logout-container">
              <span className="welcome-message">Welcome, {user.username}!</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </header>
          <main className="main-content">

            {/* Button to toggle the visibility of the CreatePostForm */}
            <button onClick={() => setIsCreatePostFormVisible(!isCreatePostFormVisible)}>
              {isCreatePostFormVisible ? 'Hide Create Post' : 'Create Post'}
            </button>

            {/* Render CreatePostForm if isCreatePostFormVisible is true */}
            {isCreatePostFormVisible && (
              <CreatePostForm user={user} onPostCreated={handlePostCreated} />
            )}

            <div className="filter-by-topic">
              <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                <option value="All">All Topics</option>
                <option value="Politics">Politics</option>
                <option value="Health">Health</option>
                <option value="Sport">Sport</option>
                <option value="Tech">Tech</option>
              </select>
              <button onClick={() => handleFilterByTopic(selectedTopic)}>Filter Posts</button>
            </div>

            <PostsGrid
              posts={posts}
              onLike={handleLike}
              onDislike={handleDislike}
              onToggleCommentModal={handleToggleCommentModal}
              commentsVisible={commentsVisible}
              onToggleComments={handleToggleComments}
            />
            {/* Render CommentModal for each post if its state is true */}
            {posts.map((post) => (
              <CommentModal
                key={post._id}
                show={showCommentModals[post._id]}
                onClose={() => handleToggleCommentModal(post._id)}
                onSubmit={(comment) => handleAddComment(post._id, comment)}
              />
            ))}
          </main>
          <footer>
            <p>© 2023 PiazzaApp</p>
          </footer>
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
