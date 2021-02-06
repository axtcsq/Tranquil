$(document).ready(function () {
    $(".alert").hide();

    // update RESTDB if user submit
    $("#signup-submit").on("click", function (e) {
        e.preventDefault();

        // user input
        let username = $("#usernameInput").val();
        let password = $("#passwordInput").val();

        // update RESTDB
        const APIKEY = "600e2fe91346a1524ff12dbd";
        let jsondata = {
          "username": username,
          "password": password,
          "points":0,
          "darkmode":false
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
        
        //show successful message
        $.ajax(settings).done(function (response) {
          $(".alert").show();
        }); 
    });
});