import './schedulereditcolumn.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerEditColumn', {
            template: require('./schedulereditcolumn.component.html'),
            controller: SchedulerEditColumnController,
            bindings: {
                onAddStage: '&'
            }
        });
    
    SchedulerEditColumnController.inject = ['$scope', '$window', '$document', '$timeout','modalService','schedulerDataService', 'Stage', 'Status'];
   

    function SchedulerEditColumnController($scope, $window, $document, $timeout, modalService, schedulerDataService, Stage, Status) {
        let $ctrl = this;
        $scope.name = '';
        let $ctrlAddColumn = $('pq-scheduler-edit-column');
     
        $ctrl.closeModal = function closeModal($event, save) {
            $event.preventDefault();
            if (save) {
                $ctrl.onAddStage({ stagename: $scope.name });
            }
            $ctrlAddColumn.hide();
        };
    }
}
)();