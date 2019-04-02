(function () {
    'use strict';
    angular
        .module('scheduler.module')
        .factory('Status', function () {
            function Status(id, name, isQflow) {
                this.id = id;
                this.name = name;
                this.isQflow = isQflow;
                this.stageId = -1;
            };

            return Status
        }
        );
}     
)();


