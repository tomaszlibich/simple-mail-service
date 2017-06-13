'use strict';

class Responder {

    constructor() {
        this.badRequestParams = {
            'status': 400,
            'error': 'Bad request',
            'type': 'text/plain'
        };

        this.badGatewayParams = {
            status: 502,
            error: 'bad gateway'
        };

        this.unauthorizedRequestParams = {
            'status': 401,
            'error': 'Unauthorized',
            'type': 'text/plain'
        };

        this.notFoundParams = {
            status: 404,
            error: 'not found'
        };
    }

    send(response, params, silent) {
        if (response) {
            if (params.status >= 200 && params.status < 300) {
                if (params.data) {
                    response.json(params.data);
                } else {
                    response.end();
                }
            } else {
                if (!silent) {
                    console.error('Request error:', params.status);
                }
                response.writeHead(params.status, {
                    'Content-Type': 'text/plain'
                });
                if (params.message || (params.data && params.data.message)) {
                    response.end(params.message || params.data.message);
                } else {
                    response.end();
                }
            }
        }
    }

    reject(response, silent) {
        this.send(response, this.badRequestParams, silent);
    }

    rejectNotFound(response) {
        this.send(response, this.notFoundParams);
    }

    rejectBadGateway(response) {
        this.send(response, this.badGatewayParams);
    }

    rejectUnauthorized(response) {
        this.send(response, this.unauthorizedRequestParams);
    }

}

module.exports = new Responder();
