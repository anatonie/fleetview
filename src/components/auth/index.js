import React from 'react';
import Modal from 'react-bootstrap/Modal';

import SignIn from './signIn';
import SignUp from './signUp';
import ConfirmSignUp from './confirmSignUp';

export default function Auth(props) {
    return (
        <Modal show={props.currentAuthState !== 'none' && props.currentAuthState !== 'signedIn'} onHide={() => undefined}>
            <SignIn {...props}/>
            <SignUp {...props}/>
            <ConfirmSignUp {...props}/>
        </Modal>
    );
}
