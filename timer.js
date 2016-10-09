/**
 * timer.js - content script for Facebook Timer Chrome Extension
 * @author Kunal Chaudhary
 */

/**** Timer variables ****/
var h1, h2, m1, m2, s1, s2;
var time;
var sequence=1;

/**** Selecting the place to display timer ****/
var myElement = document.createElement("div");
myElement.setAttribute("class", "timer-style");
document.getElementsByTagName("body")[0].appendChild(myElement);
var child = document.createElement("div");
child.setAttribute("class","timer_bg");
child.innerHTML=time;


/**** Helper functions ****/
//function to retrive the value of timer variables from stored values
function retriveTimerValue(){
	chrome.storage.local.get(['_h1','_h2','_m1','_m2','_s1','_s2'], function(result){
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
	});
}

//function to set the value of current timer to storage
function storeTimerValue(){
	chrome.storage.local.set({'_h1':h1, '_h2':h2, '_m1':m1, '_m2':m2, '_s1':s1, '_s2':s2}, function() {
		console.log('time set');
	});
}

//function to tick the timer every second
function tickTock(){
	if(s2<9) s2++;
	else if(s1<5){ s1++; s2=0; }
	else if(m2<9){ m2++; s2=0; s1=0; }
	else if(m1<5){ m1++; m2=0; s2=0; s1=0; }
	else if(h2<9){ h2++; m1=0; m2=0; s2=0; s1=0; }
	else {h1++; h2=0; m1=0; m2=0; s2=0; s1=0; }
}

//function to display timer on Facebook page
function displayTimer(){
	time = h1+""+h2+" : "+m1+""+m2+" : "+s1+""+s2;
	child.innerHTML = time;
	myElement.appendChild(child);
}


/**** Monitor function ****/
function set_timer(){
	tickTock();
	displayTimer();
	storeTimerValue();
}

/**** Retriving the timer's previous value calling the timer function every second ****/
retriveTimerValue();
setInterval(set_timer, 1000);

/**** Timer Reset Feature ****/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("current timer cleared :D ");
	if (request.clear == "true"){
		h1=h2=m1=m2=s1=s2=0;
		sendResponse({message: "timer successfully reset"});
	}
});