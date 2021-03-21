const {qy} = require('./db.js');
const jwt = require('jsonwebtoken'); // Para generar los jwt para identificar las sessiones iniciadas
const bcrypt = require('bcrypt'); // Para encriptar contrasenas de las sessiones para la db
const unless = require('express-unless'); // Para verificar el jwt en todos los casos EXEPTO cuando el usuario se registra o logea

// Sesion ///////////////////////////////////

const auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            throw new Error("No estas logueado");
        }
    
        token = token.replace('Bearer ','');
    
        jwt.verify(token, 'Secret', (err, user) => {
            if(err) {
                throw new Error("Token invalido");
            }
        });
        next();
    } catch (e) {
        res.status(403).send({mensaje: e.message});
    }
}

auth.unless = unless;

/////////////////////////////

// Autenticacion
// Paso 1 Registracion
async function register(req) {

    if (!req.body.user || !req.body.password || !req.body.email) {
        throw new Error("No se enviaron todos los datos requeridos");
    }
    
    let result = await qy("SELECT * FROM usuarios WHERE user = ?;",[req.body.user]);
    if (result.length > 0) {
        throw new Error("Ya existe un usuario con ese nombre");
    }

    const pwCrypt = await bcrypt.hash(req.body.password, 10);

    result = await qy("INSERT INTO usuarios (user, password, email) VALUES (?, ?, ?);",[req.body.user, pwCrypt, req.body.email]);

    return {mensaje: "Se registró correctamente"};

}
// Paso 2 Log In
async function login(req) {

    if (!req.body.user || !req.body.password) {
        throw new Error("No se enviaron todos los datos requeridos");
    }
    
    const pwCrypt = await bcrypt.hash(req.body.password, 10);

    let result = await qy("SELECT * FROM usuarios WHERE user = ?;",[req.body.user]);
    if (result.length == 0) {
        throw new Error("El nombre de usuario o contraseña son incorrectos");
    }
    console.log(result[0]);
    console.log(pwCrypt);
    if (!bcrypt.compareSync(req.body.password, result[0].password)) {
        throw new Error("El nombre de usuario o contraseña son incorrectos");
    }

    const tokenData = {
        usuario: result[0].user,
        email: result[0].email,
        id: result[0].id
    }

    const token = jwt.sign(tokenData, 'Secret', {
        expiresIn: 60*60*24 // expires in 1d
    });

        return token;
}

module.exports = {
    auth,
    login,
    register
}