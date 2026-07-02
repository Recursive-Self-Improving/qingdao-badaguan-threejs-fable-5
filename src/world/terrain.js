import * as THREE from 'three';
import { PALETTE } from '../config.js';
import { makeGrass, makeSand, makeGranite } from '../utils/textures.js';

export function getGroundHeight(x, z) {
  const dx = (x - 60) / 34, dz = (z - 100) / 22;
  if (dx * dx + dz * dz < 1.15 && z > 82) return 4.0;
  if (x > 50 && x < 64 && z > 78 && z < 92) return 2.5 + (z - 78) / 14 * 1.5;
  if (z <= 75) return 2.5;
  if (z <= 100) return 2.5 + (z - 75) / 25 * (-2.9);
  return -0.4;
}
function makePlane(w,d,segX,segZ, mapper, mat){ const geo=new THREE.PlaneGeometry(w,d,segX,segZ); geo.rotateX(-Math.PI/2); const pos=geo.attributes.position; for(let i=0;i<pos.count;i++){ const x=pos.getX(i), z=pos.getZ(i); pos.setY(i, mapper(x,z)); } geo.computeVertexNormals(); return new THREE.Mesh(geo,mat); }
export function createTerrain(ctx) {
  const group = new THREE.Group(); group.name='Terrain';
  const grass = new THREE.MeshStandardMaterial({ color: PALETTE.grass, map: makeGrass(), roughness: .92 }); grass.map.repeat.set(30,24);
  const sand = new THREE.MeshStandardMaterial({ color: PALETTE.sand, map: makeSand(), roughness: .98 }); sand.map.repeat.set(10,3);
  const rock = new THREE.MeshStandardMaterial({ color: PALETTE.rock, map: makeGranite(), roughness:.88 });
  const city = makePlane(380,245,80,60,(x,z)=> z<75 ? 2.5 + 0.05*Math.sin(x*.07)*Math.cos(z*.05) : getGroundHeight(x,z),grass); city.position.z=-47.5; city.receiveShadow=true; group.add(city);
  const beach = makePlane(380,35,80,14,(x,z)=>getGroundHeight(x,z),sand); beach.position.z=92.5; beach.receiveShadow=true; group.add(beach);
  const capeGeo = new THREE.CylinderGeometry(33,39,6,10,1,false); capeGeo.scale(1,.75,.66); capeGeo.translate(60,1.2,100); const cape=new THREE.Mesh(capeGeo,rock); cape.castShadow=cape.receiveShadow=true; group.add(cape);
  ctx.scene.add(group); ctx.getGroundHeight = getGroundHeight; return { group };
}
