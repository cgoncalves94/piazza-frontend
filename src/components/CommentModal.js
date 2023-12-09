import React, { useState } from 'react';
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
        <>
            <div className="modal-overlay" onClick={onClose}></div> {/* Overlay to close modal when clicked outside */}
            <div className="comment-modal">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        required
                    />
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </form>
            </div>
        </>
    );
};



export default CommentModal;