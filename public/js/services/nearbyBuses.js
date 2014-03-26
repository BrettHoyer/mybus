'use strict';

angular.module('mean.buses').factory('NearbyBuses', ['$http', function($http){
  
  return {

    getAllNearby: function(lat, lng){

      return $http({
        method: 'GET',
        url: 'http://restbus.info/api/locations/' + lat + "," + lng + '/predictions'
      })
      .success(function(data, status, headers, config) {
        return data;
      })
      .error(function(data, status, headers, config) {
        return data;
      })

    }

  }

}]) 