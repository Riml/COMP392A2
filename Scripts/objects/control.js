/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(helperAxis, cameras, zoom) {
            this.currentSubject = 0;
            this.helperAxis = helperAxis;
            this.cameras = cameras;
            this.zoom = zoom;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.ChangeCamera = function () {
            this.currentSubject++;
            if (this.currentSubject == this.cameras.length) {
                this.currentSubject = 0;
            }
            currentCamera = cameras[this.currentSubject];
            console.log("switch to camera " + this.currentSubject);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
