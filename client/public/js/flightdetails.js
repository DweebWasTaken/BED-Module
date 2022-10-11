/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/
const baseURL = "http://localhost:3000";

//const token = localStorage.getItem("token"); its declared
const loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"));
const role = localStorage.getItem("role");



const originAirport = parseInt(localStorage.getItem("originAirport"));
const destinationAirport = parseInt(localStorage.getItem("destinationAirport"));
const departdate = localStorage.getItem("departuredate");
const returndate = localStorage.getItem("returndate");

//formatted in json format for axios to send to API
const requestBody = {
    originAirportId: originAirport,
    destinationAirportId: destinationAirport,
    departdate: departdate,
    returndate: returndate,


};

//axtos will help to connect to controller API to get flight results
axios.post(`${baseURL}/flightDirect/`, requestBody)
    .then((response) => {

        const flight = response.data;
        //calls a function buildTable with flightdate in the parameter
        buildTable(flight)
            //function to append the html with flight results using a for Loop
        function buildTable(data) {
            console.log(data)
            var table = document.getElementById("myTable")
                //to get the flight details
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                    
                <td><img id="profile-pic" src="${data[i].flight_pic_url}" alt="flightPicture" class="img-fluid my-5 rounded-circle border border-dark" style="width: 100px; height: 100px;" ></td>
                <td>${data[i].originAirport}</td>
                <td>${data[i].destinationAirport}</td>
                <td>${data[i].embarkDate}</td>
                <td>${data[i].travelTime}</td>
                <td>${data[i].price}</td>
                <td><button class="btn btn-primary" onclick="bookFlight(${data[i].id})">Book</button></td>
                </tr>`
                table.innerHTML += row;
            }
        }
    }).catch((error) => {
        console.log(error);
    })