//DOM Ready
$(document).ready(function() {



})

// Delete User link click
/*$("table tbody").on('click', 'td a.close', function() {
	$(this).slideUp();
});*/

//---------------------------------------------- Form validation ----------------------------------------------
function formValidation(){
	var title = document.getElementById("inputMovieTitle").value;
	var year = document.getElementById("inputMovieYear").value;
	var genre = document.getElementById("inputMovieGenre").value;

	//alert(title,year,genre);
}

//---------------------------------------------- Refresh Table ----------------------------------------------
function RefreshTable() {
	$("#movieTable").load("movies #movieTable");
	console.log("table refreshed")
}

//$("td a.close").on("click", RefreshTable);

$('table tbody').on('click', 'td a.close', deleteMovie);

//---------------------------------------------- Delete Movie ----------------------------------------------
function deleteMovie(event) {
	event.preventDefault();

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
			/*$.ajax({
				type: 'GET',
				url: '/movies'
			})*/
			//response.redirect('/movies');
		});

	} else
	//if user selects cancel to the confirmation, do nothing
		return false;
}

//---------------------------------------------- Delete Movie ----------------------------------------------
