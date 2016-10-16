global.THREE = require('three');
require('../vendors/OBJLoader');


const objLoader = new THREE.OBJLoader();
const imageLoader = new THREE.ImageLoader();

// TODO: add reject handlers

export function loadImage(src) {
  return new Promise(resolve => {
    imageLoader.load(src, image => {
      resolve(image);
    });
  });
}


export function loadObject(src) {
  return new Promise(resolve => {
    objLoader.load(src, object => {
      resolve(object);
    });
  });
}
