import React, { useState } from 'react';
import '../styles/CustomButton.css'; // Make sure the path is correct

export default function CustomButton({
    text,
    color = 'white',
    bgColor = 'black',
    hoverColor = 'black',
    hoverBgColor = 'white',
    icon,
    type = 'button'
}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <button
            className={`custom-button ${isHovered ? 'hover' : ''}`}
            type={type}
            style={{
                color: isHovered ? hoverColor : color,
                backgroundColor: isHovered ? hoverBgColor : bgColor,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon && <span className="button-icon">{icon}</span>}
            <span className="button-text">{text}</span>
        </button>
    );
}
