<?php
require 'db.php';
$id = $_POST['id'];
$stmt = $conn->prepare("DELETE FROM courses WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();
?>
