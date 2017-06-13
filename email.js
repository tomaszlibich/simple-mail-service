const fileId = '[email]',
    emailjs = require('emailjs'),
    emailServer = emailjs.server.connect({
        user: process.env.EMAIL_SERVER_SETTINGS_USER,
        password: process.env.EMAIL_SERVER_SETTINGS_PASSWORD,
        host: process.env.EMAIL_SERVER_SETTINGS_HOST,
        ssl: false
    });

function emailCallback(error) {
    if (error) {
        let reason;

        switch (error.code) {
        case 4:
            reason = 'Timeout';
            break;
        default:
            reason = 'Unknown.';
            break;
        }

        console.log(fileId, 'An attempt to send email failed. Reason:', reason, error);
    } else {
        console.log(fileId, 'Email sent.');
    }
}

function sendEmail(params) {
    emailServer.send({
        from: params.from || process.env.DEFAULT_EMAIL_VALUES_FROM || 'No sender details',
        to: params.to || process.env.DEFAULT_EMAIL_VALUES_TO,
        cc: params.cc || process.env.DEFAULT_EMAIL_VALUES_CC || null,
        subject: params.subject || process.env.DEFAULT_EMAIL_VALUES_SUBJECT || 'No subject',
        text: params.message || process.env.DEFAULT_EMAIL_VALUES_MESSAGE || 'No message'
    }, emailCallback);
}

function send(params, callback) {
    const message = 'Email processed.';

    sendEmail(params);
    console.log(fileId, message);
    callback(message);
}

exports.send = send;

