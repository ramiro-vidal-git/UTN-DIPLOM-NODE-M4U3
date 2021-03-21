const express = require('express');
const cors = require('cors');
const app = express();
const service_session = require('./service/service_session.js');
const rutasContactos = require('./appContacts.js');
const rutasSession = require('./appSession.js');
const port = process.env.PORT || 3000;

app.use(express.json()); // Para pasar todo lo que venga en JSON en los requests a objeto automaticamente
app.use(express.urlencoded({ extended: true })); // Para pasar a objeto las variabes de los queries
app.use(cors());

app.use(service_session.auth.unless({
    path: [
        {url: '/user/register', methods: ['POST']},
        {url: '/user/login', methods: ['POST']}
    ]
    })
);

app.use('/user', rutasSession.app);
app.use('/api', rutasContactos.app);


// ALL OTHER ROUTES //////////////////////////

app.all('*', async function(req, res) {

    res.send({mensaje: "Ruta no es parte de la API"});
});

// LISTEN /////////////////////////////////////////////////////////////////

app.listen(port, function(){
    console.log("Express has iniciated in port ",port,".");
});