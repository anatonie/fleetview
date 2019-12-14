import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Constants from '../constants';

export default function Footer() {
    return (
        <Navbar bg="dark" expand="sm" variant="dark" fixed="bottom">
            <Nav className="mx-auto">
                <Nav.Item>
                    <Nav.Link href={Constants.DiscordInviteLink} target="_blank">Join us on Discord</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={Constants.OrgLink} target="_blank">Enlist Today</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
