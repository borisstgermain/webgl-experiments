global.THREE = require('three');

import { loadObject, loadImage } from '../utils/loaders';


export default class BB8 {
  constructor(src) {
    this.src = src;
    this.headTexture = new THREE.Texture();
    this.bodyTexture = new THREE.Texture();
  }


  load() {
    return loadObject(this.src)
    .then(object => {
      this.object = object;
      this.object.scale.x = 0.05;
      this.object.scale.y = 0.05;
      this.object.scale.z = 0.05;

      const meshes = [];

      object.traverse(child => {
        if (child instanceof THREE.Mesh) {
          meshes.push(child);
        }
      });

      this.head = meshes[0];
      this.body = meshes[1];

      return loadImage('./models/BB8/HEAD_diff_MAP.jpg');
    })
    .then(image => {
      this.headTexture.image = image;
      this.headTexture.needsUpdate = true;

      return loadImage('./models/BB8/Body_diff_MAP.jpg');
    })
    .then(image => {
      this.bodyTexture.image = image;
      this.bodyTexture.needsUpdate = true;
    })
    .then(() => {
      const bumpMapBody = new THREE.TextureLoader()
        .load('./models/BB8/BODYbumpMAP.jpg');
      const bumpMapHead = new THREE.TextureLoader()
        .load('./models/BB8/HEAD_bump_MAP.jpg');

      this.head.material = new THREE.MeshPhongMaterial({
        map: this.headTexture,
        specular: 0xffffff,
        bump: bumpMapHead,
        bumpScale: 1,
      });
      this.body.material = new THREE.MeshPhongMaterial({
        map: this.bodyTexture,
        specular: 0xffffff,
        bumpMap: bumpMapBody,
        bumpScale: 1,
      });

      return this.object;
    });
  }
}
