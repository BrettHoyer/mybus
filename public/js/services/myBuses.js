'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.buses').factory('MyBuses', ['$resource', function($resource) {
    return $resource('myBuses/:myBusId', {
        myBusId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);