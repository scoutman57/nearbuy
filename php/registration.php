<?php


//$createEntry = true;

$servername = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}


$createEntry = $_POST['prepareTable'];


if($createEntry){

//creates a randomKey with which to encrypt

//associates an ID with the user

//extremely lazy

$upperBound = pow(2, 20);
$id = rand(1, $upperBound);

$key = rand(1, $upperBound);

//echo $id;
//echo $key;


$query = "INSERT INTO `user`(`id`, `encryptionKey`) VALUES ('$id' , '$key') " ;

mysqli_query($connection, $query);



$array = array($id, $key);

//$array[0]=$id
//$array[1]=$key

mysqli_close($connection);


echo json_encode($array);



} else echo "ERROR";


?>