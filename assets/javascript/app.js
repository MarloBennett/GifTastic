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


//end of ceatebuttons function
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

				//var animatedURL = results[j].images.fixed_height;

				var startingImage = $("<img>").attr("src", stillURL);

				$("#natureImages").append(startingImage);
				$("#natureImages").append(ratingParagraph);
			}
		})

//end of on click function	
})

//grab 10 static images from giphy api, add rating under them

//images should animate when you click them

//images should stop when you click again

//make the form button add a button for the user choice

