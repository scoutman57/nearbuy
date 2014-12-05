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
	    <th id="price">Price</th>
	    <th>Location</th>
	    <th>Picture</th>
	    <th>Description</th>
	    <th>Remove</th>
	</tr>';
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	// `id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `username`, `price`, `ad` 
        echo "<tr id=" . $row["id"] . "><td>" . $row["name"]."</td><td>" . $row["price"] . "</td><td>" . $row["address"]. "</td><td>";
        //add image link only if one was provided
		if (strlen(trim(preg_replace('/\xc2\xa0/',' ',$row["imagelink"]))) == 0) {
    		echo "</td>";
		} else {
        	echo "<a href=" . $row["imagelink"]. " target='_blank'><img class='imglnk' src='img/link.png'></a> </td>";
		}
        echo "<td>" . $row["description_text"]."</td>";
        echo '<td><button id="remove" onclick="listdel(this)"><img src="img/del.png" class="del"></button></td>';
    }
    echo "</table>";
} else {
    echo "<h2>You're not selling anything yet</h2>";
}


?>