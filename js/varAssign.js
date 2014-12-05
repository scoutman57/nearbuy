
var user;
var password;
var sharedKey;
var encrypted;
var sessionID;

function login(){

    user = document.getElementById("loguser").value;
    password = document.getElementById("logpass").value;

    var usernameForHandshake = {username : user};

    // first request to get/send key for handshake, aka establish connection
    var ajaxCall= $.ajax({

        type: 'POST',
        url: 'php/handshake.php',
        data: usernameForHandshake,

        complete: function(r){
            sharedKey = r.responseText
            caesar(false)
            var profile = {username : user, password : encrypted};

            var ajaxCall2= $.ajax({ 

                type: 'POST',
                url: 'php/login.php',
                data: profile,

                complete: function(r){
                    setCookie(user)
                    document.write(r.responseText)
                }    
            }); //end of ajaxCall2
        }       
    }); //end of ajaxCall
} //end of login()


function register(){

    //grab all the registration data from forms
    var regUser = document.getElementById("reguser").value;
    var regPass = document.getElementById("regpass").value;
    var regEmail = document.getElementById("regemail").value;
    var regLoc = document.getElementById("reghome").value;

    var prepTable = true
    var firstPrep = {prepareTable : prepTable}

    // requests server to prepare new row in DB for user, assign id and shared key
    var ajaxCall = $.ajax({ 
        
        type: 'POST',
        url: 'php/registration.php',    
        data: firstPrep,

        complete: function(r){
            var id = r.responseText;
            id = eval(r.responseText)
            sharedKey = id[1];
            password = regPass;
            caesar(false);
            var profile = {username : regUser, password : encrypted, email : regEmail, profileID : parseInt(id[0]), address: regLoc}

            // requests server to insert new user information into DB
            var ajaxCall2= $.ajax({

                type: 'POST',
                url: 'php/registrationToDB.php',
                data: profile,

                complete: function(r){
                    window.location.assign("success.html")
                }    
            }); //end of ajaxCall2
        }
    }); //end of ajaxCall
} //end of register function


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

//not yet implemented
function logout(){
    sessionID = document.getElementById("sessionID").value;
	xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", "php/logout.php" + "?sessionID=" + sessionID, false);
    xmlhttp.send(sessionID);
    console.log(xmlhttp.responseText);
}

//can be removed? we have a php to do this.
function sendHandshake(){
	user = document.getElementById("username").value;
	password = document.getElementById("password").value;
	xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", "php/handshake.php" + "?username=" + user, false);
    xmlhttp.send(user);
	sharedKey = xmlhttp.responseText;
    caesar(true);
}


function caesar(login){
    var counter = 0;
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
            counter=0;     
        }
    }
    encrypted = encrypted.join(''); // puts it all together
    if(login === true){
    } else {
       return encrypted;
    }
}