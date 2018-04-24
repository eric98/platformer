var level1 = {
  preload: function () {
    console.log('PRELOAD')

    game.load.image('wall','assets/wall.png')
    game.load.image('ground','assets/ground.png')
  },
  create: function () {
    console.log('create')
  },
  upload: function () {
    // console.log('upload')
  },
  render: function () {
    // console.log('render')
  },
  loadLevel(){
    game.add.sprite(90,200/2-50,'wall')
    game.add.sprite(390,200/2-50,'wall')
    game.add.sprite(500/2-160,200/2+30,'ground')
  }
}

var game = new Phaser.Game(500,200,Phaser.AUTO,'game')

game.state.add('level1',level1)
game.state.start('level1')