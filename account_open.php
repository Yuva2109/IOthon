<?php
include 'db.php'; // Including the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieving form data from POST request
    $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);

    // Server-side validation
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($phone)) {
        echo "All fields are required.";
        exit();
    }

    // Validating email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit();
    }

    // Password encryption using BCRYPT hashing
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Checking if the email already exists in the database
    $check_email_query = "SELECT email FROM users WHERE email = '$email'";
    $result = $conn->query($check_email_query);

    if ($result->num_rows > 0) {
        echo "An account with this email already exists.";
        exit();
    }

    // Inserting the user's data into the database
    $sql = "INSERT INTO users (first_name, last_name, email, password, phone) 
            VALUES ('$first_name', '$last_name', '$email', '$hashed_password', '$phone')";

    if ($conn->query($sql) === TRUE) {
        echo "Account opened successfully!";
        // Redirect to login page or another success page
        header('Location: login.html');
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Closing the database connection
    $conn->close();
}
?>
