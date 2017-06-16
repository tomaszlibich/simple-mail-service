const fs = require('fs-extra'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    api = require('./api'),
    cors = require('./cors'),
    responder = require('./responder'),
    httpPort = process.env.SERVER_PORT || 5000,
    httpsPort = process.env.SECURE_SERVER_PORT || 5001,
    fileId = '[boot]',
    serverKeyPath = './ssl/server.key',
    serverCertPath = './ssl/server.crt',
    serverKeyExists = require('fs-extra').existsSync(serverKeyPath) ? true : false, //eslint-disable-line no-sync
    serverCertExists = require('fs-extra').existsSync(serverCertPath) ? true : false; //eslint-disable-line no-sync

let privateKey, certificate, sslOptions;

if (serverKeyExists && serverCertExists) {
    console.log(fileId, 'server.key and server.crt files detected, loading...');
    privateKey = fs.readFileSync(serverKeyPath, 'utf8'), //eslint-disable-line
    certificate = fs.readFileSync(serverCertPath, 'utf8'), //eslint-disable-line
    sslOptions = {
        key: privateKey,
        cert: certificate,
        requestCert: false,
        rejectUnauthorized: false
    };
}

class Boot {
    init() {
        app.use(cors);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        http.createServer(app).listen(httpPort, () => {
            console.log(`${fileId} Running http server on port ${httpPort}`);
        });

        https.createServer(sslOptions, app).listen(httpsPort, () => {
            console.log(`${fileId} Running https server on port ${httpsPort}`);
        });

        app.post('/api/mail/', api.handle);
        app.use((request, response, next) => {
            responder.reject(response);
            next();
        });
    }
}

module.exports = new Boot();
