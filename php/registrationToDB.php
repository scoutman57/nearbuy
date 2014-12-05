<?php

require 'connect.php'; //returns $connection

//grab all info from JSON
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$profileID = $_POST['profileID'];
$address = $_POST['address'];

$keyQuery = "SELECT `encryptionKey` FROM `user` WHERE `id`=$profileID";
$result = mysqli_query($connection, $keyQuery);
$row = $result->fetch_assoc();
$secretKey = $row['encryptionKey'];

$query = "UPDATE `user` SET `id`=$profileID,`username`='$username',`password`='$password',`email`='$email',`address`='$address',`encryptionKey`='$secretKey' WHERE `id`='$profileID'";
mysqli_query($connection, $query);

mysqli_close($connection);

?>