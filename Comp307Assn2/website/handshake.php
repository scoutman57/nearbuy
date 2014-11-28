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

//$username = $_GET['user'];

//$username = "me";

$servername = "localhost";
#$username = "username";
#$password = "password";
$dbname = "Q2DB";


#mysqli_connect(host,username,password,dbname,port,socket); 

$connection = mysqli_connect($servername, 'root', '',$dbname); 

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
/*
	$row = mysql_fetch_array($result));

	#Only gets one result
	
	for ($i=0; $i < count($row); $i++) { 
		if($row[0] == username){
			return $row[0];
		}
	}

	*/

	$error = "error";
	return $error;

	}
}


mysqli_close($connection);

?>