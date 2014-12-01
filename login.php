<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

$connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}



$username = $_POST["username"];
$password = $_POST["password"];


$passQuery = "SELECT `password` FROM `user` WHERE `username`='$username'";


$result = mysqli_query($connection, $passQuery);
$row = $result->fetch_assoc();

$encryptedPassword = $row['password'];


if($encryptedPassword == $password){

	echo "success!";
} else {

	echo "fail!";
}




?>