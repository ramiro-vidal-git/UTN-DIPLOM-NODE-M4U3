const session = require('../models/session.js');

const auth = session.auth;

function register(req) {
    return session.register(req);
}

function login(req) {
    return session.login(req);
}

module.exports = {
    auth,
    login,
    register
}