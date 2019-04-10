angular
    .module('scheduler.module')
    .directive('pqDragMe', dragMe)
    .directive('pqDropOnMe', dropOnMe);

dragMe.$inject = [];

function dragMe() {
    var DDO = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function (event) {
                if (event.target.attributes['pq-drag-me']) {
                    let dragmeattribute = event.target.attributes['pq-drag-me'].value;
                    let dataid = event.target.attributes[dragmeattribute].value;
                    event.dataTransfer.setData('data', dataid)
                }
            });
        }
    };
    return DDO;
}

dropOnMe.$inject = [];
function dropOnMe() {
    var DDO = {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, element, attrs) {
            let preventDrop = attrs["pqDropOnMe"] === "false";
            element.on('dragover', function (event) {
                if (!preventDrop)
                    event.preventDefault();
            });
            element.on('drop', function (event) {
                event.preventDefault();
                let dataid = event.dataTransfer.getData('data');
                scope.onDrop({ event: event, data: dataid });
            });
        }
    };
    return DDO;
}