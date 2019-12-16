import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import awsconfig from './aws-exports';
import Header from './components/header';
import Footer from './components/footer';
import Routes from './routes';
import NotFound from './routes/notFound';

import AuthComponents from './components/auth';
import OrgApi from './utilities/orgApi';

Amplify.configure(awsconfig);

document.title = 'Ronin Defense';

let updateAuthState;

function SneakyPropsComponent(props) {
    updateAuthState = props.onStateChange;
    return <span/>;
}

function App() {
    const [authState, setAuthState] = useState();
    const [admin, setAdmin] = useState();
    useEffect(() => {
        const checkCreds = async () => {
            const creds = await Auth.currentUserInfo();
            if (creds) {
                setAuthState('signedIn');
                const isAdmin = await OrgApi.checkAdmin();
                setAdmin(isAdmin);
            } else {
                setAuthState('none');
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
        <div className="App" style={{marginBottom: '54px'}}>
            <Router>
                <Header setAuthState={setAuthState} authState={authState} admin={admin}/>
                <Authenticator
                    onStateChange={(newState) => newState === 'signIn' && authState === 'none' ? undefined : setAuthState(newState)}
                    signUpConfig={{hiddenDefaults: ['phone_number', 'email']}}
                    hideDefault={true}
                >
                    <SneakyPropsComponent/>
                    <AuthComponents setAuthState={setAuthState} currentAuthState={authState}/>
                </Authenticator>
                <Switch>
                    {Object.keys(Routes)
                        .filter((key) => (authState === 'signedIn' || !Routes[key].auth) && ((Routes[key].admin === true && admin) || Routes[key].admin !== true))
                        .map((route) => <Route key={Routes[route].path} exact={true} path={Routes[route].path} component={Routes[route].component}/>)}
                    <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
