<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

$connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


$keyArray;

if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}

//$data = json_decode(file_get_contents('php://input'));

/*

$json = json_decode($_POST['json']);

echo $json;

$username = $json ->username;
$password = $json->password;
*/

$username = $_POST['username'];
$password = $_POST['password'];
//$username = "me";
//$password = "qbttxpse";
$memberID = retrieveMemberId();
$sharedKey = retrieveKey();
$sessionID = getSessionID();

$tempPass;


caesar();

$loggedIn = verify();



if($loggedIn == true){
//add to session table



$query = "INSERT INTO `Sessions`(`memberID`, `sessionID`) VALUES '$memberID' , '$sessionID' " ;
mysqli_query($connection, $query);




echo  "<html>";
echo "<head>";
echo " <script type='text/javascript' src ='varAssign.js' ></script> ";
echo "</head>";
echo "<body>";
echo "<font color='white'> You are logged in as " ;
echo  $username;
 echo "</font> <br>";


echo "<form name='logout' action='logout.php' method='POST'>";

echo "<input name='sessionID' id='sessionID' type='hidden' value='". $sessionID . "'>";

 echo  "<input type='submit' value='Logout'>";

//need hidden session id 

// Logout button goes here
echo "</form>";

echo "</body>";
echo "</html>";


	//print web page with logout buton and logout.php





} else {



echo  "<html>";
echo "<head>";
echo "</head>";
echo "<body>";
echo "<font color='white'> Login unsuccessful</font>";
echo "<br>";
echo "<a href='login.html''>Back to Login</a>";
echo "</body>";
echo "</html>";


}



function getSessionID(){

global  $connection, $username;

$query = "SELECT `sessionID` FROM `Sessions`";

$result = mysqli_query($connection, $query);

$sessionID = mysqli_num_rows($result) + 1;


return $sessionID;
}


function retrieveMemberId(){

global  $connection, $username, $keyArray;

  $result ='';

	$query = "SELECT memberID FROM `members` WHERE username='$username'";
	
	$result = mysqli_query($connection, $query);
	
	if(mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		
		return $row['memberID'];
		
			}
			
		} else {

    			return  NULL; 

    		}
	
	}



//retrieves the key from the array
function retrieveKey() {
  global  $connection, $username, $keyArray;

  $result ='';

	$query = "SELECT sharedKey FROM `members` WHERE username='$username'";
	
	$result = mysqli_query($connection, $query);
	
	if(mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		
		return $row['sharedKey'];
		
			}
			
		} else {

    			return  NULL; 

    		}
	
	}

//decrypts the password and stores it in tempPass variable
function caesar() {
 global $sharedKey, $password, $username, $connection, $keyArray, $tempPass;

$counter = 0;
$keyArray = str_split($sharedKey);

$tempPass = str_split($password);

  for ($i=0; $i < count($tempPass) ; $i++) { 
  	
  	$tempPass[$i] = chr(ord($tempPass[$i]) - $keyArray[$counter]);

  	$counter = 1+ $counter;
		if ($counter = count($counter)) {
			$counter = 0;
		}

  }

$tempPass = join( $tempPass );

}



//call this function. If  the password in the db matches the decrypted, then it returns true. Else it returns false
function verify(){
	global $connection, $username, $tempPass;

	$query = "SELECT password FROM `members` WHERE username='$username'";
	$result = mysqli_query($connection, $query);
	
	

	if(mysqli_num_rows($result) > 0){

	while ($row = $result->fetch_assoc()){
		
		$retPass = $row['password'];
		

		if($tempPass == $retPass){


			return true;
		}
		
	}
	}
	else {
		return false;
	}


}




mysqli_close($connection);



?>