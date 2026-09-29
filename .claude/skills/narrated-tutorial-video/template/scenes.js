// 影片唯一內容來源：畫面 + 廣東話旁白（每個 step = 一句旁白 = 一句字幕）。
// step 可以係字串，或者 { say, sub }：say = 配音讀嘅廣東話口語，sub = 畫面字幕嘅書面語（預設要咁寫）。
// 畫面上嘅文字（標題、item、卡片）一律用書面語；==關鍵字== 會用高亮色（字幕同畫面都得）。
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
    steps: [
      { say: '歡迎收睇，呢個係示範影片。', sub: '歡迎收看，這是示範影片。' },
      { say: '下面逐一示範每種版面。', sub: '以下逐一示範各種版面。' },
    ],
  },
  {
    layout: 'chapter',
    no: '01',
    title: '章節卡',
    subtitle: '分段原則：每個大部分之前加一張',
    steps: ['第一部分。'],
  },
  {
    layout: 'bignum',
    kicker: '大數字開場',
    value: '945',
    unit: 'TWh',
    label: '一個關鍵數字，配一句==重點說明==',
    more: '可選：第二句補充，喺第二句旁白出現',
    moreAt: 1,
    source: '資料來源',
    steps: ['大數字版面，適合開場震撼。', '補充說明。'],
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
    layout: 'stats',
    kicker: '數字',
    title: '數字卡版面',
    items: [
      { at: 1, value: '415', unit: 'TWh', label: '大數字 + 單位', source: '資料來源' },
      { at: 2, value: '瓶頸', label: '數字以外亦可放短詞', hl: true }, // hl = 用高亮色
    ],
    steps: ['數字卡版面。', '每張卡逐一出現。', '重點卡可以用高亮色。'],
  },
  {
    layout: 'compare',
    kicker: '對比',
    title: '左右對比版面',
    left: { title: '🌍 甲方案', at: 1, items: [{ at: 1, text: '左邊要點' }] },
    right: { title: '🛰️ 乙方案', at: 2, items: [{ at: 2, text: '右邊要點' }] },
    steps: ['左右對比版面。', '左邊先出。', '右邊後出。'],
  },
  {
    layout: 'hub',
    kicker: '關係',
    title: '放射圖版面',
    center: '中心\n主題',
    tag: '可選：角標',
    nodes: [
      { at: 1, icon: '🚗', title: '節點一', text: '說明' },
      { at: 1, icon: '🛰️', title: '節點二', text: '說明' },
      { at: 2, icon: '🧠', title: '節點三', text: '說明' },
      { at: 2, icon: '💬', title: '節點四', text: '說明' },
    ],
    steps: ['放射圖版面。', '節點可以分批出現。', '最多建議六個節點。'],
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
