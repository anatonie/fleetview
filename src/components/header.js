import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Routes from '../routes';

export default function Header(props) {
    const [accountDropDown, setAccountDropDown] = useState(false);
    const location = useLocation();
    const history = useHistory();
    return (
        <Navbar bg="dark" expand="sm" variant="dark">
            <Link to="/" className="navbar-brand">Ronin Defense</Link>
            <Nav className="mr-auto">
                <Nav.Item className={location.pathname === Routes.FLEETVIEW.path ? 'active' : undefined}>
                    <Link to={Routes.FLEETVIEW.path} className="nav-link">{Routes.FLEETVIEW.title}</Link>
                </Nav.Item>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"/>
                {props.authState === 'signedIn' ? (
                    <span style={{display: 'inherit'}}>
                        <NavDropdown title="My account" id="basic-nav-dropdown" show={accountDropDown} onToggle={(show) => setAccountDropDown(show)}>
                            <Link
                                to={Routes.MANAGE.path}
                                className={`dropdown-item ${location.pathname === Routes.MANAGE.path ? 'active' : ''}`}
                                onClick={() => setAccountDropDown(false)}
                            >
                                {Routes.MANAGE.title}
                            </Link>
                            <NavDropdown.Divider />
                            <div
                                onClick={async () => {
                                    await Auth.signOut();
                                    props.setAuthState('none');
                                    if (location.pathname !== '/') {
                                        history.push('/');
                                    }
                                }}
                                className="dropdown-item"
                            >
                                Logout
                            </div>
                        </NavDropdown>
                    </span>
                ) : (
                    <Button variant="outline-success" onClick={() => props.setAuthState('signIn')}>Login</Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
