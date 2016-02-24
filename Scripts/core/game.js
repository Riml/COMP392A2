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
var planets;
var sun;
var sunRadius;
var planetSpeeds;
var cameras;
var moonedCamera;
var currentCamera;
var textures;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    cameras = new Array; //will change the camera LookAt between this objects
    setupCamera(); // setup the camera
    currentCamera = cameras[0];
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    textures = new Array;
    textures[0] = THREE.ImageUtils.loadTexture('Content/Textures/sun.jpg');
    //add Sun with lights//check perfomance issues
    sun = new Object3D;
    sunRadius = 0.7;
    sphereGeometry = new SphereGeometry(sunRadius, 25, 25);
    sphereMaterial = new PhongMaterial({ color: 0xff7800 });
    sphereMaterial.emissive = new Color(0xff7800);
    sphereMaterial.specular = new Color(0xff7800);
    sphereMaterial.shininess = 1;
    sunSurface = new Mesh(sphereGeometry, sphereMaterial);
    sunSurface.receiveShadow = false;
    sunSurface.castShadow = false;
    sunSurface.position.set(0, 0, 0);
    addSunLight(0, 0, 0, sun);
    sun.add(sunSurface);
    scene.add(sun);
    // Add Planets to the scene with realted orbit speeds
    planetSpeeds = [0.02, 0.021, 0.022, 0.023]; // values <0.05
    planets = new Object3D;
    addMoonedPlanet(2.5, 0, 2.5, 0.17, planets, sun);
    addPlanet(1, 0, 1, 0.17, planets, sun);
    addPlanet(1.5, 0, 1.5, 0.17, planets, sun);
    addPlanet(2, 0, 2, 0.17, planets, sun);
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
}
function addSunLight(x, z, y, attachTo) {
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
function addPlanet(x, y, z, r, attachTo, center) {
    sphereGeometry = new SphereGeometry(r, 20, 20);
    var sphericMaterial = new LambertMaterial({ color: 0xffFFff });
    var thisPlanet = new Mesh(sphereGeometry, sphericMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    var planetPivot = new Object3D;
    planetPivot.add(thisPlanet);
    planetPivot.position = center.position;
    attachTo.add(planetPivot);
}
function addMoonedPlanet(x, y, z, r, attachTo, center) {
    sphereGeometry = new SphereGeometry(r, 20, 20);
    sphereMaterial = new PhongMaterial({ color: 0xbabdab });
    var thisPlanet = new Mesh(sphereGeometry, sphereMaterial);
    thisPlanet.position.set(x, y, z);
    thisPlanet.castShadow = true;
    thisPlanet.receiveShadow = true;
    var planetPivot = new Object3D;
    planetPivot.add(thisPlanet);
    planetPivot.position = center.position;
    //add moon similiar to planet for sun 
    addPlanet(0.2, 0, 0.2, 0.07, thisPlanet, thisPlanet);
    attachTo.add(planetPivot);
    //add camera 
    moonedCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    moonedCamera.position.set(x + 1, y + 1, z + 1);
    moonedCamera.lookAt(planetPivot.position);
    thisPlanet.add(moonedCamera);
    cameras[1] = moonedCamera;
}
function onResize() {
    currentCamera.aspect = window.innerWidth / window.innerHeight;
    currentCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'helperAxis');
    gui.add(controlObject, 'changeSubject');
    gui.add(controlObject, 'perspective', 0, 5);
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
    if (control.helperAxis)
        axes.traverse(function (object) { object.visible = false; });
    else
        axes.traverse(function (object) { object.visible = true; });
    for (var i = 0; i < planets.children.length; i++) {
        planets.children[i].rotation.y += planetSpeeds[i];
        for (var j = 0; j < planets.children[i].children.length; j++) {
            if (planets.children[i].children != null)
                planets.children[i].children[j].rotation.y += 0.035;
        }
    }
    if (control.perspective != camera.zoom) {
        currentCamera.zoom = control.perspective;
        currentCamera.updateProjectionMatrix();
    }
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, currentCamera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x555555, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 4.7;
    camera.position.y = 12.47; //z
    camera.position.z = 12.9; //y axis in blender
    camera.lookAt(new Vector3(0, 0, 0));
    cameras[0] = camera;
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map