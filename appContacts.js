const express = require('express');
const service_contacts = require('./service/service_contacts.js');
const app = express.Router();

// POST Requests /////////////////////////////////////////////////////////

/* POST/contact receives {nombre: string, apellido: string, telefono:[]}
 * returns {id: int, nombre: string, apellido: string, telefono: []}
*/
app.post('/contact', async function(req, res) {
    
    try {
        let response = await service_contacts.contactPost(req);
        res.send(response);
    } catch (e) {
        res.status(404).send({mensaje: e.message});
    }
    
});


// GET Requests /////////////////////////////////////////////////////////

// GET/contact returns list of all contacts as {id: int, nombre: string, apellido: string, telefono1: [+()0-9], telefono2: [+()0-9], ... }
app.get('/contact', async function(req, res) {
    try {
        let response = await service_contacts.contactList();
        res.send(response);
    } catch (e) {
        res.status(404).send({mensaje: e.message});
    }
});


// GET/contact/:id returns {id: int, nombre: string, apellido: string, telefono1: [+()0-9], telefono2: [+()0-9], ... }

app.get('/contact/:id', async function(req, res) {
    try {
        let response = await service_contacts.contactGet(req.params.id);
        res.send(response);
    } catch (e) {
        res.status(404).send({mensaje: e.message});
    }
});


// DELETE Requests /////////////////////////////////////////////////////////

app.delete('/contact/:id', async function(req, res) {
    try {
        let response = await service_contacts.deleteContact(req.params.id);
        res.send(response);
    } catch(e) {
        res.status(404).send({mensaje: e.message});
    }
});

// PUT Requests /////////////////////////////////////////////////////////
app.put('/contact/:id', async function(req, res) {
    try {
        let response = await service_contacts.contactUpdate(req);
        res.send(response);
    } catch(e) {
        res.status(404).send({mensaje: e.message});
    }
});


module.exports = {
    app
}