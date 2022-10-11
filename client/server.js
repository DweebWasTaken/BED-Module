/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

const express = require("express");
const app = express();
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/login/", (req, res) => {
    res.sendFile("/public/html/login.html", { root: __dirname });
});

app.get("/profile", (req, res) => {
    res.sendFile("/public/html/profile.html", { root: __dirname });
});



app.get("/register/", (req, res) => {
    res.sendFile("/public/html/register.html", { root: __dirname });
});

app.get("/admin", (req, res) => {
    res.sendFile("/public/html/admin.html", { root: __dirname });
});

app.get("/searchflight", (req, res) => {
    res.sendFile("/public/html/searchflight.html", { root: __dirname });
});

app.get("/flightdetails", (req, res) => {
    res.sendFile("/public/html/flightdetails.html", { root: __dirname })
})

app.get("/searchflight2", (req, res) => {
    res.sendFile("/public/html/searchflight2.html", { root: __dirname });
});

app.get("*", (req, res) => {
    res.sendFile("/public/html/404.html", { root: __dirname });
});



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
});