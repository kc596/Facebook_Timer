var h1, h2, m1, m2, s1, s2; //current timer
var H1, H2, M1, M2, S1, S2; //total timer

function retriveTimerValue(){
  chrome.storage.local.get(['_h1','_h2','_m1','_m2','_s1','_s2','H1','H2','M1','M2','S1','S2'], function(result){
    if(result['_h1']==undefined || result['_h1']==null){
      h1=0; h2=0; m1=0; m2=0; s1=0; s2=0;
    }
    else{
      h1=result['_h1'];
      h2=result['_h2'];
      m1=result['_m1'];
      m2=result['_m2'];
      s1=result['_s1'];
      s2=result['_s2'];
    }
    if(result['H1']==undefined || result['H1']==null){
      H1=0; H2=0; M1=0; M2=0; S1=0; S2=0;
    }
    else{
      H1=result['H1'];
      H2=result['H2'];
      M1=result['M1'];
      M2=result['M2'];
      S1=result['S1'];
      S2=result['S2'];
    }

  });
}

function set_timer(){
  var totalTimerBox = document.getElementById('total-timer-display');
  totalTimerBox.innerHTML = H1+""+H2+" : "+M1+""+M2+" : "+S1+S2;
  var currentTimerBox = document.getElementById('current-timer-display');
  currentTimerBox.innerHTML = h1+""+h2+" : "+m1+""+m2+" : "+s1+s2;
}

document.addEventListener('DOMContentLoaded', function(){
  retriveTimerValue();
  setTimeout(set_timer, 500);
  
  var refreshButton = document.getElementById('refreshButton');
  refreshButton.addEventListener('click', function(){
    retriveTimerValue();
    setTimeout(set_timer, 500);
    console.log("Timer refreshed");
  }, false);

  var timerResetButton = document.getElementById('resetButton');
  timerResetButton.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clear: "true"}, function(response) {
            console.log(response.message);
        });
    });
  }, false);
}, false);