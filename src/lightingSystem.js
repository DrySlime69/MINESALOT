export function addBiomeLighting(scene, biome) {
  scene.cameras.main.setBackgroundColor("#030706");

  const fog = scene.add.rectangle(0, 0, 10000, 10000, 0x07130b, 0.30)
    .setOrigin(0)
    .setScrollFactor(0)
    .setDepth(30);

  scene.tweens.add({
    targets: fog,
    alpha: 0.22,
    duration: 2200,
    yoyo: true,
    repeat: -1
  });

  for (let i = 0; i < 34; i++) {
    const x = Phaser.Math.Between(80, 2480);
    const y = Phaser.Math.Between(80, 1540);
    const glow = scene.add.image(x, y, "soft_green_glow")
      .setDepth(2)
      .setScale(Phaser.Math.FloatBetween(0.45, 1.25))
      .setAlpha(Phaser.Math.FloatBetween(0.12, 0.32));

    scene.tweens.add({
      targets: glow,
      alpha: glow.alpha * 1.6,
      scale: glow.scale * 1.15,
      duration: Phaser.Math.Between(1400, 3200),
      yoyo: true,
      repeat: -1
    });
  }

  addFloatingSpores(scene);
}

function addFloatingSpores(scene) {
  for (let i = 0; i < 95; i++) {
    const spore = scene.add.circle(
      Phaser.Math.Between(0, 2560),
      Phaser.Math.Between(0, 1600),
      Phaser.Math.FloatBetween(1.2, 3.2),
      Phaser.Display.Color.GetColor(145, 255, 190),
      Phaser.Math.FloatBetween(0.18, 0.55)
    ).setDepth(31);

    scene.tweens.add({
      targets: spore,
      x: spore.x + Phaser.Math.Between(-45, 45),
      y: spore.y + Phaser.Math.Between(-70, -20),
      alpha: Phaser.Math.FloatBetween(0.05, 0.25),
      duration: Phaser.Math.Between(2600, 6200),
      yoyo: true,
      repeat: -1
    });
  }
}
