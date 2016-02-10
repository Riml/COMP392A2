/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(startHandRotation, startAxisRotation, color) {
            this.handRotationSpeed = startHandRotation;
            this.xRotationSpeed = startAxisRotation;
            this.yRotationSpeed = startAxisRotation;
            this.zRotationSpeed = startAxisRotation;
            this.newColor = color;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map