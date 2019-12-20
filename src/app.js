import React, { useEffect } from 'react';
import Amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import awsconfig from './aws-exports';
import Header from './components/header';
import Footer from './components/footer';
import Routes from './routes';
import NotFound from './routes/notFound';

import AuthComponents from './components/auth';
import * as Actions from './utilities/actions';

Amplify.configure(awsconfig);

document.title = 'Ronin Defense';

let updateAuthState;

function SneakyPropsComponent(props) {
    updateAuthState = props.onStateChange;
    return <span/>;
}

function App(props) {
    const {
        authState,
        admin,
        setAuthState,
        signOut
    } = props;
    useEffect(() => {
        if (authState === 'verifyContact') {
            updateAuthState('signedIn');
        }
    }, [authState]);
    return (
        <div className="App" style={{marginBottom: '54px'}}>
            <Router>
                <Header setAuthState={setAuthState} authState={authState} admin={admin} signOut={signOut}/>
                <Authenticator
                    onStateChange={(newState) => newState === 'signIn' && authState === 'none' ? undefined : setAuthState(newState)}
                    signUpConfig={{hiddenDefaults: ['phone_number', 'email']}}
                    hideDefault={true}
                    authState={'none'}
                >
                    <SneakyPropsComponent/>
                    <AuthComponents setAuthState={setAuthState} currentAuthState={authState}/>
                </Authenticator>
                <Switch>
                    {Object.keys(Routes)
                        .filter((key) => (authState === 'signedIn' || !Routes[key].auth) && ((Routes[key].admin === true && admin) || Routes[key].admin !== true))
                        .map((route) => {
                            const {path, component: Component} = Routes[route];
                            return <Route
                                key={path}
                                exact={true}
                                path={path}
                                render={(compProps) => <Component {...compProps} authState={authState} admin={admin}/>}
                                />
                        })}
                    <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default connect((state) => ({authState: state.authState, admin: state.admin}), {setAuthState: Actions.setAuthState, signOut: Actions.signOut})(App);
