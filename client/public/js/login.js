/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

// Script to disable form submissions if there are empty fields 

(() => {
    'use strict'
    window.addEventListener('load', () => {
        // Get all forms that have custom validation
        var forms = document.getElementsByClassName("needs-validation")

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, (form) => {
            form.addEventListener('submit', (event) => {
                if (form.checkValidity() == false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    }, false)
})()


// jQuery and Axios Script to process login information of user 

const baseURL = "http://localhost:3000"
$("#login-form").submit((event) => {
    // Prevent the page from loading
    event.preventDefault()

    // Get submitted email and password
    const email = $("#email").val()
    const password = $("#password").val()
    const requestBody = {
        email: email,
        password: password
    }

    axios.post(`${baseURL}/login`, requestBody)
        // Store login information (token and userid of logged in user) into local storage
        .then((response) => {
            const token = response.data.token
            const loggedInUserID = response.data.userid
            const role = response.data.role
            localStorage.setItem("token", token)
            localStorage.setItem("loggedInUserID", loggedInUserID)
            localStorage.setItem("role", role)
            window.location.href = "/"
        })
        // Capture errors if any
        .catch((error) => {
            alert("Invalid email or password!")
            console.log(error)
        })
})