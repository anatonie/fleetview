import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import store from './store';

const buildParams = (op, params, auth = false) => {
    const {username} = store.getState();
    return {
        ...graphqlOperation(op, params),
        ...(auth || username ? {authMode: 'AMAZON_COGNITO_USER_POOLS'} : {})
    }
};

const getPaginatedApi = async (getParams) => {
    let nextToken;
    let items = [];
    const getCombineItems = (data) => (key) => {
        if (data[key].items) {
            items = [
                ...items,
                ...data[key].items
            ];
        }
    };
    do {
        const params = getParams(nextToken);
        const {data} = await API.graphql(params);
        const keys = Object.keys(data);
        nextToken = data[keys].nextToken;
        keys.forEach(getCombineItems(data));
    } while (nextToken);
    return items;
};

export const listShips = () => getPaginatedApi((nextToken) => buildParams(queries.listShips, {nextToken}));

export const createShip = (type, name) => API.graphql(buildParams(mutations.createShip, {input: {name, type}}, true));

export const updateShip = (id, type, name) => API.graphql(buildParams(mutations.updateShip, {input: {id, type, name}}, true));

export const deleteShip = (id) => API.graphql(buildParams(mutations.deleteShip, {input: {id}}, true));

export const listEvents = () => getPaginatedApi((nextToken) => buildParams(queries.listEvents, {nextToken}));

export const createEvent = (event) => API.graphql(buildParams(mutations.createEvent, {input: event}, true));

export const updateEvent = (event) => API.graphql(buildParams(mutations.updateEvent, {input: event}, true));
