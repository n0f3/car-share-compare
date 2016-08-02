$(document).ready(function(){

	enabledDisableCompareBtn();
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

/*----------------------------------------------- menu slider ------------------------------------*/

$('#closeBtn').click(function(){
  $("#openBtn").show();
      $("#closeBtn").hide();
  $('#slide-nav').toggleClass("menu-container menu-container-active");
});

$('#openBtn').click(function(e){
  /* console.log(e.target.tagName) */
      $("#openBtn").hide();
      $("#closeBtn").show();
      $('#slide-nav').toggleClass("menu-container menu-container-active");
  
  $(document).click(function(e) { //set event handler for click function and capture event param 
        if(e.target.id !== 'openBtn' //we want to toggle(close) the slide menu for any event not related to slide menu
          && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'rect' && e.target.tagName !== 'line' && e.target.tagName !== 'IMG'){ // don't close the slide menu for events: menuBtn, form, INPUT & BUTTON
          $('#slide-nav').removeClass("menu-container menu-container-active").addClass("menu-container");
          $("#closeBtn").hide();
          $("#openBtn").show();
        }
    });
});

var ESC_KEYCODE = 27;
$(document).keydown(function(event) {
  if (event.keyCode === ESC_KEYCODE && $('#slide-nav').attr('class', 'menu-container-active')) {
    $('#slide-nav').toggleClass("menu-container menu-container-active");
    $("#closeBtn").hide();
    $("#openBtn").show();
  }
});

/*----------------------------------------------- End menu slider ------------------------------------*/

/*$('#menuBtn').click(function() {
  $('#slide-nav').toggleClass("menu-container menu-container-active");
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

var srvObj = {
  count: 0, 
  selSrv: []
};

var restoredSession;

function setSessionObject(obj){
  return sessionStorage.setItem('session', JSON.stringify(obj));
}

function getSessionObj(){
  return restoredSession = JSON.parse(sessionStorage.getItem('session'));
}

function enabledDisableCompareBtn(){
  if(srvObj.selSrv.length > 1){
    $('#goToComparePage').prop('disabled',false);
  }else
    $('#goToComparePage').prop('disabled',true);
};

function addRemoveService(serviceName){
  if(srvObj.selSrv.includes(serviceName)){
    var index = srvObj.selSrv.indexOf(serviceName);
    if(index >= 0){
      srvObj.selSrv.splice(index, 1);
    }
  }else{
    srvObj.selSrv.push(serviceName);
  }
    console.log(srvObj.selSrv);
    //srvObj.selSrv = serviceList;
    setSessionObject(srvObj);
    return srvObj;
};

$('input[type=checkbox]').on('change', function(){
  //console.log(srvObj.selSrv.length+1);
	if($(this).is(':checked')){
		srvObj.count++;
    addRemoveService(this.parentNode.id);
    enabledDisableCompareBtn();
		if(srvObj.selSrv.length < 5){
			$(this).closest('.box').css('border', '3px solid rgba(0, 188, 212, .8)');//;  rgba(55, 66, 75, .7)
		}else{
			srvObj.count--;
      addRemoveService(this.parentNode.id);
      enabledDisableCompareBtn();
			alert("cannot compare more than 4 at a time");
			$(this).prop('checked', false);
		}
	}else{
		srvObj.count--;
    addRemoveService(this.parentNode.id);
    enabledDisableCompareBtn();
		$(this).closest('.box').css('border', '');
	}
});
/* ----------------------------------------------SEND JSON DATA TO COMPARE PAGE --------------------------------------- */

$('#goToComparePage').on('click', function(){
  $.ajax({
    type: 'POST',
    url: '/compare',
    data: srvObj
  }).done(function(results, textStatus){
    console.log("Ajax returned: " + textStatus);
    $.ajax({
      type: 'GET',
      url: '/compare'
    }).done(function(){
      window.location = '/compare';
    });
  }).fail(function(jqXHR, textStatus, err){
    console.log("Not Sent " + textStatus + " " + err);
  });
});


/* ---------------------------------------------- SAVE SELECTED SERVICES IN SESSION  --------------------------------------- */
//var sessData = sessionStorage.getItem('sessObj');
$(window).on("load",function(){
  if(this.location.pathname === '/list'){
    console.log("Session Data is " + JSON.stringify(getSessionObj()));
    if(restoredSession && restoredSession.selSrv[0]){
      console.log("session is restored");
      srvObj = restoredSession;
      for(var i = 0; i < srvObj.selSrv.length; i++){
        $("#listChk-"+srvObj.selSrv[i]).prop('checked', true).closest('.box').css('border', '3px solid rgba(0, 188, 212, .8)');
      }
      enabledDisableCompareBtn();
    }
  }
});
