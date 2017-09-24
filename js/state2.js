//This is the core game area
var scoreText;
var score = 0;
var player;
var bullets;
var fireRate = 100;
var nextFire = 0;


demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Carrot.png', 50, 50);
        
    },
    create: function(){
        background = game.add.tileSprite(0, 0, 1920, 1920, 'grass');
        game.world.setBounds(0, 0, 1920, 1920);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        
//        scoreText = game.add.text(16, 16, 'score: 0',                 {fontSize: '32px', fill: '#dabbed'});
        
        //this is where we establish projectiles
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        bullets.createMultiple(50, 'bullet')
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -250;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 250;
        }
        else 
        {
            player.body.velocity.y = 0;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -250;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 250;
        }
        
        if (game.input.activePointer.isDown)
        {
            fire();
        }
    }
};

function fire(){
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        
        var bullet = bullets.getFirstDead();
        
        bullet.reset(player.x - 0, player.y - 0);
    
        game.physics.arcade.moveToPointer(bullet, 300);
    }
}

function render(){
    
    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
}
