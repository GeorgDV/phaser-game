export default class MapInit extends Phaser.Scene {

	constructor() {
		super('MapInit');
	}

    init(data) {
        //INI DATA FROM MAINSCENE
        this.backgroundTiles = data.backgroundTiles;
        this.solidBlocks = data.solidBlocks;
        this.expBlocks = data.expBlocks;
    }

	preload() {
        this.load.image('background_tile', 'bomberman_assets/Sprites/Blocks/BackgroundTile.png');
        this.load.image('exp_block', 'bomberman_assets/Sprites/Blocks/ExplodableBlock.png');
        this.load.image('sol_block', 'bomberman_assets/Sprites/Blocks/SolidBlock.png');
	}

	create() {
        var game_data = '[{"id":0,"name":"Classic 2-player","map_data":[[2,2,0,0,0,0,0,0,0,0,0,0,0],[2,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,2],[0,0,0,0,0,0,0,0,0,0,0,2,2]]},{"id":1,"name":"Classic 4-player","map_data":[[2,2,0,0,0,0,0,0,0,0,0,2,2],[2,1,0,1,0,1,0,1,0,1,0,1,2],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[2,1,0,1,0,1,0,1,0,1,0,1,2],[2,2,0,0,0,0,0,0,0,0,0,2,2]]}]';
        var json_data = JSON.parse(game_data);
        
        //TRYING TO USE LOCAL FILE
        //var json = require(['./maps_data.js']);
        //console.log(json);

        let half_tile = 32;
        let tile_x = 1 * half_tile;
        let tile_y = 1 * half_tile;
        let map = json_data[1].map_data;

        for (let x = 0; x < 13; x++) {
            for (let y = 0; y < 13; y++) {            
                this.backgroundTiles.create(tile_x, tile_y, 'background_tile');
                //this.add.image(tile_x, tile_y, 'background_tile');
                var randSolid = Math.round(Math.random() * 30);
                if ((map[x][y] == 1 || randSolid == 1) &&
                    map[x][y] != 2) {
                    this.solidBlocks.create(tile_x, tile_y, "sol_block");
                    //this.add.image(tile_x, tile_y, 'sol_block');
                }
                else if (map[x][y] == 0){
                    this.expBlocks.create(tile_x, tile_y, "exp_block");
                    //this.add.image(tile_x, tile_y, 'exp_block');
                }
                tile_x += 2 * half_tile;
            }
            tile_x = 1 * half_tile;
            tile_y += 2 * half_tile;
        }

	}

}