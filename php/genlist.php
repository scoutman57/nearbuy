<?php

$user = $_POST['username'];
if ($user!=null){
	//echo "user is ", $user;
} else {
	exit("error sending user from js to php");
}

$servername = "near-buy.me";
$dbuser = 'admin';
$dbpass = 'password';
$dbname = "nearbuy";

$connection = mysqli_connect($servername, $dbuser, $dbpass,$dbname);

if (!$connection) {
   	 die("Database connection failed: " . mysqli_connect_error());
}

//echo "Database connection successful";

$query = "SELECT * FROM info WHERE userID='$user'";

$result=mysqli_query($connection, $query);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	//`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `userID`
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Address: " . $row["address"].  " - Description: " . $row["description_text"]. " - Image: " . $row["imagelink"]. " - Views: " . $row["viewcount"]."<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($connection);

?>