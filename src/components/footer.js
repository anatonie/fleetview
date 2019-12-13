import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Footer() {
    return (
        <Navbar bg="dark" expand="sm" variant="dark" fixed="bottom">
            <Nav className="mx-auto">
                <Nav.Item>
                    <Nav.Link href="https://discord.gg/BazqYAR" target="_blank">Join us on Discord</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="https://robertsspaceindustries.com/orgs/RONINDEF" target="_blank">Apply Today</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
