<?php
require 'db.php';
$course_id = $_POST['course_id'];
$batch_id = $_POST['batch_id'];
$instructor_id = $_POST['instructor_id'];

$stmt = $conn->prepare("SELECT * FROM lectures WHERE instructor_id = ? AND batch_id IN (SELECT id FROM batches WHERE batch_date = (SELECT batch_date FROM batches WHERE id = ?))");
$stmt->bind_param("ii", $instructor_id, $batch_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Instructor already has a lecture on this date.";
} else {
    $stmt = $conn->prepare("INSERT INTO lectures (course_id, batch_id, instructor_id) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $course_id, $batch_id, $instructor_id);
    $stmt->execute();
    echo "Lecture assigned successfully.";
}
?>
