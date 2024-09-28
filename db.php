<?php
$servername = "localhost";
$username = "root";
$password = "Yuva2109";
$dbname = "digital_identity";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
