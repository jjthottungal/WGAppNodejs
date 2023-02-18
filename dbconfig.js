
//Include enviroment variable package
require('dotenv').config();
//Package Declaration
const sql = require('mssql');
//DB Connectstring configuration

const config = {
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    server:  process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    parseJSON: true,
    options:{
        encrypt: false,
        //trustedconnection: true,
        //enableArithAbort : true, 
        trustServerCertificate: true,
        instancename : process.env.DB_INSTANCE
    },
    port: +process.env.DB_PORT // 2419 //ParseInt(process.env.DB_PORT) 
}

//Create connection pool promise
const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
 console.log('Connected to MSSQL')
 return pool
})
 .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

 module.exports = {
    poolPromise : poolPromise,
    sql : sql
 }

 //module.exports = config; 

/*
const config = {
    user : 'sa',
    password : 'pass',
    server: 'LAPTOP-8E2F0FIM',
    database: 'oberoney_general_db',
    options:{
        
        //trustedconnection: true,
        //enableArithAbort : true, 
        trustServerCertificate: true,
        instancename : 'SQLEXPRESS',
    },
    port: 1433
}

*/

