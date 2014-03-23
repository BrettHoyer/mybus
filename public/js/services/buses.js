'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.buses').factory('Buses', ['$http', function($http) {
  return {
    getBusList: function(){

      // return $http({
      //   method: 'GET', 
      //   url: 'http://restbus.info/api/agencies/sf-muni'
      // })
      // .success(function(data, status, headers, config) {
      //   console.log(data)
      //   return data;
      // })
      // .error(function(data, status, headers, config) {
      //   return data;
      // })

        // $scope.buses = data

    }
  };
}]);