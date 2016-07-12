$(document).ready(function(){
	
});

$("#section-two > div.center-column.down-arrow > a").click(function(){
    	$('html, body').animate({
        	scrollTop: $("#section-two").offset().top
    	}, 2000);
	});	


/* --------- compare page ---------- */

//Dynamically add a new column to the table
$('#add').click(function(){
  var closeIndex = $(this).index(".close");
  if($(".close").length < 3){
    $("th:last-of-type").clone().appendTo("tr:first-of-type");
    /* $("tr td:last-of-type").clone().appendTo("tr:last-of-type"); */
   	$('table').find('tr').each(function(){
   	console.log(closeIndex);
        $(this).find('td').eq(closeIndex-1).after("<td>A new item</td>");
   });
    $('#slide-nav').toggleClass("menu-container menu-container-active");
  }else {
    alert('Cannot compare more than 3\nPlease remove one first');
    $('#slide-nav').toggleClass("menu-container menu-container-active");
  }
});

//remove the column that user clicks
$(document).on('click',".close", function(){
  var closeIndex = $(this).index(".close");
  closeIndex++;
  console.log(closeIndex);
  if($(".close").length > 2){
  //handle the first close action to skip feature td cells
  $("th:nth-of-type(" + closeIndex + ")").remove();
	  if(closeIndex === 1) {
	  	closeIndex = 2;
	  	console.log($("tr td:nth-of-type(" + closeIndex + ")"));
	  	$("tr td:nth-of-type(" + closeIndex + ")").remove();
	  } else {
	  	$("tr td:nth-of-type(" + closeIndex + ")").remove();
	  }
  }else{
    alert("Cannot compare less than two");
  }
});


/* $('.close').click(function(){
  var closeIndex = $(this).index("span.close");
  closeIndex++;
  console.log(closeIndex);
  $("th:nth-of-type(" + closeIndex + ")", "document td:nth-of-type(" + closeIndex + ")").remove();
  console.log($("th:nth-of-type(" + closeIndex + ")" + " " + "td:nth-of-type(" + closeIndex + ")"));
}); */

$('#menuBtn').click(function() {
  $('#slide-nav').toggleClass("menu-container menu-container-active");
});

var ESC_KEYCODE = 27;
$(document).keydown(function(event) {
  /*event.preventDefault();*/
  /*console.log(event.keyCode);*/
  if (event.keyCode === ESC_KEYCODE && $('#slide-nav').attr('class', 'menu-container-active')) {
    $('#slide-nav').toggleClass("menu-container menu-container-active");
  }
});

/*$("body").click(function(e) {
	if ($('#slide-nav').attr('class', 'menu-container-active')) {
		$('#slide-nav').toggleClass("menu-container menu-container-active");
		console.log('slide open');
    	if(e.target.class !=="nav-bar") {
      		$(".nav-bar").hide();
		}
	}
  });*/

/* --------------------LIST PAGE --------------------- */

/*border: 3px solid rgba(55, 66, 75, .7);*/
function countHowManyChecked(){
	var count = 0;
	$(input[type])
}
var count = 0;
		$('input[type=checkbox]').on('change', function(){
			if($(this).is(':checked')){
				count++;
				if(count < 4){
					$(this).closest('.box').css('border', '3px solid rgba(55, 66, 75, .7)');
				}else{
					count--;
					alert("cannot compare more than 3 at a time");
					$(this).prop('checked', false)
				}
			}else{
				count--;
				$(this).closest('.box').css('border', '');
			}
		});
