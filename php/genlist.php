<?php

$user = $_POST['username'];
if ($user!=null){
	//echo "user is ", $user;
} else {
	exit("error sending user from js to php");
}

require 'connect.php'; //returns $connection

$query = "SELECT * FROM info WHERE username='$user'";

$result=mysqli_query($connection, $query);
mysqli_close($connection);

if (mysqli_num_rows($result) > 0) {
	echo '
	<table>
	<tr>
	    <th>Item</th>
	    <th>Price</th>
	    <th>Location</th>
	    <th>Picture Link</th>
	    <th>Description</th>
	    <th>Remove</th>
	</tr>';
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	// `id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `username`, `price`, `ad` 
        echo "<tr id=" . $row["id"] . "><td>" . $row["name"]."</td><td>" 
        . $row["price"] . "</td><td>" . $row["address"].  "</td><td>" . $row["imagelink"]. 
        "</td><td>" . $row["description_text"]."</td>";
        echo'<td><button id="remove" onclick="listdel(this)"><img src="img/del.png" class="del"></button></td>';
    }
    echo "</table>";
} else {
    echo "0 results";
}


?>