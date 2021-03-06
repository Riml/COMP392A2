/// <reference path="_reference.ts"/>

// MAIN GAME FILE
/* Ilmir Taychinovs study project for Advanced Graphic course
centennial college W2016
last modified: Feb 26,2016
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
import RingGeometry =THREE.RingGeometry;
//import Particles= THREE.GPUParticle;

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
var rotationDirection: number;
var sphereGeometry: SphereGeometry;
var sphereMaterial: LambertMaterial;
var sunSurface: Mesh;
var planets: Object3D;
var sun: Object3D;
var sunRadius: number;
var planetSpeeds: Array<number>;
var cameras: Array<PerspectiveCamera>;
var currentCamera: PerspectiveCamera;
var textures: Array<Texture>;
var ambiLight: AmbientLight;
function init() {
    
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    cameras = new Array;//will change the camera LookAt between this objects
    setupCamera(); // setup the camera
    currentCamera = cameras[0];
    
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");

    textures = new Array;
    textures[0] = THREE.ImageUtils.loadTexture('Content/Textures/sun.png');
    textures[1] = THREE.ImageUtils.loadTexture('Content/Textures/brown.jpg');
    textures[2] = THREE.ImageUtils.loadTexture('Content/Textures/dark.png');
    textures[3] = THREE.ImageUtils.loadTexture('Content/Textures/ice.png');
    textures[4] = THREE.ImageUtils.loadTexture('Content/Textures/index.png');
    textures[5] = THREE.ImageUtils.loadTexture('Content/Textures/blue.jpg');
    console.log(textures[0]);  
    //add Sun with lights//check perfomance issues
    sun = new Object3D;

    sunRadius = 0.7;
    sphereGeometry = new SphereGeometry(sunRadius, 35, 35);
    sphereMaterial = new LambertMaterial({ color: 0xffFFff, map: textures[0] });
    sphereMaterial.emissive = new Color(0xEEAA00);
    //sphereMaterial.specular=new Color(0xff7800);
    //sphereMaterial.shininess=1;
    sunSurface = new Mesh(sphereGeometry, sphereMaterial);
    sunSurface.receiveShadow = false;
    sunSurface.castShadow = false;
    sunSurface.position.set(0, 0, 0);
    addSunLight(0, 0, 0, sun);
    sun.add(sunSurface);
    scene.add(sun);
    //AmbientLight
    ambiLight = new AmbientLight(0x111111);
    scene.add(ambiLight);
   
    
    // Add Planets to the scene with realted orbit speeds
    planetSpeeds = [0.02, 0.021, 0.022, 0.023];// values <0.05
    planets = new Object3D;
    addMoonedPlanet(2.5, 0, 2.5, 0.17, planets, sun, textures[4]);
    addMoonedPlanet(1, 0, 1, 0.15, planets, sun, textures[1]);
    addRingPlanet(1.5, 0, 1.5, 0.27, planets, sun, textures[3]);
    addPlanet(2, 0, 2, 0.10, planets, sun, textures[5]);
    scene.add(planets);
  
    // add controls
    gui = new GUI();
    control = new Control(true, cameras, 1);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
    
    //test particles
    
    
    
}

function addSunLight(x: number, z: number, y: number, attachTo: Object3D): void {

    var pointLight = new PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);
    pointLight.intensity = 2;
    pointLight.castShadow = true;
    //make shadows more neat and a bit brighter
    pointLight.shadowMapWidth = 1024;
    pointLight.shadowMapHeight = 1024;
    pointLight.shadowMapHeight = 1024;
    pointLight.shadowDarkness = 0.5;
    pointLight.shadowCameraFar = 1000;
    pointLight.shadowCameraNear = 0.1;
    console.log("light attached to the sun as number" + attachTo.children.length);
    attachTo.add(pointLight);
}

function addPlanet(x: number, y: number, z: number, r: number, attachTo: Object3D, center: Object3D, texture: Texture): void {
    sphereGeometry = new SphereGeometry(r, 20, 20);
    var sphericMaterial = new LambertMaterial({ color: 0xffFFff, map: texture });
    var thisPlanet: Mesh = new Mesh(sphereGeometry, sphericMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    var planetPivot: Object3D = new Object3D;
    planetPivot.add(thisPlanet)
    planetPivot.position = center.position;
    attachTo.add(planetPivot);

}

function addRingPlanet(x: number, y: number, z: number, r: number, attachTo: Object3D, center: Object3D, texture: Texture): void {
    sphereGeometry = new SphereGeometry(r, 20, 20);
    var sphericMaterial = new LambertMaterial({ color: 0xffFFff, map: texture });
    var thisPlanet: Mesh = new Mesh(sphereGeometry, sphericMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    var planetPivot: Object3D = new Object3D;
    planetPivot.add(thisPlanet)
    planetPivot.position = center.position;
    thisPlanet.add(new Object3D());
    
     //add camera 
    var ringCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    ringCamera.position.set(x + 1, y + 1, z + 1);
    ringCamera.lookAt(planetPivot.position);
    thisPlanet.add(ringCamera);
    
    //addRing
    var ringGeometry = new RingGeometry( r+0.05, r+0.10, 50 );
    var ringMaterial = new LambertMaterial( { color: 0xAAaaAA, side: THREE.DoubleSide , map:textures[2], transparent: true, opacity: 0.9} );
    var theRing = new THREE.Mesh( ringGeometry, ringMaterial );
    theRing.rotation.x=60 *Math.PI/180;
    theRing.rotation.y=5*Math.PI/180;
    theRing.rotation.z=5 *Math.PI/180;
    theRing.position.set(0,0,0);
    thisPlanet.add( theRing );
    //second ring    
    var ringGeometry = new RingGeometry( r+0.05, r+0.10, 50 );
    var ringMaterial = new LambertMaterial( { color: 0xAAaaAA, side: THREE.DoubleSide , map:textures[1],transparent: true, opacity: 0.9} );
    var theRing = new THREE.Mesh( ringGeometry, ringMaterial );
    theRing.rotation.x=60 *Math.PI/180;
    theRing.rotation.y=4.5*Math.PI/180;
    theRing.rotation.z=4.5 *Math.PI/180;
    theRing.position.set(0,0,0);
    thisPlanet.add( theRing );
  
   
    
    attachTo.add(planetPivot);
   
   
    cameras[cameras.length] = ringCamera;

   
}


function addMoonedPlanet(x: number, y: number, z: number, r: number, attachTo: Object3D, center: Object3D, texture: Texture ): void {
    sphereGeometry = new SphereGeometry(r, 20, 20);
    var sphereMaterial = new LambertMaterial({ color: 0xbabdab, map: texture });
    var thisPlanet: Mesh = new Mesh(sphereGeometry, sphereMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    var planetPivot: Object3D = new Object3D;
    planetPivot.add(thisPlanet)
    planetPivot.position = center.position;
    //add moon similiar to planet for sun 
    addPlanet(0.15, 0, 0.15, r/5, thisPlanet, thisPlanet, textures[2]);
    attachTo.add(planetPivot);
    //add camera 
    var moonedCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    moonedCamera.position.set(x + 1, y + 1, z + 1);
    moonedCamera.lookAt(planetPivot.position);
    thisPlanet.add(moonedCamera);
    cameras[cameras.length] = moonedCamera;


}


function onResize(): void {
    currentCamera.aspect = window.innerWidth / window.innerHeight;
    currentCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'helperAxis');
    gui.add(controlObject, 'ChangeCamera');
    gui.add(controlObject, 'zoom', 0, 5);


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

    if (!control.helperAxis)
        axes.traverse(function(object) { object.visible = false; });
    else
        axes.traverse(function(object) { object.visible = true; });
    for (var i = 0; i < planets.children.length; i++) {
        planets.children[i].rotation.y += planetSpeeds[i];//rotation around sun middle
        for (var j = 0; j < planets.children[i].children.length; j++) {
            planets.children[i].children[j].rotation.y += planetSpeeds[i];;//rotation around planet middle
            if(planets.children[i].children[j].children[0]!=null)
                planets.children[i].children[j].children[0].rotation.y += 0.035;//rotation around moon middle 
            if(planets.children[i].children[j].children[2]!=null)
                planets.children[i].children[j].children[2].rotation.z += 0.5;//rotation around moon middle
                 if(planets.children[i].children[j].children[3]!=null)
                planets.children[i].children[j].children[3].rotation.z += 0.5;//rotation around moon middle
           
        }
    }
    if (control.zoom != camera.zoom) {
        currentCamera.zoom = control.zoom;
        currentCamera.updateProjectionMatrix();
    }
   
   
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, currentCamera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x111211, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...")
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 4.7;
    camera.position.y = 12.47;//z
    camera.position.z = 12.9;//y axis in blender
    camera.lookAt(new Vector3(0, 0, 0));
    cameras[0] = camera;
    console.log("Finished setting up Camera...");
}
