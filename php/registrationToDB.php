<?php



$servername = "near-buy.me";
$dbuser = 'admin';
$dbpass = 'password';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$profileID = $_POST['profileID'];
$address = $_POST['address'];

/*
$username = "f";
$password = "f";
$email = "f";
$profileID = '68991';
$address = "f";
*/

//echo $username;
//echo $password;
//echo $email;
//echo $profileID;
//echo $address;



$keyQuery = "SELECT `encryptionKey` FROM `user` WHERE `id`=$profileID";

$result = mysqli_query($connection, $keyQuery);
$row = $result->fetch_assoc();
$secretKey = $row['encryptionKey'];

//echo $secretKey;

//$query="UPDATE `user` SET `username`='$username',`password`='$password',`email`='$email',`address`='$address'  WHERE `id`=`$profileID`";
//$query = "UPDATE `user` SET `id`=$profileID,`username`=$username,`password`=$password,`email`=$email,`address`=$address,`encryptionKey`=$keyQuery WHERE `id`=$profileID";
$query = "UPDATE `user` SET `id`=$profileID,`username`='$username',`password`='$password',`email`='$email',`address`='$address',`encryptionKey`='$secretKey' WHERE `id`='$profileID'";


//$query = "INSERT INTO `user`(`id`, `username`,`password`,`email`,) VALUES '$memberID' , '$sessionID' " ;
mysqli_query($connection, $query);


//header('Location: success.html');

//mysqli_close($connection);




?>