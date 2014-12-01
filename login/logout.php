<?php

//$sessionID;

$username;
$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "Q2DB";

$sessionID = $_POST["sessionID"];

checkUser();

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}


$memMemberID = 0;
$sesMemberID = -1;


function checkUser(){

global $sessionID, $connection, $username;

	global $sesMemberID;
	global $memMemberID;

	$query = "SELECT memberID FROM `Sessions` WHERE sessionID='$sessionID'";


	$result = @mysqli_query($connection, $query);



	if(@mysqli_num_rows($result) > 0){

		while ($row = $result->fetch_assoc()){
	
			$sesMemberID = $row['memberID']; //we find the member ID in the sessionstable

		}
	}

	$query = "SELECT username FROM `members` WHERE username='$username'";
	
	$result = @mysqli_query($connection, $query);

	//If it finds a memberID with the session ID, it means that member is logged on
	if(@mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		
		$memMemberID = $row['memberID'];
		
		
		}

	}

	if($memMemberID == $sesMemberID){
		//log them out 

		$delete = "DELETE memberID, sessionID FROM `Sessions` WHERE sessionID='$sessionID'";
		@mysqli_query($connection, $delete);

		echo  "<html>";
		echo "<head>";
		echo "</head>";
		echo "<body>";
		echo "<p>" ;
		echo  $username;
		echo "you have been logged out.</p>";
		echo "<br>";
		echo "<a href='login.html' '>Back to Login</a>"; // NEed to find correct URL
		echo "</body>";
		echo "</html>";

	} else {
		
			echo  "<html>";
			echo "<head>";
			echo "</head>";
			echo "<body>";
			echo "<p> Not a Valid User</p>";
			echo "<br>";
			echo "<a href=' /' '>Back to Login</a>"; // NEed to find correct URL
			echo "</body>";
			echo "</html>";


	}

}





?>