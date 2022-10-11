/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

var jwt = require("jsonwebtoken") // Load jsonwebtoken library 
const JWT_SECRET = process.env.JWT_SECRET; // Load secret key from config.js


var verifyToken = (req, res, next) => {
    console.log("Running verfiyToken function!")
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        res.status(401).send({ "Message": "Unauthorized!" })
        return
    } else {
        const token = authHeader.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET, { algorithms: "HS256", expiresIn: 86400 }, (err, decodedToken) => {
            if (err) {
                res.status(401).send({ "Message": "Unauthorized!" })
                return
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
}
module.exports = verifyToken;