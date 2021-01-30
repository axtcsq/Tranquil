$(document).ready(function () {
    var loginArray = JSON.parse(localStorage.getItem("login"));
    function sayDone() {
        alert('meditation done');
        $("<a/>", {
            id: 'example-link',
            href: 'about.html',
            text: 'Go back to main page'
        }).appendTo("body");
        loginArray[loginArray.length-1].points+=5;
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

    $.ajax(settings).done(function (response) {
        let l = new login(loginArray[loginArray.length-1].id, loginArray[loginArray.length-1].username, loginArray[loginArray.length-1].password, loginArray[loginArray.length-1].points, loginArray[loginArray.length-1].darkmode);
        loginArray = [];
        loginArray.push(l);
        localStorage["login"] = JSON.stringify(loginArray);
        function login(id, username, password, points, darkmode) {
            this.id = id;
            this.username = username;
            this.password = password;
            this.points = points;
            this.darkmode = darkmode;
        }
    });
    }
    setTimeout(sayDone, 3000);
    
});