//This is the core game area
var scoreText;
var score = 0;
var player;
var bullets;
var fireRate = 100;
var nextFire = 0;
var meleeSound;
var healthpoints = 100;
var trees;
var tree;
var look_left = false;
var baddies;
var enemyspeed = 0.9;
var baddiesHP = 25;
var attackTimer = 0;
var attackButton;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Chef.png', 50, 62);
        game.load.spritesheet('baddie', 'assets/Carrot.png', 50, 50);
        game.load.image('bullet', 'assets/pan.png', 25, 25);
        game.load.audio('melee_sound', 'assets/audio/melee_sound.mp3');
        game.load.image('tree', 'assets/tree.png', 50, 100);
        
    },
    
    create: function(){
        background = game.add.tileSprite(0, 0, 1920, 1920, 'grass');
        game.world.setBounds(0, 0, 1920, 1920);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        baddies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;
        
        //animations  
        //player animations
        player.animations.add('right', [0,1,2,3,4,5,6], 13, true);
        player.animations.add('left', [7,8,9,10,11,12,13], 13, true);
        
        player.frame = 0;
        player.animations.add('meleeRight', [14,15,16], 0, false);
        player.animations.add('meleeLeft', [17,18,19], 0, false);

        
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
        
        // enemy spawns and behavior
        baddies = game.add.group();
        baddies.enableBody = true;
        
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);
        
        for (var i = 0; i < 16; i++)
            {
                //the i at the end randomizes the animation they spawn in with
                var baddie = baddies.create(game.world.randomX, game.world.randomY, 'baddie', i);
            }
        
        //baddie animations
        baddie.animations.add('bRight',[5,6,7], 16, true);
        baddie.animations.add('bLeft',[8,9,10], 16, true);
        baddie.animations.add('meleeRight', [0,1,2], false);
        baddie.animations.add('meleeLeft', [13,14,15], false);
        
    //this is where we establish projectiles
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;      
        bullets.createMultiple(50, 'bullet')
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        trees = game.add.group();
        
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);
        
        for (var i = 0; i < 20; i++)
            {
                
                tree = game.add.sprite(game.world.centerX * xCoord, game.world.centerY * yCoord, 'tree');
                xCoord = Math.random(0, xCoord + 100)
                yCoord = Math.random(0, yCoord + 100)
            }
        
        w=game.input.keyboard.addKey(Phaser.Keyboard.W);
        a=game.input.keyboard.addKey(Phaser.Keyboard.A);
        s=game.input.keyboard.addKey(Phaser.Keyboard.S);
        d=game.input.keyboard.addKey(Phaser.Keyboard.D);
        spawning = true;
        
            
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    
    
    
    update: function(){
        
        //intended to continously spawn enemies every 4 seconds by calling the spawnEnemy() function
        //at the moment once it starts spawning enemies it doesn't stop, so it crashes
//        
//        if (spawning = true)
//        {
//            game.time.events.add(Phaser.Timer.SECOND * 4, spawnEnemy, this);
//            spawning = false;
//        }
//        
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player,baddies,resetGame);
        
        if (w.isDown || a.isDown || s.isDown || d.isDown)
        {
            baddies.forEach(move);
            
            if (d.isDown){
                player.x += 4;
                player.animations.play('right');
                look_left = false;
            }
            
            if (a.isDown){
                player.x -= 4;
                player.animations.play('left');
                look_left = true;
            }
            
            if (s.isDown){
                player.y += 4;
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}
            }
            
            if (w.isDown){
                player.y -= 4;
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}

            }
            if (attackButton.isDown && game.time.now > attackTimer)
                {
                    attackTimer = game.time.now + 300;
                    if (look_left){
                        player.animations.play('meleeLeft');
                        meleeSound.play()
                    }
                    else {
                        player.animations.play('meleeRight');
                        meleeSound.play()
                    }
                    
                }
        }
        else
        {
            player.animations.stop(null, true)
            baddies.setAll('body.velocity.x',0);
            baddies.setAll('body.velocity.y',0);
            
        }
    }
};

//        if (game.input.activePointer.isDown)
//        {
//            fire();
//        }

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
function move(baddie){
    game.physics.arcade.moveToObject(baddie,player,60,enemyspeed*1000);
    baddie.animations.play("bRight");
}
function resetGame(){
    //once a carrot touches a player, it'll activate resetGame() function.
    //We should make a state 3 which is essentially the same as state1, only with a title screen that says "Game Over. (newline) Hit spacebar to continue."
    //that will take the player to state1, this giving them the option to play again.
}

function meleeLeft(){
    player.animations.play('meleeLeft');
    meleeSound.play()
}
function meleeRight(){
    player.animations.play('meleeRight')
    meleeSound.play()
}

function spawnEnemy() {
    
    for (var i = 0; i < Math.random(0,1); i++)
            {
                var baddie = baddies.create(game.world.randomX, game.world.randomY, 'baddie');
            }
    spawning = false;
    
}
