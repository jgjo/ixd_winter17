

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

var ongoingclick = function() 
{
  window.location.href = '/viewongoingactivities'
}

var activityclick = function(id,current=false) 
{
	if(current)
	{
		window.location.href = '/logexperience?id='+id
	}
	else
	{
	  window.location.href = '/activity?id='+id
	}
}

var changediv = function() 
{
  var div = document.getElementById('activityDiv');
  // Set Style / Append Style
  div.style.color = 'black';
}