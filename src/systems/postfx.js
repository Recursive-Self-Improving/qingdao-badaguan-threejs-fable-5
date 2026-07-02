import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as THREE from 'three';
export function createPostfx(ctx){ const composer=new EffectComposer(ctx.renderer); const renderPass=new RenderPass(ctx.scene,ctx.camera); const bloom=new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),.22,.5,.85); composer.addPass(renderPass); composer.addPass(bloom); composer.addPass(new OutputPass()); window.addEventListener('resize',()=>composer.setSize(window.innerWidth,window.innerHeight)); ctx.postfx={composer,bloom,enabled:true, render(){ composer.render(); }}; return {render(){composer.render();}, update(){}}; }
