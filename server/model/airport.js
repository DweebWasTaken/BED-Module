/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

var db = require('./databaseConfig.js')


var airportDB = {
    // Function to add a new airport to airport database (args: name of airport, country of airport and description)
    addAirport: (name, country, description, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check for errors
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")
                    // SQL Command to insert new row of values into sp_air.airport table
                var sql = "insert into spair.airport (name, country, description) values (?, ?, ?)"
                console.log(`RUNNING COMMAND: ${sql}`)
                connection.query(sql, [name, country, description], (err, result) => {
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

    // Function to get all airports from the airport database (args: callback)
    getAllAirports: (callback) => {
        // Connect to the database
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check error connection
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")

                // SQL command to select all data from the airport table
                var sql = "select * from spair.airport"
                console.log(`RUNNING COMMAND: ${sql}`)

                // Query the database
                connection.query(sql, (err, result) => {
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

    // unused since no time
    deleteAirport: (airportid, callback) => {
        // Connect to the database
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check error connection
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")

                // SQL command to select all data from the airport table
                var sql = "delete from airport where airportid = ?"
                console.log(`RUNNING COMMAND: ${sql}`)

                // Query the database
                connection.query(sql, [airportid], (err, result) => {
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

    // added for futre use
    getAirportById: (airportid, callback) => {
        // Connect to the database
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check error connection
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")

                // SQL command to select airport row by airportid
                var sql = "select * from airport where airportid = ?"
                console.log(`RUNNING COMMAND: ${sql}`)

                // Query the database
                connection.query(sql, [airportid], (err, result) => {
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
    }
}


module.exports = airportDB