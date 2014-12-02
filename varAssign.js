
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
    regAddress =  document.getElementById("reghome").value;
//    var profile = {username : regUser, password : regPassword, email : regEmail};

    var prepTable = true
    var firstPrep = {prepareTable : prepTable}


    //var hashResponse

    var ajaxCall = $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
    url: 'http://near-buy.me/php/registration.php',    
   //url: 'http://near-buy.me/php/registration.php',
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

      var profile = {username : regUser, password : encrypted, email : regEmail, profileID : parseInt(id[0]), address: regAddress}

    var ajaxCall2= $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
   // url: 'http://localhost/php/registrationToDB.php',
       url: 'http://near-buy.me/php/registrationToDB.php',
    data: profile,
    complete: function(r){
        
        //console.log(profile)

        console.log(r.responseText)
        //console.log("php echos:" +r.responseText)
      //console.log("success! This is where you draw the success page!")
        window.location.assign("success.html")

                }    
        
            });

}

});
}

function echoUsername(){

console.log(readCookie("username")) 


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


function login(){

    user = document.getElementById("loguser").value;
    password = document.getElementById("logpass").value;


    var usernameForHandshake = {username : user};

    var ajaxCall= $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
    type: 'POST',
    //url: 'http://localhost/php/handshake.php',
    url: 'http://near-buy.me/php/handshake.php',
    data: usernameForHandshake,
    complete: function(r){

        sharedKey = r.responseText

        caesar(false)

         var profile = {username : user, password : encrypted};

             var ajaxCall2= $.ajax({ // sends a request to server, telling it to prepare a place in it. Assigns a member id and returns it
                type: 'POST',
                //url: 'http://near-buy.me/php/login.php',
               url: 'http://near-buy.me/php/login.php',
                data: profile,
                complete: function(r){

                        console.log(r.responseText)
                        setCookie(user)
                     //   console.log(readCookie("username"))


                     //   document.write("<p>holla</p>")
                       document.write(r.responseText)

                       //echoUsername();

                     //  console.log("success! This is where you draw the login success or fail page!")
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


xmlhttp.open("GET", "http://localhost/php/logout.php" + "?sessionID=" + sessionID, false);


xmlhttp.send(sessionID);

	
	console.log(xmlhttp.responseText);

}



function sendHandshake(){

	user = document.getElementById("username").value;
	password = document.getElementById("password").value;

	xmlhttp=new XMLHttpRequest();

	//xmlhttp.open("POST","http://localhost/handshake.php",false); // we post the name to the server. because we do this synchronously, we are waiting for the servers response
	//xmlhttp.send();


xmlhttp.open("GET", "http://localhost/php/handshake.php" + "?username=" + user, false);


xmlhttp.send(user);

	
	sharedKey = xmlhttp.responseText;

	//console.log(xmlhttp.responseText);

caesar(true);

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


} else {

    return encrypted
}


}
