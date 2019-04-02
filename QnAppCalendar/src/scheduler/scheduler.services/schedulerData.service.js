(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('schedulerDataService', schedulerDataService);

    schedulerDataService.$inject = ['$http'];
    function schedulerDataService($http) {
        var basePath = '/ajax/PQAppCalendar.ashx?act=';

        return {
            saveAppointment: function (params) {
                return new Promise();
               
            },

            loadAppointments: function (params) {
               return $.ajax({
                   url: basePath + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                });
            },

            loadUnits: function (params) {
              return  $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=load-units',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json',
                });
            }

        };
    }
})();