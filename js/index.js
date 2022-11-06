const canvas = document.querySelector(".container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
renderer.setPixelRatio(canvas.devicePixelRatio);
canvas.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const wireframe = new THREE.WireframeGeometry( geometry );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

scene.add( line );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    renderer.render( scene, camera );
};

function onWindowResize(){
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
}

window.addEventListener( 'resize', onWindowResize, false );
animate();