export default class PlayerInit extends Phaser.Scene {

        constructor(data) {
                super('PlayerInit');
        }

        init(data) {
                //INIT DATA FROM MAINSCENE
                this.player = data.player;

                this.cursors = data.cursors;
                this.spacebar = data.spacebar;
                this.items = data.items;
        }

        preload() {
                this.load.spritesheet('player_f', 'bomberman_assets/SpriteSheets/Bomberman/bomberman_front.png', { frameWidth: 64, frameHeight: 64 });
                this.load.spritesheet('player_sr', 'bomberman_assets/SpriteSheets/Bomberman/bomberman_side_right.png', { frameWidth: 64, frameHeight: 64 });
                this.load.spritesheet('player_sl', 'bomberman_assets/SpriteSheets/Bomberman/bomberman_side_left.png', { frameWidth: 64, frameHeight: 64 });
                this.load.spritesheet('player_b', 'bomberman_assets/SpriteSheets/Bomberman/bomberman_back.png', { frameWidth: 64, frameHeight: 64 });
        }

        create() {
                this.player.playerSprite.setCollideWorldBounds(true);
                this.player.playerSprite.body.setSize(40, 54, 16, 0);
                this.player.playerSprite.setDepth(1);

                //THIS ONLY WORKS WHEN USED IN MainScene, FOLLOW THIS SCHEMA IF ENCOUNTER SIMILAR PROBLEMS...
                //this.physics.add.collider(this.playerSprite, this.solidBlocks);
                //this.physics.add.collider(this.playerSprite, this.expBlocks);
                //this.physics.add.collider(this.playerSprite, this.bombs);



                //INIT PLAYER MOVEMENT ANIMATIONS
                this.anims.create({
                        key: "left",
                        frames:
                                this.anims.generateFrameNumbers("player_sl"),
                        frameRate: 10,
                        repeat: -1
                });

                this.anims.create({
                        key: "right",
                        frames:
                                this.anims.generateFrameNumbers("player_sr"),
                        frameRate: 10,
                        repeat: -1
                });

                this.anims.create({
                        key: "up",
                        frames:
                                this.anims.generateFrameNumbers("player_b"),
                        frameRate: 10,
                        repeat: -1
                });

                this.anims.create({
                        key: "down",
                        frames:
                                this.anims.generateFrameNumbers("player_f"),
                        frameRate: 10,
                        repeat: -1
                });

                this.anims.create({
                        key: 'stop',
                        frames: [{ key: 'player_f', frame: 1 }],
                        frameRate: 20
                });
        }

        update() {
                //CHECK MOVEMENT INPUT
                if (this.player.dead == false) {
                        if (this.cursors.left.isDown) {
                                this.player.playerSprite.setVelocityX(this.player.playerSpeedMinus);
        
                                this.player.playerSprite.anims.play('left', true);
                        }
                        else if (this.cursors.right.isDown) {
                                this.player.playerSprite.setVelocityX(this.player.playerSpeedPlus);
        
                                this.player.playerSprite.anims.play('right', true);
                        }
                        else if (this.cursors.up.isDown) {
                                this.player.playerSprite.setVelocityY(this.player.playerSpeedMinus);
        
                                this.player.playerSprite.anims.play('up', true);
                        }
                        else if (this.cursors.down.isDown) {
                                this.player.playerSprite.setVelocityY(this.player.playerSpeedPlus);
        
                                this.player.playerSprite.anims.play('down', true);
                        }
                        else {
                                this.player.playerSprite.setVelocityX(0);
                                this.player.playerSprite.setVelocityY(0);
        
                                this.player.playerSprite.anims.play('stop');
                        }
                }
        }
}