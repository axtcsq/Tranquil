$(document).ready(function () {
  let username = $("#usernameInput").val();
  let password = $("#passwordInput").val();
  $("#login-submit").on("click", function (e) {
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
    $.ajax(settings).done(function (response) {
      
      var flag = false;
        // loop sign up array to check if user sign up
        if(response == null){
          e.preventDefault();
            alert("please sign up");
        }else{
            for (var i = 0; i < response.length ; i++) {
              if(response[i].username == username && response[i].password == password){

                flag =true;
                alert("success");
              }
          }
        }
        if(flag != true){
          e.preventDefault();
            alert("wrong password");
        }
    });
  });
});