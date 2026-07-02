# Project Agent Notes

## Lessons

- Vite 7 + three 0.185 builds this project with a main ESM bundle of about 427 kB before gzip after the texture-lab split.
- Browser audio must be started from the UI click path; `systems/audio.js` creates `AudioContext` only after `start`.
- Keep route/tree authenticity in `src/config.js`; tests assert the design §2.2 mapping.
- Expose `window.__BADAGUAN__` in dev/runtime QA so browser checks can inspect renderer stats and scene state without adding debug dependencies.
