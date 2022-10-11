/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

//import modules
var mysql = require('mysql');



const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

var dbConnect = {

    getConnection: function() {
        var conn = mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_DATABASE,
                multipleStatements: true,
                dateStrings: true
            }

        );

        return conn;

    }
}
module.exports = dbConnect;