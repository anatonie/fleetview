/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const {
    addUserToGroup,
    removeUserFromGroup,
    confirmUserSignUp,
    disableUser,
    enableUser,
    getUser,
    listUsers,
    listGroupsForUser,
    listUsersInGroup,
    signUserOut,
} = require('./cognitoActions');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Only perform tasks if the user is in a specific group
const GROUPS = {
    ADMINS: process.env.ADMIN_GROUP,
    OPS: process.env.OPS_GROUP,
    MEMBERS: process.env.MEMBERS_GROUP
};

const checkGroup = (req, groupName) => {
    if (req.apiGateway.event.requestContext.authorizer.claims['cognito:groups']) {
        const groups = req.apiGateway.event.requestContext.authorizer.claims['cognito:groups'].split(',');
        if (groups.indexOf(groupName) >= 0) {
            return true;
        }
    }
    return false;
};

const checkGroupMiddleware = (req, res, next, groups) => {
    const pass = groups.some((groupName) => checkGroup(req, groupName));
    if (!pass) {
        const err = new Error(`User does not have permissions to perform this operation.`);
        next(err);
    }
};

app.all('/members/*', (req, res, next) => checkGroupMiddleware(req, res, next, [GROUPS.MEMBERS, GROUPS.OPS, GROUPS.ADMINS]));
app.all('/ops/*', (req, res, next) => checkGroupMiddleware(req, res, next, [GROUPS.OPS, GROUPS.ADMINS]));
app.all('/admin/*', (req, res, next) => checkGroupMiddleware(req, res, next, [GROUPS.ADMINS]));

app.get('/check/member', (req, res) => res.json({member: checkGroup(req, GROUPS.MEMBERS)}));
app.get('/check/op', (req, res) => res.json({member: checkGroup(req, GROUPS.OPS)}));
app.get('/check/admin', (req, res) => res.json({member: checkGroup(req, GROUPS.ADMINS)}));

// app.all('/*', (req, res, next) => checkGroupMiddleware(req, res, next, [GROUPS.OPS, GROUPS.ADMINS]));

app.post('/admin/proxy', async (req, res) => {
    const service = req.body.service;
    const params = req.body.params;
    const operation = req.body.operation;
    const region = req.body.region;

    const serviceClient = new (require('aws-sdk/clients/' + service))({region});
    try {
        const result = await serviceClient[operation](params).promise();
        res.status(200).json(result);
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 400).json(e);
    }
});

app.post('/addUserToGroup', async (req, res, next) => {
    if (!req.body.username || !req.body.groupname) {
        const err = new Error('username and groupname are required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await addUserToGroup(req.body.username, req.body.groupname);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.post('/removeUserFromGroup', async (req, res, next) => {
    if (!req.body.username || !req.body.groupname) {
        const err = new Error('username and groupname are required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await removeUserFromGroup(req.body.username, req.body.groupname);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.post('/confirmUserSignUp', async (req, res, next) => {
    if (!req.body.username) {
        const err = new Error('username is required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await confirmUserSignUp(req.body.username);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.post('/disableUser', async (req, res, next) => {
    if (!req.body.username) {
        const err = new Error('username is required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await disableUser(req.body.username);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.post('/enableUser', async (req, res, next) => {
    if (!req.body.username) {
        const err = new Error('username is required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await enableUser(req.body.username);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.get('/getUser', async (req, res, next) => {
    if (!req.query.username) {
        const err = new Error('username is required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await getUser(req.query.username);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.get('/listUsers', async (req, res, next) => {
    let token = req.query.token;
    let Users = [];

    try {
        do {
            let response;
            if (token) {
                response = await listUsers(req.query.limit || 25, token);
            } else if (req.query.limit) {
                response = await listUsers((Limit = req.query.limit));
            } else {
                response = await listUsers();
            }
            Users = [
                ...Users,
                ...response.Users
            ];
            token = response.NextToken;
        } while (token);
        res.status(200).json({Users});
    } catch (err) {
        next(err);
    }
});

app.get('/listGroupsForUser', async (req, res, next) => {
    if (!req.query.username) {
        const err = new Error('username is required');
        err.statusCode = 400;
        return next(err);
    }

    try {
        let response;
        if (req.query.token) {
            response = await listGroupsForUser(req.query.username, req.query.limit || 25, req.query.token);
        } else if (req.query.limit) {
            response = await listGroupsForUser(req.query.username, (Limit = req.query.limit));
        } else {
            response = await listGroupsForUser(req.query.username);
        }
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.get('/listUsersInGroup', async (req, res, next) => {
    if (!req.query.groupname) {
        const err = new Error('groupname is required');
        err.statusCode = 400;
        return next(err);
    }

    let token = req.query.token;
    let Users = [];

    try {
        do {
            let response;
            if (token) {
                response = await listUsersInGroup(req.query.groupname, req.query.limit || 25, token);
            } else if (req.query.limit) {
                response = await listUsersInGroup(req.query.groupname, (Limit = req.query.limit));
            } else {
                response = await listUsersInGroup(req.query.groupname);
            }

            Users = [
                ...Users,
                ...response.Users
            ];
            token = response.NextToken;
        } while (token);
        res.status(200).json({Users});
    } catch (err) {
        next(err);
    }
});

app.post('/signUserOut', async (req, res, next) => {
    /**
     * To prevent rogue actions of users with escalated privilege signing
     * other users out, we ensure it's the same user maning the call
     * Note that this only impacts actions the user can do in User Pools
     * such as updating an attribute, not services consuming the JWT
     */
    if (
        req.body.username != req.apiGateway.event.requestContext.authorizer.claims.username &&
        req.body.username != /[^/]*$/.exec(req.apiGateway.event.requestContext.identity.userArn)[0]
    ) {
        const err = new Error('only the user can sign themselves out');
        err.statusCode = 400;
        return next(err);
    }

    try {
        const response = await signUserOut(req.body.username);
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.use('*', (req, res) => {
    res.status(400).json({error: 'Path not found'});
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res
    .status(err.statusCode)
    .json({ message: err.message })
    .end();
});

app.listen(3000, () => {
  console.log('App started');
});

module.exports = app;
