$(document).ready(function () {
    // hide dark mode buton
    $(".app").hide();

    // parse array
    var loginArray = JSON.parse(localStorage.getItem("login"));
    var preferredModeArray = JSON.parse(localStorage.getItem("preferredMode"));

    if(preferredModeArray[0].darkmode == false){
        $("#logo").attr("src", 'images/logo_transparent.png');
    }else{
        $("#logo").attr("src", 'images/logo_white_bg.png');
    }

    // decide if dark/ light mode.
    // show button 
    if(loginArray[0].darkmode == true){
        $(".app").show();
        if(preferredModeArray[0].darkmode == true){
            darkMode();
        }else{
            lightMode();
        }
        $(".app").click(function(){
            if(preferredModeArray[0].darkmode == true){
                preferredModeArray[0].darkmode = false;
                lightMode();
                $("#logo").attr("src", 'images/logo_transparent.png');
            }else{
                preferredModeArray[0].darkmode = true;
                darkMode();
                $("#logo").attr("src", 'images/logo_white_bg.png');
            }
            let p = new preferredMode(preferredModeArray[0].darkmode);
            preferredModeArray =[];
            preferredModeArray.push(p);
            localStorage["preferredMode"]= JSON.stringify(preferredModeArray);
        });
    }else{
        preferredModeArray[0].darkmode = false;
        lightMode();
    }

    // update and display points
    var points = loginArray[0].points;
    $("<div/>", {
        id: 'points',
        text: points + " points"
    }).appendTo("#points");

    // decide if user can purchase dark mode
    if(loginArray[0].points > 30 && loginArray[0].darkmode == false){
        $("<p/>", {
            id: 'paragraph',
            text: 'Dark mode unlocked!'
        }).appendTo(".header");
        $("<a/>", {
            id: 'darkmode-link',
            href: '#',
            text: 'click here to activate'
        }).appendTo("#paragraph");
    }

    // if user purchase dark mode
    // update local storage and RESTDB
    $("#darkmode-link").click(function(e){
        $(".app").show();
        $("#paragraph").hide();
        $("#darkmode-link").hide();
        
        //update dark mode is purchased and decrement points
        loginArray[loginArray.length-1].darkmode=true;
        loginArray[loginArray.length-1].points = loginArray[loginArray.length-1].points - 30;

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
            let l = new login(loginArray[loginArray.length-1].id, loginArray[loginArray.length-1].username, loginArray[loginArray.length-1].password, loginArray[loginArray.length-1].points, loginArray[loginArray.length-1].darkmode);
            loginArray = [];
            loginArray.push(l);
            localStorage["login"] = JSON.stringify(loginArray);
        });
    });
});

// functions 
function login(id, username, password, points, darkmode) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.points = points;
    this.darkmode = darkmode;
}
function preferredMode(darkmode){
    this.darkmode = darkmode;
}
function darkMode(){
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/about-dark.css';  
    head.appendChild(link);
}
function lightMode(){
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/about-light.css';  
    head.appendChild(link);
}