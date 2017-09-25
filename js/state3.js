demo.state3 = function(){};
demo.state3.prototype = {
    
    preload: function() {
    },
    
    create: function() {
        
        game.stage.backgroundColor = '#7bbecd';
        newText(game, 100, 100, 'GAME OVER');
        newText(game, 200, 200, 'Press spacebar to restart');
        
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeState, null, null, 2);
        music = game.add.audio('music');
        music.play(); 
    },
    
    update: function() {
        // restart game
        if (space.isDown) {
            game.state.start(state1);
        }  
    };


function changeState(i, stateNum){
    game.state.start('state1');
}
