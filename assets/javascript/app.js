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

function displayGif() {

    var movie = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&apiKey=dc6zaTOxFJmzC";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

            // Creates a div to hold a search
            var thisGif = $('').prepend(

            });
    }