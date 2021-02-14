$(document).ready(function () {
    $(".app").hide();
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

    // append hi message 
    $("#hi-msg").append("Hello"+" "+loginArray[0].username+" "+ "👋");
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

    // hide and show content when user click. change style based on dark mode 
    $("#self-care-content").hide();
    $("#well-being-content").hide();
    if(preferredModeArray[0].darkmode == false){
        $("#mood-select")[0].style.backgroundColor = 'rgb(' + [164,189,202].join(',') + ')'; 
        $("#logo").attr("src", 'images/logo_transparent.png');
    }else{
        $("#mood-select")[0].style.backgroundColor = 'rgb(' + [19,19,19].join(',') + ')';
        $("#logo").attr("src", 'images/logo_white_bg.png');
    }
    $("#mood-select").on("click",function(){
        if(preferredModeArray[0].darkmode == false){
            $("#mood-select")[0].style.backgroundColor = 'rgb(' + [164,189,202].join(',') + ')'; 
        }else{
            $("#mood-select")[0].style.backgroundColor = 'rgb(' + [19,19,19].join(',') + ')';
        }
        $("#well-being-select")[0].style.backgroundColor = "";
        $("#self-care-select")[0].style.backgroundColor = "";
        $("#mood-content").show();
        $("#self-care-content").hide();
        $("#well-being-content").hide();
    })
    $("#well-being-select").on("click",function(){
        if(preferredModeArray[0].darkmode == false){
            $("#well-being-select")[0].style.backgroundColor = 'rgb(' + [164,189,202].join(',') + ')'; 
        }else{
            $("#well-being-select")[0].style.backgroundColor = 'rgb(' + [19,19,19].join(',') + ')';
        }
        $("#mood-select")[0].style.backgroundColor = "";
        $("#self-care-select")[0].style.backgroundColor = "";
        $("#mood-content").hide();
        $("#self-care-content").hide();
        $("#well-being-content").show();
    })
    $("#self-care-select").on("click",function(){
        if(preferredModeArray[0].darkmode == false){
            $("#self-care-select")[0].style.backgroundColor = 'rgb(' + [164,189,202].join(',') + ')'; 
        }else{
            $("#self-care-select")[0].style.backgroundColor = 'rgb(' + [19,19,19].join(',') + ')';
        }
        $("#mood-select")[0].style.backgroundColor = "";
        $("#well-being-select")[0].style.backgroundColor = "";
        $("#mood-content").hide();
        $("#well-being-content").hide();
        $("#self-care-content").show();

    })

    // change style if user click on arrow. increment points 
    $("#arrow-0").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[0].style.backgroundColor ="#040822";
        $(".self-care-content-text")[0].style.color = "white";
        $(".self-care-content-text")[1].style.color = "white";
        $(".self-care-content-text")[2].style.color = "white";
        $(".self-care-content-container")[0].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[0].style.borderBottomLeftRadius = "30px";
    })
    $("#arrow-1").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[1].style.backgroundColor ="#040822";
        $(".self-care-content-text")[3].style.color = "white";
        $(".self-care-content-text")[4].style.color = "white";
        $(".self-care-content-text")[5].style.color = "white";
        $(".self-care-content-container")[1].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[1].style.borderBottomLeftRadius = "30px";
    })
    $("#arrow-2").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[2].style.backgroundColor ="#040822";
        $(".self-care-content-text")[6].style.color = "white";
        $(".self-care-content-text")[7].style.color = "white";
        $(".self-care-content-text")[8].style.color = "white";
        $(".self-care-content-container")[2].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[2].style.borderBottomLeftRadius = "30px";
    })
    $("#arrow-3").click(function(){
        loginArray[loginArray.length-1].points+=1;
        updateData();
        $(".self-care-content-container")[3].style.backgroundColor ="#040822";
        $(".self-care-content-text")[9].style.color = "white";
        $(".self-care-content-text")[10].style.color = "white";
        $(".self-care-content-text")[11].style.color = "white";
        $(".self-care-content-container")[3].style.borderTopLeftRadius = "30px";
        $(".self-care-content-container")[3].style.borderBottomLeftRadius = "30px";
    })

    // increment points if user submit 
    $("#food-section-submit").click(function(){
        loginArray[loginArray.length-1].points+=2;
        updateData();
    })
    $("#exercise-section-submit").click(function(){
        loginArray[loginArray.length-1].points+=2;
        updateData();
    })
    $("#sleep-section-submit").click(function(){
        loginArray[loginArray.length-1].points+=2;
        updateData();
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
        var randomIndex = indexList[Math.floor(Math.random() * indexList.length)];
        $("#api-message").append(data[randomIndex].text);
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

