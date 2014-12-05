// gets username of current user from cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// generates the page and adds the users current listings to a table
function genlist(){
	var user = readCookie("username"); //grab username from cookie
	$("#profilename").html(user); //display username in title
	var profile = {username: user}; //json encoding of msg
	var ajaxCall = $.ajax({
		type: 'POST',
		url: 'php/genlist.php',
		data: profile,
		complete: function(r){
			var result = r.responseText;
			$("#results").html(result);
		}
	});
};

// returns the latitude and longitude of a given address string
//coords are only allowed to live inside the geocoder for some stupid F**king reason
function getCoords(){
	var latitude;
	var longitude;
	var coords;
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("listLoc").value;
	geocoder.geocode({'address':address}, function(results, status){
		if(status==google.maps.GeocoderStatus.OK){
			latitude=results[0].geometry.location.lat();
			longitude=results[0].geometry.location.lng();
			coords=latitude+", "+longitude;
			createListing(coords, address);
		};
	});
};

//called INSIDE getcoords, since coords only live inside that function
function createListing(icoords, iaddress){
	var username = readCookie("username");
	var item = document.getElementById("listName").value;
	var desc = document.getElementById("listDesc").value;
	var link = document.getElementById("listPic").value;
	var price = document.getElementById("listPrice").value;
	var address = iaddress;
	var coords = icoords
	//JSON string encoding
    var profile = {username: username, title: item, description: desc, image: link, price: price, address: address, latlng: coords}
    console.log(profile);
    addToDB(profile);
}

function addToDB(jsonProfile){
    $.ajax({
        type: 'POST',
        url: 'php/listing.php',
        data: jsonProfile,
        complete: function(r){
        	console.log(r.responseText);
        	genlist();
        }
    });
}

function listdel(e) {
	var lid=($(e).closest('tr').attr('id'));
	console.log(lid);
	document.getElementById(lid).remove();
	var profile = {id: lid}; //json encoding
	delFromDB(profile);
}

function delFromDB(jsonProfile){
    $.ajax({
        type: 'POST',
        url: 'php/removeListing.php',
        data: jsonProfile,
        complete: function(r){
        	console.log(r.responseText);
        }
    });
}