const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setClearColor( 0x000000, 0 );
//renderer.setSize( document.querySelector(".container").offsetWidth, document.querySelector(".container").offsetHeight );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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

animate();