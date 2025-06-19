<?php
require 'db.php';
$instructor_id = $_GET['instructor_id'];

$stmt = $conn->prepare("SELECT l.*, c.name AS course_name, b.batch_date FROM lectures l
JOIN courses c ON l.course_id = c.id
JOIN batches b ON l.batch_id = b.id
WHERE l.instructor_id = ?");
$stmt->bind_param("i", $instructor_id);
$stmt->execute();
$result = $stmt->get_result();

$lectures = [];
while ($row = $result->fetch_assoc()) {
    $lectures[] = $row;
}
echo json_encode($lectures);
?>
