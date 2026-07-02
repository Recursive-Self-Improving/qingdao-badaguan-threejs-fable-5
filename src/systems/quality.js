function applyQualityState(ctx, state) {
  const mobileRatio = matchMedia('(pointer: coarse)').matches ? 1.25 : Math.min(devicePixelRatio || 1, 2);
  ctx.renderer.setPixelRatio(state >= 1 ? 1.25 : mobileRatio);
  if (ctx.postfx) ctx.postfx.enabled = state < 2;
  if (ctx.sky?.sun) ctx.sky.sun.shadow.mapSize.set(state >= 3 ? 1024 : 2048, state >= 3 ? 1024 : 2048);
}

export function createQuality(ctx) {
  const samples = [];
  let state = matchMedia('(pointer: coarse)').matches ? 1 : 0;
  let cool = 0;
  if (state) ctx.overlay?.classList.add('coarse');
  applyQualityState(ctx, state);
  return {
    update(dt) {
      samples.push(1 / dt);
      if (samples.length > 180) samples.shift();
      const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
      cool += dt;
      if (samples.length > 120 && avg < 45 && cool > 3 && state < 3) {
        state++;
        cool = 0;
        applyQualityState(ctx, state);
      }
      if (avg > 56 && cool > 15 && state > (matchMedia('(pointer: coarse)').matches ? 1 : 0)) {
        state--;
        cool = 0;
        applyQualityState(ctx, state);
      }
    },
  };
}
