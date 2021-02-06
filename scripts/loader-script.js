let spinnerWrapper = document.querySelector('.spinner-wrapper');

// show content after loading is up
function loadAd(){
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    $("#content").show();
}

// show loading animation for 2000 ms and hide content
$(document).ready(function(e) {
    setTimeout(loadAd,2000);
    $("#content").hide();
});

