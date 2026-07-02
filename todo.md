# 青岛·八大关 three.js 项目 —— 实施清单 (todo.md)

> 配套设计文档：[design.md](./design.md)。**先通读 design.md 再开工。**
> 规则：按 Phase 顺序推进；每个 Phase 末尾的「✅ 出口标准」全部满足才能进入下一 Phase；每 Phase 结束执行 `npm run build` 确认可构建，并截图存 `screenshots/phase-N.png`。
> 所有魔法数字（坐标/颜色/参数）以 design.md 为准，本清单不重复数值。

---

## Phase 0 — 项目脚手架
- [ ] `npm create vite@latest . -- --template vanilla`（保留本 repo 已有文件），`npm i three@^0.185.0`
- [ ] 建立 design.md §5.2 的目录骨架（空模块先导出 no-op `create()`）
- [ ] `index.html`：`#app` 画布容器 + UI overlay 骨架（loading / start / hud / toast 四层 div）+ 关键内联 CSS（满屏、无滚动条、深色底）
- [ ] `src/utils/rng.js`：mulberry32 种子随机 + `pick/range` 工具；全项目**禁止** `Math.random`
- [ ] `src/config.js`：先落 PALETTE、道路表、预设参数表（villas 表 Phase 4 再填）
- [ ] `src/core/renderer.js` + `core/loop.js`：渲染器（ACES、SRGB、pixelRatio 钳制、resize）+ 固定步长循环
- [ ] 冒烟测试：灰色地面 + 一个红色 Box + 可旋转测试相机，60 FPS
- [ ] 建 repo 级 `CLAUDE.md`（含 Lessons 空节），`.gitignore`（node_modules/dist/screenshots 除 phase 截图外）

**✅ 出口标准**：`npm run dev` 打开是干净的 3D 画面，无 console 报错；`npm run build` 通过。

## Phase 1 — 地形 / 天空 / 光照（场景骨架）
- [ ] `world/terrain.js`：城区平台 + 沙滩坡道 + 海岬岩台三段地面；实现并导出 `getGroundHeight(x,z)`（含花石楼石阶特例的占位）
- [ ] `world/skybox.js`：Sky addon + 太阳方向计算；DirectionalLight + HemisphereLight；三预设参数表接入（先只实现黄昏，切换逻辑 Phase 8）
- [ ] 太阳阴影：2048² PCFSoft、±90 m 正交盒、texel 对齐防闪烁（先跟随原点，Phase 5 改跟随玩家）
- [ ] FogExp2 按黄昏预设接入；`camera.far = 450`
- [ ] 程序云 billboard（可先用纯白圆片占位，Phase 2 换贴图）

**✅ 出口标准**：黄昏光照下的空地形有正确的暖色调、长影子、地平线雾色与天空自然衔接。

## Phase 2 — 程序化贴图工厂（质量地基，宁慢勿糙）
- [ ] `utils/textures.js`：fbm/value-noise 基础函数（用 rng 种子）
- [ ] 依次实现并调优：`makeStucco / makeRoofTiles / makeGranite / makeAsphalt / makeSand / makeGrass / makePlaneBark / makeWaterNormalTexture / makeLeafAlpha / makeGlowSprite / makeCloud / makeSignText / makeFoamStrip`
- [ ] dev 专用 `texture-lab.html`：网格展示全部贴图 + 种子/参数快速刷新
- [ ] 逐张人工核验：瓦纹在 3 m 距离可辨、花岗岩没有明显平铺重复感、水法线无十字接缝

**✅ 出口标准**：texture-lab 截图里每张贴图单独看都「不廉价」；无外部图片文件被引入。

## Phase 3 — 海洋与海岸
- [ ] `world/ocean.js`：Water addon + 程序水法线；反射 RT 512²；黄昏水色/太阳色参数
- [ ] 沙滩干湿分界着色；岸线泡沫带 3 条（噪声 alpha、周期平移+透明度呼吸，暴露 `wavePhase()` 供 audio 对相）
- [ ] 礁石群（海岬东/南水中 8–14 块）+ 礁石白浪环
- [ ] 从沙滩视角与从高处（临时飞行相机）分别核对：日光带反射、水色随距离变深

**✅ 出口标准**：站在沙滩看海 60 FPS；黄昏日光带明显；泡沫带运动自然不穿帮。

## Phase 4 — 道路网与样板别墅
- [ ] `world/roads.js`：按 config 道路表挤出车行道/人行道/路缘；交叉口错层防 z-fighting；按材质 merge ≤6 网格
- [ ] `world/villa.js`：实现 §6.4 全部规则；**先造 1 栋样板房**，四个方向截图核对（窗对齐、挑檐、烟囱、墙基、无穿模）
- [ ] 样板房通过后：写生成脚本按 §4.3 规则预生成 32 栋记录 → **固化进 config.villas**（含院墙/庭院树字段）
- [ ] 批量生成 32 栋 + 院墙/绿篱/铁艺门；按材质大合并，统计 draw call（别墅合计 ≤8）
- [ ] 每栋登记 AABB 碰撞体（先只登记，碰撞求解 Phase 5）

**✅ 出口标准**：沿正阳关路走（临时相机）两侧别墅错落、红瓦米墙、无两栋雷同感；drawcall 达标。

## Phase 5 — 玩家控制与碰撞
- [ ] `systems/player.js`：PointerLockControls + WASD/Shift；加速度/阻尼参数照 §6.10；眼高贴合 `getGroundHeight` + 平滑；步行摆动
- [ ] `systems/collision.js`：空间哈希宽相 + AABB/圆窄相推挤滑动；世界边界；岸线不可见墙；花石楼石阶斜坡高度接入 getGroundHeight
- [ ] 出生点与朝向照 §4.3；阴影盒改为跟随玩家
- [ ] PointerLock 失败自动退回拖拽视角模式
- [ ] `?debug`：碰撞体线框可视化 + 自绘 FPS/drawcall 面板
- [ ] 手测：贴墙走不抖、墙角滑动顺畅、上下沙滩坡不弹跳、跑步 10 分钟不出界不穿模

**✅ 出口标准**：以玩家视角走完 §4.4 全程动线无任何卡死/穿模/高度跳变。

## Phase 6 — 地标建筑
- [ ] `world/landmarks.js`：**花石楼**（圆塔+多角塔、雉堞垛口 instancing、花岗岩贴图、尖拱窗、观景平台+宝瓶栏杆+石阶+石尊）——对照 design §6.5 逐项
- [ ] 公主楼（墨绿陡坡顶+方塔）
- [ ] 蝴蝶楼、元帅楼（villa 生成器特化 + 门口铭牌）
- [ ] 花石楼海岬周边：栏杆、石阶与碰撞/高度联调
- [ ] 从紫荆关路南望、从沙滩东望、从平台近看三个机位截图核对花石楼辨识度

**✅ 出口标准**：不看文字标注，花石楼一眼可认（灰石+圆塔+垛口）；公主楼墨绿醒目。

## Phase 7 — 植被系统
- [ ] `world/trees.js`：9 个树种工厂（银杏/五角枫/雪松/法桐/黑松/龙柏/碧桃/海棠/紫薇），每种干+冠 InstancedMesh，实例随机 scale/rotY/颜色微扰
- [ ] 冠部顶点噪声扰动 + 顶点色上下渐变 + `onBeforeCompile` 微摆动
- [ ] 沿路布置照 §6.6（树种↔道路映射**必须**照 design §2.2 表）；银杏加密成隧道；庭院树；海滨黑松；空地补树；树干碰撞体登记
- [ ] 银杏/枫树街的地面落叶贴花 + 单叶散布
- [ ] 核对：居庸关路银杏隧道效果（出生点第一眼）、嘉峪关路红枫、紫荆关路雪松高耸

**✅ 出口标准**：站在任意路口能凭树色分辨至少 3 条不同的路；总 drawcall 增量 ≈20。

## Phase 8 — 大气、粒子与预设切换
- [ ] `systems/atmosphere.js`：三预设完整参数切换（雾/太阳/曝光/bloom/云色/窗灯/路灯），1.5 s 插值过渡，键 1/2/3 + UI 按钮
- [ ] 飘落叶粒子（40 m 激活圈、风场同步）；全局 `wind` 对象接树摇/水面/落叶
- [ ] 海鸥：10 只椭圆航线巡飞 + 拍翅 + 偶发俯冲
- [ ] 海雾模式：近地雾片 billboard、bloom 增强、路灯光晕放大
- [ ] `systems/postfx.js`：EffectComposer(Render+UnrealBloom+Output) 正式接入（此前用直渲）

**✅ 出口标准**：三预设各截一张图，氛围差异巨大且各自成立；切换过渡无跳变。

## Phase 9 — 声音
- [ ] `systems/audio.js`：海浪（粉噪+LFO低通+8–12s 包络，与 `wavePhase()` 对相）、风叶沙沙、海鸥鸣（与巡飞联动）、雾号（仅海雾模式）
- [ ] 距离衰减：浪声随离岸距离；确认在北端街区浪声几乎不可闻
- [ ] AudioContext 在「开始游览」点击后创建；标签页失焦自动静音
- [ ] 音量平衡：浪 > 风 > 鸥 >> 雾号；总响度低（氛围声，不喧宾夺主）

**✅ 出口标准**：闭眼站在花石楼平台 30 秒，声音本身能传达「秋日海滨黄昏」。

## Phase 10 — UI / HUD / 引导
- [ ] 加载屏（标题「青島 · 八大關」+ 副标 + 真实进度）→「开始游览」按钮
- [ ] HUD：左下当前路名（坐标→道路距离判定）、右下按键提示（10 s 淡出）、右上预设切换按钮
- [ ] 6 个 POI toast（文案/半径照 §6.11），会话内去重
- [ ] Esc 暂停/帮助覆盖层；PointerLock 恢复
- [ ] 触摸兜底：虚拟摇杆+右半屏拖动（若时间紧可降级为「建议桌面体验」提示，但提示必须有）
- [ ] 14 块路口街牌确认可读、与 HUD 路名一致

**✅ 出口标准**：不给任何口头说明，新用户 30 秒内能开始行走并知道自己在哪条路。

## Phase 11 — 性能与最终验收
### 性能
- [ ] `systems/quality.js`：3 s 平均 FPS<45 阶梯降质（pixelRatio→bloom→阴影），15 s 迟滞恢复；`pointer: coarse` 低档起步
- [ ] 静物 `matrixAutoUpdate=false`；运行期零几何/材质分配（用 `?debug` 面板抽查）
- [ ] 预算核对：drawcall ≤250、三角形 ≤120 万、贴图 ≤40 MB、加载 <3 s（`npm run build && npm run preview` 实测）
- [ ] Chrome / Firefox / Safari(如可用) 通过；窗口任意 resize 不破版

### 氛围验收（硬标准，全过才算完成）
- [ ] ① 出生第一眼：金黄银杏隧道尽头见海，构图成立
- [ ] ② 花石楼平台黄昏：海面日光带 + 浪声 + 海鸥掠过，可截图当海报
- [ ] ③ 三条路凭树色即可区分（银杏金/枫红/雪松绿）
- [ ] ④ 黄昏别墅窗灯 + 路灯光晕，红瓦被夕阳染亮
- [ ] ⑤ 海雾模式：能见度骤降、灯晕弥漫、雾号隐约，与黄昏判若两地
- [ ] ⑥ 晴午模式呈现标准「红瓦绿树、碧海蓝天」
- [ ] ⑦ 沙滩浪线泡沫运动与浪声同步
- [ ] ⑧ 全程游览动线（§4.4）无穿模/卡死/明显 LOD 跳变
- [ ] ⑨ 树种↔道路映射与 design §2.2 完全一致（对照表逐条查）

### 收尾
- [ ] README.md：一段简介 + 操作说明 + 截图 3 张 + `npm i && npm run dev`
- [ ] 更新 repo 级 CLAUDE.md Lessons（记录实现中踩过的坑）
- [ ] 最终 build 产物体积记录（目标：JS bundle < 800 KB gzip 前）
