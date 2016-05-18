//DOM Ready
$(document).ready(function() {
	//call on change function to wait for change events on the inputs
	/*onChangeValidation();*/
	
});

//---------------------------------------------- Validation Module ----------------------------------------------

var Validation_Module = (function() {
	return {
		validateNotEmpty: function(textInput) {
			if (textInput == "" || textInput === null || typeof textInput === "undefined") {
				return false
			} else
				return true;
		},
		//supply the input to be validated as first parameter and the minimum length as second parameter
		validateMinLength: function(input, minLength) {
			if (input.length > minLength || input > minLength) {
				return true;
			} else
				return false;
		},
		validateEmail: function(emailInput) {
			//todo write regex for email
		},
		validateIsNumber: function(numberInput) {
			if (isNaN(numberInput)) {
				alert("Is Not a Number");
				return false;
			} else
				alert("Number");
			return true;
		}
	};
})();


//---------------------------------------------- Refresh Table ----------------------------------------------
var Refresh_Element_Module = (function() {
	return {
		refreshTable: function(targetElement, pageName_TargetData) {
			$(targetElement).load(pageName_TargetData);
			console.log(targetElement + " refreshed");
			return true;
		}
	}
})();

//---------------------------------------------- Delete Movie ----------------------------------------------
//use jquery to find when user clicks the delete button
$('body').on('click', '#movieTable tbody td a.close', function() {
	event.preventDefault();
	console.log('Delete Button')
		//pop up confirmation
	var confirmation = confirm("Are you sure you want to delete this movie?");

	//check if the confirmation is true, if true we want to delete the movie
	if (confirmation === true) {
		$.ajax({
			type: 'DELETE',
			url: '/deleteMovie/' + $(this).attr('rel')
		}).done(function(response) {
			//check for success
			if (response.msg === '') {
				console.log("Sever returns: " + response.msg);
			} else {
				alert('Error ' + response.msg);
			}
			//update the table
			$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Entry Deleted");
			$("#formAlert").delay(5000).fadeOut(1000);
			Refresh_Element_Module.refreshTable("#movieTable", "movies #movieTable");
		});
	} else
	//if user selects cancel to the confirmation, do nothing
		return false;
});

//---------------------------------------------- Delete Favourite ----------------------------------------------
//use jquery to find when user clicks the delete button
$('body').on('click', '#favTable tbody td a.close', function() {
	event.preventDefault();
	console.log('Delete Button')
		//pop up confirmation
	var confirmation = confirm("Are you sure you want to delete this movie from your favorites list?");

	//check if the confirmation is true, if true we want to delete the movie
	if (confirmation === true) {
		$.ajax({
			type: 'DELETE',
			url: '/deleteFav/' + $(this).attr('rel')
		}).done(function(response) {
			//check for success
			if (response.msg === '') {
				console.log("Sever returns: " + response.msg);
			} else {
				alert('Error ' + response.msg);
			}
			//update the table
			$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Entry Deleted");
			$("#formAlert").delay(5000).fadeOut(1000);
			//RefreshFavTable();
			Refresh_Element_Module.refreshTable("#favTable", "favorites #favTable")
		});
	} else
	//if user selects cancel to the confirmation, do nothing
		return false;
});

//---------------------------------------------- Submit Event ----------------------------------------------
//use jquery to find when user clicks submit button and call validate function
$('#btnSubmit').on('click', function() {
	var title = $('#inputMovieTitle').val();
	var year = $('#inputMovieYear').val();
	var genre = $('#inputMovieGenre').val();
	//check if each input has valid data and only submit if all are valid
	var titleIs, yearIs, genreIs;
	inputIsValid = [titleIs, yearIs, genreIs];
	var count = 0;
	event.preventDefault();
	var formValues = {
			title: title,
			year: year,
			genre: genre
		}
		//We also want to check if the input is valid here
		//check title
	if (title === "") {
		inputIsValid[0] = false;
	} else
		inputIsValid[0] = true
		//check year
	if (year === "") {
		inputIsValid[1] = false;
	} else if (isNaN(year)) {
		inputIsValid[1] = false;
	} else
		inputIsValid[1] = true;
	//check genre
	if (genre === "") {
		inputIsValid[2] = false;
	} else
		inputIsValid[2] = true;

	for (var i = 0; i < inputIsValid.length; i++) {
		if (inputIsValid[i] != true) {
			console.log(inputIsValid[i] + " is not good");
		} else
			count++;
	}
	if (count === 3) {
		sendData(formValues);
		console.log("Count is " + count + " Sending data");
	} else {
		console.log("Count is " + count + " not Sending data");
		//show the confirmation movie was added succesfully
		//make this fade out after 3 seconds
		$("#formAlert").show();
		$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Inputs are not correct, Please fix the errors");

		return false;
	}
});
//if all input is good send the data
function sendData(formValues) {
	$.ajax({
		type: 'POST',
		data: formValues,
		url: '/addmovie',
	}).done(function(response) {
		alert('Error ' + response.msg);
	});
	//empty the form after each submission
	title = $('#inputMovieTitle').val("");
	year = $('#inputMovieYear').val("");
	genre = $('#inputMovieGenre').val("");

	//give user positive feedback
	$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
	$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Movie Added");
	$("#formAlert").delay(5000).fadeOut(400);
	//update the table
	Refresh_Element_Module.refreshTable("#movieTable", "movies #movieTable");
}

//checks to see if year is a number
function checkIsNumber(year) {
	if (isNaN(year)) {
		return false;
	} else
		return true;
}

//---------------------------------------------- Validate Inputs ----------------------------------------------
//when user leaves the input box validate the input add the error styles if there is invalid input 
function onChangeValidation() {
	//Title Event
	$("#inputMovieTitle").on('change', function() {
		var title = $('#inputMovieTitle').val();
		if (title === "") {
			$("#form-feedback-title").show();
			//set error indicator around input box
			$(this).closest("div.form-group").addClass("has-error");
			//
			$("#formAlert").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Title Cannot Be Empty");
			titleIs = false;
			return false;
		} else {
			$("#form-feedback-title").hide();
			$(this).closest("div.form-group").removeClass("has-error");

			$("#formAlert").hide();
			titleIs = true;
			return true;
		}
	});

	//Year Event
	$("#inputMovieYear").on('change', function() {
		var year = $('#inputMovieYear').val();
		if (year === "") {
			$("#form-feedback-year").show();
			$(this).closest("div.form-group").addClass("has-error");
			$("#formAlert").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Year Cannot Be Empty");
			yearIs = false;
			return false;
		} else if (checkIsNumber(year) == false) {
			//alert("Year must be a number");
			$("#form-feedback-year").show();
			$(this).closest("div.form-group").addClass("has-error");
			$("#formAlert").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Year Must Be a Number");
			yearIs = false;
			return false;
		} else {
			$("#form-feedback-year").hide();
			$(this).closest("div.form-group").removeClass("has-error");
			$("#formAlert").hide();
			yearIs = true;
			return true;
		}
	});

	//Genre Event
	$("#inputMovieGenre").on('change', function() {
		var genre = $('#inputMovieGenre').val();
		if (genre === "") {
			$("#form-feedback-genre").show();
			$(this).closest("div.form-group").addClass("has-error");
			//Show Error Alert
			$("#formAlert").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Genre Cannot Be Empty");
			genreIs = false;
			return false;
		} else {
			$("#form-feedback-genre").hide();
			$(this).closest("div.form-group").removeClass("has-error");
			$("#formAlert").hide()
			genreIs = true;
			return true;
		}
	});
}

//---------------------------------------------- Favorites Validation ----------------------------------------------
	$('#allDetails li').click(function(){
		alert('got li');
	});


//on user keypress enter submit form
/*$('document').keypress(function(e) {
	if (titleFavInFocus === true && e.which == 13) {}
});

var titleFavInFocus = $('#inputFavMovieTitle').focus();*/
//Allow user to click table title to search saved movies
$("a.favoriteTitle").click(function() {
	var title = {
		title: this.innerText
	}
	findFavoriteMovie(title);
})

//handler for movie search input
$('#favBtnSubmit').on('click', function() {
	$('#formAddMovie').submit(false);
	var title = $('#inputFavMovieTitle').val();
	var validationResults = Validation_Module.validateNotEmpty(title);
	console.log(validationResults);
	if (!validationResults) {
		$("#formAlert").show();
		/*$("#formAlert").toggleClass("").show();*/
		$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-danger").show();
		$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Please Enter a Movie");
		$("#formAlert").delay(5000).fadeOut(400);
	} else {
		//set the movie title to an object
		var favTitle = {
			title: title
		};
		//call ajax function
		findFavoriteMovie(favTitle);
	}
});

function findFavoriteMovie(favTitle) {
	//event.preventDefault();
	//console.log(favTitle);
	$.ajax({
		type: 'POST',
		data: favTitle,
		dataType: 'json',
		url: '/searchFavorites',
		success: function(response) {
			console.log("Movie Found: " + response.Response);
			checkIfMovieExists(response);
		}
	}).fail(function(status) {
		alert("Error, not sent");
	});
	//empty the output fields after each submission
	$('#resTitle').val("");
	$('#resPlot').val("");
	$('#resPoster').val("");
}

function checkIfMovieExists(response) {
	$("#resPlot").val("");
	//console.log(response);
	var title = $('#inputFavMovieTitle').val();
	if (response.Response === "False") {
		$("#formAlert").show();
		$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Not Found, Check the spelling and try again");
		$("#formAlert").delay(5000).fadeOut(400);
	} else if (typeof response.Response === "undefined") {
		$("#formAlert").show();
		$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> You may not have internet connection or the OpenMoviedb is down, please check your connection and try again");
		$("#formAlert").delay(5000).fadeOut(400);
	} else {
		for (var prop in response) {
			if (prop == "Plot" || prop == "Title" || prop == "Poster" || prop == "Metascore" || prop == "imdbRating" || prop == "imdbVotes" || prop == "Type" || prop == "Response") {} else {
				$("<li>" + prop + " " + response[prop] + "</li>").appendTo($("#allDetails ul"));
			}
		}
		//Display the response results on the page
		$("#formAlert").hide();
		
		//$('#resTitle').html("Thinking...");
		$("#favTitleHeading").html(response.Title);
		$("#favMetaScoreHeading").html("<strong>Metascore</strong> " + response.Metascore + "%");
		$("#favImdbRatingHeading").html("<strong>Imbd</strong> " + response.imdbRating + "/10");
		$("#favImdbVotesHeading").html("<strong>Votes</strong> " + response.imdbVotes);

		//add the other details into plot and more details
		$('#moreDetailsBtn').show().css('cursor', 'pointer');
		$('#plotText').html(response.Plot);
		$('#resPlot').show().css('cursor', 'pointer');
		$('#allDetails').slideUp();
		//$("#resPlot").html(response.Plot);
		$("#posterDiv, #likeBtnBar").show();
		$('.featureHeadings').show();
		$("#resPoster").attr('src', response.Poster);
		$("#posterLink").attr('href', "http://www.imdb.com/title/" + response.imdbID);

		//empty the input field after successful response
		$('#inputFavMovieTitle').val("");
		response = "";
	}
}

//----------------------------------------------Edit Favorties ----------------------------------------------

/*$("a.edit").on("click", function() {
	$("a.save").toggle();
	$('a.save').on('click', function() {
		//console.log(this);
		alert("Saved");
	});
});*/


//--------------------------------------------- End Edit Favorties ----------------------------------------------

//--------------------------------------------- Start Movie Details Sections ----------------------------------------------

$('#moreDetailsBtn').click(function() {
	$('#allDetails').slideToggle("slow", function() {
		$('#moreDetailsBtn>span').toggleClass("glyphicon glyphicon-chevron-down glyphicon glyphicon-chevron-up");
	});
});

$('#resPlot').click(function() {
	$('#plotText').slideToggle("slow", function() {
		$('#resPlot>span').toggleClass("glyphicon glyphicon-chevron-down glyphicon glyphicon-chevron-up");
	});
});
//--------------------------------------------- End Movie Details Sections ----------------------------------------------

//----------------------------------------------Favorites Like Btn Bar ----------------------------------------------

$('#likeBtn').on('click', function() {
	/*alert('Got like button');*/
	/*var result = Validation_Module.validateMinLength(7, 2);*/
	/*(result) ? alert("Returns true"): alert("Returns False");*/
	$("#formAlert").show();
		/*$("#formAlert").toggleClass("").show();*/
		$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
		$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Liked");
		$("#formAlert").delay(5000).fadeOut(400);
})

//save search to fav table
$('#favBtn').on('click', function() {
	var title = $("#favTitleHeading").text();
	//alert(title);
	var searchTitle = {
		searchTitle: title
	};

	$.ajax({
		type: 'POST',
		data: searchTitle,
		dataType: 'json',
		url: '/searchFavorites/saveMovie',
	}).done(function(response) {
		//check for success
		if (response.response === true) {
			console.log("Sever returns: " + response.response);
			//update the table
			$("#formAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
			$("#formAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Movie Added to Favorites");
			$("#formAlert").delay(5000).fadeOut(1000);
			//RefreshFavTable();
			Refresh_Element_Module.refreshTable("#favTable", "favorites #favTable")
		} else {
			alert('Error ' + response.response);
		}
	});
})

//---------------------------------------------- End Favorites ----------------------------------------------

//---------------------------------------------- Start Contact Form ----------------------------------------------
$('#btnSend').on('click', function() {
	var name = $('#inputName').val();
	var email = $('#inputEmail').val();
	var message = $('#inputMessage').val();
	//check if each input has valid data and only submit if all are valid
	var nameIs, emailIs, messageIs;
	inputIsValid = [nameIs, emailIs, messageIs];
	var count = 0;
	event.preventDefault();
	var formValues = {
			name: name,
			email: email,
			message: message
		}
		//We also want to check if the input is valid here
		//check name
	if (name === "") {
		inputIsValid[0] = false;
	} else
		inputIsValid[0] = true
		//check email
	if (email === "") {
		inputIsValid[1] = false;
	} else
		inputIsValid[1] = true;
	//check message
	if (message === "") {
		inputIsValid[2] = false;
	} else
		inputIsValid[2] = true;

	for (var i = 0; i < inputIsValid.length; i++) {
		if (inputIsValid[i] != true) {
			console.log(inputIsValid[i] + " is not good");
		} else
			count++;
	}
	if (count === 3) {
		sendContactData(formValues);
		//console.log("Count is " + count + " Sending data");
	} else {
		//console.log("Count is " + count + " not Sending data");
		//show feedback form is not filled correctly
		$("#formMessageAlert").show();
		$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Correct the errors and submit again");
		$("#formAlert").delay(5000).fadeOut(400);

		return false;
	}
});
//if all input is good send the data
function sendContactData(formValues) {
	$.ajax({
		type: 'POST',
		data: formValues,
		url: '/contact',
		success: function(response) {
			console.log(response.Response);
			//give user positive feedback
			$("#formMessageAlert").removeClass("alert alert-danger").addClass("alert alert-success").show();
			$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span> Message Sent, Thanks!");
			$("#formMessageAlert").delay(5000).fadeOut(400);
		}
	}).fail(function(status) {
		$("#formMessageAlert").show();
		$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Error: " + status);
	});
	//empty the form after each submission
	name = $('#inputName').val("");
	email = $('#inputEmail').val("");
	message = $('#inputMessage').val("");

}


//Validate Name
$("#inputName").on('change', function() {
	var name = $('#inputName').val();
	if (name === "") {
		$("#form-feedback-name").show();
		//set error indicator around input box
		$(this).closest("div.form-group").addClass("has-error");

		$("#formMessageAlert").show();
		$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Name Cannot Be Empty");
		nameIs = false;
		return false;
	} else {
		$("#form-feedback-name").hide();
		$(this).closest("div.form-group").removeClass("has-error");

		$("#formMessageAlert").hide();
		nameIs = true;
		return true;
	}
});


//Validate Email
$("#inputEmail").on('change', function() {
	var email = $('#inputEmail').val();
	if (email === "") {
		$("#form-feedback-email").show();
		//set error indicator around input box
		$(this).closest("div.form-group").addClass("has-error");
		//
		$("#formMessageAlert").show();
		$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Email Cannot Be Empty");
		emailIs = false;
		return false;
	} else {
		$("#form-feedback-email").hide();
		$(this).closest("div.form-group").removeClass("has-error");

		$("#formMessageAlert").hide();
		emailIs = true;
		return true;
	}
});

//Validate Message
$("#inputMessage").on('change', function() {
	var message = $('#inputMessage').val();
	if (message === "") {
		$("#form-feedback-message").show();
		//set error indicator around input box
		$(this).closest("div.form-group").addClass("has-error");

		$("#formMessageAlert").show();
		$("#formMessageAlert").html("<span aria-hidden='true' class='glyphicon glyphicon-exclamation-sign'></span> Message Cannot Be Empty");
		messageIs = false;
		return false;
	} else {
		$("#form-feedback-message").hide();
		$(this).closest("div.form-group").removeClass("has-error");

		$("#formMessageAlert").hide();
		messageIs = true;
		return true;
	}
});
//---------------------------------------------- End Contact Form ----------------------------------------------