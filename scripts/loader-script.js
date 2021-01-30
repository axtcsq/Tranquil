let spinnerWrapper = document.querySelector('.spinner-wrapper');
function loadAd(){
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    $("#content").show();
}
$(document).ready(function(e) {
    setTimeout(loadAd,2000);
    $("#content").hide();
});

