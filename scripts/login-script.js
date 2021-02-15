// jshint esversion:6
$(document).ready(function(e) {
  // user input
  var username = $("#usernameInput").val();
  var password = $("#passwordInput").val();
  $("#usernameInput").change(function() {
      username = $("#usernameInput").val();
  });
  $("#passwordInput").change(function() {
      password = $("#passwordInput").val();
  });

  // getting the data from RESTDB
  var responseArray = [];
  const APIKEY = "600e2fe91346a1524ff12dbd";
  let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://idassignment3-e0c6.restdb.io/rest/userdata",
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
      },
  };
  $.ajax(settings).done(function(response) {
      responseArray = response;
  });

  // decide if user input matching username and password
  var flag = false;
  $("#login-submit").on("click", function(e) {
      if (responseArray == null) {
          e.preventDefault();
          alert("Please sign up.");
      }else {
          for (var i = 0; i < responseArray.length; i++) {
              if ((responseArray[i].username == username) && (responseArray[i].password == password)) {
                  let l = new login(responseArray[i]._id, responseArray[i].username, responseArray[i].password, responseArray[i].points, responseArray[i].darkmode);
                  let loginArray = [];
                  loginArray.push(l);
                  localStorage["login"] = JSON.stringify(loginArray);
                  flag = true;
                  break;
              }
          }
          if (flag != true) {
              e.preventDefault();
              alert("The password you have entered is incorrect. Try again.");
          }
        }

        // set preferred mode to false in local storage
        let p = new preferredMode(false);
        var preferredModeArray =[];
        preferredModeArray.push(p);
        localStorage["preferredMode"]= JSON.stringify(preferredModeArray);
  });
});

//functions
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