<?php

//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//Collect the values in an array and convert it to JSON with json_encode:

require 'connect.php'; //returns $connection

$query = "SELECT * FROM `info` " ;
$result = mysqli_query($connection, $query);

//echo $result;

$array = array();
$count = mysqli_num_rows($result);

//var_dump($result)

while ($row = mysqli_fetch_assoc($result)) {
	//echo $row['name'];
    $array[] = $row;//$row['name'];
}

echo json_encode($array);