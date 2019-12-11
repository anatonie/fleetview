import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


export const listShips = async () => {
    const res = await API.graphql(graphqlOperation(queries.listShips));
    return res.data.listShips.items;
};

export const listMyShips = async () => {
    const {username} = await Auth.currentUserInfo();
    const res = await API.graphql(graphqlOperation(queries.listShips, {filter: {owner: {eq: username}}}));
    return res.data.listShips.items;
};

export const createShip = async (type, name) => {
    const res = await API.graphql(graphqlOperation(mutations.createShip, {input: {name, type}}));
    return res.data.createShip;
};

export const deleteShip = (id) => API.graphql(graphqlOperation(mutations.deleteShip, {input: {id}}));

// Query using a parameter
// const oneTodo = await API.graphql(graphqlOperation(queries.getTodo, { id: 'some id' }));
// console.log(oneTodo);
