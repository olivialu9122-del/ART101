/// the clicker bbutton program

let count = 0;

$("#needy-button").click( function(){
    //what to do when the button is clicked
    count = count + 520;
    $('#needy-button').html("I love u " + count + " times");

});