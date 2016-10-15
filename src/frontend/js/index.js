import Game from './game';
import Cube from './objects/cube';
import BB8 from './objects/BB8';


const game = new Game({
  container: document.body,
  sizes: {
    w: 700,
    h: 400,
  },
});

new Cube('./images/crate.jpg').load()
.then(cube => {
  game.scene.add(cube);

  return new BB8('./models/BB8/bb8.obj').load();
})
.then(bb8 => {
  game.scene.add(bb8);
});

game.render();
