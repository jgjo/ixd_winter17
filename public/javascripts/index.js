var map;

var addclick = function() 
{
  window.location.href = '/addactivity'
}

var filterclick = function() 
{
  window.location.href = '/filterpopup'
}

var profileclick = function() 
{
  window.location.href = '/myprofile'
}

var aboutclick = function() 
{
  window.location.href = '/about'
}

var memoryclick = function() 
{
  window.location.href = '/viewmemories'
}
var activityclick = function() 
{
  window.location.href = '/activity'
}

var changediv = function() 
{
  var div = document.getElementById('activityDiv');
  // Set Style / Append Style
  div.style.color = 'black';
}