module.exports = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'https://tomaszlibich.net');
    response.header('Access-Control-Allow-Origin', 'https://data-segment-148123.firebaseapp.com');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-system-access-key,withCredentials');

    if (request.method.toLowerCase() === 'options') {
        response.sendStatus(200);
    } else {
        next();
    }
};
