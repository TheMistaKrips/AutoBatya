import React from 'react';

export default function Button({ onClick, children, type = "button", className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`add-button ${className}`}
        >
            {children}
        </button>
    );
}
