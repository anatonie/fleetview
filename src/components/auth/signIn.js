import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export default function SignIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const {currentAuthState} = props;
    if (currentAuthState !== 'signIn') {
        return <span/>;
    }
    const submit = async () => {
        try {
            setError();
            const result = await Auth.signIn(username, password);
            props.onStateChange('signedIn', result);
        } catch (e) {
            setError(e.message);
        }
    };
    const keyPressSubmit = ({key}) => key === 'Enter' ? submit() : undefined;
    return (
        <div>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        isInvalid={!!error}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyPress={keyPressSubmit}
                    />
                    <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyPress={keyPressSubmit}
                        isInvalid={!!error}
                    />
                </Form.Group>
                <p className="text-primary clickable" onClick={() => props.onStateChange('signUp')}>Create account</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setAuthState('none')}>Cancel</Button>
                <Button variant="primary" onClick={submit}>Login</Button>
            </Modal.Footer>
        </div>
    );
}
