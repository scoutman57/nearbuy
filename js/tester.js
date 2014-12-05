
function test(){

	var latitude;
	var longitude;
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK)
	  {
	      // do something with the geocoded result
	      //
      		alert("Latitude: "+results[0].geometry.location.lat());
      		alert("Longitude: "+results[0].geometry.location.lng());
	      //console.log(latitude+", "+longitude)
	  }
	});

};

45.5106411, -73.57628349999999