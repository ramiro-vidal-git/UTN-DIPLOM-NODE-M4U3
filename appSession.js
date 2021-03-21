const express = require('express');
const service_session = require('./service/service_session.js');
const app = express.Router();


// Autenticacion
// Paso 1 Registracion
app.post('/register', async (req, res) => {
    try {
        let response = await service_session.register(req, res);
        res.send(response);
    } catch (e) {
    res.status(404).send({mensaje: e.message});
    }
});
// Paso 2 Log In
app.post('/login', async (req, res) => {
    try {
        const token = await service_session.login(req);
        res.send({token: token});
    } catch (e) {
    res.status(404).send({mensaje: e.message});
    }
});

module.exports = {
    app
}

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiVXN1YXJpbyIsImVtYWlsIjoiYWJjIiwiaWQiOjIsImlhdCI6MTYxNjMzNjQyOSwiZXhwIjoxNjE2NDIyODI5fQ.EFhr3IxwqCOrjNAcyhEnov_Jh4EWdcm0o1p_hQ6qOdM
*/