/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/



// import modules
const express = require('express');
var bodyParser = require('body-parser');
const multer = require("multer") // Load multer library for image file uploads
const path = require('path');
const cors = require('cors');
const jwt = require("jsonwebtoken") // Load jsonwebtoken library

// import self-made modules
var verifyToken = require('../auth/verifyToken.js');
const JWT_SECRET = process.env.JWT_SECRET;
const { verify } = require("crypto")

var user = require('../model/user.js');
var airport = require('../model/airport.js');
var flight = require('../model/flight.js');
const adminAuth = require('../auth/isLoggedInAdmin.js');
const isLoggedInAdmin = require('../auth/isLoggedInAdmin.js')


// create express object
var app = express();

// create url encoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// Middleware
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);



var storage = multer.diskStorage({
    // Decide which folder to save the file to
    destination: (req, file, callback) => {
        callback(null, "./image");
    },
    // Name to uploaded file within the destination
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        callback(null, fileName)
    }
})

// Multer handles the uploading of image file
const upload = multer({
    dest: 'image/', // Destination path of uploaded file
    storage: storage, // Where to store the uploaded file
    limits: { fileSize: 1000000 }, // File size limit of 1MB

    // Function to decide which files to accept or reject based on file types supported
    // Outputs errors into content if file is too large or invalid image file format 
    fileFilter: (req, file, callback) => {
        // List of image file types allowed
        filetypes = ['image/png', 'image/jpeg', 'image/jpg']
        if (filetypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(null, false)
            return callback(new Error("Only image files allowed!"))
        }
    }
})



///////////////////////////////////////////




// Endpoint #1: Using the POST method to add a new user to the database
app.post("/users/", upload.single('profile_pic_url'), (req, res) => {
    // Retrieve POST data field representing columns of data from the user table
    var username = req.body.username
    var email = req.body.email
    var contact = req.body.contact
    var password = req.body.password
    var role = req.body.role

    // Log all user data requested
    console.log("[REQUEST BODY]")
    console.log(req.body)

    // Check if file exists
    if (req.file) {
        console.log("[IMAGE CONTENTS]")
        console.log(req.file)
            // Set the profile pic URL to the file path and link 
        var profile_pic_url = 'http://localhost:3000/image' + req.file.originalname.toLowerCase().split(' ').join('-')
    } else {
        var profile_pic_url = 'http://localhost:3000/default.png'
    }

    // Function to add a new user and its data fields into the database
    user.addUser(username, email, contact, password, role, profile_pic_url, (err, result) => {
        // Checking for errors. Output erorr code 500 if error detected
        if (!err) {
            // Responds by sending the result insertId (primary key) via a JSON string 
            console.log("Inserted userid: " + result.insertId)
            res.status(201).send({ 'userid': result.insertId }) // Return error code 201
        } else if (err.errno === 1062) {
            // Checking for duplicate error of input data
            console.log("[ERROR DETECTED] 422")
            console.log("[422] Duplicate Entry Detected.")
            res.status(422).send({ "Error Message": "[422] Unprocessable Entity (Duplicated Entry Detected)" })
        } else {
            console.log("[ERROR DETECTED] 500")
            res.status(500).send({ "Error Message": "[500] Unknown Error" })
        }
    })
})

// Endpoint #2: Using the GET method to get array of all users from the database
app.get("/users/", verifyToken, (req, res) => {
    // Check for admin privileges
    if (req.decodedToken.role !== "Admin") {
        res.status(401).send({ "Message": "Unauthorized!" })
    } else {
        // Perform function to retrieve all users from user database
        user.getAllUsers((err, result) => {
            if (!err) {
                res.status(200).send(result)
            } else {
                console.log("[ERROR DETECTED] 500")
                res.status(500).send({ "Error Message": "[500] Unknown Error" })
            }
        })
    }

})

// Endpoint #3: Using the GET method to retrieve user data by userid
app.get("/users/:id", verifyToken, (req, res) => {
        // Retrieve the userid from the request parameters
        var userid = req.params.id
            // Check if userid equals to logged in userid
        if (req.decodedToken.userid != userid) {
            res.status(401).send({ "Message": "Unauthorized!" })
        } else {
            user.getUserByID(userid, (err, result) => {
                // Check for errors
                if (!err) {
                    res.status(200).send(result)
                } else {
                    console.log("[ERROR DETECTED] 500")
                    res.status(500).send({ "Error Message": "[500] Unknown Error" })
                }
            })
        }
    })
    // Endpoint #4: Using the PUT method to update user data by userid
app.put("/users/:id", verifyToken, upload.single('profile_pic_url'), (req, res) => {
        // Get user data from request parameters
        var userid = req.params.id
        var username = req.body.username
        var email = req.body.email
        var contact = req.body.contact
        var profilePic = req.body.profile_pic_url

        // Check userid to ensure user is only updating their own account
        if (isNaN(userid) || userid === undefined) {
            res.status(400).send({ "Message": "Bad Request Error" })
        } else if (userid != req.decodedToken.userid) {
            console.log(userid)
            console.log(req.decodedToken)
            res.status(401).send({ "Message": "Unauthorized!" })
        } else {
            console.log("[REQUEST BODY]")
            console.log(req.body)

            // Check if new file exists
            if (req.file) {
                // Output the contents of the image file object if upload detected
                console.log("[IMAGE CONTENTS]")
                console.log(req.file)

                // Set the profile pic URL to the file path and link 
                var profile_pic_url = 'http://localhost:3000/image/' + req.file.originalname.toLowerCase().split(' ').join('-')

            } else {
                console.log("No image found! Using a default icon instead!")
                var profile_pic_url = profilePic
            }

            // Initiate function to update user by userid
            user.updateUser(userid, username, email, contact, profile_pic_url, (err, result) => {
                // Check for errors
                if (!err) {
                    res.status(204).send(result)
                } else if (err.errno == 1062) {
                    console.log("[ERROR DETECTED] 422")
                    console.log("[422] Duplicate Entry Detected.")
                    res.status(422).send("[422] Unprocessable Entity (Duplicated Entry Detected)")
                } else {
                    console.log("[ERROR DETECTED] 500")
                    res.status(500).send({ "Error Message": "[500] Unknown Error" })
                }
            })
        }
    })
    ////////////////////////////////////////////////////////////////////////////
app.post("/login", (req, res) => {
    // Get username and password from the request body
    var email = req.body.email
    var password = req.body.password

    // Perform function to handle the user login
    user.userLogin(email, password, (err, result) => {
        if (err) {
            res.status(500).send({ "Error Message": "[500] Unknown Error" })
            return
        }
        if (result === null) {
            // Return error code 404 if unauthorized
            res.status(401).send({ "Message": "Unauthorized!" })
            return
        } else {
            // Create the payload
            const payload = {
                userid: result[0].userid,
                role: result[0].role
            }

            // Sign the payload with the secret key with SHA256
            jwt.sign(payload, JWT_SECRET, { algorithm: "HS256", expiresIn: 86400 }, (err, token) => {
                if (err) {
                    console.log(err)
                    res.status(401).send({ "Message": "Unauthorized!" })
                    return
                }
                res.status(200).send({
                    token: token,
                    userid: result[0].userid,
                    role: result[0].role
                })
            })
        }
    })
})


// authenticate admin
app.post('/authAdmin', (req, res) => {
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader == null || authHeader == undefined) {
        console.log('token is empty');
        res.status(403).send();
        return
    }
    let token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, { algorithm: ['HS256'] }, (error, decodedToken) => {
        if (error) {
            res.status(403).send();
            return
        }
        if (decodedToken.role != 'Admin') {
            res.status(403).send();
            return
        } else {
            res.status(200).send();
            return
        }
    });
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Airport Endpoints

// Endpoint #5: Using the POST method to insert a new airport and its data into the database
app.post("/airport/", verifyToken, (req, res) => {
    console.log("[RUNNING ENDPOINT] POST http://localhost:8081/airport/")
        // Check for admin privileges
    if (req.decodedToken.role !== "Admin") {
        res.status(401).send({ "Message": "Unauthorized!" })
    } else {
        // Retrieve POST data field representing columns of airport table in sp_air database
        var name = req.body.name
        var country = req.body.country
        var description = req.body.description

        console.log("[REQUEST BODY]")
        console.log(req.body)

        // Initiate addAirport function to add new airport data into airport table
        airport.addAirport(name, country, description, (err, result) => {
            if (!err) {
                res.status(204).send(result)
            } else if (err.errno == 1062) {
                // Output error code 422 if duplicate entries found in database
                console.log("[ERROR DETECTED] 422")
                console.log("[422] Duplicate Entry Detected.")
                res.status(422).send({ "Error Message": "[422] Unprocessable Entity (Duplicated Entry Detected)" })
            } else {
                console.log("[ERROR DETECTED] 500")
                res.status(500).send({ "Error Message": "[500] Unknown Error" })
            }
        })
    }
})

// Endpoint #6: Using the GET method to extract all data from the airport database
app.get("/airport/", (req, res) => {
    // Retreive airport request body data
    airport.getAllAirports((err, result) => {
        if (!err) {
            res.status(200).send(result)
        } else {
            console.log("[ERROR DETECTED] 500")
            res.status(500).send({ "Error Message": "[500] Unknown Error" })
        }
    })
})

// Endpoint to get airport information by airportid
app.get("/airport/:airportid", (req, res) => {
        // Get airportid parameters
        var airportid = req.params.airportid

        // Run function to get airport by airportid
        airport.getAirportById(airportid, (err, result) => {
            if (!err) {
                console.log(result)
                res.status(200).send(result)
            } else {
                console.log(err)
                res.status(500).send({ "Error Message": "[500] Unknown Error" })
            }
        })
    })
    //////////////////////////////////////////////////////////////////////////



//Question 7

// Endpoint #7: Using the POST method to add new flight data to the flight database
app.post("/flight/", verifyToken, upload.single("flight_pic_url"), (req, res) => {
    // Check for admin privileges
    if (req.decodedToken.role !== "Admin") {
        res.status(401).send({ "Message": "Unauthorized!" })
    } else {
        // Retrieve POST flight data from request body
        var flightCode = req.body.flightCode
        var aircraft = req.body.aircraft
        var originAirport = req.body.originAirport
        var destinationAirport = req.body.destinationAirport
        var embarkDate = req.body.embarkDate
        var travelTime = req.body.travelTime
        var price = req.body.price
            // Check if file exists
        if (req.file) {
            // Output the contents of the image file object if upload detected
            console.log("[IMAGE CONTENTS]")
            console.log(req.file)
                // Set the profile pic URL to the file path and link 
            var flight_pic_url = 'http://localhost:3000/image/' + req.file.originalname.toLowerCase().split(' ').join('-')
        } else {
            var flight_pic_url = 'http://localhost:3000/default.png'
        }

        // Ensure no duplicate airports found
        if (originAirport === destinationAirport) {
            res.status(422).send({ "Error Message": "[422] Unprocessable Entity (Duplicated Entry Detected)" })
        }
        // Function to create a flight in the flight database
        flight.newFlight(flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price, flight_pic_url, (err, result) => {
            if (!err) {
                console.log("Inserted flightid " + result.insertId)
                res.status(201).send({ 'flightid': result.insertId }) // Return error code 201
            } else if (err.errno === 1062) {
                res.status(422).send({ "Error Message": "[422] Unprocessable Entity (Duplicated Entry Detected)" })
            } else {
                console.log("[ERROR DETECTED] 500")
                res.status(500).send({ "Error Message": "Airport does not exist!" })
            }
        })
    }
})


// Endpoint to get ALL flights
app.get("/flight", (req, res) => {
    // Perform function to get all flights from flight database
    flight.getAllFlights((err, result) => {
        if (!err) {
            console.log(result)
            res.status(200).send(result)
        } else {
            res.status(500).send({ "Error Message": "[500] Unknown Error" })
        }
    })
})


//Question 8
app.get("/flightDirect/:originAirportId/:destinationAirportId", (req, res) => {
    // do not need cuz params doenst have :flightid
    // var id = (req.params.flightid); 
    var originAirportId = req.params.originAirportId
    var destinationAirportId = req.params.destinationAirportId
        // since  dont need id then the getFlightDirect dont need id
    flight.searchFlights(originAirportId, destinationAirportId, (err, result) => {
        if (err) {
            res.status(500).send(`{"Condition": "Unknown Error"}`);
            return;
        }
        if (result.length === 0) {
            res.status(200).send(`{"Condition": "No flight found"}`);
            return;
        } else {
            res.status(201).send(result);
            return;
        }
    });
});


app.post("/flightDirect/", function(req, res) {
    var originAirportId = req.body.originAirportId
    var destinationAirportId = req.body.destinationAirportId
    var embarkDate = req.body.departdate

    flight.findFlight(originAirportId, destinationAirportId, embarkDate, (err, result) => {
        if (err) {
            res.status(500).send(`{"Condition": "Unknown Error"}`);
            return;
        }
        if (result.length === 0) {
            res.status(200).send(`{"Condition": "No flight found"}`);
            return;
        } else {
            res.status(201).send(result);
            return;
        }
    })
})












module.exports = app;