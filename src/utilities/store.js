import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import RootSaga from './sagas';
import { ACTIONS } from './actions';

const sagaMiddleware = createSagaMiddleware();

const SUB_ACTIONS = ['Create', 'Update', 'Delete'];
const SUB_MAP = {
    Ship: ['fleet', 'myFleet'],
    Event: ['events']
};

const reducer = (state, action) => {
    if (action.type.indexOf('on') === 0) {
        const actionType = SUB_ACTIONS.find((act) => action.type.indexOf(act) === 2);
        const memberKey = action.type.replace('on' + actionType, '');
        if (actionType && memberKey && SUB_MAP[memberKey]) {
            const members = SUB_MAP[memberKey];
            const newState = {
                ...state
            };
            switch (actionType) {
                case 'Create':
                    members.forEach((member) => newState[member].push(action.item));
                    return newState;
                case 'Delete':
                    members.forEach((member) => newState[member] = newState[member].filter(({id}) => id !== action.item.id));
                    return newState;
                case 'Update':
                    members.forEach((member) => newState[member] = newState[member].map((item) => item.id === action.item.id ? action.item : item));
                    return newState;
                default:
                // fall through to default reducer
            }
        }
    }
    switch (action.type) {
        case ACTIONS.CLEAR_SUBS:
            return {
                ...state,
                subs: []
            };
        case ACTIONS.ADD_SUBS:
            return {
                ...state,
                subs: [
                    ...(state.subs ? state.subs : []),
                    action.sub
                ]
            };
        case ACTIONS.SET_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case ACTIONS.SET_MY_FLEET:
            return {
                ...state,
                myFleet: action.myFleet
            };
        case ACTIONS.SET_USER:
            return {
                ...state,
                username: action.username
            };
        case ACTIONS.SET_AUTH:
            return {
                ...state,
                authState: action.authState,
                admin: false,
                username: undefined
            };
        case ACTIONS.SET_ADMIN:
            return {
                ...state,
                admin: action.admin
            };
        case ACTIONS.SET_FLEET:
            return {
                ...state,
                fleet: action.fleet
            };
        case "setManufacturers":
            return {
                ...state,
                manufacturers: action.manufacturers
            };
        case "setModels":
            return {
                ...state,
                models: action.models
            };
        default:
            return state;
    }
};

const defaultState = {
    authState: 'loading',
    admin: false
};

const configureStore = () => {
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middleware = [applyMiddleware(sagaMiddleware)];

    return createStore(
        reducer,
        defaultState,
        composeEnhancers(
            ...middleware
        )
    );
};

const store = configureStore();

sagaMiddleware.run(RootSaga);

export default store;
