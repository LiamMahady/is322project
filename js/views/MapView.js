var app= app || {};
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
          var inital = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(inital);
       });
      }
      }
    });
  }
)(jQuery);
     