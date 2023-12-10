import React from 'react';
import '../styles/CommentList.css';

const CommentList = ({ comments }) => {
    // Log the comments array for debugging
    console.log('Comments:', comments);

    // Check if the comments array is defined and has elements
    if (!comments || comments.length === 0) {
        return <div className="comment-list">No comments to display.</div>;
    }

    return (
        <div className="comment-list">
            {comments.map((comment, index) => {
                if (!comment) {
                    console.warn(`Comment at index ${index} is undefined.`);
                    return null;
                }
                return (
                    <div key={comment.id} className="comment">
                        <span className="comment-author"> Commented by: {comment.user}</span>
                        <p className="comment-text">{comment.comment}</p>

                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;
