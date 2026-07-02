import * as THREE from 'three';
import { PRESETS, PALETTE } from '../config.js';
import { makeLeafAlpha } from '../utils/textures.js';
import { createRng } from '../utils/rng.js';

export const wind = { direction: new THREE.Vector2(0.8, 0.2), strength: 1 };

export function createAtmosphere(ctx) {
  const group = new THREE.Group();
  const rng = createRng('atmosphere');
  ctx.currentPreset = 'dusk';
  let transition = null;

  const leaves = [];
  const matG = new THREE.MeshBasicMaterial({ color: PALETTE.ginkgo, map: makeLeafAlpha('ginkgo'), transparent: true, side: THREE.DoubleSide });
  const matM = new THREE.MeshBasicMaterial({ color: PALETTE.mapleRed, map: makeLeafAlpha('maple'), transparent: true, side: THREE.DoubleSide });
  for (let i = 0; i < 200; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), i % 2 ? matG : matM);
    m.position.set(rng.range(-35, 35), rng.range(4, 10), rng.range(-65, 45));
    m.userData.v = rng.range(0.35, 0.8);
    group.add(m);
    leaves.push(m);
  }

  const gulls = [];
  const gullMat = new THREE.MeshBasicMaterial({ color: '#f5f2ea', side: THREE.DoubleSide });
  const gullGeo = new THREE.BufferGeometry();
  gullGeo.setAttribute('position', new THREE.Float32BufferAttribute([-1, 0, 0, 0, 0.2, 0, 1, 0, 0, 0, 0.2, 0, 0, -0.1, 0.25, 1, 0, 0], 3));
  for (let i = 0; i < 10; i++) {
    const g = new THREE.Mesh(gullGeo, gullMat);
    g.userData = { phase: i * 0.63, lane: i % 2 };
    group.add(g);
    gulls.push(g);
  }

  const fogPlanes = [];
  const fogMat = new THREE.MeshBasicMaterial({ color: '#d7dddd', transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(80, 18), fogMat.clone());
    p.position.set(-160 + i * 45, 6, -20 + (i % 4) * 25);
    p.rotation.y = 0.25;
    group.add(p);
    fogPlanes.push(p);
  }

  function requestPreset(name) {
    if (!PRESETS[name]) return;
    const end = PRESETS[name];
    ctx.currentPreset = name;
    transition = {
      name,
      started: performance.now(),
      density: ctx.scene.fog?.density ?? PRESETS.dusk.fogDensity,
      color: ctx.scene.fog?.color.clone() ?? new THREE.Color(PRESETS.dusk.fogColor),
      exposure: ctx.renderer.toneMappingExposure,
      endColor: new THREE.Color(end.fogColor),
      skyStart: ctx.sky?.snapshot?.(),
      skyEnd: ctx.sky?.presetState?.(name),
    };
    window.setTimeout(() => {
      if (transition?.name !== name) return;
      ctx.scene.fog.density = end.fogDensity;
      ctx.scene.fog.color.set(end.fogColor);
      ctx.scene.background.copy(ctx.scene.fog.color);
      ctx.renderer.toneMappingExposure = end.exposure;
      ctx.sky?.apply(name);
      if (ctx.postfx?.bloom) ctx.postfx.bloom.strength = end.bloom;
      transition = null;
    }, 1500);
  }

  ctx.events.addEventListener('preset-request', e => requestPreset(e.detail));
  ctx.scene.add(group);

  return {
    group,
    update(dt, t) {
      if (transition) {
        const end = PRESETS[transition.name];
        const k = Math.min(1, (performance.now() - transition.started) / 1500);
        const kk = k * k * (3 - 2 * k);
        ctx.scene.fog.density = THREE.MathUtils.lerp(transition.density, end.fogDensity, kk);
        ctx.scene.fog.color.copy(transition.color).lerp(transition.endColor, kk);
        ctx.scene.background.copy(ctx.scene.fog.color);
        ctx.renderer.toneMappingExposure = THREE.MathUtils.lerp(transition.exposure, end.exposure, kk);
        if (transition.skyStart && transition.skyEnd) ctx.sky?.lerpState?.(transition.skyStart, transition.skyEnd, kk);
        if (ctx.postfx?.bloom) ctx.postfx.bloom.strength = THREE.MathUtils.lerp(ctx.postfx.bloom.strength, end.bloom, 0.12);
        if (k >= 1) {
          ctx.sky?.apply(transition.name);
          if (ctx.postfx?.bloom) ctx.postfx.bloom.strength = end.bloom;
          transition = null;
        }
      }

      const pp = ctx.player?.position || new THREE.Vector3();
      leaves.forEach((l, i) => {
        const dx = l.position.x - pp.x, dz = l.position.z - pp.z;
        if (dx * dx + dz * dz > 1600) { l.visible = false; return; }
        l.visible = true;
        l.position.y -= l.userData.v * dt;
        l.position.x += Math.sin(t + i) * 0.12 * dt;
        l.rotation.z += dt;
        if (l.position.y < ctx.getGroundHeight(l.position.x, l.position.z) + 0.2) {
          l.position.set(pp.x + rng.range(-35, 35), rng.range(6, 11), pp.z + rng.range(-35, 35));
        }
      });
      gulls.forEach((g, i) => {
        const a = t * 0.25 + g.userData.phase;
        const lane = g.userData.lane;
        g.position.set(60 + Math.cos(a) * (45 + lane * 15), 26 + Math.sin(a * 3) * 2, 107 + Math.sin(a) * (22 + lane * 10));
        g.rotation.y = -a;
        g.scale.y = 1 + Math.sin(t * 8 + i) * 0.3;
      });
      fogPlanes.forEach((p, i) => {
        p.visible = ctx.currentPreset === 'fog';
        p.position.x += dt * (0.6 + i * 0.04);
        if (p.position.x > 210) p.position.x = -210;
      });
    },
  };
}
