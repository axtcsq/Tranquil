// jshint esversion:6
// @TODO : after pushing github, in restDB, add CORS link. change API key 
$(document).ready(function () {
    const APIKEY = "600e2fe91346a1524ff12dbd";
  
    $("#signup-submit").on("click", function (e) {
      e.preventDefault();
  
      let username = $("#usernameInput").val();
      let password = $("#passwordInput").val();
  
      let jsondata = {
        "username": username,
        "password": password,
        "points":0
      };
  
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idassignment3-e0c6.restdb.io/rest/userdata",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          $("#login-submit").prop( "disabled", true);
          $("#add-login-form").trigger("reset");
        }
    } 
    $.ajax(settings).done(function (response) {
      console.log(response);
    }); 
});
});