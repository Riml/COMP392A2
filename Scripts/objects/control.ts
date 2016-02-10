/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public handRotationSpeed:number;
        public xRotationSpeed:number;
        public yRotationSpeed:number;
        public zRotationSpeed:number;
        public newColor:string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(startHandRotation:number,startAxisRotation:number,color:string) {
            this.handRotationSpeed = startHandRotation;
            this.xRotationSpeed = startAxisRotation;
            this.yRotationSpeed = startAxisRotation;
            this.zRotationSpeed = startAxisRotation;
            this.newColor = color;
        }
       //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
