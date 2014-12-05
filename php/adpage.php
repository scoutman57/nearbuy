<?php
$id="2";
//$id = $_POST['id'];
if ($id!=null){
    //echo "user is ", $user;
} else {
    exit("error sending item id from js to php");
}

require 'connect.php'; //returns $connection

$query = "SELECT * FROM info WHERE id='$id'";
$result=mysqli_query($connection, $query);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        //`id`, `latlng`, `name`, `address`, `description_text`, `imagelink`, `viewcount`, `username`, 'price'
        $name=$row["name"];
        $username=$row["username"];
        $price=$row["price"];
        $address=$row["address"];
        $link=$row["imagelink"];
        $views=$row["viewcount"];
        $desc=$row["description_text"];
    }
} else {
    exit("no items with that id");
}
mysqli_close($connection); //disconnect after all queries are over

echo '
<!DOCTYPE html>
<html>

<head>
    <link href="css/style.css" rel="stylesheet">
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/genlist.js"></script>
    <title>LISTING</title>
</head>

<body>

<div class="adpage">
    <p id="item">Item: '.$name.'</p>
    <p id="item">Seller: '.$username.'</p>
    <p id="price">Price: '.$price.'</p>
    <p id="loc">Location: '.$address.'</p>
    <p class="left">Views: '.$views.'
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

        Image: 
            <a href='.$link.' target="_blank">
                <img id="imglink" src="img/link.png" width="50" height="50">
            </a>
    </p>
    <p id="desc">'.$desc.'</p>
</div>

</body>

</html>';
?>