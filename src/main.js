import MainScene from './js/MainScene.js';


// Load our scenes
var InitMainScene = new MainScene();





//* Game scene */
var config = {
    type: Phaser.AUTO,
    width: 830,
    height: 830,
    physics: {
        default: 'arcade'
    },
    scene: [
        InitMainScene
    ]
};
var game = new Phaser.Game(config);

/*
// load scenes
game.scene.add('MapInit', InitMap, true);
game.scene.add('PlayerInit', InitPlayer, true);
*/
