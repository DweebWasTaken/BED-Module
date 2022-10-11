/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/

// Script to disable form submissions if there are empty fields -->

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
                if ($("password").val() != $("confirm-password").val()) {
                    alert("Passwords do not match")
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    }, false)
})()


// jQuery and Axios Script to add new user information to user database -->

const baseURL = "http://localhost:3000"
$("#reg-form").submit((event) => {

    // Prevent the page from loading
    event.preventDefault()

    // Check passwords
    const password = $("#password").val()
    const confirmPassword = $("#confirm-password").val()
    if (password == confirmPassword && password !== '') {
        // Get user information 
        const username = $("#username").val()
        const email = $("#email").val()
        const contact = $("#contact").val()

        // Default profile pic is null, default.png icon shown in profile
        const profile_pic_url = null
        var role = null

        // Check email to give admin privileges
        var emailStringList = email.split("@")
        if (emailStringList[1] == "admin.com") {
            role = "Admin"
        } else {
            role = "Customer"
        }

        const requestBody = {
            username: username,
            email: email,
            contact: contact,
            password: password,
            role: role,
            profile_pic_url: profile_pic_url
        }

        // Axios POST method to create a new user and add to user database
        axios.post(`${baseURL}/users`, requestBody)
            // Add new user information to the user database
            .then((response) => {
                window.location.href = "/login"
            })
            // Catch Error Code 422 (Duplicate Entry Error) and output error message
            .catch((error) => {
                console.log(error.response)
                if (error.response.status === 422) {
                    alert(`The email (${email}) or username (${username}) you entered already exists! Please enter a unique input!`)
                    window.location.href = "/register"
                }
            })
    } else(
        alert("Password entered is invalid")
    )
})