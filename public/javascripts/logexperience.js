//Get activity
var urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');

//Save an experience
var btn2 = function() 
{
    document.getElementById("modalContent").innerHTML='<div><br/><p>Experience saved!</p><br/></div>';
    modal.style.display = "block";
    setTimeout(function() {
        ga("send", "event", "clickSave", "savedMemory");
        var data = {
        activityid: activity.id
        };
        $.post('/api/endlogexperience', data, function success() {
            window.location.href = '/';
        });
    }, 100);
    
}

// Abandon Experience
var btn3 = function() 
{
    document.getElementById("modalContent").innerHTML='<div><br/><p>Experience abandoned!</p><br/></div>';
    modal.style.display = "block";                
      
    setTimeout(function() {
        var data = {
        activityid: activity.id
        };
        $.post('/api/abandonexperience', data, function success() {
            window.location.href = '/';
        });
    }, 100);
}

// FUNCTIONS FOR THE MODAL
var showModalImage = function() 
{
//addpicbtn
document.getElementById("addmomentimg").className = "show";
document.getElementById("addpicbtn").className = "hide"; 
}

var showModalImage_save = function() 
{
//addpicbtn
document.getElementById("addmomentimg").className = "show";
document.getElementById("addpicbtn").className = "hide"; 
}

var showModalImage_abandon = function() 
{
//addpicbtn
document.getElementById("addmomentimg").className = "show";
document.getElementById("addpicbtn").className = "hide"; 
}

var hideModalImage = function() 
{
document.getElementById("addmomentimg").className = "hide"; 
document.getElementById("addpicbtn").className = "show"; 
}
// END OF FUNCTIONS FOR THE MODAL

// Show previously logged posts, if any
var populatePrevMoments = function(){

    var prevmoments=[];
    
    for(var i=0; i<activitylog.activitylog.length; i++) {
      if(activitylog.activitylog[i].activityid == id)
      {
          prevmoments = activitylog.activitylog[i].log;
      }
    }

    for(var i=0; i<prevmoments.length; i++) {
        var prevmoment = prevmoments[i];
        var parent = document.getElementById("cd-timeline");
        var newdiv = document.createElement("div");
        newdiv.className = "cd-timeline-block";
        newdiv.innerHTML = ' <div class="cd-timeline-img cd-picture">'+ 
                                '<img src="img/cd-icon-picture.svg" alt="Picture">'+ 
                            ' </div> '+
                            ' <div class="cd-timeline-content"> '+
                                ' <img height="100" width="100" src="'+prevmoment.pictureSrc+'" alt="Picture"> '+
                                ' <p>'+prevmoment.caption+'</p> '+
                                ' <a href="#" class="cd-read-more">'+prevmoment.username+'</a> '+
                                ' <span class="cd-date">Jan 24</span> '+
                            ' </div>';
        parent.insertBefore(newdiv, parent.firstChild);
    }   
}

//Get current activity
var activity;
for(var i=0; i<activities.activities.length; i++) {
  if(activities.activities[i].id == id)
  {
      activity = activities.activities[i];
  }
}

//populate prev moments        
populatePrevMoments();

//mark activity as ongoing
var data = {
    activityid: activity.id
};
$.post('/api/startlogexperience', data, function success() {
    var x = 10;
});

//populate activity specific elements
var parent = document.getElementById("activitydiv");
var newdiv = document.createElement("h1");
newdiv.innerHTML = activity.name;
parent.append(newdiv); 
newdiv = document.createElement("div");
newdiv.setAttribute("onclick","hostprofileclick("+activity.hostID+")");
newdiv.innerHTML =  '<br> '+
                    ' <figure> <img src="images/otherUser.png" style="height:40px; width:40px;" /> </figure> '+
                    ' <h1 style="font-size:13px"> with '+activity.hostName+'</h1>';
parent.append(newdiv);

//add a post - to mimic host adding pictures
var addMoment = function(){ 

    var rand = Math.floor(Math.random() * 3);
    var username = activity.hostName;

    var moment = moments.moments[rand+1];
    var parent = document.getElementById("cd-timeline");
    var newdiv = document.createElement("div");
    newdiv.className = "cd-timeline-block";
    newdiv.innerHTML =  '<div class="cd-timeline-img cd-picture"> '+
                            ' <img src="img/cd-icon-picture.svg" alt="Picture"> '+
                        ' </div> '+
                        ' <div onclick="hostprofileclick('+activity.hostID+')" class="cd-timeline-content"> '+
                            ' <img height="100" width="100" src="'+moment.pictureSrc+'" alt="Picture"> '+
                            ' <p>'+moment.caption+'</p> '+
                            ' <a href="#" class="cd-read-more">'+username+'</a> '+
                            ' <span class="cd-date">Jan 24</span> '+
                        ' </div>';
    parent.insertBefore(newdiv, parent.firstChild);

    persistMoment(moment.caption,username,moment.pictureSrc);
}

// add a post - the one teh user added
var populateMoment = function(caption)
{
    var p = document.getElementById("cd-timeline");
    var n = document.createElement("div");
    n.className = "cd-timeline-block";
    n.innerHTML =   '<div class="cd-timeline-img cd-picture"> <img src="img/cd-icon-picture.svg" alt="Picture"> </div> '+
                    ' <div class="cd-timeline-content"> '+
                        ' <img height="100" width="100" src="https://res.cloudinary.com/din6mjlbd/image/upload/v1487322946/dummy_host_cbgagu.jpg" alt="Picture"> '+
                        ' <p>'+caption+'</p> '+
                        ' <a href="#" class="cd-read-more">You</a> '+
                        ' <span class="cd-date">Jan 24</span> '+
                    ' </div>';
    p.insertBefore(n, p.firstChild);

    console.log("Caption "+caption);
    if(caption=="")
    {
        var cptn = ".";
    }
    else
    {
        var cptn = caption;
    }
    persistMoment(cptn,"You","https://res.cloudinary.com/din6mjlbd/image/upload/v1487322946/dummy_host_cbgagu.jpg");

    if(Math.random()>0.5){
        addMoment();
    }

}

//persist each post
var persistMoment = function(caption,username,pictureSrc)
{
    var data = {
      activityid: activity.id,
      caption: caption,
      username: username,
      pictureSrc: pictureSrc
    };
    $.post('/api/moments', data, function success() {
      var x = 10;
    });
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("addmomentbtn");

//Save and Close Button        
var savebtn = document.getElementById("savemomentbtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
//var openModal = function() {        
    modal.style.display = "block";
    ga("send", "event", "clickAdd", "addMoment");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

savebtn.onclick = function() {
    modal.style.display = "none";
    hideModalImage();
    populateMoment(document.getElementById("txt_caption").value);
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}