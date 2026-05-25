export function createGeneratedTextures(scene) {
  createPlayer(scene);
  createStairs(scene);
  createTile(scene, "floor_tile", 0x24422a, 0x426f3e, 0x173018);
  createTile(scene, "wall_tile", 0x182419, 0x2d3d28, 0x0c120d);

  createOre(scene, "ore_stone", 0x8c8c8c);
  createOre(scene, "ore_copper", 0xb66a35);
  createOre(scene, "ore_iron", 0x82b9e8);

  createMushroomCluster(scene, "spore_mushroom_cluster");
  createGlowCap(scene, "spore_glowcap");
}

function createTile(scene, key, base, highlight, shadow) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(base, 1).fillRect(0, 0, 32, 32);

  g.fillStyle(shadow, 0.4);
  for (let i = 0; i < 5; i++) {
    g.fillCircle(Math.random() * 32, Math.random() * 32, 5 + Math.random() * 9);
  }

  g.fillStyle(highlight, 0.45);
  for (let i = 0; i < 12; i++) {
    g.fillCircle(Math.random() * 32, Math.random() * 32, 1 + Math.random() * 2);
  }

  g.lineStyle(1, 0x000000, 0.12);
  g.strokeRect(0, 0, 32, 32);
  g.generateTexture(key, 32, 32);
  g.destroy();
}

function createOre(scene, key, color) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 96, 96);
  g.fillStyle(0x050805, 0.55).fillEllipse(48, 72, 78, 24);

  for (let i = 0; i < 8; i++) {
    const x = 20 + Math.random() * 52;
    const y = 22 + Math.random() * 38;
    const s = 13 + Math.random() * 16;
    g.fillStyle(color, 1).fillRoundedRect(x, y, s, s, 3);
    g.fillStyle(0xffffff, 0.35).fillTriangle(x + 2, y + 2, x + s - 2, y + 2, x + 2, y + s - 2);
    g.lineStyle(2, 0x111111, 0.45).strokeRoundedRect(x, y, s, s, 3);
  }

  g.generateTexture(key, 96, 96);
  g.destroy();
}

function createMushroomCluster(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 128, 128);
  g.fillStyle(0x061006, 0.45).fillEllipse(64, 98, 100, 32);

  const caps = [0xf04d6a, 0xff9c3a, 0x35d6c6, 0x8be84c, 0x9d60ff];

  for (let i = 0; i < 18; i++) {
    const x = 16 + Math.random() * 96;
    const y = 40 + Math.random() * 55;
    const h = 16 + Math.random() * 18;
    const w = 12 + Math.random() * 18;
    const color = caps[Math.floor(Math.random() * caps.length)];

    g.fillStyle(0xdac08a, 1).fillRoundedRect(x - 3, y, 6, h, 3);
    g.fillStyle(color, 1).fillEllipse(x, y, w, 11);
    g.fillStyle(0xffffff, 0.65).fillCircle(x - 3, y - 2, 2);
    g.fillStyle(0x9effdd, 0.65).fillCircle(x + 4, y + 2, 1.5);
  }

  for (let i = 0; i < 16; i++) {
    g.fillStyle(0x5affbe, 0.7).fillCircle(14 + Math.random() * 100, 54 + Math.random() * 50, 1.5 + Math.random() * 2.5);
  }

  g.generateTexture(key, 128, 128);
  g.destroy();
}

function createGlowCap(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 64, 64);
  g.fillStyle(0x56ffe5, 0.25).fillCircle(32, 28, 26);
  g.fillStyle(0xb6fff2, 1).fillEllipse(32, 22, 34, 17);
  g.fillStyle(0xeaffff, 0.8).fillCircle(24, 18, 3);
  g.fillStyle(0xc8a878, 1).fillRoundedRect(28, 25, 8, 28, 4);
  g.generateTexture(key, 64, 64);
  g.destroy();
}

function createStairs(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 96, 96);
  g.fillStyle(0x071007, 0.65).fillEllipse(48, 66, 70, 34);
  for (let i = 0; i < 5; i++) {
    g.fillStyle(0x243321, 1).fillRoundedRect(26 + i * 4, 30 + i * 7, 44 - i * 4, 8, 2);
    g.lineStyle(1, 0x78f06f, 0.35).strokeRoundedRect(26 + i * 4, 30 + i * 7, 44 - i * 4, 8, 2);
  }
  g.fillStyle(0x79f06f, 0.18).fillCircle(48, 48, 34);
  g.generateTexture("stairs_down", 96, 96);
  g.destroy();
}

function createPlayer(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 40, 48);
  g.fillStyle(0x050505, 0.4).fillEllipse(20, 40, 26, 10);

  g.fillStyle(0x2c3e50, 1).fillRoundedRect(11, 20, 18, 18, 5);
  g.fillStyle(0xffcc82, 1).fillCircle(20, 14, 9);
  g.fillStyle(0x5b3a1f, 1).fillEllipse(20, 9, 19, 8);

  g.fillStyle(0x151515, 1).fillRect(12, 37, 6, 7);
  g.fillStyle(0x151515, 1).fillRect(23, 37, 6, 7);

  g.fillStyle(0xffe36e, 1).fillCircle(30, 22, 5);
  g.fillStyle(0xfff2a8, 0.5).fillCircle(30, 22, 10);

  g.generateTexture("player", 40, 48);
  g.destroy();
}
