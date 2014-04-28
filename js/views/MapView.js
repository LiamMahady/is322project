var app= app || {};


var inital;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

(function($)
  {'use strict';
  app.MapView=Backbone.View.extend
    ({el: '#mapDisplay',
    initialize: function()
      {//variables for displaying direction date
      this.$nextDirectionIcon=this.$('#nextDirectionIcon');
      this.$directionLeg=this.$('#directionLeg');
      this.$distanceFooter=this.$('#distanceFooter');
      var mapCenter=new google.maps.LatLng(60.741,-74.182);
      var mapOptions =
        {center: mapCenter,
        zoom: 14,
        mapTypeControl:false
        }
      this.map=new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      if(navigator.geolocation){
        var map=this.map;//there must be a better way to get this to getCurrentPosition
	
	navigator.geolocation.getCurrentPosition(function (position){
          inital = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(inital);

	//attempt to find gas station
	var request = {
	  location: inital,
	  rankBy: google.maps.places.RankBy.DISTANCE,
	  //radius: '5000',
	  types: ['gas_station']
	};
	console.debug(inital);
	var service = new google.maps.places.PlacesService(map);
	directionsDisplay.setMap(map);
	service.nearbySearch(request,callback);
        });
      }
      }
    });
  }
)(jQuery);

function callback(results,status){
  console.debug(status);
  if (status == google.maps.places.PlacesServiceStatus.OK){
    console.debug(results.length);
    
    var place = results[0];
    var drivingDirections = {
      origin:inital,
      destination:place.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(drivingDirections,function(response,status){
      if (status==google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
      else
        console.debug("failed:"+status);
    });

    //for (var i = 0; i<results.length; i++){
      //var place = results[i];
      //console.debug(place);
      //var marker = new google.maps.Marker({
        //map:this.map,
	//position: results[i].geometry.location
      //});
    //}
  }
};
     
