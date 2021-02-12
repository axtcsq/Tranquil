$(document).ready(function () {
    $(".app").hide();
    // parse array
    var loginArray = JSON.parse(localStorage.getItem("login"));
    var preferredModeArray = JSON.parse(localStorage.getItem("preferredMode"));
    $("#hi-msg").append("hello"+" "+loginArray[0].username);
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
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
    $("#self-care-content").hide();
    $("#well-being-content").hide();
    $("#mood-select").on("click",function(){
        $("#mood-select")[0].style.backgroundColor = 'rgb(' + [197,226,240].join(',') + ')'; 
        $("#well-being-select")[0].style.backgroundColor = "";
        $("#self-care-select")[0].style.backgroundColor = "";
        $("#mood-content").show();
        $("#self-care-content").hide();
        $("#well-being-content").hide();
    })
    $("#well-being-select").on("click",function(){
        $("#well-being-select")[0].style.backgroundColor = 'rgb(' + [197,226,240].join(',') + ')'; 
        $("#mood-select")[0].style.backgroundColor = "";
        $("#self-care-select")[0].style.backgroundColor = "";
        $("#mood-content").hide();
        $("#self-care-content").hide();
        $("#well-being-content").show();
    })
    $("#self-care-select").on("click",function(){
        $("#self-care-select")[0].style.backgroundColor = 'rgb(' + [197,226,240].join(',') + ')'; 
        $("#mood-select")[0].style.backgroundColor = "";
        $("#well-being-select")[0].style.backgroundColor = "";
        $("#mood-content").hide();
        $("#well-being-content").hide();
        $("#self-care-content").show();

    })

    $("#arrow-0").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[0].style.backgroundColor ="#040822";
        $(".self-care-content-container")[0].style.color = "white";
        $(".self-care-content-container")[0].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[0].style.borderBottomLeftRadius = "30px";
    })

    $("#arrow-1").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[1].style.backgroundColor ="#040822";
        $(".self-care-content-container")[1].style.color = "white";
        $(".self-care-content-container")[1].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[1].style.borderBottomLeftRadius = "30px";
    })

    $("#arrow-2").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[2].style.backgroundColor ="#040822";
        $(".self-care-content-container")[2].style.color = "white";
        $(".self-care-content-container")[2].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[2].style.borderBottomLeftRadius = "30px";
    })

    $("#arrow-3").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[3].style.backgroundColor ="#040822";
        $(".self-care-content-container")[3].style.color = "white";
        $(".self-care-content-container")[3].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[3].style.borderBottomLeftRadius = "30px";
    })
    // call quotes API
    var settings = {
        "url": "https://type.fit/api/quotes",
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
    };
    $.ajax(settings).done(function (response) {
        const data = JSON.parse(response);
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
        updateData();
    });

    function updateData(){
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
    }
});

// function
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
    link.href = 'css/reflection-dark.css';  
    head.appendChild(link);
}
function lightMode(){
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/reflection-light.css';  
    head.appendChild(link);
}

