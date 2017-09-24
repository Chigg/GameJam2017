//This is the core game area
var scoreText;
var score = 0;
var platforms;
var player;


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
        
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        
        
<<<<<<< HEAD
        
=======
>>>>>>> 43eb8f86bbfdb26253e3d86f5e72d6e3aca42992
//        scoreText = game.add.text(16, 16, 'score: 0',                 {fontSize: '32px', fill: '#dabbed'});
        
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
    }  
};
