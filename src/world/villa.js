import * as THREE from 'three';
import { VILLAS, PALETTE } from '../config.js';
import { makeStucco, makeRoofTiles, makeGranite } from '../utils/textures.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

function box(w,h,d,x,y,z,mat){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; return m; }
function roofMesh(v, mat){ const h= v.roof==='mansard'?2.6:2.1; const geo=new THREE.ConeGeometry(Math.max(v.w,v.d)*.72,h,4); geo.rotateY(Math.PI/4); const m=new THREE.Mesh(geo,mat); m.position.y=v.floors*3.2+0.9+h/2; m.scale.z=v.d/v.w; m.castShadow=true; return m; }
function addWindows(g,v,matFrame,matGlass){ const floors=v.floors; for(let level=0;level<floors;level++){ const y=1.9+level*3.2; for(const side of ['front','back']){ const z=(side==='front'?1:-1)*(v.d/2+.03); for(let i=-1;i<=1;i++){ const x=i*v.w/4; g.add(box(.95,1.25,.06,x,y,z,matGlass), box(1.15,.12,.08,x,y+.68,z,matFrame), box(1.15,.12,.08,x,y-.68,z,matFrame), box(.12,1.35,.08,x-.58,y,z,matFrame), box(.12,1.35,.08,x+.58,y,z,matFrame)); }}
      for(const side of ['left','right']){ const x=(side==='right'?1:-1)*(v.w/2+.03); for(let i=-1;i<=1;i+=2){ const z=i*v.d/4; const win=box(.06,1.2,.9,x,y,z,matGlass); g.add(win, box(.08,.12,1.1,x,y+.66,z,matFrame), box(.08,.12,1.1,x,y-.66,z,matFrame)); }} } }
export function createVilla(v, ctx, override={}){ const p=ctx.config?.PALETTE || PALETTE; const wallMat=new THREE.MeshStandardMaterial({color:override.wallColor||p.wallWarm[v.wallColorIdx%p.wallWarm.length],map:makeStucco(256,100+v.wallColorIdx),roughness:.9}); const roofMat=new THREE.MeshStandardMaterial({color:override.roofColor||p.roofRed[v.roofColorIdx%p.roofRed.length],map:makeRoofTiles(),roughness:.72}); const graniteMat=new THREE.MeshStandardMaterial({color:p.granite,map:makeGranite(256),roughness:.86}); const glassMat=new THREE.MeshStandardMaterial({color:p.glassDay,emissive:p.glassDusk,emissiveIntensity:.45,roughness:.25}); const frameMat=new THREE.MeshStandardMaterial({color:p.windowFrame,roughness:.7}); const g=new THREE.Group(); g.position.set(v.pos[0], ctx.getGroundHeight(v.pos[0],v.pos[1]), v.pos[1]); g.rotation.y=v.rotY; g.add(box(v.w+.16,.9,v.d+.16,0,.45,0,graniteMat)); g.add(box(v.w,v.floors*3.2,v.d,0,.9+v.floors*1.6,0,wallMat)); g.add(roofMesh(v,roofMat)); addWindows(g,v,frameMat,glassMat); for(let i=0;i<v.chimneys;i++) g.add(box(.7,1.8,.7,(i?-.25:.25)*v.w,v.floors*3.2+2.6,(i?-.15:.18)*v.d,roofMat)); if(v.porch){ g.add(box(3,.16,2,0,1.15,v.d/2+1,graniteMat), box(.22,1.7,.22,-1,1.95,v.d/2+1.3,frameMat), box(.22,1.7,.22,1,1.95,v.d/2+1.3,frameMat)); } if(v.balcony){ g.add(box(3,.18,1.1,0,4.2,v.d/2+.7,frameMat)); }
  if(v.tower){ const tw=v.tower.round?new THREE.CylinderGeometry(1.8,2, v.floors*3.2+2, 16):new THREE.BoxGeometry(3.4,v.floors*3.2+2,3.4); const m=new THREE.Mesh(tw,wallMat); m.position.set(v.w/2-1.5,(v.floors*3.2+2)/2+.9,v.d/2-1.5); m.castShadow=m.receiveShadow=true; g.add(m); }
  const yardMat=new THREE.MeshStandardMaterial({color:p.graniteDark,roughness:.8}); const hedgeMat=new THREE.MeshStandardMaterial({color:p.hedge,roughness:.9}); const yw=v.w+8, yd=v.d+8; [[0,yd/2,yw, .28],[0,-yd/2,yw,.28],[yw/2,0,.28,yd],[-yw/2,0,.28,yd]].forEach(([x,z,w,d])=>{ g.add(box(w,1,d,x,.5,z,yardMat)); g.add(box(w,1.3,d,x,1.45,z,hedgeMat)); });
  if(ctx.colliders){ ctx.colliders.addAabb(v.pos[0],v.pos[1],v.w+1,v.d+1,'villa'); ctx.colliders.addAabb(v.pos[0],v.pos[1],yw,yd,'yard'); } return g; }
function colorize(geo, color) {
  const c = new THREE.Color(color);
  const colors = new Float32Array(geo.attributes.position.count * 3);
  for (let i = 0; i < geo.attributes.position.count; i++) colors.set([c.r, c.g, c.b], i * 3);
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}
function transformedBox(w, h, d, matrix, color) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.applyMatrix4(matrix);
  return colorize(geo, color);
}
function villaMatrix(v, x, y, z) {
  return new THREE.Matrix4()
    .makeRotationY(v.rotY)
    .premultiply(new THREE.Matrix4().makeTranslation(v.pos[0], 0, v.pos[1]))
    .multiply(new THREE.Matrix4().makeTranslation(x, y, z));
}
export function createVillas(ctx){
  const p = ctx.config?.PALETTE || PALETTE;
  const group = new THREE.Group();
  const walls = [], roofs = [], granite = [], glass = [], frames = [], hedges = [];
  for (const v of VILLAS) {
    const ground = ctx.getGroundHeight(v.pos[0], v.pos[1]);
    const base = new THREE.Matrix4().makeTranslation(0, ground, 0).multiply(new THREE.Matrix4().makeRotationY(v.rotY));
    const world = (x, y, z) => new THREE.Matrix4().makeTranslation(v.pos[0], ground, v.pos[1]).multiply(new THREE.Matrix4().makeRotationY(v.rotY)).multiply(new THREE.Matrix4().makeTranslation(x, y, z));
    granite.push(transformedBox(v.w + .16, .9, v.d + .16, world(0, .45, 0), p.granite));
    walls.push(transformedBox(v.w, v.floors * 3.2, v.d, world(0, .9 + v.floors * 1.6, 0), p.wallWarm[v.wallColorIdx % p.wallWarm.length]));
    const roofH = v.roof === 'mansard' ? 2.6 : 2.1;
    const roof = new THREE.ConeGeometry(Math.max(v.w, v.d) * .72, roofH, 4);
    roof.rotateY(Math.PI / 4);
    roof.scale(1, 1, v.d / v.w);
    roof.applyMatrix4(world(0, v.floors * 3.2 + .9 + roofH / 2, 0));
    roofs.push(colorize(roof, p.roofRed[v.roofColorIdx % p.roofRed.length]));
    for (let level = 0; level < v.floors; level++) {
      const wy = 1.9 + level * 3.2;
      for (const z of [v.d / 2 + .04, -v.d / 2 - .04]) for (let i = -1; i <= 1; i++) {
        const x = i * v.w / 4;
        glass.push(transformedBox(.95, 1.25, .06, world(x, wy, z), p.glassDay));
        frames.push(transformedBox(1.2, .12, .08, world(x, wy + .68, z), p.windowFrame));
        frames.push(transformedBox(1.2, .12, .08, world(x, wy - .68, z), p.windowFrame));
      }
    }
    for (let i = 0; i < v.chimneys; i++) roofs.push(transformedBox(.7, 1.8, .7, world((i ? -.25 : .25) * v.w, v.floors * 3.2 + 2.6, (i ? -.15 : .18) * v.d), p.roofRed[v.roofColorIdx % p.roofRed.length]));
    if (v.tower) walls.push(transformedBox(3.4, v.floors * 3.2 + 2, 3.4, world(v.w / 2 - 1.5, (v.floors * 3.2 + 2) / 2 + .9, v.d / 2 - 1.5), p.wallWarm[v.wallColorIdx % p.wallWarm.length]));
    const yw = v.w + 8, yd = v.d + 8;
    [[0, yd/2, yw, .28], [0, -yd/2, yw, .28], [yw/2, 0, .28, yd], [-yw/2, 0, .28, yd]].forEach(([x,z,w,d]) => {
      granite.push(transformedBox(w, 1, d, world(x, .5, z), p.graniteDark));
      hedges.push(transformedBox(w, 1.3, d, world(x, 1.45, z), p.hedge));
    });
    ctx.colliders?.addAabb(v.pos[0], v.pos[1], v.w + 1, v.d + 1, 'villa');
    ctx.colliders?.addAabb(v.pos[0], v.pos[1], yw, yd, 'yard');
  }
  const materials = {
    walls: new THREE.MeshStandardMaterial({ vertexColors: true, map: makeStucco(256, 100), roughness: .9 }),
    roofs: new THREE.MeshStandardMaterial({ vertexColors: true, map: makeRoofTiles(), roughness: .72 }),
    granite: new THREE.MeshStandardMaterial({ vertexColors: true, map: makeGranite(256), roughness: .86 }),
    glass: new THREE.MeshStandardMaterial({ vertexColors: true, emissive: p.glassDusk, emissiveIntensity: .45, roughness: .25 }),
    frames: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .7 }),
    hedges: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .9 }),
  };
  for (const [name, geos] of Object.entries({ walls, roofs, granite, glass, frames, hedges })) {
    if (!geos.length) continue;
    const mesh = new THREE.Mesh(mergeGeometries(geos), materials[name]);
    mesh.name = `batched-villa-${name}`;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
  }
  ctx.scene.add(group);
  return {group};
}
