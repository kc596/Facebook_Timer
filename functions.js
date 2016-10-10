/**
 * functions.js - contains necessary functions for Facebook Timer extension
 * @author Kunal Chaudhary
 */

/**** Timer functions ****/
function getSeconds(t){
  t=""+(parseInt(t)%60);
  if(t.length==1) t="0"+t;
  return t;
}

function getMinutes(t){
  t=""+(parseInt(t/60)%60);
  if(t.length==1) t="0"+t;
  return t;
}

function getHours(t){
  t=""+parseInt(t/3600);
  if(t.length==1) t="0"+t;
  return t;
}


/**** Helper functions ****/
function setTimerValue(){
  chrome.storage.local.set({'curr_timer': _curr, 'total_timer': _total}, function(){})
}

function getTimerValue(){
  chrome.storage.local.get(['curr_timer', 'total_timer'], function(result){
    if(result['curr_timer']==undefined || result['curr_timer']==null)
      _curr=0;
    else
      _curr=result['curr_timer'];

    if(result['total_timer']==undefined || result['total_timer']==null)
      _total=0;
    else
      _total=result['total_timer'];
  });
}