Este projecto genera el backend de una simple app de almacenamiento de contactos en una base de datos.
La app permite guardar el nombre, apellido y numero(s) de telefono de los contactos.
Todos los usuarios tienen acceso a todos los contactos almacenados en la base de datos.

La app esta deployada en el siguiente servidor para realizarle peticiones HTTP (i.e con Postman): 

Rutas:

Sesion:
POST /user/register
Toma como input: {"user":UserName, "password":Password, "email":email}

POST /user/login
Toma como input: {"user":UserName, "password":Password}
El token generado por esta peticion deberá ser incluido como header en todos los otros request


Contactos:
GET /api/contact
Retorna la información de todos los contactos de la base de datos

GET /api/contact/:id
Retorna la información del contacto seleccionado de la base de datos

POST /api/contact
Toma como input: {"nombre":ContactName, "apellido":LastName, telefono:["tel1","tel2", ...]}
Almacena el contacto en la base de datos de acuerdo con el objeto JSON indicado

DELETE /api/contact/:id
Elimina el contacto indicado de la base de datos

PUT /api/contact/:id
Toma como input: {"nombre":ContactName, "apellido":LastName, telefono:["tel1","tel2", ...]}
Edita el contacto indicado en la base de datos de acuerdo con el objeto JSON indicado.
Los pares de clave valor en el ejemplo son opcionales. Pueden pasarse solo los campos que se quieren editar. 