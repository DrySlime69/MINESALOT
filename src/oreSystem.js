const ORE_KEYS = {
  stone: "ore_stone",
  copper: "ore_copper",
  iron: "ore_iron",
  obsidian: "ore_obsidian",
  gold: "ore_gold",
  ebony: "ore_ebony"
};

export function placeOreChunks(scene, map, biome) {
  const keys = weightedOreList(biome.oreWeights);
  const chunks = 8;

  for (let i = 0; i < chunks; i++) {
    const tile = randomOpenTile(map);
    if (!tile) continue;

    const ore = keys[Math.floor(Math.random() * keys.length)];
    const sprite = scene.add.image(tile.x * 32, tile.y * 32, ORE_KEYS[ore])
      .setOrigin(0.5, 0.7)
      .setDepth(4);

    sprite.setData("oreType", ore);
  }
}

function weightedOreList(weights) {
  const list = [];
  for (const [key, value] of Object.entries(weights)) {
    for (let i = 0; i < value; i++) list.push(key);
  }
  return list;
}

function randomOpenTile(map) {
  for (let attempts = 0; attempts < 500; attempts++) {
    const y = Phaser.Math.Between(2, map.length - 3);
    const x = Phaser.Math.Between(2, map[0].length - 3);
    if (map[y][x] === 0) return { x, y };
  }
  return null;
}
