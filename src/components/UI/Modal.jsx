import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Modal({ isOpen, onClose, children }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            {children}
        </ReactModal>
    );
}
