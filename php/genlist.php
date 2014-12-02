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
echo '
	<table>
	<tr>
	    <th>ID#</th>
	    <th>Item</th>
	    <th>Price</th>
	    <th>Location</th>
	    <th>Picture Link</th>
	    <th>Views?</th>
	    <th>Description</th>
	</tr>';

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	//`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `userID`, 'price'
        echo "<tr><td>" . $row["id"] . "</td><td>" . $row["name"]."</td><td>" . $row["price"] . "</td><td>" . $row["address"].  "</td><td>" . $row["imagelink"]. "</td><td>" . $row["viewcount"]. '</td><td class="desc">' . $row["description_text"]."</td>";
    }
} else {
    echo "0 results";
}
echo "</table>";

mysqli_close($connection);

?>