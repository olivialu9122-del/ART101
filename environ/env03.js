let clickCount = 0;

let bunnyMoods = ["happy", "sleepy", "hungry", "excited"];

let candyland = {
    name: "Dessert World",
    character: "Pink Bunny",
    favoriteFood: "strawberry cake"
};

$("#candy-house").click(function () {

    clickCount = clickCount + 1;

    let message = "Welcome to " + candyland.name + "!";

    $("#output").html(message);

    console.log(clickCount);

});

$("#pink-bunny").click(function () {

    clickCount = clickCount + 1;

    let mood = bunnyMoods[(clickCount - 1) % bunnyMoods.length];

    let message = candyland.character + " is " + mood + "!";

    $("#output").html(message);

    console.log(clickCount);
    console.log(mood);

});
