<?php
require 'db.php';
$result = $conn->query("SELECT * FROM instructors");
$instructors = [];
while ($row = $result->fetch_assoc()) {
    $instructors[] = $row;
}
echo json_encode($instructors);
?>
