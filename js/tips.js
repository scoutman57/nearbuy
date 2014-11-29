$(document).ready(function(){

	$(".desc").hover(function(){

		var element = $(this);
		var offset = element.offset();
		var toolTip = $("<div class='tooltip'></div>");

		toolTip.css({
			top : offset.top,
			left : offset.left
		});

		toolTip.text(element.text());
		element.append(toolTip);

	},function(){

		$(this).children(".tooltip").remove(); 

	});

	$(".del").click(function(){
		$(this).parent().parent().remove();
		//ADD REMOVAL FROM DATABASE
	});

});