<?php

header('Access-Control-Allow-Origin: *');


//Collect the values in an array and convert it to JSON with json_encode:


$servername = "near-buy.me";
$dbuser = 'admin';
$dbpass = 'password';
$dbname = "nearbuy";

  $connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);


if (!$connection) {
   	 die("Connection failed: " . mysqli_connect_error());
	}



$query = "SELECT * FROM `info` " ;
$result = mysqli_query($connection, $query);
//$result = mysql_query($query);


//echo $result;

$array = array();
$count = mysqli_num_rows($result);

//var_dump($result)


while ($row = mysqli_fetch_assoc($result)) {
   
	//echo $row['name'];

    $array[] = $row;//$row['name'];
}

echo json_encode($array);
