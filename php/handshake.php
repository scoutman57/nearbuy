<?php

//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'connect.php'; //returns $connection

//grab info
$username = $_POST["username"];

//send query for key
$secretKeyQuery = "SELECT `encryptionKey` FROM `user` WHERE `username`='$username'";
$result = mysqli_query($connection, $secretKeyQuery);
mysqli_close($connection);

//echo key back
$row = $result->fetch_assoc();
$secretKey = $row['encryptionKey'];
echo $secretKey;

?>