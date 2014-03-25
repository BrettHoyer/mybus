'use strict';

angular.module('mean.buses').factory('BusStops', ['$http', function($http){
  
  return {

    getBusStops: function(id){

      return $http({
        method: 'GET',
        url: 'http://restbus.info/api/agencies/sf-muni/routes/' + id
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