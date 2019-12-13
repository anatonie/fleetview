import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export default function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const {currentAuthState} = props;
    if (currentAuthState !== 'signUp') {
        return <span/>;
    }
    const submit = async () => {
        try {
            setError();
            const result = await Auth.signUp(username, password);
            props.onStateChange('confirmSignUp', result);
        } catch (e) {
            setError(e);
        }
    };
    const keyPressSubmit = ({key}) => key === 'Enter' ? submit() : undefined;
    return (
        <div>
            <Modal.Header>
                <Modal.Title>Create account</Modal.Title>
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
                    <FormControl.Feedback type="invalid">{error && error.code.toLowerCase().indexOf('username') >= 0 ? error.message : undefined}</FormControl.Feedback>
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
                    <FormControl.Feedback type="invalid">{error && error.code.toLowerCase().indexOf('username') < 0 ? error.message : undefined}</FormControl.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onStateChange('signIn')}>Back</Button>
                <Button variant="primary" onClick={submit}>Create account</Button>
            </Modal.Footer>
        </div>
    );
}
