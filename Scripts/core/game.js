/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/* Ilmir Taychinovs study project for Advanced Graphic course
centennial college W2016
last modified: Feb 5,2016
*/
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Texture = THREE.Texture;
var PhongMaterial = THREE.MeshPhongMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var myScreenConf = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cubes;
var plane;
var sphere;
var texture;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var rotationDirection;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    texture = THREE.ImageUtils.loadTexture('Content/Textures/wood.jpg');
    // Add Lights to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(14, 40, 12);
    spotLight.rotation.set(0, 0, 0);
    spotLight.intensity = 2;
    spotLight.castShadow = true;
    //make shadows more neat and a bit brighter
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraFar = 1000;
    spotLight.shadowCameraNear = 0.1;
    scene.add(spotLight);
    ambientLight = new AmbientLight(0x949494);
    scene.add(ambientLight);
    console.log("Added a AmbientLight and SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.001, 0.00, "#badbad");
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function addBodyPart(x, z, y, h, d, w, z_rotation, attachTo) {
    /*cubeGeometry = new CubeGeometry(h*1.75,w*1.75,d*1.75);
    var thisCube:Mesh = new Mesh(cubeGeometry,cubeMaterial);
    thisCube.position.set(x,y,z);
    thisCube.rotation.z=-z_rotation /180 * Math.PI;
    thisCube.castShadow = true;
    thisCube.receiveShadow = true;
    attachTo.add(thisCube);
    */
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'handRotationSpeed', -0.25, 0.25);
    gui.add(controlObject, 'xRotationSpeed', -0.25, 0.25);
    gui.add(controlObject, 'yRotationSpeed', -0.25, 0.25);
    gui.add(controlObject, 'zRotationSpeed', -0.25, 0.25);
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
function gameLoop() {
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
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    // camera = new PerspectiveCamera(45, myScreenConf.ration, 0.1, 1000);
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 8.7;
    camera.position.y = 20.47; //z
    camera.position.z = 20.9; //y axis in blender
    camera.lookAt(new Vector3(0, 5, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map