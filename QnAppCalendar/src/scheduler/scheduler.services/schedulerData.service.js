(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('schedulerDataService', schedulerDataService);

    schedulerDataService.$inject = ['$http'];
    function schedulerDataService($http) {
        var basePath = '/ajax/PQAppCalendar.ashx?act=';

        return {
            getDate: function (date) {
                if (!date)
                    return date;

                let timeZoneOffsetMs = date.getTimezoneOffset() * 60000;
                let result = new Date(date.getTime() - timeZoneOffsetMs);
                return result;
            },

            handleWrappedError : function (result) {
                if (result.error) {
                    if (result.error.message) {
                        alert(result.error.message);
                    }
                    else {
                        console.log('undefined error');
                    }
                }
                else {
                    console.log('not wrapped error');
                }
            },
           handleError : function (result) {
                if (result && result.statusText) {
                    console.log(result.statusText);
                }
                else {
                    if (result)
                        console.log(result);
                    else
                        console.log('error');
                }
            },
            getCustomizeData: function () {
                return $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=get-customizedata',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                })
            },
            saveAppointment: function (params) {
               return $.ajax({
                    url: '/ajax/PQAppCalendar.ashx?act=save-appointment',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
               
            },

            loadAppointments: function (from, to) {
                var params = { from: from, to: to };
               return $.ajax({
                   url: basePath + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
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