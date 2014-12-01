<?php


$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$profileID = $_POST['profileID'];
$address = $_POST['address']


$keyQuery = "SELECT `encryptionKey` FROM `user` WHERE `id`=$profileID";

$result = mysqli_query($connection, $keyQuery);
$row = $result->fetch_assoc();
$secretKey = $row['encryptionKey'];

//echo $secretKey;

$query =  "UPDATE `user` SET `id`='$profileID',`username`='$username',`password`='$password',`email`='$email',`encryptionKey`='$secretKey', `address`='$address' WHERE `id`='$profileID'";


//$query = "INSERT INTO `user`(`id`, `username`,`password`,`email`,) VALUES '$memberID' , '$sessionID' " ;
mysqli_query($connection, $query);
mysqli_close($connection);




?>