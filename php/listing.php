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


$username = "alien";
$title = "alien";
$description = "alien";
$image;
$price = 5;
$address = "Area 51";
$latlng = "45, 45";
$upperBound = pow(2, 20);
$id = rand(1, $upperBound);
$userID = getUserID();
$address = getAddress();


var_dump($dbuser);
//var latlng = document.getElementById("loguser").value;

?>
