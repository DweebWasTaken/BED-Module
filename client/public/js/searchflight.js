/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

$('.plus').click(function() {
    let counter = $(this).siblings().filter('input').val();
    counter++;
    $(this).siblings().filter('input').val(counter);
    return false;
});

$('.minus').click(function() {
    let counter = $(this).siblings().filter('input').val();
    if (counter > 0) {
        counter--;
        $(this).siblings().filter('input').val(counter);
    }
    return false;
});



const baseURL = "http://localhost:3000"
    //const token = localstorage.getItem("token");
    // const role = localstorage.getItem("role");



axios.get(`${baseURL}/airport`)
    .then((response) => {
        const airports = response.data;

        for (let i = 0; i < airports.length; i++) {
            const airport = airports[i];

            const html = `
    <option value="${airport.airportid}">${airport.name}</option>
    `;
            $("#originAirport").append(html);
            $("#destinationAirport").append(html);
        }
    })
    .catch((error) => {
        console.log(error);
    });




$("form#flight-form").submit(function(event) {
    event.preventDefault()

    var originAirport = $("#originAirport").val();
    var destinationAirport = $("#destinationAirport").val();
    var departuredate = $("#departuredate").val();
    var returndate = $("#returndate").val();


    console.log(originAirport)
    console.log(destinationAirport)
    console.log(departuredate)
    console.log(returndate)


    localStorage.setItem("originAirport", originAirport);
    localStorage.setItem("destinationAirport", destinationAirport);
    localStorage.setItem("departuredate", departuredate);
    localStorage.setItem("returndate", returndate);
    console.log("yo")
    window.location.replace("/flightdetails");
    console.log("yo2")


});