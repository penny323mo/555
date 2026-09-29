// 影片唯一內容來源：畫面 + 廣東話旁白（每個 step = 一句旁白 = 一句字幕）。
// item 嘅 `at` = 喺第幾個 step（0 起）出現；flow 嘅 `hl` = 喺第幾個 step 高亮。
window.META = {
  slug: 'my-tutorial', // 輸出檔名：my-tutorial.yue.mp4
  title: '示範教學', // 旁白稿標題
  brand: '<b>DEMO</b> × Tutorial', // 左上角
  stages: ['Step A', 'Step B', 'Step C'], // scene 有 `stage: n` 就顯示頂部進度 pill
};

window.SCENES = [
  {
    layout: 'title',
    title: 'Demo Tutorial',
    subtitle: '一句副標題',
    chips: ['Tag 1', 'Tag 2'],
    steps: ['歡迎收睇，呢個係示範影片。', '下面逐一示範每種版面。'],
  },
  {
    layout: 'bullets',
    kicker: '要點',
    title: '清單版面',
    tone: 'good', // good = 綠邊、bad = 紅邊、省略 = 無
    quote: '可選：一句重點引言',
    items: [
      { at: 1, icon: '⚡', text: '第一點' },
      { at: 2, icon: '🧠', text: '第二點' },
    ],
    steps: ['清單版面，每句旁白出一點。', '第一點。', '第二點。'],
  },
  {
    layout: 'flow',
    kicker: '流程',
    title: '流程版面',
    items: [
      { hl: 1, en: 'Step A', zh: '甲', desc: '描述' },
      { hl: 2, en: 'Step B', zh: '乙', desc: '描述' },
      { hl: 3, en: 'Step C', zh: '丙', desc: '描述' },
    ],
    loopText: '↺ 最後一步出現嘅提示',
    steps: ['流程分三步。', '第一步。', '第二步。', '第三步。'],
  },
  {
    layout: 'file',
    stage: 1,
    file: 'docs/example.md',
    chunks: [
      { at: 0, lines: ['# 標題', '', '## 小節', '- 內容'] },
      { at: 1, lines: ['', '## 驗收條件', '- AC1 Given…, Then…'] },
    ],
    notes: [
      { at: 0, text: '右邊註解' },
      { at: 1, text: '重點註解', strong: true },
    ],
    steps: ['檔案版面會逐行打出內容。', '第二段內容出現。'],
  },
  {
    layout: 'terminal',
    stage: 2,
    windowTitle: 'Terminal — agent',
    chunks: [
      { at: 0, kind: 'you', lines: ['你打嘅 prompt'] },
      { at: 1, kind: 'agent', lines: ['● agent 做緊嘢', '● $ npm test   ✓'] },
      { at: 2, kind: 'done', lines: ['完成。'] },
    ],
    tips: [
      { at: 0, text: '① 右邊提示' },
      { at: 2, text: '重點提示', strong: true },
    ],
    steps: ['終端機版面。', 'Agent 開始做嘢。', '完成。'],
  },
  {
    layout: 'repo',
    kicker: '結構',
    title: '檔案結構版面',
    tree: ['project/', '├─ CLAUDE.md', '└─ src/ …'],
    treeTitle: '📁 repo',
    rulesTitle: 'CLAUDE.md',
    rules: [
      { at: 1, text: '## 規則' },
      { at: 1, text: '- 規則一' },
      { at: 1, text: '- 重點規則', strong: true },
    ],
    steps: ['左邊係檔案樹。', '右邊係規則。'],
  },
  {
    layout: 'outro',
    title: '重點總結',
    items: [
      { at: 1, text: '重點一' },
      { at: 1, text: '重點二' },
    ],
    closing: { at: 2, text: '結尾金句' },
    steps: ['總結一下。', '兩個重點。', '多謝收睇！'],
  },
];
