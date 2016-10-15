global.THREE = require('three');


export default class Cube {
  constructor(src) {
    this.src = src;
  }

  load() {
    const BoxMaterial = new THREE.MeshPhongMaterial({
      // TODO: replace on async loader
      map: THREE.ImageUtils.loadTexture(this.src),
    });
    const BoxGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cube = new THREE.Mesh(BoxGeometry, BoxMaterial);
    cube.position.set(1, 1.6, 15);
    cube.castShadow = true;
    cube.receiveShadow = true;

    return Promise.resolve(cube);
  }
}
