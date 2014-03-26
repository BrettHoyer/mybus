// 'use strict';

angular.module('mean.buses').controller('BusesController', ['$scope', '$location', 'BusList', 'BusStops', 'PredictTime', 'NearbyBuses', 'MyBuses', '$http', '$parse', function ($scope, $location, BusList, BusStops, PredictTime, NearbyBuses, MyBuses, $http, $parse) {
    // now you can just call it and stick it in a $scope property.
    // it will update the view when it resolves.
    // $scope.buses = Buses.getBusList();

    $scope.create = function(id) {
        var myBus = new MyBuses({
            bus_id: id,
        });
        myBus.$save(function(response) {
            $location.path('myBuses/' + response._id);
        });

        this.id = '';
    };


      BusList.getBusList().then(function(data){


        $scope.buses = data.data; 
        
      })

      $scope.busRoutes = [];

      $scope.selectBus = function(){

        $scope.addBus()

        $scope.create($scope.selectedBus.id)

        BusStops.getBusStops($scope.selectedBus.id).then(function(data){

          console.log(data.data.stops)
          var string = 'busStops' + $scope.selectedBus.id;
          var model  = $parse(string);
          model.assign($scope, data.data.stops);

          $scope.busStops = data.data.stops;

          $scope.closestBusStop();


        })

      }

      $scope.addBus = function(){

        $scope.busRoutes.push($scope.selectedBus.id)

        $scope.myNearbyBuses()
        

      }

      $scope.getLocation = function(){
        if(navigator.geolocation){

          var options = {
            enableHighAccuracy: true,
            // timeout: 5000,
            maximumAge: 0
          };

          function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');

            $scope.coordinates = crd;
            $scope.position = pos;
            $scope.$apply()


            // NearbyBuses.getAllNearby(crd.latitude, crd.longitude).then(function(res){
            NearbyBuses.getAllNearby(37.794374, -122.417532).then(function(res){
              console.log("nearby buses", res)
              $scope.nearbyBuses = res.data

            })

             console.log($scope)



          };

          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      }

      $scope.myNearbyBuses = function(){
        $scope.myBuses = _.filter($scope.nearbyBuses, function(stop){

                return _.contains($scope.busRoutes, stop.route.id)
              
              })
      }


      $scope.getLocation(); 


      $scope.closestBusStop = function(){

        if($scope.busStops){


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
