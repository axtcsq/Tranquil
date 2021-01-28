$(document).ready(function(e) {
  var flag = false;
  username = $("#usernameInput").val();
  password = $("#passwordInput").val();
  $("#usernameInput").change(function() {
      username = $("#usernameInput").val();
  })
  $("#passwordInput").change(function() {
      password = $("#passwordInput").val();
  })
  responseArray = [];
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
  }

  $.ajax(settings).done(function(response) {
      responseArray = response;
  });
  $("#login-submit").on("click", function(e) {
      if (responseArray == null) {
          e.preventDefault();
          alert("please sign up");
      } else {
          for (var i = 0; i < responseArray.length; i++) {
              if ((responseArray[i].username == username) && (responseArray[i].password == password)) {
                  let l = new login(responseArray[i]._id, responseArray[i].username, responseArray[i].password, responseArray[i].points, responseArray[i].darkmode);
                  let loginArray = [];
                  loginArray.push(l);
                  localStorage["login"] = JSON.stringify(loginArray);
                  flag = true;
                  alert("success");
                  break;
              }
          }
          if (flag != true) {
              e.preventDefault();
              alert("wrong password");
          }
      }

  });

  function login(id, username, password, points, darkmode) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.points = points;
      this.darkmode = darkmode;
  }
});