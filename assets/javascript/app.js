////////////////////////////////////////////////////////
//////////////////////  GIF        ////////////////////
/////////////////////      TASTIC ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:

Two rows of buttons for gif searchs

Each gif button displays array of 10 static, non animated gifs 

On click of gif: animates, replays, or pauses

each gif needs to display it's rating

input form for user input, add input to search row & display on click

 */

// --------------------------------------------------------------- 

// starting array of gif categories
var gifArray = ["pizza", "spaghetti", "ice cream", "lasagna", "taco", "pad thai", "donuts"];


// function re-renders the HTML to display the appropriate content
function displayGif() {

    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gifSearch;

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var result = response.data;
        console.log(result);
        // Creates a div img for all 10 gif still frames
        for (j = 0; j < 10; j++) {
            // set rating for each image
            var rating = $("<p>").text("Rating: " + result[j].rating);
            var imgDiv = $("<div>").addClass("gifContentBox col-md-4");
            var imgContainer = $("<div>").addClass("imgContainer");
            // set image attributes
            var image = $("<img>")
                // set detault src to still image
                .attr("src", result[j].images.fixed_height_still.url)
                // data-animated changes to gif
                .data("animated", result[j].images.fixed_height.url)
                // data-still changes back to still
                .data("still", result[j].images.fixed_height_still.url)
                // default data-state to still image
                .attr("data-state", "still");

            // append image & rating to imgContainer, then append imgContainer to page
            imgContainer.append(rating);
            imgContainer.append(image);
            imgDiv.append(imgContainer);
            $('#gifSelection').prepend(imgDiv);

        }; // end for loop

        // click event handles gif animation once clicked
        $("img").on("click", function() {
            // variable to store current data state
            var gifData = $(this).attr("data-state");
            console.log(this);
            // conditional to check if still or animated
            if (gifData === "still") {
                // if gif is still, change to animate
                $(this).attr("src", $(this).data("animated"));
                // update data-state for next event click
                $(this).attr("data-state", "animated");
            } else {
                // if data-state is anmite - change src to still
                $(this).attr("src", $(this).data("still"));
                // change data-state back to still for next event handler
                $(this).attr("data-state", $(this).data("still"));
            };
        }); // end #gifSelection click

    }); // end ajax

} // end displayGif

// Function for displaying 10 gifs & their ratings
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#gifRow").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifArray.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gif-btn btn-info");
        // Added a data-attribute
        a.attr("data-name", gifArray[i]);
        // Provided the initial button text
        a.text(gifArray[i]);
        // Added the button to the buttons-view div
        $("#gifRow").append(a);
    }
} // end renderButtons




// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
    console.log("Add Clicked");
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim().toLowerCase().replace(/\s+/g, "+");

    // The movie from the textbox is then added to our array
    gifArray.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});


// Click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();