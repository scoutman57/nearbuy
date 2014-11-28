var user;
var password;
var sharedKey;
var encrypted;
var sessionID;


function logout(){

sessionID = document.getElementById("sessionID").value;


	xmlhttp=new XMLHttpRequest();

	//xmlhttp.open("POST","http://localhost/handshake.php",false); // we post the name to the server. because we do this synchronously, we are waiting for the servers response
	//xmlhttp.send();


xmlhttp.open("GET", "http://localhost/logout.php" + "?sessionID=" + sessionID, false);


xmlhttp.send(sessionID);

	
	console.log(xmlhttp.responseText);

}



function sendHandshake(){

	user = document.getElementById("username").value;
	password = document.getElementById("password").value;

	xmlhttp=new XMLHttpRequest();

	//xmlhttp.open("POST","http://localhost/handshake.php",false); // we post the name to the server. because we do this synchronously, we are waiting for the servers response
	//xmlhttp.send();


xmlhttp.open("GET", "http://localhost/handshake.php" + "?username=" + user, false);


xmlhttp.send(user);

	
	sharedKey = xmlhttp.responseText;

	//console.log(xmlhttp.responseText);

caesar();

}




function toJSON(){

var profile = {username : user, password : encrypted};
//profile = JSON.stringify(profile);

var response;


//console.log(profile);


//$.post("http://localhost/login.php", profile);


/*
$.post("http://localhost/login.php", profile, function(json) {
    console.log(json.name);
    console.log(json.time);
}, "json");
*/


var ajaxCall = $.ajax({
    type: 'POST',
    url: 'http://localhost/login.php',
    data: profile,
    complete: function(r){

      document.getElementById("back").innerHTML = r.responseText;
    }
 });


//var msg = $.ajax({type: "POST", url: "http://localhost/login.php", async: false}).responseText;

//document.body.innerHTML= msg;

//console.log(ajaxCall.responseText);


//console.log(alert(response));

/* ALTERNATE SOLUTION

xmlhttp=new XMLHttpRequest();

xmlhttp.open("POST", "http://localhost/login.php", false)


 xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

xmlhttp.send(profile);

*/

/*
xmlhttp=new XMLHttpRequest();


//var str_json = "json_string=" + profile;

xmlhttp.open("POST", "http://localhost/login.php", false);

//xmlhttp.setRequestHeader("Content-type","application/json");

 xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//xmlhttp.setRequestHeader("Content-type", "application/json");

//xmlhttp.send(str_json);

xmlhttp.send(profile);

console.log(xmlhttp.responseText);

*/

}






function caesar(){

var counter = 0;

//console.log(password);

encrypted=password.split('');

key = (sharedKey).toString(sharedKey.length).split("").map(function(t) { return parseInt(t) }) 



    for(var i = 0; i < password.length; i++){
     
     	if((encrypted[i].charCodeAt() + key[counter]) > 127 && (encrypted[i].charCodeAt() + key[counter] -127) > 33){
     		
     		encrypted[i] = String.fromCharCode(encrypted[i].charCodeAt() + key[counter] -127 + 32);


     	}

     	else if(encrypted[i].charCodeAt() + key[counter] < 33){

     		encrypted[i] = String.fromCharCode(encrypted[i].charCodeAt() + key[counter]);

     		//Still needs working on
     	}

     	else{
     encrypted[i] = String.fromCharCode(encrypted[i].charCodeAt() + key[counter]);
        }
        
        counter++;
        

        if(counter === key.length){
           counter =0;
            
            
    }


}

encrypted = encrypted.join(''); // puts it all together

toJSON();
}
