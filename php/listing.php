<?php

//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$username = $_POST['username'];
$title = $_POST['title'];
$description = $_POST['description'];
$image = $_POST['image'];
$price = $_POST['price'];
$address = $_POST['address'];
$latlng = $_POST['latlng'];
$upperBound = pow(2, 20);
$id = rand(1, $upperBound);

require 'connect.php'; //returns $connection

$query = "INSERT INTO `info`(`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `username`, `price`) 
    VALUES ('$id','$latlng','$title','$address','$description','$image','$price','$username','$price')";
mysqli_query($connection, $query);
mysqli_close($connection);

echo "sent new listing to database";

?>