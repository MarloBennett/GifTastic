//array of topics (strings)
var topics = ["beach", "coral", "fire", "forest", "geyser", "lake", "lava", "moon", "mountains", "northern lights", "ocean", "reef", "river", "sunrise", "waterfall"];

createButtons();

//function that runs through the array and remakes all the buttons
function createButtons() {

$("#buttonsHere").empty();

//loop to append a button for each item in array
for (i = 0; i < topics.length; i++) {
	var topicButton = $("<button class='natureButton'>");
	topicButton.attr("data-name", topics[i]);
	topicButton.text(topics[i]);
	$("#buttonsHere").append(topicButton);
}


//end of createbuttons function
}

$(".natureButton").on("click", function() {

	$("#natureImages").empty();

	var natureSearch = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + natureSearch + "&api_key=dc6zaTOxFJmzC";

	$.ajax(
			{url: queryURL,
				method: "GET"}
		).done(function(response) {

			console.log(response);

			var results = response.data;
//loop through array of results and display each
			for (j = 0; j < results.length; j++) {

				var displayRating = results[j].rating;

				if (displayRating.length === 0) {
					displayRating = "no rating given";
				}

				var ratingParagraph = $("<p>").text("Rating: " + displayRating);

				var stillURL = results[j].images.fixed_height_still.url;

				var animatedURL = results[j].images.fixed_height.url;

				var displayImage = $("<img class='natureChoice' data-state='still' data-unmoving='" + stillURL + "' data-moving='" + animatedURL + "'>").attr("src", stillURL);

				//var animatedImage = $("<img class='natureChoice' data-state='moving'>").attr("src", animatedURL);

				$("#natureImages").append(displayImage);
				//$("#natureImages").append(animatedImage);
				$("#natureImages").append(ratingParagraph);
			}
		

		$(".natureChoice").on("click", function() {

			var state = $(this).attr("data-state");
console.log(state);
			if (state === "still") {
				$(this).attr("src", $(this).attr("data-moving"));
				$(this).attr("date-state", "animated");
console.log(state);
			}
			//this part not working - state is not changing
			else {
				$(this).attr("src", $(this).attr("data-unmoving"));
				$(this).attr("data-state", "still");
			}
		//end of image on click function	
		})
	});
//end of button on click function	
})

//grab 10 static images from giphy api, add rating under them

//images should animate when you click them

//images should stop when you click again

//make the form button add a button for the user choice

