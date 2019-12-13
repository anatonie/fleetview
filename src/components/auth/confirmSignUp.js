import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Constants from '../../constants';

export default function ConfirmSignUp(props) {
    const {currentAuthState} = props;
    if (currentAuthState !== 'confirmSignUp') {
        return <span/>;
    }
    const submit = () => {
        props.onStateChange('signIn');
        props.setAuthState('none');
    };
    return (
        <div>
            <Modal.Header>
                <Modal.Title>Complete!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>You have successfully signed up!</p>
                    <p><a href={Constants.DiscordInviteLink}>Join our discord</a> and message <span className="text-success">nation</span> to confirm your account</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submit}>Close</Button>
            </Modal.Footer>
        </div>
    );
}
