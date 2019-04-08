angular
    .module('scheduler.module')
    .directive('dragMe', dragMe)
    .directive('dropOnMe', dropOnMe);

dragMe.$inject = [];

function dragMe() {
    var DDO = {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function (event) {
                if (event.target.attributes['drag-me']) {
                    let dragmeattribute = event.target.attributes['drag-me'].value;
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
            element.on('dragover', function (event) {
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