import React from 'react';
import { Button } from 'react-bootstrap';

const NavButton = ({ children, style }) => {
    return (
        <Button bsStyle='link' style={style}> {children} </Button>
    );
};

export default NavButton;