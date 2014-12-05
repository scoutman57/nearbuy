<?php

require 'connect.php'; //returns $connection

$username = $_POST['username'];

$query = "SELECT `address` FROM `user` WHERE username='$username'";

$result = mysqli_query($connection, $query);
$row = $result->fetch_assoc();
$address = $row['address'];

echo $address;

?>