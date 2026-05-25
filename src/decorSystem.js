export function placeDecor(scene, map, biome) {
  for (let i = 0; i < 42; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    scene.add.image(tile.x * 32, tile.y * 32, "spore_mushroom_cluster")
      .setOrigin(0.5, 0.82)
      .setScale(Phaser.Math.FloatBetween(0.45, 0.95))
      .setAlpha(Phaser.Math.FloatBetween(0.75, 1))
      .setDepth(3);
  }

  for (let i = 0; i < 22; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    const glow = scene.add.image(tile.x * 32, tile.y * 32, "spore_glowcap")
      .setOrigin(0.5, 0.82)
      .setDepth(4);

    scene.tweens.add({
      targets: glow,
      alpha: 0.55,
      scale: 1.12,
      duration: Phaser.Math.Between(900, 1800),
      yoyo: true,
      repeat: -1
    });
  }
}

function randomOpenTile(map) {
  for (let attempts = 0; attempts < 400; attempts++) {
    const y = Phaser.Math.Between(3, map.length - 4);
    const x = Phaser.Math.Between(3, map[0].length - 4);
    if (map[y][x] === 0) return { x, y };
  }
  return null;
}
