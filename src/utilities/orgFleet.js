import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const buildParams = async (op, params, auth = false) => {
    if (!auth) {
        try {
            const result = await Auth.currentUserInfo();
            auth = !!result;
        } catch (e) {
            // swallow
        }
    }
    return {
        ...graphqlOperation(op, params),
        ...(auth ? {authMode: 'AMAZON_COGNITO_USER_POOLS'} : {})
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
        const params = await getParams(nextToken);
        const {data} = await API.graphql(params);
        const keys = Object.keys(data);
        nextToken = data[keys].nextToken;
        keys.forEach(getCombineItems(data));
    } while (nextToken);
    return items;
};

export const listShips = () => getPaginatedApi((nextToken) => buildParams(queries.listShips, {nextToken}));

export const listMyShips = async () => {
    const {username} = await Auth.currentUserInfo();
    return getPaginatedApi((nextToken) =>
        buildParams(queries.listShips, {filter: {owner: {eq: username}}, nextToken}, true));
};

export const createShip = async (type, name) => {
    const res = await API.graphql(await buildParams(mutations.createShip, {input: {name, type}}, true));
    return res.data.createShip;
};

export const updateShip = (id, type, name) => buildParams(mutations.updateShip, {input: {id, type, name}}, true)
    .then((params) => API.graphql(params));

export const deleteShip = (id) => buildParams(mutations.deleteShip, {input: {id}}, true)
    .then((params) => API.graphql(params));
