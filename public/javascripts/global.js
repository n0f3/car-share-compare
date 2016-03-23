//DOM Ready
$(document).ready(function() {
	//when page loads hide the error feedback on each of the inputs
	$("#form-feedback-title, #form-feedback-year, #form-feedback-genre").hide();
	//call on change function to wait for change events on the inputs
	onChangeValidation();
});

//---------------------------------------------- Refresh Table ----------------------------------------------
function RefreshTable() {
	$("#movieTable").load("movies #movieTable");
	console.log("table refreshed")
	return true;
}

//---------------------------------------------- Delete Movie ----------------------------------------------
//use jquery to find when user clicks the delete button
$('body').on('click', 'table tbody td a.close', function() {
	event.preventDefault();
	console.log('Delete Button')
		//pop up confirmation
	var confirmation = confirm("Are you sure you want to delete this movie?");

	//check if the confirmation is true
	if (confirmation === true) {
		//if true we want to delete the movie
		$.ajax({
			type: 'DELETE',
			url: '/deleteMovie/' + $(this).attr('rel')
		}).done(function(response) {
			//check for success
			if (response.msg === '') {
				console.log("Sever returns: " + response.msg);
			} else {
				alert('Error' + response.msg);
			}
			//update the table
			RefreshTable();
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
	event.preventDefault();
	var formValues = {
		title: title,
		year: year,
		genre: genre
	}
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
	//update the table
	RefreshTable();
	return true;
	//}
});
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
			$(this).closest("div.form-group").addClass("has-error");
		} else {
			$("#form-feedback-title").hide();
			$(this).closest("div.form-group").removeClass("has-error");
			return true;
		}
	});

//Year Event
	$("#inputMovieYear").on('change', function() {
		var year = $('#inputMovieYear').val();
		if (year === "") {
			$("#form-feedback-year").show();
			$(this).closest("div.form-group").addClass("has-error");
		} else if (checkIsNumber(year) == false) {
			//alert("Year must be a number");
			$("#form-feedback-year").show();
			$(this).closest("div.form-group").addClass("has-error");
		} else {
			$("#form-feedback-year").hide();
			$(this).closest("div.form-group").removeClass("has-error");
			return true;
		}
	});

//Genre Event
	$("#inputMovieGenre").on('change', function() {
		var genre = $('#inputMovieGenre').val();
		if (genre === "") {
			$("#form-feedback-genre").show();
			$(this).closest("div.form-group").addClass("has-error");
		} else {
			$("#form-feedback-genre").hide();
			$(this).closest("div.form-group").removeClass("has-error");
			return true;
		}
	});
}