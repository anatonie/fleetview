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
const EXTRA_CREATE_ACTIONS = {
    Event: (event) => ({...event, subs: (event.subs ? event.subs : [])})
};
const SORT_ACTIONS = {
    Event: (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
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
                    members.forEach((member) => newState[member].push(
                        EXTRA_CREATE_ACTIONS[memberKey] ? EXTRA_CREATE_ACTIONS[memberKey](action.item) : action.item
                    ));
                    if (SORT_ACTIONS[memberKey]) {
                        members.forEach((member) => newState[member].sort(SORT_ACTIONS[memberKey]));
                    }
                    return newState;
                case 'Delete':
                    members.forEach((member) => newState[member] = newState[member].filter(({id}) => id !== action.item.id));
                    return newState;
                case 'Update':
                    members.forEach((member) => newState[member] = newState[member].map((item) =>
                        item.id === action.item.id ? {...item, ...action.item} : item
                    ));
                    return newState;
                default:
                // fall through to default reducer
            }
        } else if (memberKey === 'EventSubscriber') {
            const eventId = action.item.eventId;
            switch (actionType) {
                case 'Create':
                case 'Update':
                    return {
                        ...state,
                        events: state.events.map((event) => ({
                            ...event,
                            ...(event.id !== eventId ? {} : {subs: [...event.subs, action.item]})
                        }))
                    };
                case 'Delete':
                    return {
                        ...state,
                        events: state.events.map((event) => ({
                            ...event,
                            subs: event.id === eventId ? event.subs.filter(({user}) => user !== action.item.user) : event.subs
                        }))
                    };
                default:
                // fall through to default reducer
            }
        }
    }
    switch (action.type) {
        case ACTIONS.SET_USERS:
            return {
                ...state,
                users: action.users,
                usersToken: action.usersToken
            };
        case ACTIONS.SIGN_OUT:
            return {
                ...state,
                users: [],
                admin: false,
                op: false,
                member: false
            };
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
        case ACTIONS.ADD_EVENT:
            return {
                ...state,
                events: [
                    ...(state.events ? state.events : []).filter(({id}) => id !== action.event.id),
                    action.event
                ].sort(SORT_ACTIONS.Event)
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
                admin: action.admin,
                op: action.admin,
                member: action.admin
            };
        case ACTIONS.SET_OP:
            return {
                ...state,
                admin: false,
                op: action.op,
                member: action.op
            };
        case ACTIONS.SET_MEMBER:
            return {
                ...state,
                admin: false,
                op: false,
                member: action.member
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
