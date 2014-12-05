<?php

require 'connect.php'; //returns $connection

$username = "alien";
$title = "alien";
$description = "alien";
$image = '';
$price = 5;
$address = "Area 51";
$latlng = "45, 45";
$upperBound = pow(2, 20);
$id = rand(1, $upperBound);
$userID = getUserID();
$address = getAddress();

//get all teh other necessary info with some sql calls. Fill in the table.

function makeListing(){
	global $connection,$id, $userID, $username, $title, $description, $image, $price, $address, $latlng;
	$query = "INSERT INTO `info`(`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `userID`, `price`) VALUES ('$id','$latlng','$title','$address','$description','$image','$userID','$price')";
	mysqli_query($connection, $query);
	echo "IT WORKED";
}

function getUserID(){
	global $connection, $username;
	$usernameQuery = "SELECT `id` FROM `user` WHERE `username`=$username";
	$result = mysqli_query($connection, $usernameQuery);
	$row = $result->fetch_assoc();
	$usernameID = $row['userID'];
	return  $usernameID;
}
makeListing();

?>