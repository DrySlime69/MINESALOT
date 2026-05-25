export function addBiomeLighting(scene, biome) {
  scene.cameras.main.setBackgroundColor("#05070a");

  const overlay = scene.add.rectangle(0, 0, 10000, 10000, 0x000000, 0.28)
    .setOrigin(0)
    .setScrollFactor(0)
    .setDepth(20);

  scene.tweens.add({
    targets: overlay,
    alpha: 0.18,
    duration: 1800,
    yoyo: true,
    repeat: -1
  });

  for (let i = 0; i < 18; i++) {
    const x = Phaser.Math.Between(100, 2400);
    const y = Phaser.Math.Between(100, 1500);
    const glow = scene.add.circle(x, y, Phaser.Math.Between(40, 100), biome.light, 0.08)
      .setDepth(2);

    scene.tweens.add({
      targets: glow,
      alpha: 0.16,
      scale: 1.15,
      duration: Phaser.Math.Between(1200, 2400),
      yoyo: true,
      repeat: -1
    });
  }
}
