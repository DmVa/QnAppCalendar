(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('schedulerDataService', schedulerDataService);

    schedulerDataService.$inject = ['$http','alertService'];
    function schedulerDataService($http, alertService) {
        var _getBasePath = '';
        var basePath = '/ajax/PQAppCalendar.ashx?act=';
        var getVirtualNameBasedOnCustomPage = function (href) {
            var virtualName = "";
            var hrefItems = href.split('/');
            if (hrefItems.length > 3) {
                let customPageItem = hrefItems.find(x => x.toLowerCase() == 'custompage');
                if (!customPageItem)
                    return "";
                let idx = hrefItems.indexOf(customPageItem);
                if (idx <= 0)
                    return "";

                let virtualPathItems = hrefItems.slice(3, idx);
                if (virtualPathItems.length > 0) {
                    virtualName = "/" + virtualPathItems.join('/');
                }
            }

            return virtualName; 
        };

        var getBasePath = function () {
            if (!_getBasePath) {
                let virtual = getVirtualNameBasedOnCustomPage(window.location.href);
                _getBasePath = virtual + basePath;
            }

            return _getBasePath;
        }

        return {
            getAppVirtualName: function () {
                var virtualName = getVirtualNameBasedOnCustomPage(window.location.href);
                return virtualName; 
            },

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
                        alertService.Error(result.error.message);
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
           saveCustomizeData: function (params) {
               return $.ajax({
                   url: getBasePath() + 'save-customizedata',
                   type: 'post',
                   async: true,
                   contentType: 'application/json; charset=utf-8',
                   data: JSON.stringify(params),
                   dataType: 'json'
               })
           },
            getCustomizeData: function () {
                return $.ajax({
                    url: getBasePath() + 'get-customizedata',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                })
            },
            saveAppointment: function (params) {
               return $.ajax({
                   url: getBasePath() + 'save-appointment',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
            },
            eventChanged: function (params) {
                return $.ajax({
                    url: getBasePath() + 'appointment-changed',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
            },
            appointmentCancel: function (params) {
                return $.ajax({
                    url: getBasePath() + 'appointment-cancel',
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
                   url: getBasePath() + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(params),
                    dataType: 'json'
                });
            },

            loadTodayAppointments: function () {
                return $.ajax({
                    url: getBasePath() + 'load-appointmens',
                    type: 'post',
                    async: true,
                    contentType: 'application/json; charset=utf-8',
                    data: [],
                    dataType: 'json'
                });
            },

            loadStages: function (params) {
              return  $.ajax({
                  url: getBasePath() + 'load-stages',
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