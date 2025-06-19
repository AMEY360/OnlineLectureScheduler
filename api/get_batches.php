<?php
require 'db.php';
$course_id = $_GET['course_id'];
$stmt = $conn->prepare("SELECT * FROM batches WHERE course_id = ?");
$stmt->bind_param("i", $course_id);
$stmt->execute();
$result = $stmt->get_result();
$batches = [];
while ($row = $result->fetch_assoc()) {
    $batches[] = $row;
}
echo json_encode($batches);
?>
