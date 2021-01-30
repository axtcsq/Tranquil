$(document).ready(function () {
    var loginArray = JSON.parse(localStorage.getItem("login"));
    function sayDone() {
        alert('meditation done');
        $("<a/>", {
            id: 'about-link',
            href: 'about.html',
            text: 'Click here to secure your points!'
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
    setTimeout(sayDone, 60000);
    
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
    .add({
        targets: '.ml3 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });
});