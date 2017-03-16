
var populateMoments = function(){

    var username = activity.hostName;
    console.log(moments.length);
    for(var i=0; i<moments.length; i++) {
        var moment = moments[i];
        console.log(moment);
        var parent = document.getElementById("cd-timeline");
        var newdiv = document.createElement("div");
        newdiv.className = "cd-timeline-block";
        newdiv.innerHTML = '<div class="cd-timeline-img cd-picture"> <img src="img/cd-icon-picture.svg" alt="Picture"> </div> <div class="cd-timeline-content"> <img height="100" width="100" src="'+moment.pictureSrc+'" alt="Picture"> <p>'+moment.caption+'</p> <a href="#0" class="cd-read-more">'+moment.username+'</a> <span class="cd-date">Jan 24</span> </div>';
        parent.insertBefore(newdiv, parent.firstChild);
    }   
}

var activity;   
var urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
for(var i=0; i<activities.activities.length; i++) {
  if(activities.activities[i].id == id)
  {
      activity = activities.activities[i];
  }
}
var moments;
for(var i=0; i<activitylog.activitylog.length; i++) {
  if(activitylog.activitylog[i].activityid == id)
  {
      moments = activitylog.activitylog[i].log;
  }
}

//add activity specific details
var parent = document.getElementById("activitydiv");
var newdiv = document.createElement("h1");
newdiv.innerHTML = activity.name;
parent.append(newdiv);
newdiv = document.createElement("div");
newdiv.innerHTML = '<br> <figure> <img src="images/otherUser.png" style="height:30px; width:30px;" /> </figure> <h1 style="font-size:13px"> with '+activity.hostName+'</h1> <!--<button class="modalbtn mdl-button mdl-js-button mdl-button--fab mdl-button--colored" href="/chat?id='+activity.id+'&past=true" style="background-color:#446EB6; margin:10px auto;"> <i class="material-icons">chat</i></button>-->'
parent.append(newdiv); 
populateMoments();        

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("sharebtn");


var sharebtn = document.getElementById("sharemodalbtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
//var openModal = function() {        
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

sharebtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}