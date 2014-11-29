// Use it here to get the value after loading the widget
// ask the instantiated slider widget to tell you it's current value

var searchAddress ="580 Ash Street Winnipeg MB";
var searchDistance = 1; 


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


//Need a function to convert addresses to geocode 

function getArray() {


$.getJSON( "dbToArray", function( data ) {
  	
//post call from php. Get an array. Return the array.
});

}


function populateArray(){
	array = getArray()

	return array
}



//This gets the entire array from our db
var ajaxCall = $.ajax({
    type: 'GET',
    url: 'http://localhost/dbToArray.php',
    complete: function(r){

    

    var array = eval(r.responseText)


    console.log(array[0].latlng)


    initialize2(searchDistance, searchAddress, array)
    }
     });


function redoDistance(newDistance){
$.ajax({
    type: 'GET',
    url: 'http://localhost/dbToArray.php',
    complete: function(r){

    

    var array = eval(r.responseText)


    console.log(array[0].latlng)


    initialize2(newDistance, searchAddress, array)
    }
     });

}


function redoCircle(newAddress){
$.ajax({
    type: 'GET',
    url: 'http://localhost/dbToArray.php',
    complete: function(r){

    

    var array = eval(r.responseText)


  var geocoder = new google.maps.Geocoder();  

  geocoder.geocode({ 'latLng': newAddress }, function (results, status) {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      

      var address = (results[0].formatted_address);

      searchAddress = address

	initialize2(searchDistance, address, array)
     
    }
  });


    //initialize2(searchDistance, newAddress, array)
    }
     });

}



function getAddMarkers(coordinates){

var contentString = 'I WANT TO BE FORGOTTEN'
	//syntax is address, coords of address, title of advertisement, 
var markers = [
		 ['Add1', new google.maps.LatLng(coordinates[0]+0.001, coordinates[1]+0.005), "couch", contentString],
		    ['Add2', new google.maps.LatLng(coordinates[0]+0.002, coordinates[1]+0.004), "chair",contentString],
		    ['Add3', new google.maps.LatLng(coordinates[0]+0.003, coordinates[1]+0.003), "tv",contentString],
		    ['Add4', new google.maps.LatLng(coordinates[0]+0.004, coordinates[1]+0.002), "sink",contentString],
		    ['Add5',new google.maps.LatLng(coordinates[0]+0.005, coordinates[1]+0.001), "dimensional-rifter",contentString]
	];

	return markers

}


function getAddMarkersStraight(){
	var contentString = 'I WANT TO BE FORGOTTEN'

	var markers = [
		['Add1',"-97.17913089999999k, 49.863000299999996", "couch", contentString],
		['Add2',"-97.18013089999999k, 49.863000299999996", "couch", contentString],
		['Add3',"-97.18113089999999k, 49.863000299999996", "couch", contentString],
		['Add4',"-97.18213089999999k, 49.863000299999996", "couch", contentString],
	];

return markers
}



function search(searchTerm){

}

function changeAddress(newAddress){
	searchAddress = newAddress;
	initialize(searchAddress);
}



/*

//should each marker have a small summary, a pic, and a link to an ad

//need to pass a Center to it as well.
function initialize(searchDistance, givenAddress) {
	var address = "580 Ash Street Winnipeg MB";
	
	

	//searchAddress = address
	//address = givenAddress

	var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
	var homeCenter = new google.maps.LatLng(coordinates[0], coordinates[1]); 


	var newSearchDistance = /' searchDistance'/
	document.getElementById('rangeValue').innerHTML= "<p>" + searchDistance + "</p>"
	//var searchDistance = 1 //This is where they determine how far they want to look
	//var center = addressToLat(address)
	//console.log("The Stuff I have" + addressToLat(address))

//map style

var styles =  [
  {
    "stylers": [
      { "visibility": "on" },
      { "saturation": -32 },
      { "gamma": 0.18 },
      { "hue": "#0091ff" }
    ]
  }
]

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


var markers = getAddMarkers(coordinates)
	console.log(markers)
		var mapOptions = {
         		center: homeCenter,
         		zoom: 15,
         		mapTypeId: google.maps.MapTypeId.ROADMAP
         		, disableDefaultUI: true
        		};

        	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

            map.mapTypes.set('map_style', styledMap); //add the stylers to the map
  	map.setMapTypeId('map_style');



//computes the circle 
        	//Defines the circle that shows the distance of the search
		var areaOfSearch = {
		      strokeColor: '#FF6600',
		      strokeOpacity: 0.25,
		      strokeWeight: 2,
		      fillColor: '#FF6600',
		      fillOpacity: 0.15,
		      map: map,
		      center: homeCenter,
		      radius: 1000*searchDistance,
		      editable: false
		    };
		    // Add the circle for this city to the map.
		    searchCircle = new google.maps.Circle(areaOfSearch);
		//

		//searchCircle.setRadius( *searchDistance) use this to change the map

//		searchCircle.setMap(null) //To get rid of the circle just toggle this between null and map.


//loop to put the markers on the map
            for (i = 0; i < markers.length; i++) {  
        		
            	if (searchCircle.getBounds().contains(markers[i][1]) == true) { //If the points are within distance, we add them to the map
console.log(searchCircle + " is printed")

        		marker = new google.maps.Marker({
            		position: markers[i][1], //loops through and adds the position of each of these markers
            		map: map,
            		title: markers[i][2],
            		info: markers[i][3]

        		});


        		 var infowindow = new google.maps.InfoWindow({ // creates an infowindow for each marker
      			content: markers[i][3]//whatever is in element 3 will be entered 
  			});

        			google.maps.event.addListener(marker, 'click', function() {//makes the info window for each marker open
	   			 infowindow.setContent(this.info); //replace this.title with whatever content you want
	   			 infowindow.open(map, this);
				});
        			}

        			};
//

//Home marker. Automatically placed at the given address.
        	var homeMarker = new google.maps.Marker({ // I
		    position: homeCenter,
		    map: map, //can use marker.setMap(map) outside this function too.
		    title:"Home",
		    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		    draggable:true,
		});

        	 google.maps.event.addListener(homeMarker, 'dragend', function() {
		    
		    //console.log(homeMarker.getPosition())
		    
		    searchCircle.setMap(null)
		    
		    areaOfSearch.center = homeMarker.getPosition()
		    searchCircle = new google.maps.Circle(areaOfSearch);

		    //searchCircle.setCenter(homeMarker.getPosition())
		    //searchCircle = new google.maps.Circle(areaOfSearch);
		    initialize(searchDistance, searchCircle.getCenter())



		  });
	});    
      }
//





*/


//should each marker have a small summary, a pic, and a link to an ad

//need to pass a Center to it as well.
function initialize2(searchDistance, givenAddress, markers) {
	//var address = "580 Ash Street Winnipeg MB";
	
	

	//searchAddress = address
	address = givenAddress

	var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
	var homeCenter = new google.maps.LatLng(coordinates[0], coordinates[1]); 


	var newSearchDistance = /' searchDistance'/
	document.getElementById('rangeValue').innerHTML= "<p>" + searchDistance + "</p>"
	//var searchDistance = 1 //This is where they determine how far they want to look
	//var center = addressToLat(address)
	//console.log("The Stuff I have" + addressToLat(address))

//map style

var styles =  [
  {
    "stylers": [
      { "visibility": "on" },
      { "saturation": -32 },
      { "gamma": 0.18 },
      { "hue": "#0091ff" }
    ]
  }
]

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


//var markers = getAddMarkers(coordinates)
	console.log(markers)
		var mapOptions = {
         		center: homeCenter,
         		zoom: 15,
         		mapTypeId: google.maps.MapTypeId.ROADMAP
         		, disableDefaultUI: true
        		};

        	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

            map.mapTypes.set('map_style', styledMap); //add the stylers to the map
  	map.setMapTypeId('map_style');



//computes the circle 
        	//Defines the circle that shows the distance of the search
		var areaOfSearch = {
		      strokeColor: '#FF6600',
		      strokeOpacity: 0.25,
		      strokeWeight: 2,
		      fillColor: '#FF6600',
		      fillOpacity: 0.15,
		      map: map,
		      center: homeCenter,
		      radius: 1000*searchDistance,
		      editable: false
		    };
		    // Add the circle for this city to the map.
		    searchCircle = new google.maps.Circle(areaOfSearch);
		//

		//searchCircle.setRadius( *searchDistance) use this to change the map

//		searchCircle.setMap(null) //To get rid of the circle just toggle this between null and map.

	

//loop to put the markers on the map
            for (i = 0; i < markers.length; i++) {  
        		
            	var latlong = markers[i].latlng.split(',')

            	 var newLatLongMarker = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]))
            	 	console.log(newLatLongMarker)

            	if (searchCircle.getBounds().contains(newLatLongMarker) == true) { //If the points are within distance, we add them to the map
console.log(searchCircle + " is printed")

	console.log(markers[i].latlng)

        		marker = new google.maps.Marker({
            		position: newLatLongMarker, //loops through and adds the position of each of these markers
            		map: map,
            		title: markers[i].name,
            		info: markers[i].description

        		});


        		 var infowindow = new google.maps.InfoWindow({ // creates an infowindow for each marker
      			content: markers[i].description//whatever is in element 3 will be entered 
  			});

        			google.maps.event.addListener(marker, 'click', function() {//makes the info window for each marker open
	   			 infowindow.setContent(this.info); //replace this.title with whatever content you want
	   			 infowindow.open(map, this);
				});
        			}

        			};
//

//Home marker. Automatically placed at the given address.
        	var homeMarker = new google.maps.Marker({ // I
		    position: homeCenter,
		    map: map, //can use marker.setMap(map) outside this function too.
		    title:"Home",
		    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		    draggable:true,
		});

        	 google.maps.event.addListener(homeMarker, 'dragend', function() {
		    
		    //console.log(homeMarker.getPosition())
		    
		    searchCircle.setMap(null)
		    
		    areaOfSearch.center = homeMarker.getPosition()
		    console.log("NEW POS: " + areaOfSearch.center)
		    searchCircle = new google.maps.Circle(areaOfSearch);

		    //searchCircle.setCenter(homeMarker.getPosition())
		    //searchCircle = new google.maps.Circle(areaOfSearch);
		    //initialize(searchDistance, searchCircle.getCenter())
		    redoCircle(searchCircle.getCenter())


		  });
	});    
      }
//



//Relic from the first initialize
//google.maps.event.addDomListener(window, 'load', initialize(1, searchAddress)); //This is where it's started








