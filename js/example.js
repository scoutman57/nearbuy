var array;

function goToProfile(){
    window.location.assign("profile.html");
}

function setCookie(cname) {
    document.cookie = "username="+cname;
}

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

function eraseCookie(name) {
    createCookie(name,"",-1);
}


var searchAddress =getAddress(readCookie("username"), false); //script to change this
var searchDistance = 1; 
var zoomLevel = 15;

function getAddress(username, shouldIInit){
    var user = readCookie("username");
    var profile = {username: user};
    var ajaxCall = $.ajax({
        type: 'POST',
        url: 'php/getAddress.php',
        data: profile,
        complete: function(r){
            //console.log(profile)
            searchAddress = r.responseText;
            //console.log("SEARCH ADDRESS: " + searchAddress)
            if(shouldIInit === true){
                initialize2(searchDistance, searchAddress, array);
            }
        }
    });
}

function getMap(){
    console.log("getmap is being called");
    getAddress(readCookie("username"), false);
    window.location.assign("mappage.html");
    setTimeout(initialize2(searchAddress, searchDistance, array), 100);
}

function getCoordinates(address, callback){
    //console.log("makes it here to get coordinates")
    var coordinates;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results,status){ 
        if (status == google.maps.GeocoderStatus.OK) {  //If the geocode was okay, we can return the object
            coords_obj = results[0].geometry.location;          
            coordinates = [coords_obj.k, coords_obj.B];
            callback(coordinates);
        } else {
            alert(" The Geocoding didn't work ");
        } 
    });
    return coordinates;
}

//Need a function to convert addresses to geocode 
/*
function getArray() {
    $.getJSON( "php/dbToArray", function( data ) {
    //post call from php. Get an array. Return the array.
    });
}
function populateArray(){
    array = getArray();
    return array;
}
*/
//This gets the entire array from our db
var ajaxCall = $.ajax({
    type: 'GET',
    url: 'php/dbToArray.php',
    complete: function(r){
        array = eval(r.responseText);
        initialize2(searchDistance, searchAddress, array);
    }
});

function redoDistance(newDistance){
    $.ajax({
        type: 'GET',
        url: 'php/dbToArray.php',
        complete: function(r){
            var array = eval(r.responseText);
            searchDistance = newDistance;
            //console.log(array[0].latlng)
            initialize2(searchDistance, searchAddress, array);
        }
    });
}

function redoCircle(newAddress){
    $.ajax({
        type: 'GET',
        url: 'php/dbToArray.php',
        complete: function(r){
            var array = eval(r.responseText);
            var geocoder = new google.maps.Geocoder();  
            geocoder.geocode({ 'latLng': newAddress }, function (results, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    alert(status);
                }
                // This is checking to see if the Geoeode Status is OK before proceeding
                if (status == google.maps.GeocoderStatus.OK) {
                    var address = (results[0].formatted_address);
                    searchAddress = address;
                   initialize2(searchDistance, address, array);
                }
            }); //end of geocoder
            //initialize2(searchDistance, newAddress, array)
        }
    });//end of ajaxCall
}

function search(searchTerm){
}

function changeAddress(newAddress){
    $.ajax({
        type: 'GET',
        url: 'php/dbToArray.php',
        complete: function(r){
            var array = eval(r.responseText);
            console.log(array[0].latlng);
            searchAddress = newAddress;
            initialize2(searchDistance, searchAddress,array);
        }
    });
}


//ALL OF REMAINDER IS PART OF MAP INITIALIZATION
//ALL OF REMAINDER IS PART OF MAP INITIALIZATION
//ALL OF REMAINDER IS PART OF MAP INITIALIZATION
//ALL OF REMAINDER IS PART OF MAP INITIALIZATION
//ALL OF REMAINDER IS PART OF MAP INITIALIZATION
//ALL OF REMAINDER IS PART OF MAP INITIALIZATION


//should each marker have a small summary, a pic, and a link to an ad
//need to pass a Center to it as well.
function initialize2(searchDistance, givenAddress, markers) {
console.log("initialize is being called");
address = givenAddress;
//This is the callback function from when we asked for the address
var coordinates = getCoordinates(address, function(coordinates){ 
    var homeCenter = new google.maps.LatLng(coordinates[0], coordinates[1]); 
    var newSearchDistance = /' searchDistance'/;
    document.getElementById('rangeValue').innerHTML= "<p>" + searchDistance + "</p>";

    //map style
    var styles =  [
        {"stylers": [ 
            { "visibility": "on" },
            { "saturation": -32 },
            { "gamma": 0.18 },
            { "hue": "#0091ff" }
        ]}
    ]
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    //console.log(markers);
    var mapOptions = {
        center: homeCenter,
        zoom: zoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.mapTypes.set('map_style', styledMap); //add the stylers to the map
    map.setMapTypeId('map_style');

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
    //searchCircle.setRadius( *searchDistance) use this to change the map
    //searchCircle.setMap(null) //To get rid of the circle just toggle this between null and map.

    //loop to put the markers on the map
    for (i = 0; i < markers.length; i++) {

        var latlong = markers[i].latlng.split(',');
        var newLatLongMarker = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]));
        //If the points are within distance, we add them to the map
        if (searchCircle.getBounds().contains(newLatLongMarker) == true) { 
            
            var contentString = 
                '<div id="info">Title: '+markers[i].name+'<br>Seller: '+markers[i].username+'<br>Price: '+markers[i].price+
                '<br><a href='+markers[i].imagelink+' target="_blank">Image</a><br>Desc: '+markers[i].description_text+'</div>';

            marker = new google.maps.Marker({
                position: newLatLongMarker,
                map: map,
                title: markers[i].name,
                info: contentString
            });
            // creates an infowindow for each marker
            var infowindow = new google.maps.InfoWindow({ 
                //content: contentString,//"<div id='contentWindowYo'>: "+markers[i].description_text +"</div>", //whatever is in element 3 will be entered 
            });
            //makes the info window for each marker open
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(this.info); //replace this.title with whatever content you want
                infowindow.open(map, this);
            });
        }

    };

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
        searchCircle.setMap(null);
        areaOfSearch.center = homeMarker.getPosition();
        console.log("NEW POS: " + areaOfSearch.center);
        searchCircle = new google.maps.Circle(areaOfSearch);
        //searchCircle.setCenter(homeMarker.getPosition())
        //searchCircle = new google.maps.Circle(areaOfSearch);
        //initialize(searchDistance, searchCircle.getCenter())
        redoCircle(searchCircle.getCenter());
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
        zoomLevel = map.getZoom();
    });


}); //end of get coordinates
} //end of initialize

//Relic from the first initialize
//google.maps.event.addDomListener(window, 'load', initialize2(searchDistance, searchAddress, populateArray())); //This is where it's started