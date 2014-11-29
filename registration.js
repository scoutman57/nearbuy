
function getCoordinates(address, callback){

	var coordinates;
	geocoder = new google.maps.Geocoder();
 	geocoder.geocode({address: address}, function(results,status){ 

 		if (status == google.maps.GeocoderStatus.OK) {  //If the geocode was okay, we can return the object

 			coords_obj = results[0].geometry.location; 			
 			coordinates = [coords_obj.k, coords_obj.B]
 			callback(coordinates);

 		} else {
 		alert(" The Geocoding didn't work ")
 		} 

 	});

 	
 	return coordinates;
}

console.log("test")

//This gets the entire array from our db
var ajaxCall = $.ajax({
    type: 'GET',
    url: 'http://localhost/dbToArray.php',
    complete: function(r){

    	//var output = JSON.parse(r.responseText)
      //console.log( output);
    	console.log(r.responseText)
    }
     });




function listToJSON(address){


var coordinates = getCoordinates(address, function(coordinates){ 
	var latitude = coordinates[0]
	var longitude = coordinates[1]	
	var convertedAddress = latitude + ", " + longitude

var inputName = //get html element 
var inputAddress = 
var inputDescription = 
var inputImageLink = 

var profile = {latlng: convertedAddress, username: inputName, address: inputAddress, decription: inputDescription , image: inputImageLink};

var response;

		var ajaxCall = $.ajax({
		    type: 'POST',
		    //url: 'http://localhost/registrationToDB.php',
		    url: 'registrationToDB'
		    data: profile,
		    complete: function(r){

		      document.getElementById("back").innerHTML = r.responseText;
		    }
		 });

	}

}
