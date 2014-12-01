<?php
header('Access-Control-Allow-Origin: *');
//header('Content-Type: application/json');


if (isset($_GET["username"])) 
{
  $username = $_GET["username"];
  //echo $username;
  //echo " is your username";
} 
else 
{
  $username = null;
  echo "no username supplied";
}




$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

/*
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
*/



  if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

try{
$query = "SELECT sharedKey FROM `members` WHERE username='$username'";
$result = mysqli_query($connection, $query);
} catch(Exception $e){

	var_dump($e);


}

if (!$result) { // add this check.
	var_dump(mysql_error());
    die('Invalid query: ' . mysql_error() . $query);
}

//var_dump($result);

$key = "-1";
	
if($result){

	if(mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		//var_dump($row);
		$key = $row['sharedKey'];
		//var_dump($key); 
		echo $key;
		//echo "YOUR KEY IS THIS MOTHERFUCKER";
	//} // if statement aboves closing bracket
	}

	$error = "error";
	return $error;

	}
}


mysqli_close($connection);

?>