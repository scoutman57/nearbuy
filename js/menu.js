$(document).ready(function(){

    $(".menu1").hide();
    $(".menu2").hide();
    $(".menu3").hide();

    $(".btn1").click(function(){
        if (($(".menu2").is(":visible")) || ($(".menu3").is(":visible"))) {
            $(".menu2").slideUp();
            $(".menu3").slideUp();
            $(".menu1").delay(500).slideToggle();
        } else {
            $(".menu1").slideToggle();
        }
    });
    $(".btn2").click(function(){
        if (($(".menu1").is(":visible")) || ($(".menu3").is(":visible"))) {
            $(".menu1").slideUp();
            $(".menu3").slideUp();
            $(".menu2").delay(500).slideToggle();
        } else {
            $(".menu2").slideToggle();
        }
    });
    $(".btn3").click(function(){
        if (($(".menu1").is(":visible")) || ($(".menu2").is(":visible"))) {
            $(".menu1").slideUp();
            $(".menu2").slideUp();
            $(".menu3").delay(500).slideToggle();
        } else {
            $(".menu3").slideToggle();
        }
    });
});