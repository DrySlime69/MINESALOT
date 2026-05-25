import { MAP_WIDTH, MAP_HEIGHT } from "./config.js";

export function generateCave(seed = Date.now()) {
  const rand = seededRandom(seed);
  const map = makeFilledMap();

  const rooms = [];
  const roomCount = 9 + Math.floor(rand() * 5);

  // Main big painted cavern in the center.
  rooms.push({ x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2), rx: 10, ry: 7 });

  for (let i = 0; i < roomCount; i++) {
    rooms.push({
      x: 8 + Math.floor(rand() * (MAP_WIDTH - 16)),
      y: 7 + Math.floor(rand() * (MAP_HEIGHT - 14)),
      rx: 4 + Math.floor(rand() * 8),
      ry: 3 + Math.floor(rand() * 6)
    });
  }

  for (const room of rooms) carveOrganicRoom(map, room.x, room.y, room.rx, room.ry, rand);

  // Connect rooms with thick, wandering tunnels.
  for (let i = 1; i < rooms.length; i++) {
    carveWindingTunnel(map, rooms[i - 1], rooms[i], rand);
  }

  // Add side alcoves so the level feels explored, not rectangular.
  for (let i = 0; i < 18; i++) {
    const room = rooms[Math.floor(rand() * rooms.length)];
    const angle = rand() * Math.PI * 2;
    const x = Math.floor(room.x + Math.cos(angle) * (room.rx + 3 + rand() * 4));
    const y = Math.floor(room.y + Math.sin(angle) * (room.ry + 3 + rand() * 3));
    carveOrganicRoom(map, x, y, 2 + Math.floor(rand() * 4), 2 + Math.floor(rand() * 3), rand);
  }

  softenJaggedEdges(map);
  carveSpawnRoom(map);
  return map;
}

function makeFilledMap() {
  return Array.from({ length: MAP_HEIGHT }, () => Array.from({ length: MAP_WIDTH }, () => 1));
}

function carveOrganicRoom(map, cx, cy, rx, ry, rand) {
  for (let y = cy - ry - 3; y <= cy + ry + 3; y++) {
    for (let x = cx - rx - 3; x <= cx + rx + 3; x++) {
      if (!insideBounds(x, y)) continue;
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const wobble = 0.22 * Math.sin(x * 0.7 + cy) + 0.18 * Math.cos(y * 0.9 + cx) + (rand() - 0.5) * 0.18;
      if (nx * nx + ny * ny < 1.05 + wobble) map[y][x] = 0;
    }
  }
}

function carveWindingTunnel(map, a, b, rand) {
  let x = a.x;
  let y = a.y;
  let safety = 0;

  while ((Math.abs(x - b.x) > 1 || Math.abs(y - b.y) > 1) && safety++ < 600) {
    const towardX = Math.sign(b.x - x);
    const towardY = Math.sign(b.y - y);

    if (rand() < 0.58) x += towardX;
    if (rand() < 0.58) y += towardY;

    x += Math.floor((rand() - 0.5) * 3);
    y += Math.floor((rand() - 0.5) * 3);

    x = clamp(x, 3, MAP_WIDTH - 4);
    y = clamp(y, 3, MAP_HEIGHT - 4);

    const radius = 2 + Math.floor(rand() * 2);
    carveCircle(map, x, y, radius);
  }
}

function carveCircle(map, cx, cy, r) {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = cx - r; x <= cx + r; x++) {
      if (!insideBounds(x, y)) continue;
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r + 1) map[y][x] = 0;
    }
  }
}

function softenJaggedEdges(map) {
  const copy = map.map(row => row.slice());
  for (let y = 2; y < MAP_HEIGHT - 2; y++) {
    for (let x = 2; x < MAP_WIDTH - 2; x++) {
      const floors = countNeighbors(map, x, y, 0);
      if (map[y][x] === 1 && floors >= 6) copy[y][x] = 0;
      if (map[y][x] === 0 && floors <= 2) copy[y][x] = 1;
    }
  }
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) map[y][x] = copy[y][x];
  }
}

function countNeighbors(map, cx, cy, value) {
  let count = 0;
  for (let y = cy - 1; y <= cy + 1; y++) {
    for (let x = cx - 1; x <= cx + 1; x++) {
      if (x === cx && y === cy) continue;
      if (map[y]?.[x] === value) count++;
    }
  }
  return count;
}

function carveSpawnRoom(map) {
  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);
  carveCircle(map, cx, cy, 5);
}

function insideBounds(x, y) {
  return x > 0 && y > 0 && x < MAP_WIDTH - 1 && y < MAP_HEIGHT - 1;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
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
