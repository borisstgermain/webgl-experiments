global.THREE = require('three');


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 500/300, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({ color: 0x555555 });
const cube = new THREE.Mesh(geometry, material);

renderer.setSize( 500, 300 );
document.body.appendChild(renderer.domElement);

scene.add(cube);

camera.position.z = 5;

let render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
};

render();