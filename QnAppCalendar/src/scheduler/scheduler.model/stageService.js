//to-do rename to service.
(function () {
    'use strict';
    angular
        .module('scheduler.module')
        .factory('StageService', function () {
            function StageService(id, name) {
                this.id = id;
                this.name = name;
                this.stageId = -1;
            };

            return StageService
        }
        );
}     
)();


