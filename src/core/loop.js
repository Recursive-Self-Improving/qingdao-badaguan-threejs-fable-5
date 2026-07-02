export function createLoop({ renderer, camera, scene, render } = {}) {
  const updates = [];
  let running = false, raf = 0, previous = performance.now(), acc = 0, frames = 0, lastFps = previous, fps = 60;
  const fixedDt = 1 / 60;
  function add(system) { if (system?.update) updates.push(system.update.bind(system)); }
  function frame(now) {
    if (!running) return;
    let dt = Math.min((now - previous) / 1000, 0.05);
    previous = now; acc += dt;
    while (acc >= fixedDt) { for (const update of updates) update(fixedDt, now / 1000); acc -= fixedDt; }
    frames++;
    if (now - lastFps > 500) { fps = frames * 1000 / (now - lastFps); frames = 0; lastFps = now; }
    if (render) render(dt, now / 1000); else renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  return { add, start() { if (!running) { running = true; previous = performance.now(); raf = requestAnimationFrame(frame); } }, stop() { running = false; cancelAnimationFrame(raf); }, get fps() { return fps; } };
}
