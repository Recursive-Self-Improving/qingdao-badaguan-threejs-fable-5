import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ROADS, PALETTE } from '../config.js';
import { makeAsphalt } from '../utils/textures.js';

function segmentBox(p0,p1,width,height,y,zOffset=0){ const [x0,z0]=p0,[x1,z1]=p1; const len=Math.hypot(x1-x0,z1-z0); const geo=new THREE.BoxGeometry(width,height,len); const mid=new THREE.Vector3((x0+x1)/2,y,(z0+z1)/2); const angle=Math.atan2(x1-x0,z1-z0); geo.rotateY(angle); geo.translate(mid.x,mid.y,mid.z+zOffset); return geo; }
export function createRoads(ctx){ const roadGeos=[],walkGeos=[],curbGeos=[]; for(const road of ROADS){ for(let i=0;i<road.points.length-1;i++){ const a=road.points[i],b=road.points[i+1],baseY=ctx.getGroundHeight((a[0]+b[0])/2,(a[1]+b[1])/2)+0.025; roadGeos.push(segmentBox(a,b,road.width,.05,baseY)); walkGeos.push(segmentBox(a,b,road.width+4,.06,baseY-.01)); curbGeos.push(segmentBox(a,b,road.width+4.4,.05,baseY-.025)); } }
  const roadMat=new THREE.MeshStandardMaterial({color:PALETTE.road,map:makeAsphalt(),roughness:.9,polygonOffset:true,polygonOffsetFactor:-1}); roadMat.map.repeat.set(10,10);
  const walkMat=new THREE.MeshStandardMaterial({color:PALETTE.sidewalk,roughness:.85}); const curbMat=new THREE.MeshStandardMaterial({color:PALETTE.curb,roughness:.85});
  const group=new THREE.Group(); [['road',roadGeos,roadMat],['sidewalk',walkGeos,walkMat],['curb',curbGeos,curbMat]].forEach(([name,geos,mat])=>{ const mesh=new THREE.Mesh(mergeGeometries(geos),mat); mesh.name=name; mesh.receiveShadow=true; group.add(mesh); }); ctx.scene.add(group); return {group}; }
export function nearestRoadName(x,z){ let best={d:Infinity,name:''}; for(const road of ROADS){ for(let i=0;i<road.points.length-1;i++){ const [x0,z0]=road.points[i], [x1,z1]=road.points[i+1]; const dx=x1-x0,dz=z1-z0,l2=dx*dx+dz*dz; const t=Math.max(0,Math.min(1,((x-x0)*dx+(z-z0)*dz)/l2)); const px=x0+t*dx,pz=z0+t*dz; const d=Math.hypot(x-px,z-pz)-road.width/2; if(d<best.d)best={d,name:road.name}; } } return best.d<15?best.name:(z>75?'第二海水浴场':'八大关街区'); }
