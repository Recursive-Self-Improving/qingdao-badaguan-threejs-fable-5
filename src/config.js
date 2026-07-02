export const PALETTE = {
  roofRed: ['#a83f2c', '#b5502f', '#933526', '#c05a35'],
  wallWarm: ['#e8d9b0', '#f0e6cc', '#e6c9a8', '#e9d5c3', '#dfc9b4'],
  granite: '#9a938a', graniteDark: '#7d766e', princessGreen: '#3f6151',
  windowFrame: '#f5f2ea', glassDusk: '#ffd9a0', glassDay: '#8fb6c8',
  ginkgo: '#f2c14e', mapleRed: '#c8502e', planeTree: '#c9a24b',
  cedar: '#2e4a34', blackPine: '#26382b', peach: '#7d9b4e',
  crapeMyrtle: '#b7793f', crabapple: '#a8913f', grass: '#4a6b3a', hedge: '#395430',
  road: '#5c5850', sidewalk: '#8f887c', curb: '#a29a8c', sand: '#d9c49a', rock: '#5a564f',
  seaDeep: '#1a4f63', seaShallow: '#2e7d8c', lampGlow: '#ffc773',
};
export const PRESETS = {
  dusk: { label: '黄昏', elevation: 10, azimuth: 225, fogDensity: 0.0032, fogColor: '#c8a288', exposure: 0.9, sunColor: '#ffb36b', sunIntensity: 2.6, hemiSky: '#7f97c9', hemiGround: '#8a6a4d', hemiIntensity: 0.55, bloom: 0.22, sky: { turbidity: 8, rayleigh: 2.2, mieCoefficient: 0.008, mieDirectionalG: 0.85 }, cloudColor: '#ffd1a0' },
  day: { label: '晴午', elevation: 55, azimuth: 200, fogDensity: 0.0018, fogColor: '#cfe0e8', exposure: 1.0, sunColor: '#fff4e0', sunIntensity: 3.2, hemiSky: '#bcd8f0', hemiGround: '#6b7a50', hemiIntensity: 0.8, bloom: 0.18, sky: { turbidity: 4, rayleigh: 1.2, mieCoefficient: 0.004, mieDirectionalG: 0.75 }, cloudColor: '#ffffff' },
  fog: { label: '海雾', elevation: 25, azimuth: 225, fogDensity: 0.012, fogColor: '#b8c4c6', exposure: 0.75, sunColor: '#cfd8da', sunIntensity: 0.9, hemiSky: '#b8c4c6', hemiGround: '#7b8580', hemiIntensity: 0.45, bloom: 0.45, sky: { turbidity: 9, rayleigh: 0.5, mieCoefficient: 0.012, mieDirectionalG: 0.9 }, cloudColor: '#c6d0d0' },
};
export const ROADS = [
  { name: '武胜关路', points: [[-170, -75], [170, -75]], width: 7, tree: 'juniper', orientation: 'east-west' },
  { name: '正阳关路', points: [[-170, -10], [170, -10]], width: 8, tree: 'crapeMyrtle', orientation: 'east-west' },
  { name: '山海关路', points: [[-170, 55], [170, 55]], width: 7, tree: 'planeTree', orientation: 'east-west' },
  { name: '黄海路', points: [[-60, 85], [40, 85], [58, 92]], width: 6, tree: 'blackPine', orientation: 'east-west' },
  { name: '韶关路', points: [[-120, -160], [-124, -75], [-118, -10], [-120, 55]], width: 6, tree: 'peach', orientation: 'north-south' },
  { name: '宁武关路', points: [[-60, -160], [-60, 55]], width: 6, tree: 'crabapple', orientation: 'north-south' },
  { name: '居庸关路', points: [[0, -160], [0, 55]], width: 7, tree: 'ginkgo', orientation: 'north-south' },
  { name: '紫荆关路', points: [[60, -160], [60, 55], [58, 92]], width: 6, tree: 'cedar', orientation: 'north-south' },
  { name: '嘉峪关路', points: [[115, -160], [115, 55]], width: 6, tree: 'maple', orientation: 'north-south' },
];
export const TREE_SPECIES = {
  ginkgo: { label: '银杏', color: PALETTE.ginkgo }, maple: { label: '五角枫', color: PALETTE.mapleRed }, cedar: { label: '雪松', color: PALETTE.cedar },
  planeTree: { label: '法桐', color: PALETTE.planeTree }, blackPine: { label: '黑松', color: PALETTE.blackPine }, juniper: { label: '龙柏', color: PALETTE.cedar },
  peach: { label: '碧桃', color: PALETTE.peach }, crabapple: { label: '海棠', color: PALETTE.crabapple }, crapeMyrtle: { label: '紫薇', color: PALETTE.crapeMyrtle },
};
export const PLAYER = { spawn: [0, -55], yaw: Math.PI };
export const POIS = [
  { title: '花石楼', body: '1930年代花岗岩古堡式别墅，蒋介石曾下榻', x: 60, z: 100, r: 18 },
  { title: '公主楼', body: '丹麦童话风格，居庸关路10号', x: 4, z: -42, r: 14 },
  { title: '蝴蝶楼', body: '1934年，影星胡蝶在此拍摄《劫后桃花》', x: -32, z: 48, r: 14 },
  { title: '居庸关路银杏道', body: '一关一树：居庸关路的银杏', x: 0, z: -30, r: 10 },
  { title: '第二海水浴场', body: '山海关路以南的沙滩与礁石海岸', x: -60, z: 90, r: 25 },
  { title: '元帅楼', body: '近代和风二层小楼，多位元帅曾下榻', x: -12, z: 48, r: 14 },
];
export const VILLAS = [
  {
    "pos": [
      -148,
      -139
    ],
    "rotY": 0,
    "floors": 2,
    "w": 10,
    "d": 8,
    "roof": "hip",
    "roofColorIdx": 0,
    "wallColorIdx": 0,
    "tower": {
      "corner": 0,
      "round": true
    },
    "porch": true,
    "balcony": true,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      -92,
      -135
    ],
    "rotY": 0,
    "floors": 3,
    "w": 11,
    "d": 11,
    "roof": "gable",
    "roofColorIdx": 1,
    "wallColorIdx": 1,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      -32,
      -131
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 9,
    "roof": "mansard",
    "roofColorIdx": 2,
    "wallColorIdx": 2,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      27,
      -137
    ],
    "rotY": 0,
    "floors": 3,
    "w": 13,
    "d": 12,
    "roof": "hip",
    "roofColorIdx": 3,
    "wallColorIdx": 3,
    "tower": null,
    "porch": false,
    "balcony": true,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      88,
      -133
    ],
    "rotY": 0,
    "floors": 2,
    "w": 14,
    "d": 10,
    "roof": "gable",
    "roofColorIdx": 0,
    "wallColorIdx": 4,
    "tower": {
      "corner": 0,
      "round": false
    },
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      148,
      -139
    ],
    "rotY": 0,
    "floors": 3,
    "w": 15,
    "d": 8,
    "roof": "mansard",
    "roofColorIdx": 1,
    "wallColorIdx": 0,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      -148,
      -105
    ],
    "rotY": 0,
    "floors": 2,
    "w": 10,
    "d": 11,
    "roof": "hip",
    "roofColorIdx": 2,
    "wallColorIdx": 1,
    "tower": null,
    "porch": true,
    "balcony": true,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      -92,
      -101
    ],
    "rotY": 0,
    "floors": 3,
    "w": 11,
    "d": 9,
    "roof": "gable",
    "roofColorIdx": 3,
    "wallColorIdx": 2,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      -32,
      -107
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 12,
    "roof": "mansard",
    "roofColorIdx": 0,
    "wallColorIdx": 3,
    "tower": {
      "corner": 0,
      "round": true
    },
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      27,
      -103
    ],
    "rotY": 0,
    "floors": 3,
    "w": 13,
    "d": 10,
    "roof": "hip",
    "roofColorIdx": 1,
    "wallColorIdx": 4,
    "tower": null,
    "porch": false,
    "balcony": true,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      88,
      -109
    ],
    "rotY": 0,
    "floors": 2,
    "w": 14,
    "d": 8,
    "roof": "gable",
    "roofColorIdx": 2,
    "wallColorIdx": 0,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      148,
      -105
    ],
    "rotY": 0,
    "floors": 3,
    "w": 15,
    "d": 11,
    "roof": "mansard",
    "roofColorIdx": 3,
    "wallColorIdx": 1,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      -148,
      -44
    ],
    "rotY": 0,
    "floors": 2,
    "w": 10,
    "d": 9,
    "roof": "hip",
    "roofColorIdx": 0,
    "wallColorIdx": 2,
    "tower": {
      "corner": 0,
      "round": false
    },
    "porch": true,
    "balcony": true,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      -92,
      -50
    ],
    "rotY": 0,
    "floors": 3,
    "w": 11,
    "d": 12,
    "roof": "gable",
    "roofColorIdx": 1,
    "wallColorIdx": 3,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      -32,
      -46
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 10,
    "roof": "mansard",
    "roofColorIdx": 2,
    "wallColorIdx": 4,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      27,
      -52
    ],
    "rotY": 0,
    "floors": 3,
    "w": 13,
    "d": 8,
    "roof": "hip",
    "roofColorIdx": 3,
    "wallColorIdx": 0,
    "tower": null,
    "porch": false,
    "balcony": true,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      88,
      -48
    ],
    "rotY": 0,
    "floors": 2,
    "w": 14,
    "d": 11,
    "roof": "gable",
    "roofColorIdx": 0,
    "wallColorIdx": 1,
    "tower": {
      "corner": 0,
      "round": true
    },
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      148,
      -44
    ],
    "rotY": 0,
    "floors": 3,
    "w": 15,
    "d": 9,
    "roof": "mansard",
    "roofColorIdx": 1,
    "wallColorIdx": 2,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      -148,
      16
    ],
    "rotY": 0,
    "floors": 2,
    "w": 10,
    "d": 12,
    "roof": "hip",
    "roofColorIdx": 2,
    "wallColorIdx": 3,
    "tower": null,
    "porch": true,
    "balcony": true,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      -92,
      20
    ],
    "rotY": 0,
    "floors": 3,
    "w": 11,
    "d": 10,
    "roof": "gable",
    "roofColorIdx": 3,
    "wallColorIdx": 4,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      -32,
      14
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 8,
    "roof": "mansard",
    "roofColorIdx": 0,
    "wallColorIdx": 0,
    "tower": {
      "corner": 0,
      "round": false
    },
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      27,
      18
    ],
    "rotY": 0,
    "floors": 3,
    "w": 13,
    "d": 11,
    "roof": "hip",
    "roofColorIdx": 1,
    "wallColorIdx": 1,
    "tower": null,
    "porch": false,
    "balcony": true,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      88,
      22
    ],
    "rotY": 0,
    "floors": 2,
    "w": 14,
    "d": 9,
    "roof": "gable",
    "roofColorIdx": 2,
    "wallColorIdx": 2,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      148,
      16
    ],
    "rotY": 0,
    "floors": 3,
    "w": 15,
    "d": 12,
    "roof": "mansard",
    "roofColorIdx": 3,
    "wallColorIdx": 3,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      -148,
      38
    ],
    "rotY": 0,
    "floors": 2,
    "w": 10,
    "d": 10,
    "roof": "hip",
    "roofColorIdx": 0,
    "wallColorIdx": 4,
    "tower": {
      "corner": 0,
      "round": true
    },
    "porch": true,
    "balcony": true,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      -92,
      32
    ],
    "rotY": 0,
    "floors": 3,
    "w": 11,
    "d": 8,
    "roof": "gable",
    "roofColorIdx": 1,
    "wallColorIdx": 0,
    "tower": null,
    "porch": false,
    "balcony": false,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "cedar"
    ]
  },
  {
    "pos": [
      33,
      36
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 11,
    "roof": "mansard",
    "roofColorIdx": 2,
    "wallColorIdx": 1,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "planeTree"
    ]
  },
  {
    "pos": [
      85,
      40
    ],
    "rotY": 0,
    "floors": 3,
    "w": 13,
    "d": 9,
    "roof": "hip",
    "roofColorIdx": 3,
    "wallColorIdx": 2,
    "tower": null,
    "porch": false,
    "balcony": true,
    "chimneys": 2,
    "graniteBase": true,
    "yardTrees": [
      "peach"
    ]
  },
  {
    "pos": [
      145,
      34
    ],
    "rotY": 0,
    "floors": 2,
    "w": 14,
    "d": 12,
    "roof": "gable",
    "roofColorIdx": 0,
    "wallColorIdx": 3,
    "tower": {
      "corner": 0,
      "round": false
    },
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "ginkgo"
    ]
  },
  {
    "pos": [
      140,
      15
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 9,
    "roof": "hip",
    "roofColorIdx": 1,
    "wallColorIdx": 4,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "crabapple"
    ]
  },
  {
    "pos": [
      150,
      50
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 9,
    "roof": "hip",
    "roofColorIdx": 2,
    "wallColorIdx": 0,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "crabapple"
    ]
  },
  {
    "pos": [
      160,
      85
    ],
    "rotY": 0,
    "floors": 2,
    "w": 12,
    "d": 9,
    "roof": "hip",
    "roofColorIdx": 3,
    "wallColorIdx": 1,
    "tower": null,
    "porch": true,
    "balcony": false,
    "chimneys": 1,
    "graniteBase": true,
    "yardTrees": [
      "crabapple"
    ]
  }
];
export const CONFIG = { PALETTE, PRESETS, ROADS, TREE_SPECIES, PLAYER, POIS, VILLAS };
