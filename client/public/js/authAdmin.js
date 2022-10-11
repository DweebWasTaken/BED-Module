/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

let baseurl = 'http://localhost:3000';
let token = localStorage.getItem('token');


if (token != undefined && token != null) {
    axios.post(`${baseurl}/authAdmin/`, {}, {
        headers: {
            authorization: token
        }
    }).then(response => {
        console.log('Admin User');
        localStorage.setItem('role', 'Admin');
        $(' <li><a href="/admin">Admin</a></li>').insertBefore('#admintab');
    }).catch(error => {
        console.log('Customer User')
        console.log(localStorage.setItem)
        localStorage.setItem('role', 'Customer');

    });
}