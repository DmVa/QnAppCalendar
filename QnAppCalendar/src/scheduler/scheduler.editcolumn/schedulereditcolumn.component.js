import './schedulereditcolumn.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerEditColumn', {
            template: require('./schedulereditcolumn.component.html'),
            controller: SchedulerEditColumnController,
            bindings: {
                onEditStage: '&'
            }
        });
    
    SchedulerEditColumnController.inject = ['$scope', '$window', '$document', '$timeout', 'modalService', 'schedulerDataService'];
   

    function SchedulerEditColumnController($scope, $window, $document, $timeout, modalService, schedulerDataService) {
        let $ctrl = this;
        $scope.name = '';
        $scope.isservicedefault = false;
        let $ctrlAddColumn = $('pq-scheduler-edit-column');
     
        $ctrl.closeModal = function closeModal($event, save) {
            $event.preventDefault();
            if (save) {
                $ctrl.onEditStage();
            }
            $ctrlAddColumn.hide();
        };
    }
}
)();