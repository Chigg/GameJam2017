//This is the core game area
var scoreText;
var score = 0;
var player;
var bullets;
var fireRate = 100;
var nextFire = 0;
var meleeSound;
var healthpoints;
var trees;
var tree;
var look_left = false;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Chef.png', 50, 62);
        game.load.spritesheet('baddie', 'assets/Carrot.png', 50, 62);
        game.load.image('bullet', 'assets/pan.png', 25, 25);
        game.load.audio('melee_sound', 'assets/audio/melee_sound.mp3');
        game.load.image('tree', 'assets/tree.png', 50, 100);
        
    },
    create: function(){
        background = game.add.tileSprite(0, 0, 1920, 1920, 'grass');
        game.world.setBounds(0, 0, 1920, 1920);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;
        
        //the starting frame
        
        
        //animations
        player.animations.add('right', [0,1,2,3,4,5,6], 13, true);
        player.animations.add('left', [7,8,9,10,11,12,13], 13, true);
        //player.health = 100;
        player.frame = 0;
        player.animations.add('meleeRight', [14,15,16], 0, true);
        player.animations.add('meleeLeft', [17,18,19], 0, true);
        
        //audio
        meleeSound = game.add.audio('melee_sound');
        
        //physics
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        
        //scoreText = game.add.text(16, 16, 'score: 0',                 {fontSize: '32px', fill: '#dabbed'});
        
        //this is for stats. A simple HUD
        //healthpoints = game.add.text(game.world.centerX, game.world.centerY, 'Health: ' + player.health +'%', {font: '20px Arial', fill: '#fff'});

        
    //this is where we establish projectiles
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        bullets.createMultiple(50, 'bullet')
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        //trees
        trees = game.add.group();
        
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);
        
        for (var i = 0; i < 20; i++)
            {
                
                tree = game.add.sprite(game.world.centerX * xCoord, game.world.centerY * yCoord, 'tree');
                xCoord = Math.random(0, xCoord + 100)
                yCoord = Math.random(0, yCoord + 100)
            }
        
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){

        player.body.velocity.x = 0;
        
        
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -250;
            player.animations.play('left');
            look_left = true;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 250;
            player.animations.play('right');
            look_left = false;
        }
        else 
        {
            player.body.velocity.y = 0;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -250;
            
            if(look_left){player.animations.play('left');}
            
            else{player.animations.play('right');}
            
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 250;
            if(look_left){player.animations.play('left');}
            else{player.animations.play('right');}
        }
        if(player.body.velocity.x == 0 && player.body.velocity.y == 0)
        {
            player.animations.stop(null, true)
        }
        if ((Phaser.Keyboard.SPACEBAR).isDown)
            {
                if (look_left){
                    player.animations.play('meleeLeft');
                    meleeSound.play()
                }
                else {
                    player.animations.play('meleeRight');
                    meleeSound.play()
                }
            }
        
//        if (game.input.activePointer.isDown)
//        {
//            fire();
//        }
    }
};
//
//function fire(){
//    
//    if(game.time.now > nextFire && bullets.countDead() > 0)
//    {
//        nextFire = game.time.now + fireRate;
//        
//        var bullet = bullets.getFirstDead();
//        
//        //initial firing position. Right now it is centered on player.
//        bullet.reset(player.x, player.y);
//    
//        game.physics.arcade.moveToPointer(bullet, 300);
//    }
//}

function meleeLeft(){
    player.animations.play('meleeLeft');
    meleeSound.play()
}
function meleeRight(){
    player.animations.play('meleeRight')
    meleeSound.play()
}
