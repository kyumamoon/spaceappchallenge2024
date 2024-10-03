import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CMESH from './scripts/helpers/custom_meshes.js';
import * as CMATH from './scripts/helpers/custom_math.js';

// New Scene
const scene = new THREE.Scene();

// New Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

// Add renderer element to HTML document
const main_element = document.getElementById('main_center_div');
main_element.appendChild(renderer.domElement);

// Stiff Camera
/*const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 300);
camera.lookAt(0, 0, 0);*/

// Orbital Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.position.z = 500;
const controls = new OrbitControls(camera, renderer.domElement);

// Planet Speed Variables
const speeds = {
    mercury:1,
    venus:1,
    earth:1,
    mars:1,
    jupiter:1,
    saturn:1,
    uranus:1,
    neptune:1,
    moon:1,
};
const speedsMap = new Map(Object.entries(speeds));

// Add Debug Grid
const grid = new CMESH.Grid(0,0.2,scene);
grid.rotateX(90);

// Form Listener
document.getElementById('parameters_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    //const data = {};
    formData.forEach((value, key) => {
        speedsMap.set(key,value);
    });
    console.log("set",speedsMap.get('mercury')); // Debug Submission
});

// Select the button using its ID
document.getElementById('reset_button').addEventListener('click',function() {
    for (let [key, value] of speedsMap) {
        speedsMap.set('mercury', 1);
        console.log("reset",speedsMap.get('mercury'));
    }
});

// SpaceObject Class
// Name, Mass, Size(radius), Color, Initial_Angle (radians), Keplerian_Parameters[0,0,0,0,0]
// Add Objects
const sunSize = 2000;
const sun = new CMESH.SpaceObject("sun",100,100, 0xFFD800, 0,[0,0,0,0,0]);
sun.setPosition([CMATH.auMeter(0), 0, 0]);
scene.add(sun.mesh);

const mercury = new CMESH.SpaceObject("mercury",10,sunSize*0.0035, 0x6E6E6E, 0,[CMATH.auMeter(0.39)*0.333,0.20563593,0,0,0]);
mercury.setPosition([CMATH.auMeter(0.39), 0, 0]);
scene.add(mercury.mesh);

const venus = new CMESH.SpaceObject("venus",10,sunSize*0.0087, 0xD3D3D3, 0,[CMATH.auMeter(0.72)*0.333,0.00677672,0,0,0]);
venus.setPosition([CMATH.auMeter(0.72), 0, 0]);
scene.add(venus.mesh);

const earth = new CMESH.SpaceObject("earth",10,sunSize*0.0091, 0x1E90FF, 0,[CMATH.auMeter(1)*0.333,0.01671123,0,0,0]);
earth.setPosition([CMATH.auMeter(1), 0, 0]);
scene.add(earth.mesh);

const moon = new CMESH.SpaceObject("moon",5,5, 0x999999, 10,[10,0,0,0,0]);
scene.add(moon.mesh);

const mars = new CMESH.SpaceObject("mars",10,sunSize*0.0049, 0xB22222, 0,[CMATH.auMeter(1.52)*0.333,0.09339410,0,0,0]);
mars.setPosition([CMATH.auMeter(1.52), 0, 0]);
scene.add(mars.mesh);

const jupiter = new CMESH.SpaceObject("jupiter",10,sunSize*0.1004, 0xD2B48C, 0,[CMATH.auMeter(5.2)*0.333,0.04838624,0,0,0]);
jupiter.setPosition([CMATH.auMeter(5.20), 0, 0]);
scene.add(jupiter.mesh);

const saturn = new CMESH.SpaceObject("saturn",10,sunSize*0.0836, 0xF4A460, 0,[CMATH.auMeter(9.54)*0.333,0.05386179,0,0,0]);
saturn.setPosition([CMATH.auMeter(9.54), 0, 0]);
scene.add(saturn.mesh);

const uranus = new CMESH.SpaceObject("uranus",10,sunSize*0.0364, 0x00CED1, 0,[CMATH.auMeter(19.22)*0.333,0.04725744,0,0,0]);
uranus.setPosition([CMATH.auMeter(19.22), 0, 0]);
scene.add(uranus.mesh);

const neptune = new CMESH.SpaceObject("neptune",10,sunSize*0.0354, 0x682B4, 0,[CMATH.auMeter(30.06)*0.333,0.00859048,0,0,0]);
neptune.setPosition([CMATH.auMeter(30.06), 0, 0]);
scene.add(neptune.mesh);

// Floating Sign
const imagesPath = ['public/assets/images/mercury_label.png',
    'public/assets/images/venus_label.png',
    'public/assets/images/earth_label.png',
    'public/assets/images/mars_label.png',
    'public/assets/images/jupiter_label.png',
    'public/assets/images/saturn_label.png',
    'public/assets/images/uranus_label.png',
    'public/assets/images/neptune_label.png',
];

const labels = [];

for (const path of imagesPath) {
    const geometry = new THREE.PlaneGeometry(200, 50); // Adjust size as needed
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(path);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true, // Enable transparency
        opacity: 1, // Adjust opacity as needed 
        });
    const plane = new THREE.Mesh(geometry, material);
    labels.push(plane);
    scene.add(plane);
}

function animateLabels() {
    labels[0].position.x = mercury.position.x;
    labels[0].position.y = mercury.position.y+30;
    labels[0].lookAt(camera.position);

    labels[1].position.x = venus.position.x;
    labels[1].position.y = venus.position.y+30;
    labels[1].lookAt(camera.position);

    labels[2].position.x = earth.position.x;
    labels[2].position.y = earth.position.y+30;
    labels[2].lookAt(camera.position);

    labels[3].position.x = mars.position.x;
    labels[3].position.y = mars.position.y+30;
    labels[3].lookAt(camera.position);

    labels[4].position.x = jupiter.position.x;
    labels[4].position.y = jupiter.position.y+260;
    labels[4].lookAt(camera.position);

    labels[5].position.x = saturn.position.x;
    labels[5].position.y = saturn.position.y+260;
    labels[5].lookAt(camera.position);

    labels[6].position.x = uranus.position.x;
    labels[6].position.y = uranus.position.y+100;
    labels[6].lookAt(camera.position);

    labels[7].position.x = neptune.position.x;
    labels[7].position.y = neptune.position.y+100;
    labels[7].lookAt(camera.position);
}

// Three.js Animate Function
function animate(time) {
    CMATH.orbitPlanet(mercury,sun,speedsMap.get('mercury'));
    console.log(speedsMap.get('mercury'));
    CMATH.orbitPlanet(venus,sun,(speedsMap.get('mercury')*0.74)*speedsMap.get('venus'));
    CMATH.orbitPlanet(earth,sun,(speedsMap.get('mercury')*0.63)*speedsMap.get('earth'));
    CMATH.orbitPlanet(mars,sun,(speedsMap.get('mercury')*0.51)*speedsMap.get('mars'));
    CMATH.orbitPlanet(jupiter,sun,(speedsMap.get('mercury')*0.28)*speedsMap.get('jupiter'));
    CMATH.orbitPlanet(saturn,sun,(speedsMap.get('mercury')*0.2)*speedsMap.get('saturn'));
    CMATH.orbitPlanet(uranus,sun,(speedsMap.get('mercury')*0.14)*speedsMap.get('uranus'));
    CMATH.orbitPlanet(neptune,sun,(speedsMap.get('mercury')*0.14)*speedsMap.get('neptune'));

    CMATH.orbitPlanet(moon,earth,speedsMap.get('mercury'));

    animateLabels();
    controls.update();
    renderer.render(scene, camera);
}

// Call Renderer
renderer.setAnimationLoop(animate);