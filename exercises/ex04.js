/// the clicker bbutton program
// we create a variable named "count" , the initia value is 0

let count = 0;
let colorsCount=0;

// an indexed array of data
let colors=[ "green", "orange" , "brown" , "yellow" , "gold" , "red" ,"purple" , "pink"];

let buttonText="";

let buttonCreature = {
    name: "Matcha",
    species: "cat",
    favoriteFood: "tuna",
    moods: ["happy", "sleepy", "hungry", "playful", "mad"]
};

//green, orange, brown, yellow, gold, purpel, pink

// we listend for when an html element with id "needy-button" is clicked and then...

$("#needy-button").click( function(){

    //what to do when the button is clicked
    // first, set a new value for "count", which is the current value + 1

    count = count + 1;

    let arrayPosition = (count - 1) % buttonCreature.moods.length;

    let currentMood = buttonCreature.moods[arrayPosition];
    

    console.log(count);
    console.log(colors[colorsCount]);// change line


    // now let's find our button and set a new text for it

    buttonText="i was kicked " + count + " times and color is " + colors[colorsCount];//change line

    $('#needy-button').html( buttonText);

    let message = "<p>My current mood is " + currentMood + ".</p>";


    $("#output").html(message);

    console.log(arrayPosition);
    console.log(currentMood);

    $("body").css( "background-color", colors[colorsCount]);

    ///////$("body").append("<img width='60' src='opanchu"+ count +".jpeg'>");


    if( (count >= 5) && (count < 12) ){ $("#needy-button").after("<p>my mood is happy</p>");}
    if( count >= 12){ $("#needy-button").after("<p>my mood is fine</p>");}




    //$("body").append(" <img width='50' src='" +colors[count-1]  +".jpg'" );
    // if we are run out of colors start fron th first one anew

    
    colorsCount = colorsCount +1;  // new line

    if ( colorsCount >= 8 ) { colorsCount = 0;  } // new line

   

});