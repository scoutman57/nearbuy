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





function getCoordinates(address, callback){

console.log("makes it here to get coordinates")
    var coordinates;

    geocoder = new google.maps.Geocoder();
    console.log("heyo")
    geocoder.geocode({address: address}, function(results,status){ 

        console.log("heyo2")
        if (status == google.maps.GeocoderStatus.OK) {  //If the geocode was okay, we can return the object

            coords_obj = results[0].geometry.location;          
            coordinates = [coords_obj.k, coords_obj.B]

            console.log(coordinates);
            callback(coordinates);

        } else {
        alert(" The Geocoding didn't work ")
        } 

    });

    
    return coordinates;
}



function createListing(){

var username = readCookie("username")
var name = document.getElementById("listName").value;
var descriptionText = document.getElementById("listDesc").value;
var imageLink = document.getElementById("listPIc").value;
var price = document.getElementById("listPrice").value;
//var givenAddress document.getElementById('listLoc').value;
var address =  document.getElementById('listLoc').value;
//var address; // for if we want to grab their home address
var nameProfile = {username: username}
var profile = {username: user, title: name, description: descriptionText, image: imageLink, price: price}


console.log('breakpoint 1 works')

/*
    var ajaxCall= $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
    //url: 'http://localhost/php/handshake.php',
    url: 'http://near-buy.me/php/getAddress.php',
    data: nameProfile,
    complete: function(r){
*/

   //          geocoder = new google.maps.Geocoder();
//  codeAddress( address);//call the function


            //address = r.responseText

            var coordinates = getCoordinates(address, function(coordinates){ //This is the callback function from when we asked for the address
            
                var latlng = coordinates[0]+", "+coordinates[1]


                console.log(latlng)
                setLatLngCookie(latlng)
            //var latlng = new google.maps.LatLng(coordinates[0], coordinates[1]); 
            
             //addressToConvert = latlng



          


         });



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



function codeAddress(address) {

  geocoder.geocode( {address:address}, function(results, status) 
  { console.log("gets here")

    addressToConvert = results[0].geometry.location
    console.log(addressToConvert)

  });
}

