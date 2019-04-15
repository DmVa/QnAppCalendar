angular
    .module('scheduler.module')
    .directive('pqDragMe', pqDragMe)
    .directive('pqDropOnMe', pqDropOnMe);

pqDragMe.$inject = [];

function pqDragMe() {
    var DDO = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function (event) {
                if (event.target.attributes['pq-drag-me']) {
                    let dragmeattribute = event.target.attributes['pq-drag-me'].value;
                    let dataid = event.target.attributes[dragmeattribute].value;
                    if (event.dataTransfer === undefined) {
                        event.originalEvent.dataTransfer.setData('data', dataid);
                    }
                    else {
                        event.dataTransfer.setData('data', dataid)
                    }
                }
            });
        }
    };
    return DDO;
}

pqDropOnMe.$inject = [];
function pqDropOnMe() {
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
                let dataid;
                if (event.dataTransfer === undefined) {
                    dataid = event.originalEvent.dataTransfer.getData('data');
                }
                else {
                    dataid = event.dataTransfer.getData('data');
                }
                scope.onDrop({ event: event, data: dataid });
            });
        }
    };
    return DDO;
}