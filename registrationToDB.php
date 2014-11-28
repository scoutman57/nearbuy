<?php
//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "Q2DB";

$keyArray;


  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}


$username = $_POST['username'];
$password = $_POST['password'];


query = "INSERT INTO `Sessions`(`memberID`, `sessionID`) VALUES '$memberID' , '$sessionID' " ;
mysqli_query($connection, $query);


?>
