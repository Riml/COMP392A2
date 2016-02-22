/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public helperAxis:boolean;
        public xRotationSpeed:number;
        public yRotationSpeed:number;
        public zRotationSpeed:number;
        public newColor:string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(helperAxis:boolean,startAxisRotation:number,color:string) {
            this.helperAxis = helperAxis;
            this.xRotationSpeed = startAxisRotation;
            this.yRotationSpeed = startAxisRotation;
            this.zRotationSpeed = startAxisRotation;
            this.newColor = color;
        }
       //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
