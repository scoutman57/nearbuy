function getCoordinates(address, callback){

	var coordinates;
	geocoder = new google.maps.Geocoder();
 	geocoder.geocode({address: address}, function(results,status){ 

 		if (status == google.maps.GeocoderStatus.OK) { 

 			coords_obj = results[0].geometry.location; 			
 			coordinates = [coords_obj.k, coords_obj.B]
 			callback(coordinates);

 		} else {
 		alert("DIDN'T WORK")
 		} 

 	});

 	
 	return coordinates;
}


function foo(coordinates){
	return coordinates
}


function initialize() {
	var latLong;

	var address = " 580 Ash Street Winnipeg MB";
	var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
	var mayLatLng = 
		
		var mapOptions = {
         		 center: new google.maps.LatLng(coordinates[0], coordinates[1]), 
         		 zoom: 15,
         		 mapTypeId: google.maps.MapTypeId.ROADMAP
        			};

        	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

	});    
      }
      google.maps.event.addDomListener(window, 'load', initialize); //This is where it's started




//query the database, ask for a bunch of markers nearby, put them on map. Boom. Done

//function to see WHAT IS NEARBY

//load

//someething to put markers with info
//probably have an array,a nd someting that iterates through the array and places them all
//an array of objects

	//initialize draws them on the map when we first load
	//
