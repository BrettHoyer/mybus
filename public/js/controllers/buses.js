'use strict';

angular.module('mean.buses').controller('BusesController', ['$scope', 'Buses', '$http', function ($scope, Buses, $http) {
    // now you can just call it and stick it in a $scope property.
    // it will update the view when it resolves.
    // $scope.buses = Buses.getBusList();

    $http({method: 'GET', url: 'http://restbus.info/api/agencies/sf-muni/routes'}).success(function(data){
      console.log(data)
      $scope.buses = data; 
    })

}]);