const mysql = require('mysql');
const util = require('util'); // Para convertir en promesas los queries a la db que si no funcionan como callbacks
const dotenv = require('dotenv');
dotenv.config();

var conn = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PW,
        database: process.env.DB
    }
);


let qy;

conn.connect(async (err) => {
    if(err) {
        console.log(err);
         return;
    }
    console.log("Connected to database");
    try {
        qy = util.promisify(conn.query).bind(conn);

        let table1query = "CREATE TABLE IF NOT EXISTS directorio "+
                            "(nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) "+
                            "NOT NULL, id INT AUTO_INCREMENT PRIMARY KEY );";
    
        let table2query = "CREATE TABLE IF NOT EXISTS telefonos "+
                            "(telefono VARCHAR(50) NOT NULL,"+
                            " tel_id INT AUTO_INCREMENT PRIMARY KEY,"+
                            " dir_id INT,"+
                            " FOREIGN KEY(dir_id) REFERENCES directorio(id) ON DELETE CASCADE);";
    
        let usuerTableQuery = "CREATE TABLE IF NOT EXISTS usuarios "+ 
                                  "(user VARCHAR(50) NOT NULL UNIQUE, "+
                                  "password VARCHAR(100) NOT NULL, "+
                                  "email VARCHAR(50) NOT NULL, "+
                                  "id INT AUTO_INCREMENT PRIMARY KEY);";
            
        let table1 = await qy(table1query);
        console.log("Table 1 created");
        let table2 = await qy(table2query);
        console.log("Table 2 created");
        let table3 = await qy(usuerTableQuery);
        console.log("Users table created");

    } catch(e){
        console.log(e.message);
    }
 
});

qy = util.promisify(conn.query).bind(conn);
module.exports = {
    conn,
    qy
}
