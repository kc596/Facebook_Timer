document.addEventListener('DOMContentLoaded', function(){
  var timerResetButton = document.getElementById('resetButton');
  timerResetButton.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clear: "true"}, function(response) {
            console.log(response.message);
        });
    });
  }, false);
}, false);