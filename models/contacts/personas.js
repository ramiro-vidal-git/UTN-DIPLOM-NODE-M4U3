const {qy} = require('../db.js');

async function personasList() {
    let query = "SELECT id, nombre, apellido FROM directorio;";
    let result = await qy(query);
    if (result.length == 0) {
        throw new Error("No se encontraron registros");
    } 
    let response = result;  
    return response;
}

async function personasGet(id) {
    let query = "SELECT id, nombre, apellido FROM directorio WHERE id = ?;";
    let result = await qy(query, [id]);
    if (result.length == 0) {
        throw new Error("No se encontraron registros con ese id");
    } 
    let response = result[0];  
    return response;
}

async function personasAdd(persona) {
    let query = `SELECT * FROM directorio WHERE nombre = "${persona.nombre}" AND apellido = "${persona.apellido}";`;
    
    let result = await qy(query);
    
    if (result.length != 0) {
        throw new Error("El contacto que intentó crear ya existe.");
    }

    query = `INSERT INTO directorio (nombre, apellido) VALUES ("${persona.nombre}", "${persona.apellido}")`;

    result = await qy(query);
    return result;   
}

async function personasDelete(id) {
    let query = "SELECT id, nombre, apellido FROM directorio WHERE id = ?;";
    let result = await qy(query, [id]);
    if (result.length == 0) {
        throw new Error("No se encontraron registros con ese id");
    }
    query = "DELETE FROM directorio WHERE id = ?;";
    await qy(query, [id]);    
}

async function personasUpdate(id, persona) {
    let query = `UPDATE directorio SET nombre="${persona.nombre}", apellido="${persona.apellido}" WHERE id=${id};`;
    await qy(query);
}

module.exports = {
    personasGet,
    personasAdd,
    personasList,
    personasDelete,
    personasUpdate
}