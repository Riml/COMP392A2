/// <reference path="_reference.ts"/>

// MAIN GAME FILE
/* Ilmir Taychinovs study project for Advanced Graphic course
centennial college W2016
last modified: Feb 5,2016
*/
// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import Texture = THREE.Texture;
import PhongMaterial = THREE.MeshPhongMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import myScreenConf = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cubes: Array<Mesh>;
var plane: Mesh;
var sphere: Mesh;
var texture: Texture;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var rotationDirection :number;



function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    texture= THREE.ImageUtils.loadTexture('Content/Textures/wood.jpg');
   
   
    
    
    // Add Lights to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(14, 40, 12);
    spotLight.rotation.set(0,0,0);
    spotLight.intensity=2;
    spotLight.castShadow = true;
    //make shadows more neat and a bit brighter
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraFar=1000;
    spotLight.shadowCameraNear=0.1;
    scene.add(spotLight);
    
    ambientLight = new AmbientLight(0x949494);
    scene.add(ambientLight);
    console.log("Added a AmbientLight and SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control= new Control(0.001,0.00,"#badbad");
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}

function addBodyPart(x:number,z:number,y:number,h:number,d:number,w:number,z_rotation:number,attachTo:Object3D):void{
    /*cubeGeometry = new CubeGeometry(h*1.75,w*1.75,d*1.75);
    var thisCube:Mesh = new Mesh(cubeGeometry,cubeMaterial);
    thisCube.position.set(x,y,z);
    thisCube.rotation.z=-z_rotation /180 * Math.PI;
    thisCube.castShadow = true;
    thisCube.receiveShadow = true;
    attachTo.add(thisCube);
    */
 }

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'handRotationSpeed',-0.25,0.25);
    gui.add(controlObject, 'xRotationSpeed',-0.25,0.25);
    gui.add(controlObject, 'yRotationSpeed',-0.25,0.25);
    gui.add(controlObject, 'zRotationSpeed',-0.25,0.25);
    gui.addColor(controlObject, 'newColor');
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    
   /* cubeHand.rotation.z+=rotationDirection*control.handRotationSpeed;;
    if(Math.abs(cubeHand.rotation.z) > 45/180 * Math.PI){
       rotationDirection=-rotationDirection;
     }
    cubeMan.rotation.x+=control.xRotationSpeed;
    cubeMan.rotation.y+=control.yRotationSpeed;
    cubeMan.rotation.z+=control.zRotationSpeed;
    cubeMaterial.color.setStyle(control.newColor);
    */
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	// render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled=true;
    console.log("Finished setting up Renderer...")
}

// Setup main camera for the scene
function setupCamera(): void {
   // camera = new PerspectiveCamera(45, myScreenConf.ration, 0.1, 1000);
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 8.7;
    camera.position.y = 20.47;//z
    camera.position.z = 20.9;//y axis in blender
    camera.lookAt(new Vector3(0, 5, 0));
    console.log("Finished setting up Camera...");
}
