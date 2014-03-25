'use strict';

angular.module('mean.buses').factory('PredictTime', ['$http', function($http){
  
  return {

    getTime: function(routeId, stopId){

      return $http({
        method: 'GET',
        url: 'http://restbus.info/api/agencies/sf-muni/routes/' + routeId + '/stops/' + stopId + '/predictions'
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