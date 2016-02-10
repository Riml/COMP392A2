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
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var rotationDirection :number;
var sphereGeometry : SphereGeometry;
var sphereMaterial : LambertMaterial;
var sunSurface : Mesh;
var galaxy: Object3D;
var sun : Object3D;
var sunRadius:number;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    //scene.add(axes);
    console.log("Added Axis Helper to scene...");
   // texture= THREE.ImageUtils.loadTexture('Content/Textures/wood.jpg');
    
    //add Sun with lights
    galaxy = new Object3D;
    sun = new Object3D;
    
    sunRadius=0.5;
    sphereGeometry = new SphereGeometry(sunRadius,25,25);
    sphereMaterial= new LambertMaterial({color:0xbadbad});
    sunSurface= new Mesh(sphereGeometry,sphereMaterial);
    sunSurface.receiveShadow=false;
    sunSurface.castShadow=false;
    
    addSunLight(0,0,1,sun);
    addSunLight(0,0,-1,sun);
    addSunLight(0,1,0,sun);
    addSunLight(0,-1,0,sun);
    addSunLight(1,0,0,sun);
    addSunLight(-1,0,0,sun);
    
    sun.add(sunSurface);
   
    scene.add(sun);
     // Add Lights to the scene
    
    
    
    addPlanet(-2.06,-1.87,1.29,0.17,galaxy);
    addPlanet(0.20,1.9,-1.20,0.17,galaxy);
    addPlanet(-0.2,1.4,3.45,0.17,galaxy);
    addPlanet(-2.82,-1.20,-1.37,0.17,galaxy);
   
    scene.add(galaxy);
  
    
    
   
    
    
   
   
    
   
    
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
function addSunLight(x:number,z:number,y:number,attachTo:Object3D):void{
    var spotLight = new SpotLight(0xffffff);
    spotLight.position.set(x*sunRadius*2+0.1, y*sunRadius*2+0.1, z*sunRadius*2+0.1);
    spotLight.intensity=2;
    spotLight.castShadow = true;
    //make shadows more neat and a bit brighter
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraFar=1000;
    spotLight.shadowCameraNear=0.1;
    console.log("light attached to the sun as number"+attachTo.children.length);
    attachTo.add(spotLight);
}

function addPlanet(x:number,z:number,y:number,r:number,attachTo:Object3D):void{
    sphereGeometry = new SphereGeometry(r);
    var thisPlanet:Mesh = new Mesh(sphereGeometry,sphereMaterial);
    thisPlanet.position.set(x,y,z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    attachTo.add(thisPlanet);
    
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
    galaxy.rotation.x+=control.xRotationSpeed;
    cubeMan.rotation.y+=control.yRotationSpeed;
    cubeMan.rotation.z+=control.zRotationSpeed;
    cubeMaterial.color.setStyle(control.newColor);
    */
    
    for(var i:number=0; i<galaxy.children.length; i++)
    {
        galaxy.children[i].rotation.y+=control.yRotationSpeed;
    }
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	// render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x555555, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled=true;
    console.log("Finished setting up Renderer...")
}

// Setup main camera for the scene
function setupCamera(): void {
   // camera = new PerspectiveCamera(45, myScreenConf.ration, 0.1, 1000);
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 4.7;
    camera.position.y = 12.47;//z
    camera.position.z = 12.9;//y axis in blender
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
