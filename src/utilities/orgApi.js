import Amplify, { API, Auth } from 'aws-amplify';

const getApiName = () => (Amplify._config.aws_cloud_logic_custom.find(({name}) => name === 'AdminQueries')).name;
const authRequest = async (operation, path, body, headers) => {
    const params = {
        body,
        headers: {
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
            ...headers
        }
    };
    return API[operation](getApiName(), path, params);
};
const get = (path) => authRequest('get', path);

const checkAdmin = async () => (await get('/check/admin')).member;

const checkOp = async () => (await get('/check/op')).member;

const listUsers = (token) => get(`/listUsers${token ? `?token=${encodeURIComponent(token)}` : ''}`);
const listUsersInGroup = (groupname) => get(`/listUsersInGroup?groupname=${groupname}`);

export default {
    checkAdmin,
    checkOp,
    listUsers,
    listUsersInGroup
}
