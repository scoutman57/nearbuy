
var user;
var password;
var sharedKey;
var encrypted;
var sessionID;

var regUser;
var regPassword;
var regEmail;

function register(){

    regUser = document.getElementById("reguser").value;
    regPassword = document.getElementById("regpass").value;
    regEmail = document.getElementById("regemail").value;

//    var profile = {username : regUser, password : regPassword, email : regEmail};

    var prepTable = true
    var firstPrep = {prepareTable : prepTable}


    //var hashResponse

    var ajaxCall = $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
    url: 'http://localhost/registration.php',
    data: firstPrep,
    complete: function(r){

        
      var id = r.responseText;

      console.log(id)

      id = eval(r.responseText)

        console.log(id[0])

        sharedKey = id[1];

        password = regPassword;


        
        console.log(password)



        caesar(false);

       // console.log(encrypted)

      var profile = {username : regUser, password : encrypted, email : regEmail, profileID : parseInt(id[0])}

    var ajaxCall2= $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
    url: 'http://localhost/registrationToDB.php',
    data: profile,
    complete: function(r){

      console.log("success! This is where you draw the success page!")
                }    
        
            });

}

});
}








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

caesar(true);

}




function toJSON(){

var profile = {username : user, password : encrypted};
//profile = JSON.stringify(profile);

var response;


var ajaxCall = $.ajax({
    type: 'POST',
    url: 'http://localhost/login.php',
    data: profile,
    complete: function(r){

      document.getElementById("back").innerHTML = r.responseText;
    }
 });

}




function caesar(login){

var counter = 0;

//console.log(password);

encrypted=password.split('');

key = (sharedKey).toString(sharedKey.length).split("").map(function(t) { return parseInt(t) }) 
//console.log(key)


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

if(login === true){


toJSON();

} else {

    return encrypted
}


}
