// CustomModal.js
import React from 'react';
import '../styles/CustomModal.css';

/**
 * CustomModal component displays a modal overlay with a message and a close button.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed in the modal.
 * @param {function} props.onClose - The function to be called when the modal is closed.
 * @returns {JSX.Element} The rendered CustomModal component.
 */
const CustomModal = ({ message, onClose }) => {
    return (
        <div className="custom-modal-overlay" onClick={onClose} tabIndex={0}>
            <div className="custom-modal" onClick={e => e.stopPropagation()}>
                <div className="custom-modal-content">
                    <p>{message}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
