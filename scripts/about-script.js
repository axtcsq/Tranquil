$(document).ready(function () {
    $(".app").hide();
    var loginArray = JSON.parse(localStorage.getItem("login"));
    var preferredModeArray = JSON.parse(localStorage.getItem("preferredMode"));
    if(loginArray[0].darkmode == true){
        $(".app").show();
        if(preferredModeArray[0].darkmode == true){
            var head = document.getElementsByTagName('HEAD')[0];  
            var link = document.createElement('link'); 
            link.rel = 'stylesheet';  
            link.type = 'text/css'; 
            link.href = 'css/about-dark.css';  
            head.appendChild(link);
        }
        else{
            var head = document.getElementsByTagName('HEAD')[0];  
            var link = document.createElement('link'); 
            link.rel = 'stylesheet';  
            link.type = 'text/css'; 
            link.href = 'css/about-light.css';  
            head.appendChild(link);
        }
        $(".app").click(function(){
            if(preferredModeArray[0].darkmode == true)
            {
                preferredModeArray[0].darkmode = false;
                var head = document.getElementsByTagName('HEAD')[0];  
                var link = document.createElement('link'); 
                link.rel = 'stylesheet';  
                link.type = 'text/css'; 
                link.href = 'css/about-light.css';  
                head.appendChild(link);
            }else{
                preferredModeArray[0].darkmode = true;
                var head = document.getElementsByTagName('HEAD')[0];  
                var link = document.createElement('link'); 
                link.rel = 'stylesheet';  
                link.type = 'text/css'; 
                link.href = 'css/about-dark.css';  
                head.appendChild(link);
            }
            let p = new preferredMode(preferredModeArray[0].darkmode);
            preferredModeArray =[];
            preferredModeArray.push(p);
            localStorage["preferredMode"]= JSON.stringify(preferredModeArray);
        });
    }
    var points = loginArray[0].points;
    $("<div/>", {
        id: 'points',
        text: points + " points collected :D"
    }).appendTo(".header");
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
    $("#darkmode-link").click(function(e){
        $(".app").show();
        $("#paragraph").hide();
        $("#darkmode-link").hide();
        loginArray[loginArray.length-1].darkmode=true;
        loginArray[loginArray.length-1].points = loginArray[loginArray.length-1].points - 30;
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
        });
        function login(id, username, password, points, darkmode) {
            this.id = id;
            this.username = username;
            this.password = password;
            this.points = points;
            this.darkmode = darkmode;
        }
    });
});