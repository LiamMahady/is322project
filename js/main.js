function initialize()
  {var mapCenter=new google.maps.LatLng(40.741,-74.182);
  var mapOptions =
    {center: mapCenter,
    zoom: 14,
    mapTypeControl:false
    }
  var map=new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }
google.maps.event.addDomListener(window, 'load', initialize);
