<?php

echo "hi";



$servername = "near-buy.me";
$dbuser = 'admin';
$dbpass = 'password';
$dbname = "nearbuy";

 $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}


$username = $_POST['username'];
$title = $_POST['title'];
$description = $_POST['description'];

var_dump($dbuser);
//var latlng = document.getElementById("loguser").value;

?>
