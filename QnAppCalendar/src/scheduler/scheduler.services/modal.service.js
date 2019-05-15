
(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .factory('modalService', modalService);

    function modalService() {
        var modals = []; // array of modals on the page
        var service = {};

        service.Add = Add;
        service.Remove = Remove;
        service.Open = Open;
        service.Close = Close;

        

        var findWhere = function FindWhere(id) {
            var arrayLength = modals.length;
            for (var i = 0; i < arrayLength; i++) {
                if (modals[i].id === id) {
                    return modals[i];
                }
            }
        };
        return service;

        function Add(modal) {
            modals.push(modal);
        }

        function Remove(id) {
            var arrayLength = modals.length;
            for (var i = 0; i < arrayLength; i++) {
                if (modals[i].id === id) {
                    modals.splice(i, 1);
                    i--;
                }
            }
        }

        function Open(id) {
            // open modal specified by id
            var modal = findWhere(id);
            modal.open();
        }

        function Close(id) {
            // close modal specified by id
            var modal = findWhere(id);
            modal.close();
        }
    }

})();
