document.addEventListener("DOMContentLoaded", function () {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var ageInput = document.getElementById("age");
    var dobInput = document.getElementById("dob");

    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    ageInput.addEventListener("blur", validateAge);

    function validateName() {
        var nameValue = nameInput.value.trim();
        if (nameValue === "") {
            showError("name", "Name cannot be empty.");
            return false;
        }
        hideError("name");
        return true;
    }

    function validateEmail() {
        var emailValue = emailInput.value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            showError("email", "Please enter a valid email address.");
            return false;
        }
        hideError("email");
        return true;
    }

    function validateAge() {
        var ageValue = ageInput.value.trim();
        if (isNaN(ageValue) || ageValue === "" || parseInt(ageValue) <= 0) {
            showError("age", "Age must be a positive integer.");
            return false;
        }
        hideError("age");
        return true;
    }

    function showError(inputId, errorMessage) {
        var errorElement = document.getElementById(inputId + "-error");
        if (errorElement) {
            errorElement.innerText = errorMessage;
            errorElement.style.display = "block";
        }
    }

    function hideError(inputId) {
        var errorElement = document.getElementById(inputId + "-error");
        if (errorElement) {
            errorElement.innerText = "";
            errorElement.style.display = "none";
        }
    }
});


//CODE WRITTEN BY SANDEEP B