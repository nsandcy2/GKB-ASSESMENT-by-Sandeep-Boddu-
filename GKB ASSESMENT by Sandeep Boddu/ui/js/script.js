// Define the URL of the backend API endpoint to fetch user data
var getAllUsersApiUrl = 'http://127.0.0.1:5000/getAllUsers';

$(document).ready(function () {
    // Function to fetch user data and populate the table
    function fetchUserData() {
        $.ajax({
            url: getAllUsersApiUrl,
            type: 'GET',
            success: function (data) {
                // Clear the existing table rows
                $('#user-table tbody').empty();

                // Iterate over each user in the data array
                data.forEach(function (user) {
                    // Create a new row in the table for each user
                    var row = '<tr>';
                    row += '<td>' + user.id + '</td>'; // ID
                    row += '<td>' + user.name + '</td>'; // Name
                    row += '<td>' + user.email + '</td>'; // Email
                    row += '<td>' + user.age + '</td>'; // Age
                    row += '<td>' + user.dob + '</td>'; // Date of Birth
                    row += '</tr>';
                    // Append the row to the tbody element of the table
                    $('#user-table tbody').append(row);
                });

            },
            error: function (error) {
                console.error('Error:', error);
                // Handle error if AJAX request fails
                alert('Failed to fetch user data. Please try again.');
            }
        });
    }

    // Call the fetchUserData function when the document is ready
    fetchUserData();

    // Event listener for the "View Users" button click
    $('#view-users').click(function () {
        // Call the fetchUserData function when the button is clicked
        fetchUserData();
        // Redirect to user.html only once after all data is loaded
        if (!window.location.href.includes('user.html')) {
            window.location.href = 'user.html';
        }
    });
});



//CODE WRITTEN BY SANDEEP B