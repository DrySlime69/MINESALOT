export const BIOMES = {
  spore_grotto: {
    id: "spore_grotto",
    name: "Spore Grotto",
    min: 1,
    max: 10,
    floor: 0x24422a,
    floorAlt: 0x315631,
    wall: 0x182419,
    wallAlt: 0x263321,
    light: 0x79f06f,
    accent: 0x48d6be,
    danger: 0xff4f9a,
    oreWeights: { stone: 60, copper: 30, iron: 10 }
  }
};

export function getBiomeForLevel(level) {
  return BIOMES.spore_grotto;
}

export function clampMineLevel(level) {
  return Phaser.Math.Clamp(level, 1, 10);
}
