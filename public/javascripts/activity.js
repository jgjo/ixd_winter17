// Get activity
var activity;   
var urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
for(var i=0; i<activities.activities.length; i++) {
    if(activities.activities[i].id == id)
    {
        activity = activities.activities[i];
    }
}

//continue to chat
var btn1 = function(id,hostid) 
{
window.location.href = '/chat?id='+id+'&hostid='+hostid;
}

//dynamically populate the page
var populatePage = function(location){

    var parent = document.getElementById("services");
    var newdiv = document.createElement("div");
    newdiv.className = "container";
    // Main content of the page
    newdiv.innerHTML = 
    '<div class="row text-center">'+

        ' <div class="col-xs-12 col-md-8">'+
            ' <h2><strong>'+activity.name+'</strong></h2>'+
            '<span><i class="material-icons" style="color:#446EB6;font-size:30px;">location_on</i>'+location+'</span>'+
        ' </div>'+

        ' <div onclick="hostprofileclick('+activity.hostid+')" class="col-xs-12 col-md-8" style = "padding-top:4px">'+
            '<span>'+
                '<img height="35" width="35" padding="6px" style = "margin-right:8px" src="images/otherUser.png"> '+
                 '<strong>'+ activity.hostName+ '</strong>'+
            ' </span>'+                  
        ' </div>'+

        ' <div class="col-xs-12 col-md-8" style = "padding-top:9px">'+
            ' <img height="200" src="'+activity.pictures[0].src+'">'+
            '<h5>'+activity.description+'</h5>'+ 
        ' </div>'+

        ' <div class="col-xs-12 col-md-8 text-center" style = "padding-top:4px; padding-bottom:3px">'+                        
                '<table id="tagtable" width="100%">'+
                '</table>'+
        ' </div>'+                        

    ' </div>';
    parent.append(newdiv);

    var taghtml = '<tr id="divwithtags">';
    var divstyle="";
    var istyle="";
    // Add activity filters
    for(var i=0; i<activity.filters.length; i++) {
        if(activity.filters[i].value == 1)
        {
            divstyle="padding-top: 3px; padding-bottom: 3px; margin: 2px;";
            istyle="color:#446EB6; font-size:26px";

            if(activity.filters[i].name=="childsafe")
            {
               taghtml+= '<td id="childDiv" style="max-width: 40px;" width:"20%"">'+
                                '<div style="'+divstyle+'"> <i id="childi" class="fa fa-child" aria-hidden="true" style="'+istyle+'"></i></div> Childsafe'+
                            '</td>';
            }
            else if(activity.filters[i].name=="alcohol")
            {
                taghtml+= '<td id="alcoholDiv" style="max-width: 40px;" width:"20%"">'+
                                '<div style="'+divstyle+'"> <i id="alcoholi" class="fa fa-glass" aria-hidden="true" style="'+istyle+'"></i></div> Alcohol'+
                            '</td>';
                
            }
            else if(activity.filters[i].name=="food")
            {
                taghtml+='<td id="foodDiv" style="max-width: 40px;" width:"20%"">'+
                                '<div style="'+divstyle+'"> <i id="foodi" class="fa fa-cutlery" aria-hidden="true" style="'+istyle+'"></i></div> Food'+
                            '</td>';

            }
            else if(activity.filters[i].name=="outdoor")
            {
                taghtml+='<td id="outdoorsDiv" style="max-width: 40px;" width:"20%"">'+
                                '<div style="'+divstyle+'"> <i id="outdoorsi" class="fa fa-tree" aria-hidden="true" style="'+istyle+'"></i></div> Outdoors'+
                            '</td>';
                
            }
        }
        
    }
    // Add cost and time to the page
    taghtml+= '<td style="max-width: 40px;" width:"20%"">'+
                            '<div style="padding-top: 3px; padding-bottom: 3px; margin: 2px;"><i class="fa fa-clock-o" aria-hidden="true" style="color:#446EB6; font-size:26px"></i></div>'+activity.maxTimeInMin+'&nbsp min'+
                '</td>'+
                '<td style="max-width: 40px;" width:"20%"">'+
                    '<div style="padding-top: 3px; padding-bottom: 3px; margin: 2px;"><i class="fa fa-dollar" aria-hidden="true" style="color:#446EB6; font-size:26px"></i></div>Max &nbsp'+activity.maxCost+
                '</td>';
    taghtml+= '</tr>';

    document.getElementById("tagtable").innerHTML+= taghtml;

    // redirect to correct chat page
    document.getElementById("exitbtndiv").innerHTML+= '<a onclick=\'btn1('+activity.id+','+activity.hostID+')\'> <button class="mdl-button mdl-js-button" style="width:100%; margin-top:5px; color:#f5f5f5; min-height: 30px; height: 7%; border-left: white; border-left-style: solid; font-size:16px"><i class="fa fa-comments" style="color:white; font-size:30px" aria-hidden="true"></i>&nbsp &nbsp Chat with &nbsp '+activity.hostName+'</button></a>  ';
}

// display address corresponding to activity location
function displayLocation(latitude,longitude){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        var location = address.formatted_address;
        populatePage(location);
      }
    };
    request.send();
};

displayLocation(activity.location.lat,activity.location.lng);