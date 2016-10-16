global.THREE = require('three');
require('./vendors/OrbitControls');


export default class Game {
  constructor({ container, sizes }) {
    this.init({ container, sizes });
    this.setCamera();
    this.setLight();
    this.setGround();
  }


  init({ container, sizes }) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    /* eslint no-unused-vars: 0 */
    this.controls = new THREE.OrbitControls(
      this.camera, this.renderer.domElement
    );
    this.renderer.setSize(sizes.w, sizes.h);
    this.renderer.setClearColor(0xdddddd);

    container.appendChild(this.renderer.domElement);
  }


  setCamera() {
    this.camera.position.x = 15;
    this.camera.position.y = 12;
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);
  }


  setLight() {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 10, 15);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
  }


  setGround() {
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

    this.scene.add(ground);
  }


  render() {
    /* eslint react/jsx-no-bind: 0 */
    requestAnimationFrame(this.render.bind(this));

    this.renderer.render(this.scene, this.camera);
  }
}
