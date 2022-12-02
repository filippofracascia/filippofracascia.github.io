import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.LineBasicMaterial({
	color: 0x000000,
	linewidth: 1,
});

const wireframe = new THREE.WireframeGeometry(geometry);

const line = new THREE.LineSegments(wireframe, material);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

scene.add(line);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	line.rotation.x -= 0.0002;
	line.rotation.y -= 0.01;

	renderer.render(scene, camera);
};
animate();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);