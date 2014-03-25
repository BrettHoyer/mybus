// 'use strict';

angular.module('mean.buses').controller('BusesController', ['$scope', 'BusList', 'BusStops', 'PredictTime', '$http', function ($scope, BusList, BusStops, PredictTime, $http) {
    // now you can just call it and stick it in a $scope property.
    // it will update the view when it resolves.
    // $scope.buses = Buses.getBusList();


      BusList.getBusList().then(function(data){

        $scope.buses = data.data; 
        
      })


      $scope.selectBus = function(){

        BusStops.getBusStops($scope.selectedBus.id).then(function(data){

          $scope.busStops = data.data.stops;

          $scope.closestBusStop();

        })

      }

      $scope.getLocation = function(){
        if(navigator.geolocation){

          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');

            $scope.coordinates = crd;
            $scope.$apply()

          };

          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      }



      $scope.getLocation(); 


      $scope.closestBusStop = function(){

        if($scope.busStops){

          // var closest = null
          // var closestStop = null

          // $scope.busStops.forEach(function(stop){
          //   console.log(stop)
            
          //   var stopLatLon = new google.maps.LatLng(stop.lat, stop.lon);
          //   var myLatLon   = new google.maps.LatLng($scope.coordinates.latitude, $scope.coordinates.longitude)
          //   var dist = google.maps.geometry.spherical.computeDistanceBetween(stopLatLon, myLatLon);

          //   if(closest === null || closest > dist){
              
          //     closest = dist;
          //     closestStop = stop;

          //   } 

          //   console.log(closestStop)
              
          // })

          $scope.closestStop = _.reduce($scope.busStops, function(closest, stop){ 

            var stopLatLon = new google.maps.LatLng(stop.lat, stop.lon);
            var myLatLon   = new google.maps.LatLng($scope.coordinates.latitude, $scope.coordinates.longitude)
            var dist = google.maps.geometry.spherical.computeDistanceBetween(stopLatLon, myLatLon);

            if(closest === null || dist < closest.distance) {
              
              stop.distance = dist;
              return stop;
            
            } else {

              return closest;

            }

          }, null)

          if($scope.closestStop != null){
            $scope.predictTime()
          }
          

        }




      }   

      $scope.predictTime = function(){
        PredictTime.getTime($scope.selectedBus.id, $scope.closestStop.id).then(function(data){
          console.log(data.data);
          $scope.busesInRoute = data.data[0]
        })
      }  

}]);
