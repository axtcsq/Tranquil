$(document).ready(function () {
    // call quotes API
    var settings = {
        "url": "https://type.fit/api/quotes",
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
    };
    $.ajax(settings).done(function (response) {
        var indexList = [11,13,21,25,27,32,35]; 
        var randomIndex=  Math.floor(Math.random()*10);
        if(randomIndex == 9 || randomIndex == 8 || randomIndex == 7){
            randomIndex=  Math.floor(Math.random()*10);
        }
        var index = indexList[randomIndex];
        console.log(randomIndex);
        console.log(index);
        $("#api-message").append(data[index].text);
    });

    // update local storage and RESTDB if user submit
    $("#reflection-submit").on("click", function(e) {
        e.preventDefault();
        loginArray[loginArray.length-1].points+=5;
        var loginArray = JSON.parse(localStorage.getItem("login"));

        //update RESTDB
        const APIKEY = "600e2fe91346a1524ff12dbd";
        var id = loginArray[loginArray.length-1].id;
        var jsondata = {
            "username":loginArray[loginArray.length-1].username,
            "password": loginArray[loginArray.length-1].password,
            "points":loginArray[loginArray.length-1].points,
            "darkmode":loginArray[loginArray.length-1].darkmode
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idassignment3-e0c6.restdb.io/rest/userdata/"+id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
        
        // update local storage
        $.ajax(settings).done(function (response) {
            $("<a/>", {
                id: 'example-link',
                href: 'about.html',
                text: 'Click here to return to the home page'
            }).appendTo("body");
            let l = new login(loginArray[loginArray.length-1].id, loginArray[loginArray.length-1].username, loginArray[loginArray.length-1].password, loginArray[loginArray.length-1].points, loginArray[loginArray.length-1].darkmode);
            loginArray = [];
            loginArray.push(l);
            localStorage["login"] = JSON.stringify(loginArray);
        });
    });
});

// function
function login(id, username, password, points, darkmode) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.points = points;
    this.darkmode = darkmode;
}