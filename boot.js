const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    api = require('./api'),
    cors = require('./cors'),
    responder = require('./responder'),
    port = process.env.SERVER_PORT || 5000,
    fileId = '[boot]';

class Boot {
    init() {
        app.use(cors);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.post('/api/mail/', api.handle);
        app.use((request, response, next) => {
            responder.reject(response);
            next();
        });

        http.createServer(app).listen(port, () => {
            console.log(`${fileId} Running http server on port ${port}`);
        });
    }
}

module.exports = new Boot();
