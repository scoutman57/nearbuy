<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$username = $_POST['username'];
$title = $_POST['title'];
$description = $_POST['description'];
$image = $_POST['image'];
$price = $_POST['price'];
$address = $_POST['address'];
$latlng = $_POST['latlng'];
$upperBound = pow(2, 20);
$id = rand(1, $upperBound);
$userID = getUserID();

$servername = "near-buy.me";
$dbuser = 'admin';
$dbpass = 'password';
$dbname = "nearbuy";

 $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

if (!$connection) {
   	die("Connection failed: " . mysqli_connect_error());
}

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
