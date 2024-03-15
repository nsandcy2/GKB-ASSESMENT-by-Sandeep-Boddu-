// app.js

// Defined  api calls here
var submitApiUrl = 'http://127.0.0.1:5000/submit';


$(document).ready(function () {
    // Submit form data when the form is submitted
    $('#user-form').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission
        submitFormData();
    });

    // Function to submit form data via AJAX
    function submitFormData() {
        const name = $('#name').val();
        const email = $('#email').val();
        const age = $('#age').val();
        const dob = $('#dob').val();

        const userPayload = {
            name: name,
            email: email,
            age: age,
            dob: dob
        };

        // AJAX POST request to submit form data
        $.ajax({
            url: submitApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userPayload),
            success: function (response) {
                // Handle the response
                if (response.status === "success") {
                    alert(response.message); // Display success message
                    $('#user-form')[0].reset(); // Reset the form

                } else {
                    alert(response.message); // Display error message
                }
            },
            error: function (error) {
                console.error('Error:', error);
                alert('An error occurred.Make Sure Your Backend server Running Please try again.');
            }
        });
    }
});
//CODE WRITTEN BY SANDEEP B