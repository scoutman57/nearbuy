var user;

function genlist(){

	$("#table").hide();

	user = document.getElementById("username").value;
	//output = document.getElementById("results");
	//console.log(user);

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