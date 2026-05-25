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

    this.input.keyboard.on("keydown-R", () => {
      this.scene.restart({ level: this.level });
    });

    this.input.keyboard.on("keydown-E", () => {
      if (!this.player || !this.stairs) return;
      const distance = Phaser.Math.Distance.Between(
        this.player.sprite.x,
        this.player.sprite.y,
        this.stairs.x,
        this.stairs.y
      );

      if (distance < 70 && this.level < 10) {
        this.scene.restart({ level: this.level + 1 });
      }
    });
  }

  buildLevel(level) {
    const biome = getBiomeForLevel(level);
    const map = generateCave(level * 999);

    this.physics.world.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    const walls = this.physics.add.staticGroup();

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const isWall = map[y][x] === 1;
        const key = isWall ? "wall_tile" : "floor_tile";
        const tint = isWall
          ? Phaser.Display.Color.Interpolate.ColorWithColor(
              Phaser.Display.Color.ValueToColor(biome.wall),
              Phaser.Display.Color.ValueToColor(biome.wallAlt),
              100,
              Phaser.Math.Between(0, 100)
            )
          : Phaser.Display.Color.Interpolate.ColorWithColor(
              Phaser.Display.Color.ValueToColor(biome.floor),
              Phaser.Display.Color.ValueToColor(biome.floorAlt),
              100,
              Phaser.Math.Between(0, 100)
            );

        this.add.image(x * TILE_SIZE, y * TILE_SIZE, key)
          .setOrigin(0)
          .setTint(Phaser.Display.Color.GetColor(tint.r, tint.g, tint.b))
          .setDepth(isWall ? 5 : 0);

        if (isWall) {
          walls.create(x * TILE_SIZE + 16, y * TILE_SIZE + 16, null)
            .setVisible(false)
            .setSize(32, 32)
            .refreshBody();
        }
      }
    }

    placeOreChunks(this, map, biome);
    placeDecor(this, map, biome);
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

    this.add.text(18, 18, `Spore Grotto — Level ${level}/10\nWASD/Arrows move | E stairs | R restart`, {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#ffe36e",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: { x: 10, y: 8 }
    }).setScrollFactor(0).setDepth(100);
  }

  placeStairs(map) {
    let best = null;
    const centerX = Math.floor(MAP_WIDTH / 2);
    const centerY = Math.floor(MAP_HEIGHT / 2);
    let bestDistance = 0;

    for (let y = 3; y < MAP_HEIGHT - 3; y++) {
      for (let x = 3; x < MAP_WIDTH - 3; x++) {
        if (map[y][x] !== 0) continue;
        const distance = Phaser.Math.Distance.Between(x, y, centerX, centerY);
        if (distance > bestDistance) {
          bestDistance = distance;
          best = { x, y };
        }
      }
    }

    best ??= { x: centerX + 8, y: centerY };

    this.stairs = this.add.image(best.x * TILE_SIZE, best.y * TILE_SIZE, "stairs_down")
      .setOrigin(0.5, 0.75)
      .setDepth(6);

    this.add.circle(best.x * TILE_SIZE, best.y * TILE_SIZE, 58, 0x79f06f, 0.08).setDepth(2);
  }

  update() {
    this.player?.update();
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game",
  backgroundColor: "#05070a",
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: { debug: false }
  },
  scene: [GameScene]
};

new Phaser.Game(config);
