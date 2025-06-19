<?php
require 'db.php';

$name = $_POST['name'];
$level = $_POST['level'];
$description = $_POST['description'];

$image_name = time() . '_' . $_FILES['image']['name'];
$image_path = '../images/' . $image_name;

move_uploaded_file($_FILES['image']['tmp_name'], $image_path);

$stmt = $conn->prepare("INSERT INTO courses (name, level, description, image_path) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $level, $description, $image_path);
$stmt->execute();
$stmt->close();
?>
