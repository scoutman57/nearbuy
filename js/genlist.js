var user;

function genlist(){
	user = document.getElementById("userID").value;
	//console.log(user);

	var profile = {username: user} //json encoding of msg

	var ajaxCall = $.ajax({

		type: 'POST',
		url: 'php/genlist.php',
		data: profile,

		complete: function(r){
			var result = r.responseText;
			console.log (result);
		}

	});

};