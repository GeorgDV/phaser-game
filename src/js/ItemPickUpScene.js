export default class ItemPickUpScene extends Phaser.Scene {

    constructor() {
        super('ItemPickUp');
    }

    init(data) {
        //INIT DATA FROM MAINSCENE
        this.player = data.player;
        this.items = data.items;
    }

    preload() {

    }

    create() {

    }

    update() {
        //CHECK PLAYER AND ITEM COLLISION
        this.items.children.entries.forEach(item => {
            if (item.getBounds().contains(this.player.playerSprite.x, this.player.playerSprite.y)) {
                item.destroy();

                //APPLY POWERUP
                this.ApplyPowerUp(this.player, item.texture.key);
            }
        });
    }

    ApplyPowerUp(player, key) {
        switch (key) {
            case "flame_powerup":
                if (this.player.playerBombRadius <= 12)
                    this.player.playerBombRadius++;
                break;
            case "bomb_powerup":
                if (this.player.playerBombCount <= 10)
                    this.player.playerBombCount++;
                break;
            case "speed_powerup":
                this.player.playerSpeedPlus += this.player.playerSpeedPlus * 0.1;
                this.player.playerSpeedMinus += this.player.playerSpeedMinus * 0.1;
                break;
            default:
                power = undefined;
                break;
        }
    }

}