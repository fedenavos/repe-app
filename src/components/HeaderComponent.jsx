import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeaderComponent = ({handleLogout, navItem}) => {
    return (
        <Nav className='mt-4 justify-content-center'>
            <Nav.Item>
                { navItem === 'dashboard' ?
                    <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                    :
                    <Nav.Link as={Link} to="/friends">Social album</Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                <button className='main-button' onClick={handleLogout}>Cerrar sesión</button>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderComponent;
