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

function printMarker(newmarker){

 var marker2 = new google.maps.Marker({ // second marker
		    position: newmarker,
		    map: map,
		    title:"Hello World!"
		});

}

//given an address, will return the latitude Failed. Doesn't really work
/*
function addressToLat(address){ //will do this when people enter their addresses

	//var address = " 580 Ash Street Winnipeg MB";
	var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
	var geocodedAddress = new google.maps.LatLng(coordinates[0], coordinates[1]); 

	console.log("The stuff I want: " + geocodedAddress)

	return geocodedAddress
	});
	

}
*/
//Need a function to convert addresses to geocode 
function getAddMarkers(){

	//syntax is address, coords of address, title of advertisement, 
var markers = [
		 ['Add1', new google.maps.LatLng(49,49), ],
		    ['Add2', new google.maps.LatLng(49,49)],
		    ['Add3', new google.maps.LatLng(49,49)],
		    ['Add4', new google.maps.LatLng(49,49)],
		    ['Add5',new google.maps.LatLng(49,49)]
	];

	return markers

}


//should each marker have a small summary, a pic, and a link to an ad


function initialize() {
	var address = "580 Ash Street Winnipeg MB";
	var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
	var homeCenter = new google.maps.LatLng(coordinates[0], coordinates[1]); 
	var searchDistance = 1 //This is where they determine how far they want to look
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





//Put this into a function

 var contentString =  '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';



//var markers = getAddMarkers()
	var markers = [
		//syntax is address, coords of address, title of advertisement, 
		 ['Add1', new google.maps.LatLng(coordinates[0]+0.001, coordinates[1]+0.005), "couch", contentString],
		    ['Add2', new google.maps.LatLng(coordinates[0]+0.002, coordinates[1]+0.004), "chair",contentString],
		    ['Add3', new google.maps.LatLng(coordinates[0]+0.003, coordinates[1]+0.003), "tv",contentString],
		    ['Add4', new google.maps.LatLng(coordinates[0]+0.004, coordinates[1]+0.002), "sink",contentString],
		    ['Add5',new google.maps.LatLng(coordinates[0]+0.005, coordinates[1]+0.001), "dimensional-rifter",contentString]
	];

//

		var mapOptions = {
         		center: homeCenter,
         		zoom: 15,
         		mapTypeId: google.maps.MapTypeId.ROADMAP
         		//, disableDefaultUI: true
        		};

        	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

            map.mapTypes.set('map_style', styledMap); //add the stylers to the map
  	map.setMapTypeId('map_style');



//computes the circle 
        	//Defines the circle that shows the distance of the search
		var areaOfSearch = {
		      strokeColor: '#FF0000',
		      strokeOpacity: 0.25,
		      strokeWeight: 2,
		      fillColor: '#FF0000',
		      fillOpacity: 0.15,
		      map: map,
		      center: homeCenter,
		      radius: 100*searchDistance
		    };
		    // Add the circle for this city to the map.
		    searchCircle = new google.maps.Circle(areaOfSearch);
		//

		//searchCircle.setRadius( *searchDistance) use this to change the map

//		searchCircle.setMap(null) //To get rid of the circle just toggle this between null and map.




//loop to put the markers on the map
            for (i = 0; i < markers.length; i++) {  
        		
        		console.log(searchCircle)
            	if (searchCircle.getBounds().contains(markers[i][1]) == true) { //If the points are within distance, we add them to the map


        		marker = new google.maps.Marker({
            		position: markers[i][1], //loops through and adds the position of each of these markers
            		map: map,
            		title: markers[i][2]
        		});


        		 var infowindow = new google.maps.InfoWindow({ // creates an infowindow for each marker
      			content: markers[i][3]
  			});

        			google.maps.event.addListener(marker, 'click', function() {//makes the info window for each marker open
   			 infowindow.setContent(this.title); //replace this.title with whatever content you want
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
		    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		});



	});    
      }
//


      google.maps.event.addDomListener(window, 'load', initialize); //This is where it's started



//chat overlay
//slider
//checkbox



//redraw once you redrag?





//query the database, ask for a bunch of markers nearby, put them on map. Boom. Done

//function to see WHAT IS NEARBY

//load

//someething to put markers with info
//probably have an array,a nd someting that iterates through the array and places them all
//an array of objects

	//initialize draws them on the map when we first load
	//
