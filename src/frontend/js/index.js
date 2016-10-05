global.THREE = require('three');
require('./vendors/OrbitControls');


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 700 / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
/* eslint no-unused-vars: 0 */
const controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(700, 400);
renderer.setClearColor(0xdddddd);
document.body.appendChild(renderer.domElement);

/* set camera parameters */

camera.position.x = 15;
camera.position.y = 12;
camera.position.z = 10;
camera.lookAt(scene.position);

/* create light */

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(10, 10, 15);
spotLight.castShadow = true;
scene.add(spotLight);

/*  create ground  */

const GroundGeometry = new THREE.BoxGeometry(15, 0.1, 15);
const GroundMaterial = new THREE.MeshPhongMaterial({
  color: 0xa0adaf,
  shininess: 150,
  specular: 0xffffff,
  shading: THREE.SmoothShading,
});

const ground = new THREE.Mesh(GroundGeometry, GroundMaterial);
ground.scale.multiplyScalar(3);
ground.castShadow = false;
ground.receiveShadow = true;
scene.add(ground);

/* create box */

const crateImage = require('../images/crate.jpg');
const BoxMaterial = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture(crateImage),
});
const BoxGeometry = new THREE.BoxGeometry(3, 3, 3);

const cube = new THREE.Mesh(BoxGeometry, BoxMaterial);
cube.position.set(1, 1.6, 15);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);


function render() {
  requestAnimationFrame(render);

  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
}

render();
