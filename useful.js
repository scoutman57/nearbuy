var addressToConvert


function setCookie(cname) {
    

    document.cookie = "username="+cname;
}

function setLatLngCookie(cname) {
    

    document.cookie = "latlng="+cname;
}


function readLatLngCookie(name) {
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


var geocoder;
var map;





function createListing(map){

var username = readCookie("username")
var name = document.getElementById("listName").value;
var descriptionText = document.getElementById("listDesc").value;
var imageLink = document.getElementById("listPIc").value;
var price = document.getElementById("listPrice").value;
//var givenAddress document.getElementById('listLoc').value;
//var address =  document.getElementById('listLoc').value;
//var address; // for if we want to grab their home address
var nameProfile = {username: username}
var profile = {username: user, title: name, description: descriptionText, image: imageLink, price: price}


coords_obj = map.getCenter();          
            coordinates = [coords_obj.k, coords_obj.B]
            
var latlng = coordinates[0] + ", "+coordinates[1]

console.log(latlng)

console.log('breakpoint 1 works')
            var latlng = readLatLngCookie("latlng")

            console.log(latlng)
             var profile = {username: user, title: name, description: descriptionText, image: imageLink, price: price, address: address, latlng: latlng}

             console.log(profile)
                      $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
                type: 'POST',
                //url: 'http://localhost/php/handshake.php',
                url: 'http://near-buy.me/php/listing.php',
                data: profile,
                complete: function(r){

                  console.log(r.responseText)


                    }
                });


                 // });

}




function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


function codeAddress() {
  var address = document.getElementById('listLoc').value;
  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {


      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
          



      });

      createListing(map)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);






