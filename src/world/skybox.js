import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { PRESETS } from '../config.js';
import { makeCloud } from '../utils/textures.js';

export function sunVector(elevation, azimuth, distance = 120) {
  const phi = THREE.MathUtils.degToRad(90 - elevation);
  const theta = THREE.MathUtils.degToRad(azimuth);
  return new THREE.Vector3().setFromSphericalCoords(distance, phi, theta);
}

function texelAlign(v, size = 180, map = 2048) {
  const step = size / map;
  v.x = Math.round(v.x / step) * step;
  v.z = Math.round(v.z / step) * step;
  return v;
}

function skyStateFromPreset(name) {
  const p = PRESETS[name];
  return {
    elevation: p.elevation,
    azimuth: p.azimuth,
    sunColor: new THREE.Color(p.sunColor),
    sunIntensity: p.sunIntensity,
    hemiSky: new THREE.Color(p.hemiSky),
    hemiGround: new THREE.Color(p.hemiGround),
    hemiIntensity: p.hemiIntensity,
    cloudColor: new THREE.Color(p.cloudColor),
    sky: { ...p.sky },
  };
}

export function createSkybox(ctx) {
  const { scene, renderer } = ctx;
  const sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  const initial = skyStateFromPreset('dusk');
  let current = initial;
  const sun = new THREE.DirectionalLight(initial.sunColor, initial.sunIntensity);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -90, right: 90, top: 90, bottom: -90, near: 1, far: 260 });
  sun.shadow.camera.updateProjectionMatrix();

  const target = new THREE.Object3D();
  scene.add(target);
  sun.target = target;
  scene.add(sun);

  const hemi = new THREE.HemisphereLight(initial.hemiSky, initial.hemiGround, initial.hemiIntensity);
  scene.add(hemi);

  const clouds = [];
  const cloudTex = makeCloud();
  for (let i = 0; i < 10; i++) {
    const m = new THREE.SpriteMaterial({ map: cloudTex, color: initial.cloudColor, transparent: true, opacity: 0.42, depthWrite: false });
    const s = new THREE.Sprite(m);
    s.position.set(-210 + i * 45, 125 + (i % 3) * 18, -60 + (i % 5) * 36);
    s.scale.set(95, 42, 1);
    scene.add(s);
    clouds.push(s);
  }

  function applyState(state) {
    current = state;
    const u = sky.material.uniforms;
    u.turbidity.value = state.sky.turbidity;
    u.rayleigh.value = state.sky.rayleigh;
    u.mieCoefficient.value = state.sky.mieCoefficient;
    u.mieDirectionalG.value = state.sky.mieDirectionalG;
    u.sunPosition.value.copy(sunVector(state.elevation, state.azimuth, 1));
    sun.color.copy(state.sunColor);
    sun.intensity = state.sunIntensity;
    hemi.color.copy(state.hemiSky);
    hemi.groundColor.copy(state.hemiGround);
    hemi.intensity = state.hemiIntensity;
    clouds.forEach(c => c.material.color.copy(state.cloudColor));
  }

  function apply(name = 'dusk') {
    const p = PRESETS[name];
    applyState(skyStateFromPreset(name));
    scene.fog = new THREE.FogExp2(p.fogColor, p.fogDensity);
    scene.background = new THREE.Color(p.fogColor);
    renderer.toneMappingExposure = p.exposure;
  }

  function snapshot() {
    return {
      elevation: current.elevation,
      azimuth: current.azimuth,
      sunColor: sun.color.clone(),
      sunIntensity: sun.intensity,
      hemiSky: hemi.color.clone(),
      hemiGround: hemi.groundColor.clone(),
      hemiIntensity: hemi.intensity,
      cloudColor: clouds[0]?.material.color.clone() ?? current.cloudColor.clone(),
      sky: { ...current.sky },
    };
  }

  function presetState(name) { return skyStateFromPreset(name); }

  function lerpState(start, end, k) {
    applyState({
      elevation: THREE.MathUtils.lerp(start.elevation, end.elevation, k),
      azimuth: THREE.MathUtils.lerp(start.azimuth, end.azimuth, k),
      sunColor: start.sunColor.clone().lerp(end.sunColor, k),
      sunIntensity: THREE.MathUtils.lerp(start.sunIntensity, end.sunIntensity, k),
      hemiSky: start.hemiSky.clone().lerp(end.hemiSky, k),
      hemiGround: start.hemiGround.clone().lerp(end.hemiGround, k),
      hemiIntensity: THREE.MathUtils.lerp(start.hemiIntensity, end.hemiIntensity, k),
      cloudColor: start.cloudColor.clone().lerp(end.cloudColor, k),
      sky: {
        turbidity: THREE.MathUtils.lerp(start.sky.turbidity, end.sky.turbidity, k),
        rayleigh: THREE.MathUtils.lerp(start.sky.rayleigh, end.sky.rayleigh, k),
        mieCoefficient: THREE.MathUtils.lerp(start.sky.mieCoefficient, end.sky.mieCoefficient, k),
        mieDirectionalG: THREE.MathUtils.lerp(start.sky.mieDirectionalG, end.sky.mieDirectionalG, k),
      },
    });
  }

  function update(dt) {
    const focus = ctx.player?.position || new THREE.Vector3();
    target.position.copy(texelAlign(new THREE.Vector3(focus.x, 0, focus.z)));
    sun.position.copy(target.position).add(sunVector(current.elevation, current.azimuth, 120));
    clouds.forEach((c, i) => {
      c.position.x += dt * (1.2 + i * 0.05);
      if (c.position.x > 250) c.position.x = -250;
    });
  }

  apply('dusk');
  ctx.sky = { apply, sun, hemi, clouds, snapshot, presetState, lerpState };
  return { group: sky, update, apply };
}
