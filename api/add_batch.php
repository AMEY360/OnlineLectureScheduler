<?php
require 'db.php';
$course_id = $_POST['course_id'];
$batch_date = $_POST['batch_date'];

$stmt = $conn->prepare("INSERT INTO batches (course_id, batch_date) VALUES (?, ?)");
$stmt->bind_param("is", $course_id, $batch_date);
$stmt->execute();
$stmt->close();
?>
