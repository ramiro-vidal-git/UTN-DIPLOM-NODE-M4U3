const personasModel = require('../models/contacts/personas.js');
const telefonosModel = require('../models/contacts/telefonos.js');

async function contactList() {
    let response = await personasModel.personasList();
    for (persona in response) {
        let telefonos = await telefonosModel.telefonosGet(response[persona].id);
        response[persona].telefono = [];
        for (tel in telefonos) {
            response[persona].telefono.push(result[tel].telefono);
        }   
    }    
    return response;
}

async function contactGet(id) {
    let response = await personasModel.personasGet(id);
    let telefonos = await telefonosModel.telefonosGet(id);
    response.telefono = [];
    for (tel in telefonos) {
        response.telefono.push(telefonos[tel].telefono);
    }
    return response;
}

async function contactPost(req) {
    let apellido = req.body.apellido.toUpperCase();
    let nombre = req.body.nombre.toUpperCase();
    let persona = {nombre: nombre, apellido: apellido};
    let response = {};

    let resultPersona = await personasModel.personasAdd(persona);
    let personaId = resultPersona.insertId; // Save contact id

    await telefonosModel.telefonosAdd(personaId, req.body.telefono);

    response.id = personaId; // Send contact id to front end
    for (let key in req.body) {
        response[key] = req.body[key];    
    }

    return response;   
}

async function deleteContact(id) {
    await telefonosModel.telefonosDelete(id);
    await personasModel.personasDelete(id);
    let response = {mensaje: "Contacto borrado correctamente"};

    return response; 
}

async function contactUpdate(req) {
    let personaRegistro = await personasModel.personasGet(req.params.id);   
    let apellido = req.body.apellido || personaRegistro.apellido;
    let nombre = req.body.nombre || personaRegistro.nombre;
    let persona = {nombre: nombre.toUpperCase(), apellido: apellido.toUpperCase()};

    let telefonoRegistro = await telefonosModel.telefonosGet(req.params.id);
    let telefonoRegistroArr = [];
    for (tel in telefonoRegistro) {
        telefonoRegistroArr.push(telefonoRegistro[tel].telefono);
    }
    let telefono = req.body.telefono || telefonoRegistroArr;
    persona.telefono = telefono;

    await personasModel.personasUpdate(req.params.id, persona);
    await telefonosModel.telefonosUpdate(req.params.id, telefono);

    response = {};
    response.registro = persona;
    response.registro.id = req.params.id;
    response.mensaje = "El registro se actualizó correctamente"
    return response;   
}

module.exports = {
    contactGet,
    contactPost,
    contactList,
    deleteContact,
    contactUpdate
}