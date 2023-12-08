// Importing necessary dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/PostsGrid.css';



const PostsGrid = ({ posts, onLike, onDislike }) => {
    // Function to return the appropriate like count
    const getLikeCount = (likes) => {
        // If likes is an array, return its length; if it's a number, return it directly
        return Array.isArray(likes) ? likes.length : likes;
    };
    const getDislikeCount = (dislikes) => {
        // If dislikes is an array, return its length; if it's a number, return it directly
        return Array.isArray(dislikes) ? dislikes.length : dislikes;
    };
    return (
        <div className="posts-grid">
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    <div className="post-owner">Posted by: {post.owner.username}</div>
                    <div className="post-details">
                        <span className="post-topic">{post.topic}</span>
                        <span className={`post-status ${post.status === 'Expired' ? 'expired' : 'live'}`}>{post.status}</span>
                        {/* Add other details here */}
                    </div>
                    <div className="post-interactions">
                        <button onClick={() => onLike(post._id)} className="like-button">
                            <FontAwesomeIcon icon={faThumbsUp} /> {getLikeCount(post.likes)}
                        </button>
                        <button onClick={() => onDislike(post._id)} className="dislike-button">
                            <FontAwesomeIcon icon={faThumbsDown} /> {getDislikeCount(post.dislikes)}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostsGrid;
