import { GAME_WIDTH, GAME_HEIGHT, TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, STARTING_LEVEL } from "./config.js";
import { getBiomeForLevel, clampMineLevel } from "./biomeSystem.js";
import { generateCave } from "./caveGenerator.js";
import { createGeneratedTextures } from "./assetGenerator.js";
import { Player } from "./player.js";
import { placeOreChunks } from "./oreSystem.js";
import { placeDecor } from "./decorSystem.js";
import { addBiomeLighting } from "./lightingSystem.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.level = STARTING_LEVEL;
  }

  init(data) {
    this.level = clampMineLevel(data.level || STARTING_LEVEL);
  }

  create() {
    createGeneratedTextures(this);
    this.buildLevel(this.level);

    this.input.keyboard.on("keydown-R", () => this.scene.restart({ level: this.level }));

    this.input.keyboard.on("keydown-E", () => {
      if (!this.player || !this.stairs) return;
      const distance = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.stairs.x, this.stairs.y);
      if (distance < 78 && this.level < 10) this.scene.restart({ level: this.level + 1 });
    });
  }

  buildLevel(level) {
    const biome = getBiomeForLevel(level);
    const map = generateCave(level * 999);

    this.physics.world.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    const walls = this.physics.add.staticGroup();

    this.paintBaseMap(map, biome, walls);
    placeDecor(this, map, biome);
    placeOreChunks(this, map, biome);
    this.placeStairs(map);
    addBiomeLighting(this, biome);

    const spawn = {
      x: Math.floor(MAP_WIDTH / 2) * TILE_SIZE,
      y: Math.floor(MAP_HEIGHT / 2) * TILE_SIZE
    };

    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player.sprite, walls);

    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    this.cameras.main.setZoom(1.45);

    this.add.text(18, 18, `BELOW — Spore Grotto ${level}/10\nWASD/Arrows move | E stairs | R restart`, {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#eaff9a",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: { x: 10, y: 8 }
    }).setScrollFactor(0).setDepth(100);
  }

  paintBaseMap(map, biome, walls) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const isWall = map[y][x] === 1;
        const key = isWall ? "wall_tile" : "floor_tile";
        const tint = randomBlend(isWall ? biome.wall : biome.floor, isWall ? biome.wallAlt : biome.floorAlt);

        this.add.image(x * TILE_SIZE, y * TILE_SIZE, key)
          .setOrigin(0)
          .setTint(tint)
          .setDepth(isWall ? 8 : 0);

        if (!isWall && hasNeighborWall(map, x, y)) {
          this.add.rectangle(x * TILE_SIZE + 16, y * TILE_SIZE + 16, 34, 34, 0x000000, 0.18)
            .setDepth(1);
        }

        if (isWall) {
          walls.create(x * TILE_SIZE + 16, y * TILE_SIZE + 16, null)
            .setVisible(false)
            .setSize(32, 32)
            .refreshBody();

          if (map[y + 1]?.[x] === 0) {
            this.add.ellipse(x * TILE_SIZE + 16, y * TILE_SIZE + 29, 40, 12, 0x79f06f, 0.10)
              .setDepth(9);
          }
        }
      }
    }
  }

  placeStairs(map) {
    let best = null;
    const centerX = Math.floor(MAP_WIDTH / 2);
    const centerY = Math.floor(MAP_HEIGHT / 2);
    let bestDistance = 0;

    for (let y = 4; y < MAP_HEIGHT - 4; y++) {
      for (let x = 4; x < MAP_WIDTH - 4; x++) {
        if (map[y][x] !== 0) continue;
        if (!isOpenArea(map, x, y, 2)) continue;
        const distance = Phaser.Math.Distance.Between(x, y, centerX, centerY);
        if (distance > bestDistance) {
          bestDistance = distance;
          best = { x, y };
        }
      }
    }

    best ??= { x: centerX + 8, y: centerY };
    const worldX = best.x * TILE_SIZE;
    const worldY = best.y * TILE_SIZE;

    this.add.image(worldX, worldY, "soft_green_glow")
      .setDepth(2)
      .setScale(0.85)
      .setAlpha(0.45);

    this.stairs = this.add.image(worldX, worldY, "stairs_down")
      .setOrigin(0.5, 0.75)
      .setDepth(6);
  }

  update() {
    this.player?.update();
  }
}

function isOpenArea(map, x, y, r) {
  for (let yy = y - r; yy <= y + r; yy++) {
    for (let xx = x - r; xx <= x + r; xx++) {
      if (map[yy]?.[xx] !== 0) return false;
    }
  }
  return true;
}

function hasNeighborWall(map, x, y) {
  return map[y - 1]?.[x] === 1 || map[y + 1]?.[x] === 1 || map[y]?.[x - 1] === 1 || map[y]?.[x + 1] === 1;
}

function randomBlend(a, b) {
  const ca = Phaser.Display.Color.ValueToColor(a);
  const cb = Phaser.Display.Color.ValueToColor(b);
  const t = Math.random();
  const r = Math.floor(ca.r + (cb.r - ca.r) * t);
  const g = Math.floor(ca.g + (cb.g - ca.g) * t);
  const bl = Math.floor(ca.b + (cb.b - ca.b) * t);
  return Phaser.Display.Color.GetColor(r, g, bl);
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game",
  backgroundColor: "#030706",
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: { debug: false }
  },
  scene: [GameScene]
};

new Phaser.Game(config);
