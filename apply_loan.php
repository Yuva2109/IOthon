<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $user_id = $_SESSION['user_id'];  // Assuming user is logged in
    $loan_amount = $_POST['loan_amount'];

    $sql = "INSERT INTO loans (user_id, loan_amount, loan_status) VALUES ('$user_id', '$loan_amount', 'Pending')";

    if ($conn->query($sql) === TRUE) {
        echo "Loan application submitted!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

