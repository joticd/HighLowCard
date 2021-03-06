import 'phaser';
import config from './config/config';
import BootScene from './scenes/boot-scene';
import PreloaderScene from './scenes/preloader-scene';
import GameScene from './scenes/game-scene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
