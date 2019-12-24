export const ACTIONS = {
    START: 'START',
    SET_AUTH: 'SET_AUTH',
    SET_ADMIN: 'SET_ADMIN',
    SET_USER: 'SET_USER',
    SET_MY_FLEET: 'SET_MY_FLEET',
    SET_FLEET: 'SET_FLEET',
    SET_EVENTS: 'SET_EVENTS',
    INIT_SUBS: 'INIT_SUBS',
    ADD_SUBS: 'ADD_SUBS',
    CLEAR_SUBS: 'CLEAR_SUBS',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    ADD_EVENT: 'ADD_EVENT'
};

export const setAuthState = (authState) => ({type: ACTIONS.SET_AUTH, authState});
export const signOut = () => ({type: ACTIONS.SIGN_OUT});
