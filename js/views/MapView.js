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
	directionsDisplay.setPanel(document.getElementById("directionList"));
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
    //the places request ranks places by physical distance
    //so we'll use the distance matrix to get driving distance
    var distService=new google.maps.DistanceMatrixService();
    distReq=
      {origins:[inital],
      destinations:[],
      travelMode:google.maps.TravelMode.DRIVING
      };
    for (var i=0;i<results.length && i<100;i++)
      {distReq.destinations.push(results[i].geometry.location);
      }
    distService.getDistanceMatrix
      (distReq, function(response,status)
        {var dist=response.rows[0].elements[0].distance.value;
        var place=results[0];
        for (var i=1;i<response.rows[0].elements.length;i++)
          {var newDist=response.rows[0].elements[i].distance.value;
          if (newDist<dist)
            {dist=newDist;
            place=results[i];
            }
          }
        var drivingDirections = {
          origin:inital,
          destination:place.geometry.location,
          travelMode: google.maps.TravelMode.DRIVING
        };
	document.getElementById("directionLeg").innerHTML = "Directions to : "+place.name;
        directionsService.route(drivingDirections,function(response,status){
          if (status==google.maps.DirectionsStatus.OK){
            document.getElementById("distanceFooter").innerHTML = response.routes[0].legs[0].distance.value+" meters"; 
	    directionsDisplay.setDirections(response);
          }
          else
            console.debug("failed:"+status);
        });
        }
      );

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
     
