var level1 = {
  preload: function () {
    game.time.advancedTiming = true
    game.load.image('wall','assets/wall.png')
    game.load.image('ground','assets/ground.png')
    game.load.image('coin','assets/coin.png')

    game.load.spritesheet('player','assets/player.png', 28, 22)

    game.load.audio('coin', ['assets/coin.wav','assets/coin.mp3'])
  },
  create: function () {
    this.cursor = game.input.keyboard.createCursorKeys()

    this.coinSound = game.add.audio('coin',0.1)

    this.loadLevel()

    this.player = game.add.sprite(250,50,'player')

    game.physics.arcade.enable(this.player)

    this.player.body.gravity.y = 600
    this.player.animations.add('idle',[3,4,5,4],5,true)
  },
  update: function () {
    game.physics.arcade.collide(this.player,this.level)
    game.physics.arcade.overlap(this.player,this.coins, this.takeCoin, null, this)

    this.inputs()

    this.player.animations.play('idle')
  },
  render: function () {
    game.debug.text('FPS: '+game.time.fps || 'FPS: --',40,40,"#00ff00")
  },
  takeCoin(a,b) {
    b.body.enable = false

    game.add.tween(b.scale).to({x:0},150).start()
    game.add.tween(b).to({y:50},150).start()

    this.coinSound.play()

  },
  loadLevel(){
    this.level = game.add.group()
    this.level.enableBody = true

    game.add.sprite(90,200/2-50,'wall',0,this.level)
    game.add.sprite(390,200/2-50,'wall',0,this.level)
    game.add.sprite(500/2-160,200/2+30,'ground',0,this.level)
    this.level.setAll('body.immovable',true)

    this.addcoins()
  },
  addcoins: function () {
    this.coins = game.add.group()
    this.coins.enableBody = true

    game.add.sprite(140,110,'coin',0,this.coins)
    game.add.sprite(170,110,'coin',0,this.coins)
    game.add.sprite(200,110,'coin',0,this.coins)
  },
  inputs: function () {
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200
      this.player.frame = 2
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200
      this.player.frame = 1
    } else {
      this.player.body.velocity.x = 0
    }

    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -200
    }
  }
}

var game = new Phaser.Game(500,200,Phaser.AUTO,'game')

game.state.add('level1',level1)
game.state.start('level1')