import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const buildCognitoAuthParams = (op, params) => ({
    ...graphqlOperation(op, params),
    authMode: 'AMAZON_COGNITO_USER_POOLS'
});

const getPaginatedApi = async (getParams) => {
    let nextToken;
    let items = [];
    do {
        const {data} = await API.graphql(getParams(nextToken));
        const keys = Object.keys(data);
        nextToken = data[keys].nextToken;
        keys.forEach((key) => {
            if (data[key].items) {
                items = [
                    ...items,
                    ...data[key].items
                ];
            }
        });
    } while (nextToken);
    return items;
};

export const listShips = () => getPaginatedApi((nextToken) => graphqlOperation(queries.listShips, {nextToken}));

export const listMyShips = async () => {
    const {username} = await Auth.currentUserInfo();
    return getPaginatedApi((nextToken) => buildCognitoAuthParams(queries.listShips, {filter: {owner: {eq: username}}, nextToken}));
};

export const createShip = async (type, name) => {
    const res = await API.graphql(buildCognitoAuthParams(mutations.createShip, {input: {name, type}}));
    return res.data.createShip;
};

export const deleteShip = (id) => API.graphql(buildCognitoAuthParams(mutations.deleteShip, {input: {id}}));
