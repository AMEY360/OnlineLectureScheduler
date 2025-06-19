<?php
include 'db.php';

$id = $_POST['id'];
$conn->query("DELETE FROM lectures WHERE id = $id");

echo "Lecture deleted successfully.";
?>
