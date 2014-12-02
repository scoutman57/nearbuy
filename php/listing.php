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
$image = $_POST['image'];
$price = $_POST['price'];
$address = $_POST['address'];
$latlng = $_POST['latlng'];
$upperBound = pow(2, 20);
$id = rand(1, $upperBound);
//$userID;

//getUserID();

var_dump($dbuser);
//var latlng = document.getElementById("loguser").value;


$ad =echo '
<!DOCTYPE html>
<html>

<head>
    <link href="css/style.css" rel="stylesheet">
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/genlist.js"></script>
    <title>LISTING</title>
</head>

<body>
<div class="adpage">
    <p id="item">Item: '.$name.'</p>
    <p id="item">Seller: '.$username.'</p>
    <p id="price">Price: '.$price.'</p>
    <p id="loc">Location: '.$address.'</p>
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        Image: 
            <a href='.$image.' target="_blank">
                <img id="imglink" src="img/link.png" width="50" height="50">
            </a>
    </p>
    <p id="desc">'.$description.'</p>
</div>
</body>
</html>';

global $connection,$id, $userID, $username, $title, $description, $image, $price, $address, $latlng;


//$query = "INSERT INTO `info`(`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `userID`, `price`) VALUES ('$id','$latlng','$title','$address','$description','$image','$userID','$price')";

$query = "INSERT INTO `info`(`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `username`, `price`,`ad`) VALUES ('$id','$latlng','$title','$address','$description','$image','$price','$username','$price','$ad')";


mysqli_query($connection, $query);

echo "IT WORKED";



/*
function getUserID(){
global $connection, $username;

$usernameQuery = "SELECT `id` FROM `user` WHERE `username`=$username";

$result = mysqli_query($connection, $usernameQuery);
$row = $result->fetch_assoc();
$userID = $row['userID'];


}
*/

?>
