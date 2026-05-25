import { MAP_WIDTH, MAP_HEIGHT } from "./config.js";

export function generateCave(seed = Date.now()) {
  const random = seededRandom(seed);
  let map = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    map[y] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const border = x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1;
      map[y][x] = border || random() < 0.45 ? 1 : 0;
    }
  }

  for (let i = 0; i < 5; i++) {
    map = smoothMap(map);
  }

  carveSpawnRoom(map);
  return map;
}

function smoothMap(map) {
  const next = map.map(row => row.slice());

  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    for (let x = 1; x < MAP_WIDTH - 1; x++) {
      const walls = countNeighborWalls(map, x, y);
      if (walls > 4) next[y][x] = 1;
      else if (walls < 4) next[y][x] = 0;
    }
  }

  return next;
}

function countNeighborWalls(map, cx, cy) {
  let count = 0;
  for (let y = cy - 1; y <= cy + 1; y++) {
    for (let x = cx - 1; x <= cx + 1; x++) {
      if (x === cx && y === cy) continue;
      count += map[y]?.[x] === 1 ? 1 : 0;
    }
  }
  return count;
}

function carveSpawnRoom(map) {
  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  for (let y = cy - 4; y <= cy + 4; y++) {
    for (let x = cx - 4; x <= cx + 4; x++) {
      if (map[y] && map[y][x] !== undefined) map[y][x] = 0;
    }
  }
}

export function findOpenTile(map) {
  for (let y = 2; y < MAP_HEIGHT - 2; y++) {
    for (let x = 2; x < MAP_WIDTH - 2; x++) {
      if (map[y][x] === 0) return { x, y };
    }
  }
  return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) };
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return function() {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483646;
  };
}
