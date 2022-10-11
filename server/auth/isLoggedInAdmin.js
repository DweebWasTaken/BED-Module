/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        console.log('got nothing');
        res.status(401).send();
        return;
    }
    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
        if (error) {
            console.log('forbidden');
            res.status(403).send();
            return;
        }
        console.log(decodedToken);
        if (decodedToken.role === 'Admin') {
            next();
        } else {
            console.log('forbidden');
            res.status(403).send();
        }
        req.decodedToken = decodedToken;
    });
};