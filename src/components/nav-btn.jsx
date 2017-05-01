import React from 'react';

const NavButton = ({ children }) => {
    return (
        <button className='btn'>
            <span>{children}</span>
        </button>
    );
};

export default NavButton;