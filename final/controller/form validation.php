<?php
session_start();
require "model.php";


$data = [
    'username' => $_POST['username'] ?? '',
    'name' => $_POST['name'] ?? '',
    'email' => $_POST['email'] ?? '',
    'phone' => $_POST['phone'] ?? ''
];


$errors = validateForm($data);

if (!empty($errors)) {
    // Store errors & old data in session
    $_SESSION['errors'] = $errors;
    $_SESSION['old'] = $data;

    // Redirect back to form
    header("Location: form.php");
    exit();
}


echo "<h2>Form Submitted Successfully!</h2>";
echo "Username: " . htmlspecialchars($data['username']) . "<br>";
echo "Name: " . htmlspecialchars($data['name']) . "<br>";
echo "Email: " . htmlspecialchars($data['email']) . "<br>";
echo "Phone: " . htmlspecialchars($data['phone']) . "<br>";