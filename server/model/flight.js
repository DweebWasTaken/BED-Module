/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/
const e = require('express')
var db = require('./databaseConfig.js')


var flightDB = {
    // Function to add new flight to the flight database
    newFlight: (flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price, flight_pic_url, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            // Check for errors
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                // SQL command to insert new flight data into flight table
                var sql = "insert into spair.flight (flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price, flight_pic_url) values (?, ?, ?, ?, ?, ?, ?, ?)"
                console.log(`RUNNING COMMAND: ${sql}`)
                connection.query(sql, [flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price, flight_pic_url], (err, result) => {
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

    // Function to get flight information based on origin and destination airport IDs
    findFlight: (originAirportId, destinationAirportId, embarkDate, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                // SQL Command to select flightid, flight code by origin airport id and destination airport id, replacing the ids with name of the airports by performing another selection by the airportids
                var sql = `select flightid, flightCode, (select name from airport where airportid = ?) as originAirport,
                (select name from airport where airportid = ?) as destinationAirport, embarkDate, travelTime, price,flight_pic_url from flight where flight.originAirport = ? and flight.destinationAirport = ? and embarkDate = ? `

                connection.query(sql, [originAirportId, destinationAirportId, originAirportId, destinationAirportId, embarkDate], (err, result) => {
                    connection.end()
                    console.log(`RUNNING COMMAND: ${sql}`)
                    console.log(`PARAMETERS: ${originAirportId}, ${destinationAirportId}, ${embarkDate}`)
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },


    // Function to delete flights and their related bookings from the database
    deleteFlight: (flightid, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                // SQL statement to delete flight based on flightid
                var sql = "delete from flight where flightid = ?"
                connection.query(sql, [flightid], (err, result) => {
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





    // Function to search flights by airline code search query and sort according to form values
    searchFlights: (searchQuery, sort, callback) => {
        var connection = db.getConnection()
        connection.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {


                // SQL statement to select flight by airline code based on the search query
                var sql = `select flightid, flightCode, aircraft, (select name from airport where airportid = flight.originAirport) as originAirport1, 
                 flight.originAirport as originAirportId, (select name from airport where airportid = flight.destinationAirport) as destinationAirport1,
                  flight.destinationAirport as destinationAirportId, embarkDate, travelTime, price, flight_pic_url from flight  `

                connection.query(sql, [searchQuery], (err, result) => {
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


    // Function to get all flights from the flight database
    getAllFlights: (callback) => {
        // Establish a connection with the database
        var connection = db.getConnection()
        connection.connect((err) => {
            // If error from connection detected
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log("Connection established!")

                // SQL command to select all data from the flight table
                var sql = `select flightid, flightCode, aircraft, (select name from airport where airportid = flight.originAirport) as originAirport1,
            
                 (select name from airport where airportid = flight.destinationAirport) as destinationAirport1,embarkDate, travelTime, price, flight_pic_url, created_at from flight`

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


}


module.exports = flightDB