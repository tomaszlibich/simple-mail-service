const emailHandler = require('./email'),
    responder = require('./responder');

class Api {
    handle(request, response) {

        if (!request.body) {
            responder.reject(response);
            return;
        }

        const {
            author,
            email,
            subject,
            message,
            to,
            cc
        } = request.body;

        if (!author || !email || !subject || !message) {
            responder.reject(response);
            return;
        }

        emailHandler.send({
            from: `${author} ${email}`,
            to,
            cc,
            subject,
            message
        }, (result) => {
            responder.send(response, {
                status: 200,
                data: {
                    result
                }
            });
        });
    }
}

module.exports = new Api();
