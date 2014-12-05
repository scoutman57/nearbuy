<?php

//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'connect.php'; //returns $connection

$username = $_POST["username"];
$password = $_POST["password"];

$sessionID = getSessionID();
$memberID = retrieveMemberId();

$passQuery = "SELECT `password` FROM `user` WHERE `username`='$username'";
$result = mysqli_query($connection, $passQuery);
$row = $result->fetch_assoc();
$encryptedPassword = $row['password'];

if($encryptedPassword == $password){
	createSession();
	echo "
		<!DOCTYPE html>
		<html>
		<head>
		    <title>SPLASH</title>
		    <link href='css/style.css' rel='stylesheet'>
		    <script src='js/jquery-2.1.1.min.js'></script>
		    <script src='js/varAssign.js'></script>
		    <script src='js/example.js'></script>
		    <script src='js/profile.js'></script>
		    <script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script>

		</head>";
	echo '
		<body>
		<div class="large">
			<h1>Login success</h1>
			<button class="lgbutton" onclick="goToProfile()"><img src="img/list.png" class="lgicon">Manage your listings</button>
			<button class="lgbutton" onclick="getMap()"><img src="img/map.png" class="lgicon">Find out whats nearbuy</button>
		</div>
		</body>
		</html>';
} else {
	echo "
		<!DOCTYPE html>
		<html>
		<head>
		    <link href='css/style.css' rel='stylesheet'>
		    <title>SPLASH</title>
		</head>
		<body>
			<h1>Wrong username<br> or password</h1>
			<div class='large'>
				<a href='./index.html'> <button>Go Back</button></a>
			</div>
		</body>
		</html>";
}
mysqli_close($connection); //disconnect after all queries are over


function createSession(){
	global $memberID, $sessionID, $connection;	
	$query = "INSERT INTO `session`(`id`, `sessionID`) VALUES ('$memberID' , '$sessionID') " ;
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
			return $row['id'];
		}
	} else {
		return  NULL; 
	}
}

?>