// jshint esversion:6
let spinnerWrapper = document.querySelector('.spinner-wrapper');

// show content after loading is up
function loadAd(){
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    $("#content").show();
}

// show loading animation for 2000 ms and hide content
setTimeout(loadAd,500);
$("#content").hide();

    
