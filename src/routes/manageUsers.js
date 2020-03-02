import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function ManageUsers(props) {
    const {
        users = []
    } = props;
    return (
        <div>
            <pre>
                {JSON.stringify(users, null, 4)}
            </pre>
            <Table responsive size="sm">
                <thead>
                <tr>
                    <td>#</td>
                    <td>Username</td>
                    <td>Confirm</td>
                    <td width="5rem">Admin</td>
                    <td width="5rem">Op</td>
                    <td width="5rem">Member</td>
                </tr>
                </thead>
                <tbody>
                {users.map((user, idx) => (
                    <tr key={idx} className={idx % 2 ? 'table-active' : undefined}>
                        <td>{idx + 1}</td>
                        <td>{user.Username}</td>
                        <td>{user.UserStatus !== 'CONFIRMED' && <Button size="sm">Confirm</Button>}</td>
                        <td style={{textAlign: 'center'}}>{user.Groups.indexOf('admins') >= 0 ? 'X' : ''}</td>
                        <td style={{textAlign: 'center'}}>{user.Groups.indexOf('ops') >= 0 ? 'X' : ''}</td>
                        <td style={{textAlign: 'center'}}>{user.Groups.indexOf('members') >= 0 ? 'X' : ''}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default connect((state) => ({users: state.users}))(ManageUsers);
