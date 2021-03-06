import { GameObjects, Physics } from 'phaser'

export default class Pipe extends GameObjects.Sprite implements FlappyPipe {
  private pipes: FlappyPipes
  private bird: Physics.Arcade.Sprite
  private score: FlappyScore
  private frameNum: number
  private addedScore: boolean
  
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    
    this.pipes = scene.pipes
    this.bird  = scene.bird
    // 初始设置所以前面都要有
    this.score = scene.labelScore
    // 0(上管道) or 1(下管道)
    this.frameNum = frame
    
    if (frame === 0) {
      this.addedScore = false
    }
  }

  preUpdate() {
    let x = this.x
    
    // 单个pipe图片的宽度为54, 出边界后, 管道复位操作
    if (x < -54) {
      this.pipes.handlePipeOut(this, this.frameNum)
      this.addedScore = false
    
    // 仅判断上管道
    // 由于origin均为0.5 鸟的位置 - 17(鸟宽度一半) - 28(管道宽度一半) > 0 
    } else if (!this.addedScore && this.frameNum == 0 && x + 28 + 17 < this.bird.x) {
      this.score.addScore()
      this.addedScore = true
    }
  }

  public setSpeed() {
    let pipeBody = <Phaser.Physics.Arcade.Body>this.body
    pipeBody.setVelocityX(-100)
  }

  public stop() {
    let pipeBody = <Phaser.Physics.Arcade.Body>this.body
    pipeBody.setVelocityX(0)
    this.setActive(false)
  }
}