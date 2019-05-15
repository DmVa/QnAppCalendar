import './schedulerselectroute.component.scss';

(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqSchedulerSelectRoute', {
            template: require('./schedulerselectroute.component.html'),
            controller: SchedulerSelectRouteController,
            bindings: {
                onSelectRoute: '&'
            }
        });
    
    SchedulerSelectRouteController.inject = ['$scope', '$window', '$document', '$timeout', 'modalService'];
   

    function SchedulerSelectRouteController($scope, $window, $document, $timeout, modalService) {
        let $ctrl = this;
        $scope.options = [];
        $scope.selected = {};
        $scope.tostagename = '';
     
        $ctrl.closeModal = function closeModal($event, save) {
            $event.preventDefault();
            if (save) {
                if (!$scope.selected || !$scope.selected.key) {
                    return;
                }
                $ctrl.onSelectRoute({ eventData: $scope.eventData, selected: $scope.selected });
            }
            modalService.Close('scheduler-select-route-modal');
        };

        let initListener = $scope.$on('pq-board-select-route', function (events, args) {
            $scope.tostagename = args.tostagename;
            $scope.options = args.options;
            $scope.eventData = args.eventData;
            if ($scope.options && $scope.options.length > 0) {
                $scope.selected = $scope.options[0];
            }
            else {
                $scope.selected = {};
            };
            $scope.$apply();
        });

        $scope.$on('$destroy', function () {
            initListener();
        });
    }
}
)();