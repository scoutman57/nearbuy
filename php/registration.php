<?php

require 'connect.php'; //returns $connection

$createEntry = $_POST['prepareTable'];

if($createEntry){
	
	//creates a randomKey with which to encrypt & associates an ID with the user
	//extremely lazy
	$upperBound = pow(2, 20);
	$id = rand(1, $upperBound);
	$key = rand(1, $upperBound);

	$query = "INSERT INTO `user`(`id`, `encryptionKey`) VALUES ('$id' , '$key') " ;
	mysqli_query($connection, $query);
	mysqli_close($connection);

	$array = array($id, $key);

	echo json_encode($array);

} else echo "ERROR";

?>