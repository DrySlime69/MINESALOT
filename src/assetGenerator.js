export function createGeneratedTextures(scene) {
  createPlayer(scene);
  createStairs(scene);

  createPaintedTile(scene, "floor_tile", 0x24422a, 0x4e7746, 0x142615);
  createPaintedTile(scene, "wall_tile", 0x162318, 0x36442a, 0x090e0a);
  createFloorPatch(scene, "floor_moss_patch");
  createSporePool(scene, "spore_pool");

  createOre(scene, "ore_stone", 0x8c8c8c);
  createOre(scene, "ore_copper", 0xb66a35);
  createOre(scene, "ore_iron", 0x82b9e8);

  createFungalGarden(scene, "fungal_garden_large");
  createFungalArch(scene, "fungal_arch");
  createGlowCap(scene, "spore_glowcap");
  createHangingVines(scene, "hanging_vines");
  createSoftGlow(scene, "soft_green_glow", 0x79f06f);
}

function createPaintedTile(scene, key, base, highlight, shadow) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(base, 1).fillRect(0, 0, 32, 32);

  for (let i = 0; i < 8; i++) {
    g.fillStyle(shadow, 0.16 + Math.random() * 0.18);
    g.fillEllipse(Math.random() * 32, Math.random() * 32, 10 + Math.random() * 20, 4 + Math.random() * 12);
  }

  for (let i = 0; i < 14; i++) {
    g.fillStyle(highlight, 0.16 + Math.random() * 0.22);
    g.fillCircle(Math.random() * 32, Math.random() * 32, 1 + Math.random() * 3);
  }

  g.generateTexture(key, 32, 32);
  g.destroy();
}

function createFloorPatch(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 160, 128);
  for (let i = 0; i < 20; i++) {
    const x = 30 + Math.random() * 100;
    const y = 28 + Math.random() * 72;
    g.fillStyle(0x67b85e, 0.16 + Math.random() * 0.18);
    g.fillEllipse(x, y, 35 + Math.random() * 60, 12 + Math.random() * 28);
  }
  for (let i = 0; i < 70; i++) {
    g.fillStyle(0xa6ff88, 0.22);
    g.fillCircle(12 + Math.random() * 136, 16 + Math.random() * 96, 1 + Math.random() * 1.8);
  }
  g.generateTexture(key, 160, 128);
  g.destroy();
}

function createSporePool(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 160, 112);
  g.fillStyle(0x3cffc8, 0.12).fillEllipse(80, 60, 145, 70);
  g.fillStyle(0x45f0b5, 0.35).fillEllipse(80, 60, 112, 46);
  g.fillStyle(0xcefff2, 0.45).fillEllipse(62, 45, 34, 9);
  g.fillStyle(0x0b1d16, 0.4).fillEllipse(80, 86, 128, 18);
  g.generateTexture(key, 160, 112);
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

function createFungalGarden(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 256, 192);
  g.fillStyle(0x061006, 0.5).fillEllipse(128, 154, 215, 48);

  const caps = [0xf05171, 0xffa640, 0x4ddac9, 0x92ef56, 0x9d62ff, 0xffe36e];

  for (let i = 0; i < 42; i++) {
    const x = 22 + Math.random() * 212;
    const y = 70 + Math.random() * 82;
    const h = 18 + Math.random() * 42;
    const w = 15 + Math.random() * 38;
    const color = caps[Math.floor(Math.random() * caps.length)];

    g.fillStyle(0xbda06e, 1).fillRoundedRect(x - 4, y, 8, h, 4);
    g.fillStyle(color, 1).fillEllipse(x, y, w, 12 + Math.random() * 10);
    g.fillStyle(0xffffff, 0.55).fillCircle(x - w * 0.2, y - 3, 2.2);
    g.fillStyle(0x8ffff0, 0.45).fillCircle(x + w * 0.18, y + 1, 1.6);
  }

  // tall hero mushrooms
  for (let i = 0; i < 6; i++) {
    const x = 55 + Math.random() * 150;
    const y = 35 + Math.random() * 55;
    const h = 62 + Math.random() * 35;
    g.fillStyle(0xd8bf83, 1).fillRoundedRect(x - 7, y + 18, 14, h, 7);
    g.fillStyle(caps[Math.floor(Math.random() * caps.length)], 1).fillEllipse(x, y + 18, 54, 26);
    g.fillStyle(0xffffff, 0.55).fillCircle(x - 12, y + 11, 4);
  }

  for (let i = 0; i < 80; i++) {
    g.fillStyle(0x7dffd7, 0.55);
    g.fillCircle(20 + Math.random() * 216, 42 + Math.random() * 110, 1 + Math.random() * 2.5);
  }

  g.generateTexture(key, 256, 192);
  g.destroy();
}

function createFungalArch(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 192, 160);
  g.lineStyle(18, 0x5a7d47, 1);
  g.beginPath();
  g.arc(96, 96, 62, Math.PI, 0, false);
  g.strokePath();

  g.lineStyle(8, 0x2b4229, 1);
  g.beginPath();
  g.arc(96, 96, 48, Math.PI, 0, false);
  g.strokePath();

  const colors = [0xff4f9a, 0x79f06f, 0x56ffe5, 0xffc04d];
  for (let i = 0; i < 22; i++) {
    const angle = Math.PI + Math.random() * Math.PI;
    const r = 56 + Math.random() * 20;
    const x = 96 + Math.cos(angle) * r;
    const y = 96 + Math.sin(angle) * r;
    g.fillStyle(colors[Math.floor(Math.random() * colors.length)], 1).fillEllipse(x, y, 18, 10);
    g.fillStyle(0xcdb98b, 1).fillRoundedRect(x - 2, y + 3, 4, 12, 2);
  }

  g.generateTexture(key, 192, 160);
  g.destroy();
}

function createGlowCap(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 64, 64);
  g.fillStyle(0x56ffe5, 0.22).fillCircle(32, 28, 28);
  g.fillStyle(0xb6fff2, 1).fillEllipse(32, 22, 34, 17);
  g.fillStyle(0xeaffff, 0.8).fillCircle(24, 18, 3);
  g.fillStyle(0xc8a878, 1).fillRoundedRect(28, 25, 8, 28, 4);
  g.generateTexture(key, 64, 64);
  g.destroy();
}

function createHangingVines(scene, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 160, 160);
  for (let i = 0; i < 18; i++) {
    const x = 8 + Math.random() * 144;
    const len = 50 + Math.random() * 95;
    g.lineStyle(2 + Math.random() * 2, 0x79a85b, 0.8);
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x + Math.sin(i) * 9, len);
    g.strokePath();
    if (Math.random() < 0.6) {
      g.fillStyle(0x79f06f, 0.75).fillEllipse(x + 4, len * 0.55, 8, 4);
    }
  }
  g.generateTexture(key, 160, 160);
  g.destroy();
}

function createSoftGlow(scene, key, color) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0).fillRect(0, 0, 256, 256);
  for (let r = 120; r > 0; r -= 12) {
    g.fillStyle(color, 0.008 + (120 - r) * 0.0005).fillCircle(128, 128, r);
  }
  g.generateTexture(key, 256, 256);
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
