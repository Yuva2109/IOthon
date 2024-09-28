<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $user_id = $_SESSION['user_id'];  // Assuming user is logged in
    $payment_amount = $_POST['payment_amount'];

    $sql = "INSERT INTO payments (user_id, payment_amount, payment_status) VALUES ('$user_id', '$payment_amount', 'Completed')";

    if ($conn->query($sql) === TRUE) {
        echo "Payment successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
