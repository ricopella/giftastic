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

// global variables
var gifArray = ["pizza", "spaghetti", "ice cream", "lasagna"];

function displayGif() {

    var gifSearch = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=dc6zaTOxFJmzC";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        // Creates a div to hold a search
        var thisGif = $('').prepend()

    });
}

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
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifArray[i]);
        // Provided the initial button text
        a.text(gifArray[i]);
        // Added the button to the buttons-view div
        $("#gifRow").append(a);
    }
}


// This function handles events where the add gif button is clicked
$("add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifArray.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();