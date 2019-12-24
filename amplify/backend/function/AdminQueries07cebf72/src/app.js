/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

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

const checkGroupMiddleware = (req, res, next, groupName) => {
    if (!checkGroup(req, groupName)) {
        const err = new Error(`User does not have permissions to perform this operation.`);
        next(err);
    }
};

app.all('/members/*', (req, res, next) => checkGroupMiddleware(req, res, next, GROUPS.MEMBERS));
app.all('/ops/*', (req, res, next) => checkGroupMiddleware(req, res, next, GROUPS.OPS));
app.all('/admin/*', (req, res, next) => checkGroupMiddleware(req, res, next, GROUPS.ADMINS));

app.get('/check/member', (req, res) => res.json({member: checkGroup(req, GROUPS.MEMBERS)}));
app.get('/check/op', (req, res) => res.json({member: checkGroup(req, GROUPS.OPS)}));
app.get('/check/admin', (req, res) => res.json({member: checkGroup(req, GROUPS.ADMINS)}));

app.get('*', (req, res) => {
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
