import MapInit from "./InitMapScene.js";
import PlayerInit from "./InitPlayerScene.js";
import BombScene from "./BombScene.js";
import ItemPickUpScene from "./ItemPickUpScene.js";


var InitMap = new MapInit();
var InitPlayer = new PlayerInit();
var InitBombScene = new BombScene();
var InitItemPickUp = new ItemPickUpScene();

export default class MainScene extends Phaser.Scene {

	constructor() {
		super('MainScene');
	}

    preload() {
        this.load.spritesheet('player_f', 'bomberman_assets/SpriteSheets/Bomberman/bomberman_front.png', { frameWidth: 64, frameHeight: 64 });
    }

	create() {
        //INIT VARIABLES
        var _backgroundTiles = this.physics.add.staticGroup();
        var _solidBlocks = this.physics.add.staticGroup();
        var _expBlocks = this.physics.add.staticGroup();
        var _bombs = this.physics.add.staticGroup();
        var _items = this.physics.add.staticGroup();

        var _player = {
            playerName: "TestUser",
            playerSprite: this.physics.add.sprite(24, 48, "player_f"),
            playerLives: 3,
            playerBombRadius: 1,
            playerSpeedPlus: 160,
            playerSpeedMinus: -160,
            playerBombCount: 1,
            dead: false
        }

        var _cursors = this.input.keyboard.createCursorKeys();
        var _spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //INIT SCENES
        this.scene.add("MapInit", InitMap, true, {
            backgroundTiles: _backgroundTiles,
            solidBlocks: _solidBlocks,
            expBlocks: _expBlocks       
        });

        this.scene.add("PlayerInit", InitPlayer, true, {
            player: _player,
            cursors: _cursors,
            spacebar: _spacebar,
            items: _items
        });

        this.scene.add("BombInit", InitBombScene, true, {
            solidBlocks: _solidBlocks,
            expBlocks: _expBlocks,
            bombs: _bombs,
            player: _player,
            spacebar: _spacebar,
            items: _items      
        });

        this.scene.add("ItemPickUp", InitItemPickUp, true, {
            player: _player,
            items: _items      
        });



        //ADD PHYSICS
        this.physics.add.collider(_player.playerSprite, _solidBlocks);
        this.physics.add.collider(_player.playerSprite, _expBlocks);
        this.physics.add.collider(_player.playerSprite, _bombs);


	}
}