// Validate form fields before submission
function validateForm(event, formType) {
    // Stop form submission until validation is completed
    event.preventDefault();

    let valid = true;
    let errors = [];

    // Common fields for all forms
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let phone = document.getElementById('phone');

    // Additional fields based on form type
    let loanAmount = document.getElementById('loanAmount');
    let paymentAmount = document.getElementById('paymentAmount');

    // Validate First Name
    if (firstName && firstName.value.trim() === "") {
        valid = false;
        errors.push("First name is required.");
    }

    // Validate Last Name
    if (lastName && lastName.value.trim() === "") {
        valid = false;
        errors.push("Last name is required.");
    }

    // Validate Email
    if (email && !validateEmail(email.value)) {
        valid = false;
        errors.push("Invalid email address.");
    }

    // Validate Password (for Register, Account Opening, and Login)
    if (password && (password.value.length < 8 || !validatePassword(password.value))) {
        valid = false;
        errors.push("Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one digit, and one special character.");
    }

    // Validate Phone Number
    if (phone && !validatePhone(phone.value)) {
        valid = false;
        errors.push("Invalid phone number.");
    }

    // Validate Loan Amount (for Loan Application)
    if (formType === "loan" && loanAmount && isNaN(loanAmount.value)) {
        valid = false;
        errors.push("Loan amount must be a valid number.");
    }

    // Validate Payment Amount (for Online Payment)
    if (formType === "payment" && paymentAmount && isNaN(paymentAmount.value)) {
        valid = false;
        errors.push("Payment amount must be a valid number.");
    }

    // Show errors or submit the form
    if (valid) {
        event.target.submit();
    } else {
        alert(errors.join("\n"));
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Password validation function
function validatePassword(password) {
    // Check if password contains at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Phone validation function
function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;  // International phone format (E.164)
    return re.test(phone);
}

// Add event listeners to forms for validation
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("#registerForm");
    const loginForm = document.querySelector("#loginForm");
    const accountOpenForm = document.querySelector("#accountOpenForm");
    const loanForm = document.querySelector("#loanForm");
    const paymentForm = document.querySelector("#paymentForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => validateForm(e, "register"));
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => validateForm(e, "login"));
    }

    if (accountOpenForm) {
        accountOpenForm.addEventListener("submit", (e) => validateForm(e, "account"));
    }

    if (loanForm) {
        loanForm.addEventListener("submit", (e) => validateForm(e, "loan"));
    }

    if (paymentForm) {
        paymentForm.addEventListener("submit", (e) => validateForm(e, "payment"));
    }
});
