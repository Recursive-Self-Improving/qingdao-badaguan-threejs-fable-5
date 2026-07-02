import * as THREE from 'three';
import { CONFIG } from './config.js';
import { createRng } from './utils/rng.js';
import { createRenderer } from './core/renderer.js';
import { createLoop } from './core/loop.js';
import { createCollision } from './systems/collision.js';
import { createTerrain } from './world/terrain.js';
import { createSkybox } from './world/skybox.js';
import { createRoads } from './world/roads.js';
import { createOcean } from './world/ocean.js';
import { createVillas } from './world/villa.js';
import { createLandmarks } from './world/landmarks.js';
import { createTrees } from './world/trees.js';
import { createProps } from './world/props.js';
import { createAtmosphere } from './systems/atmosphere.js';
import { createPostfx } from './systems/postfx.js';
import { createPlayer } from './systems/player.js';
import { createAudio } from './systems/audio.js';
import { createUi } from './systems/ui.js';
import { createQuality } from './systems/quality.js';

const scene = new THREE.Scene();
const events = new EventTarget();
const { renderer, camera } = createRenderer({ app: document.getElementById('app') });
const ctx = { scene, camera, renderer, config: CONFIG, rng: createRng('qingdao-badaguan'), colliders: createCollision(), events, currentPreset: 'dusk' };
window.__BADAGUAN__ = ctx;
const ui = createUi(ctx);
const loadedSystems = [];
await ui.showLoading([
  ['地形', () => loadedSystems.push(createTerrain(ctx)) && loadedSystems.at(-1)],
  ['海洋', () => loadedSystems.push(createOcean(ctx)) && loadedSystems.at(-1)],
  ['天空', () => loadedSystems.push(createSkybox(ctx)) && loadedSystems.at(-1)],
  ['道路', () => loadedSystems.push(createRoads(ctx)) && loadedSystems.at(-1)],
  ['别墅', () => loadedSystems.push(createVillas(ctx)) && loadedSystems.at(-1)],
  ['地标', () => loadedSystems.push(createLandmarks(ctx)) && loadedSystems.at(-1)],
  ['树木', () => loadedSystems.push(createTrees(ctx)) && loadedSystems.at(-1)],
  ['小品', () => loadedSystems.push(createProps(ctx)) && loadedSystems.at(-1)],
  ['氛围', () => loadedSystems.push(createAtmosphere(ctx)) && loadedSystems.at(-1)],
  ['后期', () => loadedSystems.push(createPostfx(ctx)) && loadedSystems.at(-1)],
]);
const player = createPlayer(ctx); const audio = createAudio(ctx); const quality = createQuality(ctx);
events.addEventListener('start', () => { player.lock(); audio.start(ctx); });
events.addEventListener('request-lock', () => player.lock());
const loop = createLoop({ renderer, camera, scene, render(){ if(ctx.postfx?.enabled !== false) ctx.postfx.render(); else renderer.render(scene,camera); } });
for (const s of [...loadedSystems, player, ui, quality, audio]) loop.add(s);
loop.start();
if (new URLSearchParams(location.search).has('debug')) {
  const panel=document.createElement('div'); panel.style.cssText='position:fixed;left:8px;top:8px;background:rgba(0,0,0,.55);color:#0f0;padding:6px;font:12px monospace;z-index:9'; document.body.appendChild(panel); loop.add({update(){ panel.textContent=`fps ${loop.fps.toFixed(0)} draw ${renderer.info.render.calls} tris ${renderer.info.render.triangles} colliders ${ctx.colliders.colliders.length}`; }});
}
