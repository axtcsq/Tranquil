$(document).ready(function () {
    var loginArray = JSON.parse(localStorage.getItem("login"));
    var points = loginArray[0].points;
    $("<div/>", {
        id: 'points',
        text: points + " points collected :D"
    }).appendTo(".header");
});