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
$sessionID = getSessionID();
$memberID = retrieveMemberId();

$passQuery = "SELECT `password` FROM `user` WHERE `username`='$username'";


$result = mysqli_query($connection, $passQuery);
$row = $result->fetch_assoc();

$encryptedPassword = $row['password'];


if($encryptedPassword == $password){

	echo "success!";

	createSession();

	






} else {

	echo "fail!";
}


function createSession(){

global $memberID, $sessionID;
	
$query = "INSERT INTO `session`(`id`, `sessionID`) VALUES '$memberID' , '$sessionID' " ;
mysqli_query($connection, $query);



}


function getSessionID(){

global  $connection, $username;

$id = retrieveMemberId();

$query = "SELECT `sessionID` FROM `session`";

$result = mysqli_query($connection, $query);

$sessionID = mysqli_num_rows($result) + 1;


return $sessionID;
}



function retrieveMemberId(){

global  $connection, $username, $keyArray;

  $result ='';

	$query = "SELECT id FROM `user` WHERE username='$username'";
	
	$result = mysqli_query($connection, $query);
	
	if(mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		
		return $row['memberID'];
		
			}
			
		} else {

    			return  NULL; 

    		}
	
	}



?>