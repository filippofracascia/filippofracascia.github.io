const canvas = document.querySelector(".container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
renderer.setPixelRatio(canvas.devicePixelRatio);
canvas.appendChild( renderer.domElement );

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeWireframe = new THREE.WireframeGeometry( cubeGeometry );
const cube = new THREE.Mesh( cubeGeometry );

const sphereGeometry = new THREE.SphereGeometry( 0.8, 16, 16 );
const sphereWireframe = new THREE.WireframeGeometry( sphereGeometry );
const sphere = new THREE.Mesh( sphereGeometry );

const coneGeometry = new THREE.ConeGeometry( 0.7, 1.4, 16 );
const coneWireframe = new THREE.WireframeGeometry( coneGeometry );
const cone = new THREE.Mesh( coneGeometry );

const cubeLine = new THREE.LineSegments( cubeWireframe );
cubeLine.material.depthTest = false;
cubeLine.material.opacity = 0.3;
cubeLine.material.transparent = true;

const sphereLine = new THREE.LineSegments( sphereWireframe );
sphereLine.material.depthTest = false;
sphereLine.material.opacity = 0.2;
sphereLine.material.transparent = true;

const coneLine = new THREE.LineSegments( coneWireframe );
coneLine.material.depthTest = false;
coneLine.material.opacity = 0.2;
coneLine.material.transparent = true;

scene.add( cubeLine );
scene.add( sphereLine );
scene.add( coneLine );

camera.position.z = 5;

cubeLine.position.x = -2.5;
sphereLine.position.x = 0;
sphereLine.position.y = 2;
coneLine.position.x = 2.5;
coneLine.position.y = -1;


function animate() {
    requestAnimationFrame( animate );

    cubeLine.rotation.x -= 0.05;
    cubeLine.rotation.y += 0.001;

    sphereLine.rotation.x -= 0.001;
    sphereLine.rotation.y -= 0.01;

    coneLine.rotation.y += 0.01;

    renderer.render( scene, camera );
};

function onWindowResize(){
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
}

window.addEventListener( 'resize', onWindowResize, false );
animate();