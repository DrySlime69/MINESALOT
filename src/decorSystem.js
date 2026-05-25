export function placeDecor(scene, map, biome) {
  placeFloorPatches(scene, map);
  placeSporePools(scene, map);
  placeMacroFungus(scene, map);
  placeGlowCaps(scene, map);
  placeVinesNearWalls(scene, map);
}

function placeFloorPatches(scene, map) {
  for (let i = 0; i < 28; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;
    scene.add.image(tile.x * 32, tile.y * 32, "floor_moss_patch")
      .setOrigin(0.5)
      .setDepth(1)
      .setAlpha(Phaser.Math.FloatBetween(0.45, 0.8))
      .setScale(Phaser.Math.FloatBetween(0.75, 1.35))
      .setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));
  }
}

function placeSporePools(scene, map) {
  for (let i = 0; i < 7; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    const pool = scene.add.image(tile.x * 32, tile.y * 32, "spore_pool")
      .setOrigin(0.5)
      .setDepth(2)
      .setScale(Phaser.Math.FloatBetween(0.75, 1.25))
      .setAlpha(0.82);

    scene.add.image(tile.x * 32, tile.y * 32, "soft_green_glow")
      .setDepth(1.5)
      .setScale(Phaser.Math.FloatBetween(0.85, 1.4))
      .setAlpha(0.42);

    scene.tweens.add({
      targets: pool,
      alpha: 0.55,
      scaleX: pool.scaleX * 1.06,
      scaleY: pool.scaleY * 1.03,
      duration: Phaser.Math.Between(1200, 2300),
      yoyo: true,
      repeat: -1
    });
  }
}

function placeMacroFungus(scene, map) {
  for (let i = 0; i < 18; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    const garden = scene.add.image(tile.x * 32, tile.y * 32, "fungal_garden_large")
      .setOrigin(0.5, 0.78)
      .setScale(Phaser.Math.FloatBetween(0.55, 1.08))
      .setDepth(4);

    scene.add.image(tile.x * 32, tile.y * 32 - 20, "soft_green_glow")
      .setDepth(2)
      .setScale(Phaser.Math.FloatBetween(0.5, 1.0))
      .setAlpha(0.26);
  }

  for (let i = 0; i < 6; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;
    scene.add.image(tile.x * 32, tile.y * 32, "fungal_arch")
      .setOrigin(0.5, 0.85)
      .setScale(Phaser.Math.FloatBetween(0.75, 1.15))
      .setDepth(5);
  }
}

function placeGlowCaps(scene, map) {
  for (let i = 0; i < 45; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    const glow = scene.add.image(tile.x * 32, tile.y * 32, "spore_glowcap")
      .setOrigin(0.5, 0.82)
      .setScale(Phaser.Math.FloatBetween(0.55, 1.1))
      .setDepth(6);

    scene.tweens.add({
      targets: glow,
      alpha: 0.45,
      scale: glow.scale * 1.15,
      duration: Phaser.Math.Between(900, 1800),
      yoyo: true,
      repeat: -1
    });
  }
}

function placeVinesNearWalls(scene, map) {
  for (let i = 0; i < 28; i++) {
    const tile = randomWallAdjacentOpenTile(map);
    if (!tile) continue;
    scene.add.image(tile.x * 32, tile.y * 32 - 26, "hanging_vines")
      .setOrigin(0.5, 0)
      .setScale(Phaser.Math.FloatBetween(0.55, 1.1))
      .setAlpha(Phaser.Math.FloatBetween(0.55, 0.9))
      .setDepth(7);
  }
}

function randomOpenTile(map) {
  for (let attempts = 0; attempts < 500; attempts++) {
    const y = Phaser.Math.Between(4, map.length - 5);
    const x = Phaser.Math.Between(4, map[0].length - 5);
    if (map[y][x] === 0 && openAround(map, x, y, 1)) return { x, y };
  }
  return null;
}

function randomWallAdjacentOpenTile(map) {
  for (let attempts = 0; attempts < 500; attempts++) {
    const y = Phaser.Math.Between(3, map.length - 4);
    const x = Phaser.Math.Between(3, map[0].length - 4);
    if (map[y][x] === 0 && hasWallAbove(map, x, y)) return { x, y };
  }
  return null;
}

function openAround(map, x, y, r) {
  for (let yy = y - r; yy <= y + r; yy++) {
    for (let xx = x - r; xx <= x + r; xx++) {
      if (map[yy]?.[xx] !== 0) return false;
    }
  }
  return true;
}

function hasWallAbove(map, x, y) {
  return map[y - 1]?.[x] === 1 || map[y - 2]?.[x] === 1 || map[y - 1]?.[x - 1] === 1 || map[y - 1]?.[x + 1] === 1;
}
