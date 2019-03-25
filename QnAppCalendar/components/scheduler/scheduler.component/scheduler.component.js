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
        let _originalEvent = new Map();

        $ctrl.handleWrappedError = function(result) {
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
        };

        $ctrl.handleError = function(result) {
            if (result && result.statusText) {
                console.log(result.statusText);
            }
            else {
                if (result)
                    console.log(result);
                else
                    console.log('error');
            }
        };

        $ctrl.rollbackEvent = function (ev) {
            let originalEvent = _originalEvent.get(ev.appointmnetId);
            if (!originalEvent)
                return;
            _originalEvent.delete(en.appointmnetId);

            ev.start_date = originalEvent.start_date;
            ev.end_date = originalEvent.end_date;
            scheduler.updateView();

        };


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

        $.ajax({
            url: '/ajax/PQAppCalendar.ashx?act=load-appointmens',
            type: 'post',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: [],
            dataType: 'json',
            success: function (result) {
                if (result.error) {
                    $ctrl.handleWrappedError(result);
                    return;
                }
                scheduler.parse(result.data, "json");
            },
            error: function (result) {
                $ctrl.handleError(result);
                return;
            }
        }
        );

       // scheduler.load('/ajax/PQAppCalendar.ashx?act=load-appointmens');

        $.ajax({
            url: '/ajax/PQAppCalendar.ashx?act=load-units',
            type: 'post',
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: [],
            dataType: 'json',
            success: function (result) {
                if (result.error) {
                    $ctrl.handleWrappedError(result);
                    return;
                }
                scheduler.updateCollection("units", result.data);
            },
            error: function (result) {
                    $ctrl.handleError(result);
                    return;
                }
            }
        );

        scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
            _originalEvent.set(ev.appointmnetId, $.extend(true, {}, original));
            return true;
        });

        scheduler.attachEvent("onEventChanged", function (id, ev) {
            let linkToEvent = ev;

            let theEventCopy = $.extend(true, {}, ev); // make a copy.
            let timeZoneOffsetMs = ev.start_date.getTimezoneOffset() * 60000;
            theEventCopy.start_date = new Date(ev.start_date.getTime() - timeZoneOffsetMs);
            theEventCopy.end_date = new Date(ev.end_date.getTime() - timeZoneOffsetMs);

            $.ajax({
                url: '/ajax/PQAppCalendar.ashx?act=save-appointment',
                type: 'post',
                async: true,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(theEventCopy),
                dataType: 'json',
                success: function (result) {
                    if (result.error) {
                        $ctrl.handleWrappedError(result);
                        $ctrl.rollbackEvent(ev);
                        return;
                    }

                    linkToEvent.appointmnetId = result.data.appointmnetId;
                    console.log('saved');
                },
                error: function (result) {
                    $ctrl.handleError(result);
                    $ctrl.rollbackEvent(ev);
                }
            });
            
        });
    }

  
}
)();