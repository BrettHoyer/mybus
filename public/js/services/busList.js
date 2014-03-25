'use strict';

angular.module('mean.buses').factory('BusList', ['$http', function($http) {
  
  return {
    
    getBusList: function(){

      return $http({
        method: 'GET', 
        url: 'http://restbus.info/api/agencies/sf-muni/routes'
      })
      .success(function(data, status, headers, config) {
        return data;
      })
      .error(function(data, status, headers, config) {
        return data;
      })

    }

  };

}]);