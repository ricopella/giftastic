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

// starting array of gif categories
var gifArray = [
    "ken griffey jr", "shaq", "deion sanders", "wayne gretzky", "emmitt smith",
    "michael jordan", "dennis rodman", "nomar garciaparra", "tiger woods",
    "hulk hogan", "charles barkley", "larry bird", "brett farve"
];


// function re-renders the HTML to display the appropriate content
function displayGif() {

    // store name of selected button
    var gifSearch = $(this).attr("data-name");
    // store selected Rating
    var gifSearchValue = $("#gif-range").val();
    // default search to pg
    var gifSearchRating = "pg";
    // conditionals to store rating value for api search
    if (gifSearchValue === "1") {
        gifSearchRating = "g";
    } else if (gifSearchValue === "2") {
        gifSerachRating = "pg";
    } else if (gifSearchValue === "3") {
        gifSearchRating = "pg";
    } else if (gifSearchValue === "4") {
        gifSearchRating = "pg-13";
    } else if (gifSearchValue === "5") {
        gifSearchRating = "r";
    };

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gifSearch + "&rating=" + gifSearchRating;

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        // store query in variable
        var result = response.data;
        // removes previously selected gifs
        $("#gifSelection").empty();
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
            imgContainer.append(image);
            imgContainer.append(rating);
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
            } else if (gifData === "animated") {
                // if data-state is anmite - change src to still
                $(this).attr("src", $(this).data("still"));
                // change data-state back to still for next event handler
                $(this).attr("data-state", "still");
            };
        }); // end #gifSelection click

    }); // end ajax

} // end displayGif

// Function for displaying 10 gifs & their ratings
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    $("#gifRow").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifArray.length; i++) {

        // Creates a new button element
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gif-btn btn btn-info");
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
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim().toLowerCase();
    var gifRating = $()
        // The movie from the textbox is then added to our array
    gifArray.push(gif);
    // clear form
    $("input[type=text]").val("");
    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// This function handles events where the user pressed enter in gif-form 
$('#gif-input').on("keypress", function(event) {
    if (event.which === 13) {
        // dable input to prevent multiple submits
        $(this).attr("disabled", "disabled");
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var gif = $("#gif-input").val().trim().toLowerCase();
        // The movie from the textbox is then added to our array
        gifArray.push(gif);
        // re-enable input for next input
        $(this).removeAttr("disabled");
        // clear form
        $("input[type=text]").val("");
    } // end for loop
    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

$("#gif-range").on("input change", function() {
    var rangeValue = $(this).val();
    if (rangeValue === "1") {
        $("#rating").html("Youth (Y)");
    } else if (rangeValue === "2") {
        $("#rating").text("General Audiences (G)");
    } else if (rangeValue === "3") {
        $("#rating").text("Parental Guidance (PG)");
    } else if (rangeValue === "4") {
        $("#rating").text("Parental Guidance suggested (PG-13)");
    } else if (rangeValue === "5") {
        $("#rating").text("Restricted (R)");
    }
    console.log(rangeValue);
});

// on page load - display default rating
$("#rating").html("General Audiances (G)");


// Click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();