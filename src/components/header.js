import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Routes from '../routes';
import Constants from '../constants';

export default function Header(props) {
    const [accountDropDown, setAccountDropDown] = useState(false);
    const location = useLocation();
    const history = useHistory();
    return (
        <Navbar bg="dark" expand="sm" variant="dark">
            <Link
                to="/"
                className={`navbar-brand ${location.pathname === Routes.HOME.path && 'text-primary'}`}
            >
                {Constants.OrgName}
            </Link>
            <Nav className="mr-auto">
                {Object.keys(Routes)
                    .filter((key) => (Routes[key].account !== true && Routes[key].hide !== true) && (props.authState === 'signedIn' || !Routes[key].auth) && ((Routes[key].admin === true && props.admin) || Routes[key].admin !== true))
                    .map((key) => (
                        <Nav.Item className={location.pathname === Routes[key].path ? 'active' : undefined} key={key}>
                            <Link to={Routes[key].path} className="nav-link">
                                {Routes[key].title}
                            </Link>
                        </Nav.Item>
                ))}
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"/>
                {props.authState === 'signedIn' ? (
                    <span style={{display: 'inherit'}}>
                        <NavDropdown
                            title="My Account"
                            id="basic-nav-dropdown"
                            show={accountDropDown}
                            onToggle={(show) => setAccountDropDown(show)}
                        >
                            {Object
                                //
                                .keys(Routes).filter((key) => Routes[key].account === true && (props.authState === 'signedIn' || !Routes[key].auth) && ((Routes[key].admin === true && props.admin) || Routes[key].admin !== true))
                                .map((key) => (
                                <Link
                                    key={key}
                                    to={Routes[key].path}
                                    className={
                                        `dropdown-item ${location.pathname === Routes[key].path ? 'active' : ''}`
                                    }
                                    onClick={() => setAccountDropDown(false)}
                                >
                                    {Routes[key].title}
                                </Link>
                            ))}
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
