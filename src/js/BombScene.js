export default class BombScene extends Phaser.Scene {

    constructor() {
        super('BombInit');
    }


    init(data) {
        //INIT DATA FROM MAINSCENE
        this.solidBlocks = data.solidBlocks;
        this.expBlocks = data.expBlocks;
        this.bombs = data.bombs;

        this.player = data.player;

        this.spacebar = data.spacebar;

        this.items = data.items;
    }

    preload() {
        this.load.image('bomb', 'bomberman_assets/Sprites/Bomb/Bomb_f01.png');
        this.load.image('explosion_0', 'bomberman_assets/Sprites/Flame/Flame_f00.png');
        this.load.image('explosion_1', 'bomberman_assets/Sprites/Flame/Flame_f01.png');
        this.load.image('explosion_2', 'bomberman_assets/Sprites/Flame/Flame_f02.png');
        this.load.image('explosion_3', 'bomberman_assets/Sprites/Flame/Flame_f03.png');
        this.load.image('explosion_4', 'bomberman_assets/Sprites/Flame/Flame_f04.png');

        this.load.image('bomb_powerup', 'bomberman_assets/Sprites/Powerups/BombPowerup.png');
        this.load.image('flame_powerup', 'bomberman_assets/Sprites/Powerups/FlamePowerup.png');
        this.load.image('speed_powerup', 'bomberman_assets/Sprites/Powerups/SpeedPowerup.png');
    }

    create() {

    }

    update() {
        //CHECK BOMB SPAWN INPUT
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) &&
            this.bombs.countActive() < this.player.playerBombCount &&
            this.player.dead == false) {
            //BOMB CODE GOES HERE...
            //BOMB PLACE
            let bomb_xp = Math.round((this.player.playerSprite.x - 16) / 64);
            let bomb_yp = Math.round((this.player.playerSprite.y - 16) / 64);

            let last_bomb = this.bombs.create(bomb_xp * 64 + 32, bomb_yp * 64 + 32, "bomb");

            //BOMB EXPLODE
            setTimeout(() => {

                let start_bomb_xp = bomb_xp;
                let start_bomb_yp = bomb_yp;
                let explosions = [];
                let minusXBlocked = false;
                let plusXBlocked = false;
                let minusYBlocked = false;
                let plusYBlocked = false;

                this.bombs.remove(last_bomb, true);
                
                //ADD EXPLOSION IN PLACED BOMB TILE AND CHECK IF PLAYER GETS HIT WITH IT
                let startExplosion = this.add.sprite(start_bomb_xp * 64 + 32, start_bomb_yp * 64 + 32, "explosion_1");
                explosions.push(startExplosion);
                this.CheckPlayerHit(this.player, startExplosion);

                //ADD EXPLOSIONS IN 4 DIFFERENT DIRECTIONS AND CHECK IF PLAYER GETS HIT WITH ANY OF THEM
                                                                                //     0
                for (let dir = 0; dir < 4; dir++) {                             //   3   1
                    for (var i = 0; i < this.player.playerBombRadius; i++) {    //     2
                        switch (dir) {
                            case 0:
                                if (minusYBlocked == false) {
                                    bomb_yp--;
                                }
                                break;
                            case 1:
                                if (plusXBlocked == false) {
                                    bomb_xp++;
                                }
                                break;
                            case 2:
                                if (plusYBlocked == false) {
                                    bomb_yp++;
                                }
                                break;
                            case 3:
                                if (minusXBlocked == false) {
                                    bomb_xp--;
                                }
                                break;
                            default:
                                break;
                        }

                        let randExplosionSelector = Math.round(Math.random() * 4);
                        let explosion = this.add.sprite(bomb_xp * 64 + 32, bomb_yp * 64 + 32, "explosion_" + randExplosionSelector);

                        //CHECK IF EXPLOSION HITS SOLIDWALL
                        this.solidBlocks.children.entries.forEach(block => {
                            if (block.getBounds().contains(explosion.x, explosion.y)) {
                                explosion.destroy();
                                if (start_bomb_xp < bomb_xp) plusXBlocked = true;
                                else if (start_bomb_xp > bomb_xp) minusXBlocked = true;
                                else if (start_bomb_yp < bomb_yp) plusYBlocked = true;
                                else if (start_bomb_yp > bomb_yp) minusYBlocked = true;
                            }
                        });
                        if (explosion != undefined) explosions.push(explosion);

                        //EXPLOSION DESTROYS EXPLODING BLOCKS
                        this.expBlocks.children.entries.forEach(block => {
                            if (block.getBounds().contains(explosion.x, explosion.y)) {
                                block.destroy()
                                if (start_bomb_xp < bomb_xp) plusXBlocked = true;
                                else if (start_bomb_xp > bomb_xp) minusXBlocked = true;
                                else if (start_bomb_yp < bomb_yp) plusYBlocked = true;
                                else if (start_bomb_yp > bomb_yp) minusYBlocked = true;

                                //INIT ITEM
                                this.SpawnItem(block, this.items);
                            }
                        });


                        //CHECK IF PLAYER GETS HIT
                        this.CheckPlayerHit(this.player, explosion);

                    }

                    bomb_xp = start_bomb_xp;
                    bomb_yp = start_bomb_yp;
                }

                setTimeout(() => {
                    explosions.forEach(function (explosion) {
                        //REMOVE EXPLOSION
                        explosion.destroy();
                    });
                    explosions = [];
                }, 350);

            }, 3000);
        }
    }


    //LOCALLY USED METHODS
    SpawnItem(block, items) {
        let random = Math.round(Math.random() * 12);
        if(random == 1) items.create(block.x, block.y,"bomb_powerup");
        else if (random == 6) items.create(block.x, block.y,"flame_powerup");
        else if (random == 12) items.create(block.x, block.y,"speed_powerup");
    }

    CheckPlayerHit(player, explosion) {

        var outputLabel = document.querySelector("#outputLabel");

        //CHECK IF PLAYER GETS HIT WITH EXPLOSION
        if (player.playerSprite.getBounds().contains(explosion.x, explosion.y)) {
            player.playerLives--;

            //PLAY DEATH ANIMATION
            if (player.playerLives == 0) {
                //this.player.playerSprite.setActive(false).setVisible(false);
                player.playerSprite.destroy();
                player.dead = true;

                outputLabel.innerHTML = player.playerName + " got killed by a bomb.";
                setTimeout(() => {
                    outputLabel.innerHTML = "";
                }, 2000);
            }

            //PLAY HIT ANIMATION
            else {
                outputLabel.innerHTML = player.playerName + " got hit by a bomb.";
                setTimeout(() => {
                    outputLabel.innerHTML = "";
                }, 2000);

                setTimeout(() => {
                    player.playerSprite.setVisible(false);
                    setTimeout(() => {
                        player.playerSprite.setVisible(true);
                    }, 275);
                }, 275);
            }
        }
    }



}