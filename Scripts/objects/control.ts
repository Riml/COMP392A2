/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public helperAxis:boolean;
        public cameras: Array<PerspectiveCamera>;
        public zoom:number;
        private currentSubject:number=0;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(helperAxis:boolean,cameras: Array<PerspectiveCamera>,zoom:number) {
            this.helperAxis = helperAxis;
            this.cameras = cameras;
            this.zoom = zoom;
           
        }
       //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       public ChangeCamera():void {
           this.currentSubject++;
           if(this.currentSubject==this.cameras.length)
           {
            this.currentSubject=0;   
           }
         currentCamera = cameras[this.currentSubject];
         console.log("switch to camera " + this.currentSubject);
       }
       
    }
}
