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
var control;
var gui;
var stats;
var step = 0;
var rotationDirection;
var sphereGeometry;
var sphereMaterial;
var sunSurface;
var galaxy;
var sun;
var sunRadius;
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
    sunRadius = 0.5;
    sphereGeometry = new SphereGeometry(sunRadius, 25, 25);
    sphereMaterial = new LambertMaterial({ color: 0xbadbad });
    sunSurface = new Mesh(sphereGeometry, sphereMaterial);
    sunSurface.receiveShadow = false;
    sunSurface.castShadow = false;
    addSunLight(0, 0, 1, sun);
    addSunLight(0, 0, -1, sun);
    addSunLight(0, 1, 0, sun);
    addSunLight(0, -1, 0, sun);
    addSunLight(1, 0, 0, sun);
    addSunLight(-1, 0, 0, sun);
    sun.add(sunSurface);
    // Add Lights to the scene
    galaxy.add(sun);
    addPlanet(-2.06, -1.87, 1.29, 0.17, galaxy);
    addPlanet(0.20, 1.9, -1.20, 0.17, galaxy);
    addPlanet(-0.2, 1.4, 3.45, 0.17, galaxy);
    addPlanet(-2.82, -1.20, -1.37, 0.17, galaxy);
    scene.add(galaxy);
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
function addSunLight(x, z, y, attachTo) {
    var spotLight = new SpotLight(0xffffff);
    spotLight.position.set(x * sunRadius * 2 + 0.1, y * sunRadius * 2 + 0.1, z * sunRadius * 2 + 0.1);
    spotLight.intensity = 2;
    spotLight.castShadow = true;
    //make shadows more neat and a bit brighter
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraFar = 1000;
    spotLight.shadowCameraNear = 0.1;
    console.log("light attached to the sun as number" + attachTo.children.length);
    attachTo.add(spotLight);
}
function addPlanet(x, z, y, r, attachTo) {
    sphereGeometry = new SphereGeometry(r);
    var thisPlanet = new Mesh(sphereGeometry, sphereMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    attachTo.add(thisPlanet);
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
     galaxy.rotation.x+=control.xRotationSpeed;
     cubeMan.rotation.y+=control.yRotationSpeed;
     cubeMan.rotation.z+=control.zRotationSpeed;
     cubeMaterial.color.setStyle(control.newColor);
     */
    galaxy.rotation.y += control.yRotationSpeed;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x555555, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    // camera = new PerspectiveCamera(45, myScreenConf.ration, 0.1, 1000);
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 4.7;
    camera.position.y = 12.47; //z
    camera.position.z = 12.9; //y axis in blender
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map