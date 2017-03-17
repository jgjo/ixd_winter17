// FOR FILTERS
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  var childproof_bool = (document.getElementById("switch-1").checked);
  var alcohol_bool = (document.getElementById("switch-2").checked);
  var food_bool = (document.getElementById("switch-3").checked);
  var outdoor_bool = (document.getElementById("switch-4").checked);
  dialog.close();
});

//Ensure window fit
function expandToWindow(element) {
   var margin = 0; 

   if (element.style.height < window.innerHeight) { 
      element.style.height = window.innerHeight - (2 * margin) 
   }
}

// Custom Theme JavaScript
// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            // $('#to-top').css({position:'fixed', display:'block'});
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function() {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});
// Custom Theme JavaScript END

//Create pins on map based on activities and their state
var initPage = function()
{
  var dialog = document.querySelector('dialog');
  dialog.querySelector('.close').addEventListener('click', function() {
    initMap();
  });
  var map;
}

function initMap() {

  //Define style and center of map loaded
  var center = {lat: 32.722679, lng: -117.162289};
  var style = [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { saturation: -100 } // <-- THIS
        ]
      }
  ];

  //Define and create map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: center,
    streetViewControl: false,
    mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'greyscale']
       }
  });

  //More styling for the map
  var mapType = new google.maps.StyledMapType(style, { name:"Grayscale" });    
  map.mapTypes.set('greyscale', mapType);
  map.setMapTypeId('greyscale');     

  //Add activity markers on the map
  //Default color of markers is blue 3f63a1
  addMarkers("3f63a1");
}

function addMarkers(orgcolor)
{
    var infowindow = new google.maps.InfoWindow();

    //Get filter button values
    var childproof_bool = (document.getElementById("switch-1").checked);
    var alcohol_bool = (document.getElementById("switch-2").checked);
    var food_bool = (document.getElementById("switch-3").checked);
    var outdoor_bool = (document.getElementById("switch-4").checked);

    //Past-a completed activity is not shown on the map
    var past = false;

    // LOOP THROUGH ACTIVITIES TO CREATE MARKERS
    for(var i=0; i<activities.activities.length; i++) {

        //Default color unless decided otherwise
        color = orgcolor;
        //Current filter values
        var filter = activities.activities[i].filters;

        //Show activity if none of the filters are set or if the activity matches the filter values
        if((((filter[0].value==1)&&childproof_bool)||((filter[1].value==1)&&outdoor_bool)&&((filter[2].value==1)&&alcohol_bool)&&((filter[3].value==1)&&food_bool))
          ||!(childproof_bool||outdoor_bool||alcohol_bool||food_bool))
        {

          //Loop through each ongoing activity
          for(var j=0; j<activitylog.activitylog.length; j++) {
            //For each activity(i), check if it is ongoing
            if(activitylog.activitylog[j].activityid == activities.activities[i].id)
            {
                //check if it is a completed activity
                if(activitylog.activitylog[j].past)
                {
                  past = true;
                }
                else
                {
                  //set current activity pin to be green - 6ab344
                  color="6ab344";
                  current = true;
                }
                break;
            }
          }

          //if the activity is the users own, show it in orange e67e22
          if(activities.activities[i].own==1)
          {
            color="E67E22";
          }

          // CREATE PIN WITH SELECTED COLOR
          var pinColor = color;
          var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
          var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

          //SET LATITUDE AND LONGITUDE
          var latLng = new google.maps.LatLng(activities.activities[i].location.lat,activities.activities[i].location.lng);

          //PLACE MARKER ON THE MAP
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: pinImage,
            shadow: pinShadow
          });

          //ADD CLICK LISTENER TO THE PIN TO ENABLE POPUP
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

              //Own Activity: Does not have a view option
              if(activities.activities[i].own==1)
              {
                infowindow.setContent('<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">'+activities.activities[i].name+'</h1>'+
                  '<div id="bodyContent">'+
                  '<p>'+activities.activities[i].description+'</p>'+
                  '<p>Host:'+activities.activities[i].hostName+
                  '</p>'+
                  '<img height="140" width="140" src="'+activities.activities[i].pictures[0].src+'">'+
                  '<p> </div>'+
                  '</div>');
              }
              //Ongoing or open activity
              else
              {
                //Current-keeps track of if the activity of the iteration is a current one or not
                var current = false;
                //Loop through each ongoing activity
                for(var j=0; j<activitylog.activitylog.length; j++) {
                  //For each activity(i), check if it is ongoing
                  if(activitylog.activitylog[j].activityid == activities.activities[i].id)
                  {
                      //check if it is a completed activity
                      if(!activitylog.activitylog[j].past)
                      {
                        current = true;
                      }
                      break;
                  }
                }

                if(current)
                {
                  var strlabel = "Continue logging"
                }
                else
                {
                  var strlabel = "View details"
                }

                infowindow.setContent(
                  '<div>'+
                    '<h3 id="firstHeading" onclick=activityclick('+activities.activities[i].id+','+current+') class="firstHeading">'+activities.activities[i].name+'</h3>'+

                    '<div id="bodyContent" style="content-align:center; text-align:center">'+
                      '<table style="content-align:center">'+
                        '<tr style="content-align:center">'+
                          '<td style="content-align:center">'+   
                            '<table>'+
                              '<tr>'+
                                '<td>'+                          
                                '<img style="height:40px; width:40px; margin:8px" src="images/otherUser.png">'+
                                '</td>'+

                                '<td onclick="hostprofileclick('+activities.activities[i].hostID+')" style="vertical-align: center">'+   
                                '<h5>&nbsp'+activities.activities[i].hostName+'</h5>'+                       
                                '</td>'+
                              '</tr>'+
                            '</table>'+                      
                          '</td>'+
                        '</tr>'+

                        '<tr>'+
                          '<td>'+                          
                          '<img onclick=activityclick('+activities.activities[i].id+','+current+') style="height:120px; width:120px; margin-left:17px;" src="'+activities.activities[i].pictures[0].src+'">'+
                          '</td>'+                                  
                        '</tr>'+

                        '<tr>'+
                          '<td>'+                          
                          '<p><br/><a href="#" onclick=activityclick('+activities.activities[i].id+','+current+')>'+strlabel+'</a></p>'+
                          '</td>'+
                        '</tr>'+
                      '</table>'+
                    '</div>'+
                  '</div>'
                  );
              }

              infowindow.open(map,marker);
            }
          })(marker, i));
        }
    }
}



