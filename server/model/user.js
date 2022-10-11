/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

var db = require('./databaseConfig.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;


var userDB = {

    getAllUsers: (callback) => {

        var connection = db.getConnection()
        connection.connect((err) => {

            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")

                // SQL command to select all data from the user table
                var sql = `   SELECT * FROM users;`
                console.log(`RUNNING COMMAND: ${sql}`)

                connection.query(sql, (err, result) => {
                    connection.end()
                    if (err) {
                        console.log(err)
                            // Error detected, return callback function with error and null results
                        return callback(err, null)
                    } else {
                        // Result successfully retrieved and return callback with null error and result
                        console.log(result)
                        console.table(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },

    // Function to add a new user to the user table
    addUser: (username, email, contact, password, role, profile_pic_url, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check for errors
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")
                    // SQL Command to insert new row of values into sp_air.user table
                var sql = "insert into spair.users (username, email, contact, password, role, profile_pic_url) values (?, ?, ?, ?, ?, ?)"
                console.log(`RUNNING COMMAND: ${sql}`)
                connection.query(sql, [username, email, contact, password, role, profile_pic_url], (err, result) => {
                    connection.end()
                        // Second check of errors
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        console.table(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },

    // Function to retrieve a user data by its ID
    getUserByID: (userid, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")
                    // Insert userid into the SQL query to replace the ? sign
                var sql = "select userid, username, email, contact, role, profile_pic_url from spair.users where userid = ?"
                console.log(`RUNNING COMMAND: ${sql}`)
                connection.query(sql, [userid], (err, result) => {
                    connection.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        console.table(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },

    // Function to handle user login information
    userLogin: (email, password, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                // SQL Query to select user information based on username and password
                var sql = "select userid, username, email, contact, role, profile_pic_url from users where email = ? and password = ?"
                connection.query(sql, [email, password], (err, result) => {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    }
                    if (result.length === 0) {
                        // Return null value if no result found
                        console.log("No results found!")
                        return callback(null, null)
                    } else {
                        // Return user information (result[0])
                        console.log(result)
                        console.table(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },

    // Function to update user by userid
    updateUser: (userid, username, email, contact, profile_pic_url, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                // SQL query to update users by userid
                var sql = "update users set username = ?, email = ?, contact = ?, profile_pic_url = ? where userid = ?"
                connection.query(sql, [username, email, contact, profile_pic_url, userid], (err, result) => {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        console.table(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },



}

/*
-----------------------------------------------------------------------
EXPORT OF USER DATABASE FUNCTION OBJECT TO THE APP SCRIPT
-----------------------------------------------------------------------
*/
module.exports = userDB