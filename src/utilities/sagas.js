import {
    select,
    takeEvery,
    put,
    fork,
    call,
    take,
    takeLatest,
    all
} from 'redux-saga/effects';
import { Auth, API } from 'aws-amplify';

import { ACTIONS } from './actions';
import OrgApi from './orgApi';
import initializeStore from './initializeStore';
import * as subscriptions from '../graphql/subscriptions';
import store from './store';
import { graphqlOperation } from 'aws-amplify/lib-esm/index';

const takeFirst = (pattern, saga, ...args) => fork(function* () {
    const action = yield take(pattern);
    yield call(saga, ...args.concat(action));
});

export default function* rootSaga() {
    yield takeFirst(ACTIONS.SET_AUTH, initState);
    yield takeEvery(ACTIONS.SET_AUTH, initLogin);
    yield takeEvery(ACTIONS.SET_FLEET, setFleetSaga);
    yield takeLatest(ACTIONS.SIGN_IN, handleSignIn);
    yield takeLatest(ACTIONS.SIGN_OUT, handleSignOut);
    yield takeEvery(ACTIONS.LIST_USERS, listUsers);
}

function* initState(action) {
    if (action.authState === 'none') {
        yield initializeStore();
    } else {
        const {username} = yield select();
        if (!username) {
            yield take(ACTIONS.SET_USER);
        }
        yield initializeStore(true);
    }
}

function* initLogin(action) {
    if (action.authState === 'signedIn') {
        const {username} = yield Auth.currentUserInfo();
        yield put({type: ACTIONS.SET_USER, username});
        const admin = yield OrgApi.checkAdmin();
        yield put({type: ACTIONS.SET_ADMIN, admin});
        let op = false;
        if (!admin) {
            op = yield OrgApi.checkOp();
            yield put({type: ACTIONS.SET_OP, op});
        }
        yield put({type: ACTIONS.SIGN_IN});
        const {fleet} = yield select();
        if (fleet) {
            yield setMyFleet(fleet);
        }
        if (op || admin) {
            yield put({type: ACTIONS.LIST_USERS});
        }
    }
    if (action.authState === 'none') {
        yield put({type: ACTIONS.SET_MY_FLEET, myFleet: []});

    }
}

function* listUsers() {
    const {usersToken: token} = yield select();
    const [{users}, {admins}, {ops}, {members}] = yield all([
        OrgApi.listUsers(token).then(({Users}) => ({users: Users})),
        OrgApi.listUsersInGroup('admins').then(({Users}) => ({admins: Users.map(({Username}) => Username)})),
        OrgApi.listUsersInGroup('ops').then(({Users}) => ({ops: Users.map(({Username}) => Username)})),
        OrgApi.listUsersInGroup('members').then(({Users}) => ({members: Users.map(({Username}) => Username)})),
    ]);
    const mappedUsers = users.map((user) => ({
        ...user,
        Groups: [
            ...(admins.indexOf(user.Username) >= 0 ? ['admins'] : []),
            ...(ops.indexOf(user.Username) >= 0 ? ['ops'] : []),
            ...(members.indexOf(user.Username) >= 0 ? ['members'] : [])
        ]
    }));
    yield put({type: ACTIONS.SET_USERS, users: mappedUsers});
}

function* setFleetSaga(action) {
    yield setMyFleet(action.fleet);
}

function* setMyFleet(fleet) {
    const {username} = yield select();
    if (username) {
        const myFleet = fleet.filter(({owner}) => owner === username);
        yield put({type: ACTIONS.SET_MY_FLEET, myFleet});
    }
}

function* handleSignOut(action) {
    const {subs} = yield select();
    yield Auth.signOut();
    yield put({type: ACTIONS.SET_AUTH, authState: 'none'});
    if (subs.length > 0) {
        while (subs.length) {
            const sub = subs.pop();
            sub.unsubscribe();
        }
    }
    yield put({type: ACTIONS.CLEAR_SUBS})
}

function* handleSignIn(action) {
    const {subs = [], username} = yield select();
    if (subs.length > 0) {
        while (subs.length) {
            const sub = subs.pop();
            sub.unsubscribe();
        }
    }
    if (username) {
        yield all(Object.keys(subscriptions)
            // .filter((sub) => (admin  && sub.toLowerCase().indexOf('sub') < 0)|| sub.toLowerCase().indexOf('ship') >= 0)
            .map(function* (subName) {
                try {
                    const sub = API.graphql({...graphqlOperation(subscriptions[subName]), authMode:'AMAZON_COGNITO_USER_POOLS'})
                        .subscribe({next: (item) => {
                                store.dispatch({type: subName, item: item.value.data[subName]})
                            }});
                    yield put({type: ACTIONS.ADD_SUBS, sub});
                } catch (e) {
                    console.log(subName);
                    console.log(e);
                }

            }));
    }
}
