<?php

$id = $_POST['id'];

require 'connect.php'; //returns $connection

$query = "DELETE FROM info WHERE id='$id'";
$results = mysqli_query($connection, $query);
mysqli_close($connection);
var_dump($results);

?>