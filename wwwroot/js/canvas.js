import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132/examples/jsm/controls/OrbitControls.js';

import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.132/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.132/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'https://cdn.jsdelivr.net/npm/three@0.132/examples/jsm/postprocessing/GlitchPass.js';

import { FilmPass } from 'https://cdn.jsdelivr.net/npm/three@0.132/examples/jsm/postprocessing/FilmPass.js';

let canvas = document.getElementById("canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight*2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight/2);
renderer.setPixelRatio(canvas.devicePixelRatio);
canvas.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;

//var keyboard = new THREEx.KeyboardState();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let composer, glitchPass, filmPass, outlinePass, effectFXAA;


//Create a PointLight and turn on shadows for the light
const light = new THREE.DirectionalLight(0xffffff, 1, 20);
light.position.set(10, 10, 0);
light.castShadow = true; // default false
scene.add(light);

light.shadow.mapSize.width = 128; // default
light.shadow.mapSize.height = 128; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


const geometry = new THREE.SphereGeometry(0.8, 32, 16);
const littleGeometry = new THREE.SphereGeometry(0.785, 64, 64);
const bigGeometry = new THREE.SphereGeometry(10, 16, 16);

const meshMaterial = new THREE.MeshNormalMaterial({ color: 0xaabcaa, emissive: 0xaabcaa, emissiveIntensity: 0.1});

const sphere = new THREE.Mesh(littleGeometry, meshMaterial);
sphere.receiveShadow = false;
sphere.castShadow = true;
scene.add(sphere);
sphere.name = "sphere";

const material = new THREE.LineBasicMaterial({
	color: 0x000000,
	linewidth: 1,
});


const wireframe = new THREE.WireframeGeometry(geometry);

const line = new THREE.LineSegments(wireframe, material);
line.material.depthTest = true;
line.material.opacity = 0.4;
line.material.transparent = true;
line.name = "sphereLine";

scene.add(line);

// Adds a plane to showcase sphere shadow.
const planeGeometry = new THREE.PlaneGeometry(200, 200, 8, 8);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcfd9df, transparent: true, opacity: 0.08 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
plane.name = "plane";


plane.rotation.x -= 1.55;
plane.rotation.y -= 5.8;
plane.position.y -= 1;

camera.position.x += 3;

sphere.position.y += 0.5;
sphere.rotation.x += 0.1;
sphere.rotation.z -= 0.2;

line.position.y += 0.5;
line.rotation.x += 0.1;
line.rotation.z -= 0.2;

composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));


glitchPass = new GlitchPass();
filmPass = new FilmPass();

function onPointerMove(event) {

	event.preventDefault();
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

var maxSize = 1.2;
var minSize = 1.0;

function sphereAnimation(object, child, upScale, speed) {
	if (upScale) {
		if (object.scale.x < maxSize) {
			object.scale.x += 0.02 * speed;
			object.scale.y += 0.02 * speed;
			object.scale.z += 0.02 * speed;

			child.scale.x += 0.02 * speed;
			child.scale.y += 0.02 * speed;
			child.scale.z += 0.02 * speed;
		}
	}
	else {
		if (object.scale.x > minSize) { 
			object.scale.x -= 0.02*speed;
			object.scale.y -= 0.02*speed;
			object.scale.z -= 0.02*speed;

			child.scale.x -= 0.02*speed;
			child.scale.y -= 0.02*speed;
			child.scale.z -= 0.02*speed;
		}
	}
}
var active = false;
function animate() {
	requestAnimationFrame(animate);

	raycaster.setFromCamera(mouse, camera);
	
	renderer.render(scene, camera);

	var intersects = raycaster.intersectObject(sphere, true);

	if (intersects.length > 0) {
		sphereAnimation(line, sphere, true, 2.0);
		if (!active) {
			composer.addPass(glitchPass);
			active = true;
        }
	} else {
		sphereAnimation(line, sphere, false, 2.0);
		if (active) {
			composer.removePass(glitchPass);
			active = false;
        }
	}

	controls.update();

	line.rotation.y -= 0.005;
	sphere.rotation.y -= 0.005;

	//renderer.render(scene, camera);
	composer.render();
};
animate();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight*2;
	camera.updateProjectionMatrix();


	renderer.setSize(window.innerWidth, window.innerHeight/2);
	setCanvasDimensions(renderer.domElement, window.innerWidth, window.innerheight/2);
	
}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('resize', onWindowResize, false);