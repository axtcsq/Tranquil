$(document).ready(function () {
    // parse array
    var loginArray = JSON.parse(localStorage.getItem("login"));
    var preferredModeArray = JSON.parse(localStorage.getItem("preferredMode"));

    // decide if dark/ light mode.
    if(loginArray[0].darkmode == true){
        if(preferredModeArray[0].darkmode == true){
            darkMode();
        }else{
            lightMode();
        }
    }else{
        lightMode();
    }

    // hide animation
    $("#congrats").hide();

    function sayDone() {
        // alert user and show animation
        alert('Good job! Meditation completed.');
        $("#meditate-content").hide();
        $("#congrats").show();

        //update RESTDB
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

        // update local storage
        $.ajax(settings).done(function (response) {
            let l = new login(loginArray[loginArray.length-1].id, loginArray[loginArray.length-1].username, loginArray[loginArray.length-1].password, loginArray[loginArray.length-1].points, loginArray[loginArray.length-1].darkmode);
            loginArray = [];
            loginArray.push(l);
            localStorage["login"] = JSON.stringify(loginArray);
        });
        // go to about page after animation finish
        setTimeout(goAboutPage,3000);  
    }

    // finish meditating after a given time
    setTimeout(sayDone, 60000);
});

// functions
function goAboutPage(){
    window.location.href = "about.html";
}

function login(id, username, password, points, darkmode) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.points = points;
    this.darkmode = darkmode;
}

function darkMode(){
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/meditation-dark.css';  
    head.appendChild(link);
}
function lightMode(){
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/meditation-light.css';  
    head.appendChild(link);
}