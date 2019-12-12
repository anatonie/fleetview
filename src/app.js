import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import awsconfig from './aws-exports';
import Header from './components/header';
import Routes from './routes';
import NotFound from './routes/notFound';

Amplify.configure(awsconfig);

document.title = 'Ronin Defense';

let updateAuthState;

function SneakyPropsComponent(props) {
    updateAuthState = props.onStateChange;
    return <span/>;
}

function App() {
    const [authState, setAuthState] = useState('none');
    useEffect(() => {
        const checkCreds = async () => {
            const creds = await Auth.currentUserInfo();
            if (creds) {
                setAuthState('signedIn');
            }
        };
        checkCreds();
    }, []);
    useEffect(() => {
        if (authState === 'verifyContact') {
            updateAuthState('signedIn');
        }
    }, [authState]);
    return (
        <div className="App">
            <Router>
                <Header setAuthState={setAuthState} authState={authState}/>
                {authState !== 'none' && authState !== 'signedIn' ? (
                    <Authenticator
                        onStateChange={(newState) => setAuthState(newState)}
                        signUpConfig={{hiddenDefaults: ['phone_number', 'email']}}
                    >
                        <SneakyPropsComponent/>
                    </Authenticator>
                ) : (
                    <Switch>
                        {Object.keys(Routes)
                            .filter((route) => authState === 'signedIn' || !Routes[route].auth)
                            .map((route) => <Route key={Routes[route].path} exact={true} path={Routes[route].path} component={Routes[route].component}/>)}
                            <Route component={NotFound}/>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
