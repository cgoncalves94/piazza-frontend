import React, { useState } from 'react';
import '../styles/CommentModal.css';


const CommentModal = ({ show, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment(''); // Reset the comment input
        onClose(); // Close the modal
    };

    if (!show) {
        return null; // Don't render the modal if show is false
    }

    return (
            <div className="comment-modal">
                <form onSubmit={handleSubmit} className="comment-modal-form">
                    <textarea
                        className="comment-modal-textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        required
                    />
                    <div className="comment-modal-buttons">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
    );
};

export default CommentModal;
