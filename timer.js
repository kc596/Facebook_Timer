/**** Timer variables ****/
var h1, h2, m1, m2, s1, s2;

/**** Function to get old timer value ****/
chrome.storage.local.get(['_h1','_h2','_m1','_m2','_s1','_s2'], function(result){
	h1=result['_h1'];
	h2=result['_h2'];
	m1=result['_m1'];
	m2=result['_m2'];
	s1=result['_s1'];
	s2=result['_s2'];
});
var time = h1+""+h2+" : "+m1+""+m2+" : "+s1+""+s2;

/**** Chossing up the place to display timer ****/
var myElement = document.getElementById("blueBarDOMInspector");
var child = document.createElement("div");
child.setAttribute("class","timer-style");
child.innerHTML=time;

/**** Function to display timer and store its value ****/
function set_timer(){
	if(s2<9) s2++;
	else if(s1<5){ s1++; s2=0; }
	else if(m2<9){ m2++; s2=0; s1=0; }
	else if(m1<5){ m1++; m2=0; s2=0; s1=0; }
	else if(h2<9){ h2++; m1=0; m2=0; s2=0; s1=0; }
	else {h1++; h2=0; m1=0; m2=0; s2=0; s1=0; }
	time = h1+""+h2+" : "+m1+""+m2+" : "+s1+""+s2;
	child.innerHTML = time;
	myElement.appendChild(child);

	chrome.storage.local.set({'_h1':h1, '_h2':h2, '_m1':m1, '_m2':m2, '_s1':s1, '_s2':s2}, function() {
		console.log('time set');
	});
}

/**** Calling the timer function every second ****/
setInterval(set_timer, 1000);