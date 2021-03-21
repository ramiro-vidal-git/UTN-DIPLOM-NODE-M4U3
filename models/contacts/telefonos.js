const {qy} = require('../db.js');

async function telefonosGet(personaId) {
    query = "SELECT telefono FROM telefonos WHERE dir_id = ?;";
    result = await qy(query, [personaId]);
    return result;
}

async function telefonosAdd(personaId, telefonos) {
for (tel in telefonos) {
        query = `INSERT INTO telefonos (dir_id, telefono) VALUES ("${personaId}", "${telefonos[tel]}")`;
        result = await qy(query);
    } 

}

async function telefonosDelete(personaId) {
    query = "DELETE FROM telefonos WHERE dir_id = ?;";
    await qy(query, [personaId]);
}

async function telefonosUpdate(personaId, telefonos) {
    let telefonosRegistro = await telefonosGet(personaId);
    let telefonosRegistroArr = [];
    for (tel in telefonosRegistro) {
        telefonosRegistroArr.push(telefonosRegistro[tel].telefono);
    }

    if (JSON.stringify(telefonosRegistroArr) == JSON.stringify(telefonos)) return;

    // Resto del código podria mejorarse para solo incluir nuevos numeros y solo borrar numeros no incluidos en el PUT
    await telefonosDelete(personaId);
    await telefonosAdd(personaId, telefonos);
}

module.exports = {
    telefonosAdd,
    telefonosGet,
    telefonosDelete,
    telefonosUpdate
}