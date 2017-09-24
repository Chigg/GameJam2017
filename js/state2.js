
var scoreText;
var score = 0;
var platforms;


demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Carrot.png', 400, 100);
        
    },
    create: function(){
        background = game.add.tileSprite(0, 0, 600, 400, 'grass')
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(400 / 2, 300 / 2, 'player')
        game.physics.arcade.enable(player);
        
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        
//        scoreText = game.add.text(16, 16, 'score: 0',                 {fontSize: '32px', fill: '#dabbed'});
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        if (cursors.left.isDown)
        {
                player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown)
        {
                player.body.velocity.x = 150;
        }
        
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
        }
        else if (cursors.down.isDown)
        {
                player.body.velocity.y = 150;
        }
    }

    
};
