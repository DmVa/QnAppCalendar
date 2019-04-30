
(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('alertService', alertService);

    function alertService() {
        var service = {};

        service.Error = Error;
        return service;

        function Error(text) {
            swal("Error!", text, "error");
        }
    }

})();
