var $messages = $('.messages-content'),
  d, h, m,
  i = 0;

// FUNCTIONS FOR CHAT
$(window).load(function() {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
'Hi!',
'Nice to meet you',
'How are you?',
'That\'s awesome',
'Hi!',
'See you soon',
'Let\'s meet in 20 minutes',
'Bye',
':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/otherUser.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  var i = Math.floor(Math.random() * (8));
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/otherUser.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}

//Get activity id and user id
var urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
if(id==null)
{
  console.log("Activity id is null");
}
hostid = urlParams.get('hostid');

// For back button
var goBack = function()
{
  window.location.href = '/activity?id='+id;
}

// Continue activity
var btn1 = function() 
{
  window.location.href = '/logexperience';
}

// abandon activity
var btn2 = function() 
{
  window.alert("Activity cancelled");
  window.location.href = '/';
}

//Add host name
var populatePage_hostName = function(){
    var parent = document.getElementById("userdiv");
    var newdiv = document.createElement("h1");
    newdiv.innerHTML = activity.hostName;
    newdiv.style = "padding-top: 8px;";
    parent.append(newdiv);              
}

//redirect to correct log exp
var updateRedirect = function()
{
  document.getElementById("goingbtn").href="/logexperience?id="+activity.id;
}

//for chat history
var populateprevmessages = function()
{
  messageHistory = host.chatMessages;
  for(var i = 0;i<messageHistory.length;i++)
  {
    if(messageHistory[i].own)
    {
        historyOwnMessage(messageHistory[i].message);
    }
    else
    {
        //historyHostMessage(messageHistory[i].message);
    }
  }
}


// Dynamically populate the page
var activity;   
var host;
//Get current activity and host
for(var i=0; i<activities.activities.length; i++) {
    if(activities.activities[i].id == id)
    {
        activity = activities.activities[i];
    }
}
for(var i=0; i<users.users.length; i++) {
    if(users.users[i].id == hostid)
    {
        host = users.users[i];
    }
}

//populateprevmessages();
populatePage_hostName();
updateRedirect();