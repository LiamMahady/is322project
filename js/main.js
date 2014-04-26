/*function initialize()
  {var mapCenter=new google.maps.LatLng(60.741,-74.182);
  var mapOptions =
    {center: mapCenter,
    zoom: 14,
    mapTypeControl:false
    }
  var map=new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position){
      inital = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(inital);
    });
  }
 }
google.maps.event.addDomListener(window, 'load', initialize);*/

$(function ()
  {'use strict';
  new app.MapView();
  }
 );
