import test from 'node:test';
import assert from 'node:assert/strict';
import { ROADS, VILLAS, PRESETS } from '../src/config.js';
import { createRng } from '../src/utils/rng.js';
import { getGroundHeight } from '../src/world/terrain.js';

test('road tree mapping matches design', () => {
  const byName = Object.fromEntries(ROADS.map(r => [r.name, r.tree]));
  assert.equal(byName['韶关路'], 'peach');
  assert.equal(byName['正阳关路'], 'crapeMyrtle');
  assert.equal(byName['居庸关路'], 'ginkgo');
  assert.equal(byName['嘉峪关路'], 'maple');
  assert.equal(byName['武胜关路'], 'juniper');
  assert.equal(byName['宁武关路'], 'crabapple');
  assert.equal(byName['紫荆关路'], 'cedar');
  assert.equal(byName['山海关路'], 'planeTree');
  assert.equal(byName['黄海路'], 'blackPine');
});

test('terrain heights follow design bands', () => {
  assert.equal(getGroundHeight(0, 0), 2.5);
  assert.ok(getGroundHeight(0, 88) < 2.5 && getGroundHeight(0, 88) > -0.4);
  assert.equal(getGroundHeight(60, 100), 4.0);
});

test('seeded rng is deterministic and villas are frozen', () => {
  assert.equal(createRng('x').random(), createRng('x').random());
  assert.equal(VILLAS.length, 32);
  assert.equal(Object.keys(PRESETS).length, 3);
});
