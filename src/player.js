export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "player").setDepth(10);
    this.sprite.setCollideWorldBounds(true);
    this.speed = 180;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D");
  }

  update() {
    const body = this.sprite.body;
    body.setVelocity(0);

    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const up = this.cursors.up.isDown || this.keys.W.isDown;
    const down = this.cursors.down.isDown || this.keys.S.isDown;

    if (left) body.setVelocityX(-this.speed);
    if (right) body.setVelocityX(this.speed);
    if (up) body.setVelocityY(-this.speed);
    if (down) body.setVelocityY(this.speed);

    body.velocity.normalize().scale(this.speed);
  }
}
