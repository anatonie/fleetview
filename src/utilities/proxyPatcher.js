import Amplify, { Auth } from 'aws-amplify';

function extendLocation(location) {
    const apiConfig = Amplify._config.aws_cloud_logic_custom.find(({name}) => name === 'AdminQueries');
    return assign({
        path: '/admin/proxy',
        port: 443,
        protocol: 'https://',
        hostname: (apiConfig ? apiConfig.endpoint : '').replace('https://',''),
    }, location || {});
}

export function proxyRequests(service, options) {
    options = options || {};
    const setupRequestListeners = service.setupRequestListeners;

    service.setupRequestListeners = function(request) {
        // Set up existing request listeners
        setupRequestListeners.call(service, request);

        // Remove signer / credentials validation
        request.toUnauthenticated();

        // Transform request into ALMAConsoleProxy compatible request
        request.onAsync('afterBuild', async function(request, callNextListener) {
            const location = extendLocation(options.location);
            const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
            fillProxyRequest(request.httpRequest, request, service, location, options, token);
            callNextListener();
        });
    };

    return service;
}

function fillProxyRequest(httpRequest, request, service, location, options, token) {
    let endpoint = options.useEndpointOverride ? service.endpoint : null;
    endpoint = options.useRequestEndpointOverride ? httpRequest.endpoint : endpoint;
    const body = createProxyPayload(request, endpoint, service.serviceIdentifier, options);

    httpRequest.method = 'POST';
    httpRequest.endpoint = location;
    httpRequest.path = location.path;
    httpRequest.body = body;
    httpRequest.headers = {
        'Content-Type': 'application/json',
        Authorization: token
    };
}

function determineContentString(httpRequest) {
    // DELETE and HEAD methods shouldn't have a body by RFC 7231 and GET methods by convention also.
    // Here we remove the body entirely in these cases to avoid it being serialized with any value.
    if ((httpRequest.method === 'GET') || (httpRequest.method === 'HEAD') || (httpRequest.method === 'DELETE')) {
        return undefined;
    } else {
        return httpRequest.body;
    }
}

function createProxyPayload(request, endpoint, serviceIdentifier) {
    const httpRequest = request.httpRequest;
    const params = request.params;

    return JSON.stringify({
        service: serviceIdentifier,
        params: params,
        contentString: determineContentString(httpRequest),
        operation: request.operation,
        region: httpRequest.region
    });
}

function assign(target, source) {
    const keys = Object.keys(source);
    for (let i = 0; i < keys.length; i++) {
        target[keys[i]] = source[keys[i]];
    }
    return target;
}

export function patchAwsSdk(sdk) {
    sdk.Service.prototype.proxyRequests = function(options) {
        return proxyRequests(this, options);
    };
}
