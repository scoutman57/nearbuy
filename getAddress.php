<?php


//$createEntry = true;

$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}

$username = $_POST['username'];
//echo $username;

$query = "SELECT `address` FROM `user` WHERE username='$username'";


$result = mysqli_query($connection, $query);
$row = $result->fetch_assoc();
$address = $row['address'];

echo $address;

?>