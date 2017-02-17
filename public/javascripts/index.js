

var addclick = function() 
{
  res.render('activity.ejs');
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
var activityclick = function(id) 
{
  window.location.href = '/activity?id='+id
}

var changediv = function() 
{
  var div = document.getElementById('activityDiv');
  // Set Style / Append Style
  div.style.color = 'black';
}