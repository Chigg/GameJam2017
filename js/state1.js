var demo = {};
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.image('startscreen','assets/game_start_screen.jpg')
    },
    create: function(){
        game.stage.backgroundColor = '#7bbecd';
        background = game.add.tileSprite(0, 0, 600, 400, 'startscreen')
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeState, null, null, 2);
    },
    update: function(){}    
};

function changeState(i, stateNum){
    game.state.start('state' + stateNum);
}
