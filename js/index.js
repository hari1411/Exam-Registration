// Function to validate individual fields
function validateField(id, regex, errorMessage) {
    const field = document.getElementById(id);
    const errorField = document.getElementById(id + 'Error');
    if (!regex.test(field.value)) {
        errorField.textContent = errorMessage;
        field.classList.add('error');
        return false;
    } else {
        errorField.textContent = '';
        field.classList.remove('error');
        return true;
    }
}

// Function to validate password
function validatePassword() {
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const errorField = document.getElementById('passwordError');

    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{8,}$/;
    
    if (!regex.test(password)) {
        errorField.textContent = "Password must be at least 8 characters, include an uppercase letter, and a special character.";
        return false;
    } else if (password.includes(firstName) || password.includes(lastName)) {
        errorField.textContent = "Password should not include First Name or Last Name.";
        return false;
    } else {
        errorField.textContent = '';
        return true;
    }
}

// Function to validate confirm password
function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorField = document.getElementById('confirmPasswordError');
    
    if (confirmPassword !== password) {
        errorField.textContent = "Passwords do not match.";
        return false;
    } else {
        errorField.textContent = '';
        return true;
    }
}

// Function to check if terms are accepted
function validateTerms() {
    const terms = document.getElementById('terms').checked;
    const errorField = document.getElementById('termsError');

    if (!terms) {
        errorField.textContent = "You must accept the terms and conditions.";
        return false;
    } else {
        errorField.textContent = '';
        return true;
    }
}

// Function to show full terms and conditions
function showFullTerms() {
    const termsText = document.getElementById('termsText');
}

// Function to submit the form and navigate to the exam page
function submitForm() {
    const isFirstNameValid = validateField('firstName', /^[a-zA-Z]+$/, 'First name should only contain characters');
    const isLastNameValid = validateField('lastName', /^[a-zA-Z]+$/, 'Last name should only contain characters');
    const isEmailValid = validateField('email', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email');
    const isContactValid = validateField('contact', /^[0-9]+$/, 'Contact number should only contain numbers');
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const areTermsValid = validateTerms();

    if (isFirstNameValid && isLastNameValid && isEmailValid && isContactValid && isPasswordValid && isConfirmPasswordValid && areTermsValid) {
        // Navigate to the exam page on successful validation
        window.location.href = "exam.html"; // Replace with the correct path to your exam page
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('registrationForm').reset();
    // Optionally clear error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((errorMessage) => errorMessage.textContent = '');
}
