// Importing necessary dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import '../styles/PostsGrid.css';

import CommentList from './CommentList'; // Import the component


const PostsGrid = ({
posts,
onLike,
onDislike,
onToggleCommentModal,
onToggleComments,
commentsVisible
}) => {


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
                    </div>
                    <div className="post-interactions">
                        <button onClick={() => onLike(post._id)} className="like-button">
                            <FontAwesomeIcon icon={faThumbsUp} /> {post.likes.length}
                        </button>
                        <button onClick={() => onDislike(post._id)} className="dislike-button">
                            <FontAwesomeIcon icon={faThumbsDown} /> {post.dislikes.length}
                        </button>
                        <button onClick={() => onToggleCommentModal(post._id)} className="comment-button">
                            <FontAwesomeIcon icon={faCommentDots} />
                        </button>
                        <button onClick={() => onToggleComments(post._id)} className="view-comments-button">
                            View ({post.comments.length})
                        </button>
                    </div>
                    {commentsVisible[post._id] && <CommentList comments={post.comments} />}
                </div>
            ))}
        </div>
    );
};


export default PostsGrid;
