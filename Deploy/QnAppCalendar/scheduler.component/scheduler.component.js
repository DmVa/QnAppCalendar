(function () {
    'use strict';

    angular
        .module('scheduler.module')
        .component('pqScheduler', {
            templateUrl: '/components/scheduler/scheduler.component/scheduler.component.html',
            controller: SchedulerController,
        });

    SchedulerController.inject = ['$scope', '$window', '$document', '$timeout' ];

    function SchedulerController($scope, $window, $document, $timeout) {
        let $ctrl = this;

        $scope.scheduler = $ctrl.scheduler; //fix old logic (?)
        $scope.viewModel = $ctrl.viewModel; //fix old logic (?)
        let scheduler = $window.scheduler;

        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.locale.labels.unit_tab = "Stage";

        var sections = scheduler.serverList("units");
        scheduler.createUnitsView({
            name: "unit",
            property: "unitid",
            list: sections
        });
        scheduler.parse([], "json");//without it  appears popup says

        scheduler.init('scheduler_here', new Date(), "week");

        scheduler.load('ajax/PQAppCalendar.ashx?act=load-appointmens');

        $.ajax({
            url: 'ajax/PQAppCalendar.ashx?act=load-units',
            type: 'post',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: [],
            dataType: 'json',
            success: function (result) {
                scheduler.updateCollection("units", result);
            },
            error: function (result) {
                if (result && result.statusText)
                    console.log(result.statusText);
                else
                    console.log(result);
            }
        });
    }
}
)();