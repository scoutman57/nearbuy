
function getArray() {


$.getJSON( "dbToArray.php", function( data ) {
  	
  	console.log("hi");
	console.log(data)

  	return data
//post call from php. Get an array. Return the array.
});

}


var ajaxCall = $.ajax({
    type: 'GET',
    url: 'http://localhost/dbToArray.php',
    complete: function(r){

    	//var output = JSON.parse(r.responseText)
      //console.log( output);
    	console.log(r.responseText)


    }
     });





function populateArray(){
	array = getArray()
console.log(array)
	return array
}


function initialize(){

//console.log("hi")


populateArray()

//console.log(populateArray())

}

initialize()