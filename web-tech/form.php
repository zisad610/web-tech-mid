<?php
// Start session to store errors
session_start();

// Get errors if exist
$errors = $_SESSION['errors'] ?? [];
$old = $_SESSION['old'] ?? [];

// Clear session after use
unset($_SESSION['errors']);
unset($_SESSION['old']);
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Form</title>
</head>
<body>

<h2>User Registration Form</h2>

<form action="formValidation.php" method="POST">

    Username: <br>
    <input type="text" name="username" value="<?= $old['username'] ?? '' ?>">
    <span style="color:red"><?= $errors['username'] ?? '' ?></span>
    <br><br>

    Name: <br>
    <input type="text" name="name" value="<?= $old['name'] ?? '' ?>">
    <span style="color:red"><?= $errors['name'] ?? '' ?></span>
    <br><br>

    Email: <br>
    <input type="text" name="email" value="<?= $old['email'] ?? '' ?>">
    <span style="color:red"><?= $errors['email'] ?? '' ?></span>
    <br><br>

    Phone: <br>
    <input type="text" name="phone" value="<?= $old['phone'] ?? '' ?>">
    <span style="color:red"><?= $errors['phone'] ?? '' ?></span>
    <br><br>

    <button type="submit">Submit</button>

</form>

</body>
</html>