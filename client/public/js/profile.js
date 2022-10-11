/*
  Name: Adeeb
  Class: DISM/FT/2B/23
  Group: None (Solo)
  Admin No: P2107095
*/
//Image Preview for Edit Profile Picture in Edit Profile Modal -->

function imagePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (event) => {
            $("#upload-photo").attr("src", event.target.result)
        }
        reader.readAsDataURL(input.files[0])
    }
}

// Redirect user to login page if not logged in -->

// Get token from the local storage
//var token = localStorage.getItem("token") //Token is already defined in the header of the page
var loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"))
    // Redirect if guest user clicks on profile
if (token === null || isNaN(loggedInUserID)) {
    window.location.assign("/login")
} else {
    $("#logout").click(() => {
        localStorage.clear()
        window.location.assign("/login")
    })

    $("#close").click(() => {
        window.location.reload()
    })
}

// Form Validation -->

(function() {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
// Append user information to the profile -->

const baseURL = "http://localhost:3000"

// Get information from user database and append to HTML information divs
axios.get(`${baseURL}/users/${loggedInUserID}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then((response) => {
        const user = response.data[0]
            // Append Email
        $("#email").append(`
                <strong><p>${user.email}</p></strong>
                `)
            // Append Username
        $("#username").append(`
                <strong><p>${user.username}</p></strong>
                `)
            // Append Contact
        $("#contact").append(`
                <strong><p>${user.contact}</p></strong>
                `)
            // Append Role
        $("#role").append(`
                <strong><p>${user.role}</p></strong>
                `)
            // Append Profile Pic
        $(".user-profile-pic").append(`
                <img id="profile-pic" src="${user.profile_pic_url}" alt="Profile Picture" class="img-fluid my-5 rounded-circle border border-dark" style="width: 100px; height: 100px;" />
                `)

        $(".user-profile-pic-2").append(`
                <img id="profile-pic" src="${user.profile_pic_url}" alt="Profile Picture" class="img-fluid my-5 rounded-circle border border-dark" style="width: 100px; height: 100px;" />
                `)

        // Pre-fill exisitng information in Edit Profile modal
        $("#change-username").append(`
                <input type="text" class="form-control" id="new-username" value=${user.username} required>
                `)
        $("#change-email").append(`
                <input type="text" class="form-control" id="new-email" value=${user.email} required>
                `)
        $("#change-contact").append(`
                <input type="text" class="form-control" id="new-contact" value=${user.contact} required>
                `)

        // Append the administrative panel button if user role is admin
        if (user.role === "Administrator") {
            $("#buttons").append(`
                    <a class="btn btn-primary m-1" href="/admin">Admin Panel<i class="fa-solid fa-hammer" style="padding-right:5px;"></i></a>
                    `)
        }
    })
    .catch((error) => {
        console.log(error)
    })

// Update User Profile -->

$("#edit-profile-form").submit((event) => {
    // Get userid
    const loggedInUserID = localStorage.getItem("loggedInUserID")

    // Prevent the page from loading
    event.preventDefault()

    // Get updated email, contact number and username
    const newEmail = $("#new-email").val()
    const newUsername = $("#new-username").val()
    const newContact = $("#new-contact").val()

    // Get new profile picture
    const newProfilePic = document.getElementById("upload-profile-pic").files[0]

    // Axios GET request to obtain information about logged in user
    axios.get(`${baseURL}/users/${loggedInUserID}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then((response) => {
            // Get user information
            const user2 = response.data[0]
            currentProfilePic = user2.profile_pic_url
            if (newEmail === '') {
                alert("Please fill in the email field!")
            } else {
                user2.email = newEmail
                if (newUsername === '') {
                    alert("Please fill in the username field!")
                } else {
                    user2.username = newUsername
                    if (newContact === '') {
                        alert("Please fill in the contact field!")
                    } else {
                        user2.contact = newContact
                            // If profile pic input is not undefined, use new profile pic
                            // If not, retain the current profile picture
                        if (newProfilePic !== undefined) {
                            user2.profile_pic_url = newProfilePic
                        } else {
                            user2.profile_pic_url = currentProfilePic
                        }
                        // Check if file uploaded is an image
                        var imageFormatList = ["image/png", "image/jpg", "image/jpeg"]
                        if (user2.profile_pic_url === newProfilePic) {
                            if (!(imageFormatList.includes(user2.profile_pic_url.type))) {
                                alert("Only upload image formats for profile picture (jpeg, png, jpeg)")
                            }
                        }

                        // Compile form data to be sent to backend server
                        var formData = new FormData()
                        formData.append("username", user2.username)
                        formData.append("email", user2.email)
                        formData.append("contact", user2.contact)
                        formData.append("profile_pic_url", user2.profile_pic_url)

                        // Axios PUT method to update user information to the user database
                        axios.put(`${baseURL}/users/${user2.userid}`, formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": "Bearer " + token
                                }
                            })
                            .then((response) => {
                                window.location.reload()
                            })

                        .catch((error) => {
                            if (error.response.status === 422) {
                                alert("Username or email already exists!")
                            }
                        })

                    }
                }
            }
        })

    .catch((error) => {
        console.log(error)
    })
})