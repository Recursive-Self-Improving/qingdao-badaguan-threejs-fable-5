import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { PALETTE } from '../config.js';
import { makeWaterNormalTexture, makeFoamStrip } from '../utils/textures.js';

let phase = 0;
export function wavePhase(){ return phase; }
export function createOcean(ctx){ const group=new THREE.Group();
  const waterGeometry=new THREE.PlaneGeometry(700,400); const water=new Water(waterGeometry,{textureWidth:512,textureHeight:512,waterNormals:makeWaterNormalTexture(),sunDirection:new THREE.Vector3(-.5,.2,-.7).normalize(),sunColor:'#ffb36b',waterColor:PALETTE.seaDeep,distortionScale:2.4,fog:true}); water.rotation.x=-Math.PI/2; water.position.set(0,0,260); group.add(water);
  const foamTex=makeFoamStrip(); const foam=[]; for(let i=0;i<3;i++){ const mat=new THREE.MeshBasicMaterial({map:foamTex,transparent:true,depthWrite:false,color:'#fff',opacity:.35-i*.07}); const m=new THREE.Mesh(new THREE.PlaneGeometry(190,7),mat); m.rotation.x=-Math.PI/2; m.position.set(-58,-.08,91+i*4); group.add(m); foam.push(m); }
  const ringMat=new THREE.MeshBasicMaterial({color:'#fff',transparent:true,opacity:.28,side:THREE.DoubleSide}); for(let i=0;i<3;i++){ const r=new THREE.Mesh(new THREE.RingGeometry(3+i,3.4+i,32),ringMat); r.rotation.x=-Math.PI/2; r.position.set(54+i*13,.05,113+i*5); group.add(r); }
  ctx.scene.add(group); ctx.ocean={wavePhase}; return {group, update(dt,t){ phase=(t%8)/8; water.material.uniforms.time.value += dt; foam.forEach((f,i)=>{ f.position.z=91+i*4+Math.sin(phase*Math.PI*2+i)*2.4; f.material.opacity=.2+.22*Math.sin(phase*Math.PI*2+i)**2; }); }}; }
