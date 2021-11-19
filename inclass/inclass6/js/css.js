$(function() {
	var bgc = $('#one').css("backgroundColor");
	$("#four").after('<p id="funny">Color was: </p>')
	$("#funny").append(bgc)
	$("li").css("backgroundColor", "#c5a996")
	$("li").css("border", "1px solid white")
	$("li").css("color", "black")
	$("li").css("text-shadow", "none")
	$("li").css("fontFamily", "Georgia")
});