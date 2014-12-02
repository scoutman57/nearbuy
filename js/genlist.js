var user;




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



function genlist(){

	$("#table").hide();

	//user = document.getElementById("username").value;
	//output = document.getElementById("results");
	//console.log(user);
	var user = readCookie("username")

	var profile = {username: user} //json encoding of msg

	var ajaxCall = $.ajax({

		type: 'POST',
		url: 'php/genlist.php',
		data: profile,

		complete: function(r){
			var result = r.responseText;
			$("#results").html(result);

		}

	});

};