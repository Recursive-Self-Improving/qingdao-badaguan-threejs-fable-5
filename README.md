# 青島 · 八大關

一个零外部资产的 three.js / Vite 互动虚拟景观。场景以深秋黄昏的青岛八大关为蓝本，程序化生成红瓦别墅、道路树阵、花石楼海岬、第二海水浴场、海雾、海鸥和 WebAudio 氛围声。

## 操作

- 点击「开始游览」后锁定鼠标。
- `W/A/S/D` 或方向键移动，`Shift` 跑步。
- 鼠标转视角，`Esc` 打开帮助。
- `1` 黄昏、`2` 晴午、`3` 海雾，也可点右上按钮切换。

## 运行

```bash
npm i
npm run dev
```

## 截图

- `screenshots/phase-0.png`：加载完成首屏。
- `screenshots/phase-11-dusk.png`：黄昏出生点银杏道。
- `screenshots/phase-11-fog.png`：海雾模式灯晕。

## 构建记录

当前 `npm run build` 输出主 JS：431.08 kB（gzip 111.34 kB），低于 todo 目标的 800 kB gzip 前。
