$(document).ready(function(){
	


});

$("#section-two > div.center-column.down-arrow > a").click(function(){
    	$('html, body').animate({
        	scrollTop: $("#section-two").offset().top
    	}, 2000);
	});	
