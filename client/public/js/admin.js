/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/
const role = localStorage.getItem('role');



axios.post(`${baseurl}/authAdmin/`, {}, {
    headers: { authorization: localStorage.getItem('token') }
}).then(response => {
    console.log('Status Code: ', response.status);
    if (response.status != 200) {
        console.log('Non-admin User');
        localStorage.setItem('role', 'Customer');
        alert('Status 403: Forbidden');
        window.location.href = '/';

    } else {
        console.log('Admin User');
        localStorage.setItem('role', 'Admin');
    }
}).catch(error => {
    console.log('Non-admin User');
    localStorage.setItem('role', 'Customer');
    alert('Status 403: Forbidden');
    window.location.href = '/';
});