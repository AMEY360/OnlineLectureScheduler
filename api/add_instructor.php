<?php
require 'db.php';
$name = $_POST['name'];
$stmt = $conn->prepare("INSERT INTO instructors (name) VALUES (?)");
$stmt->bind_param("s", $name);
$stmt->execute();
$stmt->close();
?>
