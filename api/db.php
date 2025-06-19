<?php
$conn = new mysqli('localhost', 'root', 'AJ@2004', 'lecture_scheduler');

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}
?>
