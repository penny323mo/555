// 教學影片嘅唯一內容來源：畫面 + 旁白字幕都喺呢度定義。
// 每個 scene 有 layout 同 steps；每個 step = 一句旁白字幕。
// item 嘅 `at` = 喺第幾個 step 出現；`hl` = 喺第幾個 step 被高亮。
window.SCENES = [
  {
    layout: 'title',
    title: 'Spec-Driven Development',
    subtitle: '用規格驅動 Coding Agent 寫 code',
    chips: ['Claude Code', 'GitHub Spec Kit', 'Kiro'],
    steps: [
      '歡迎收睇。今集講 Spec-Driven Development，中文可以叫「規格驅動開發」。',
      '目標好實際：點樣用一份 spec，令 coding agent 寫出你真正想要嘅 code。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '問題',
    title: 'Vibe coding：一句 prompt 就開工',
    items: [
      { at: 1, icon: '🎲', text: '「幫我加個 °F 功能」→ 需求模糊，agent 自己估' },
      { at: 2, icon: '🌀', text: '一次過改咗十幾個 file，唔知邊啲係必要' },
      { at: 3, icon: '🫥', text: '開新 session，之前傾過嘅決定全部唔記得' },
      { at: 4, icon: '🤷', text: 'Review 冇標準：「睇落 OK」就 merge' },
    ],
    tone: 'bad',
    steps: [
      '好多人用 AI 寫 code 嘅方式係：打一句 prompt，等佢寫，唔啱再 prompt，即係所謂 vibe coding。',
      '問題一：需求好模糊，agent 唯有自己估，估錯咗你都未必即刻發現。',
      '問題二：佢可能一次過改咗十幾個 file，你好難判斷邊啲改動係真係需要。',
      '問題三：context 會唔見。開個新 session，之前傾過嘅決定全部要重新講。',
      '問題四：冇 review 標準，最後變咗「睇落 OK」就 merge。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '概念',
    title: '咩係 Spec-Driven Development？',
    quote: 'Spec 係 source of truth，code 係 spec 嘅產物',
    items: [
      { at: 1, icon: '📄', text: '先寫「要做咩」同「點樣先算做完」，再寫 code' },
      { at: 2, icon: '🗂️', text: 'Spec 係 markdown，放喺 repo，同 code 一齊 commit、review' },
      { at: 3, icon: '🔁', text: '需求有變 → 先改 spec → 再由 spec 推返落 code' },
    ],
    steps: [
      'Spec-Driven Development 嘅核心只有一句：spec 係唯一嘅真相來源，code 只係 spec 嘅產物。',
      '即係話，寫 code 之前，先用文字講清楚要做咩、點樣先算完成。',
      '份 spec 係 markdown 檔，放喺 repo 入面，同 code 一齊 commit、一齊 review。',
      '之後需求有變，唔係直接叫 agent 改 code，而係先改 spec，再由 spec 推返落 code。',
    ],
  },

  {
    layout: 'flow',
    kicker: '流程',
    title: '五步流程',
    items: [
      { hl: 1, en: 'Specify', zh: '規格', desc: '做咩、點解' },
      { hl: 2, en: 'Plan', zh: '方案', desc: '技術上點做' },
      { hl: 3, en: 'Tasks', zh: '任務', desc: '拆細、可驗證' },
      { hl: 4, en: 'Implement', zh: '實作', desc: '一次一個 task' },
      { hl: 5, en: 'Verify', zh: '驗證', desc: '對返 spec' },
    ],
    steps: [
      '成個流程可以分做五步。',
      '第一步 Specify：講清楚要做咩、點解要做，唔講技術細節。',
      '第二步 Plan：決定技術上點做，改邊啲檔案、有咩風險。',
      '第三步 Tasks：將 plan 拆成細、獨立、可以驗證嘅任務。',
      '第四步 Implement：叫 agent 一次只做一個 task。',
      '第五步 Verify：用 spec 入面嘅驗收條件檢查結果。每一步完成，人都要 review 先去下一步。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '點解',
    title: '點解同 Coding Agent 特別夾？',
    items: [
      { at: 1, icon: '⚡', text: 'Agent 寫得快但唔識讀心 → spec 補返你嘅「意圖」' },
      { at: 2, icon: '🧠', text: 'Context 有限、session 會完 → spec 係可以重新載入嘅記憶' },
      { at: 3, icon: '🔍', text: '每一步都有文件 → 喺改動最平嘅階段 review' },
      { at: 4, icon: '🔀', text: 'Task 夠獨立 → 可以開幾個 agent 並行' },
    ],
    tone: 'good',
    steps: [
      '點解呢個方法特別啱 coding agent？',
      '第一，agent 寫 code 好快，但佢唔識讀心。Spec 就係將你腦入面嘅意圖寫低。',
      '第二，agent 嘅 context 有限，session 會完、會被壓縮。Spec 係隨時可以重新讀返嘅長期記憶。',
      '第三，每一步都有文件，你喺改 spec 仲好平嘅時候已經可以發現問題，唔使等 code 寫完先知。',
      '第四，task 拆得夠獨立，就可以同時開幾個 agent 並行做。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '實戰',
    title: '例子：天氣地圖加「°C / °F 切換」',
    items: [
      { at: 0, icon: '🗺️', text: 'weather-map：Vite + React + TypeScript + Zustand' },
      { at: 1, icon: '🌡️', text: '而家：溫度寫死 °C（WeatherPanel、圖例）' },
      { at: 2, icon: '🎯', text: '目標：俾用戶自己揀 °C 定 °F' },
    ],
    steps: [
      '我哋用一個真實 project 做例子：一個用 React 同 Zustand 寫嘅天氣地圖。',
      '而家溫度全部寫死咗係攝氏，資訊面板同圖例都係 °C。',
      '新功能：俾用戶自己揀攝氏定華氏。我哋跟住五步行一次。',
    ],
  },

  {
    layout: 'file',
    stage: 1,
    file: 'specs/temp-unit/spec.md',
    chunks: [
      { at: 0, lines: ['# 溫度單位切換（°C / °F）', '', '## 目標', '用戶可以揀用攝氏或華氏顯示溫度。'] },
      { at: 1, lines: ['', '## User Story', '- 作為海外用戶，我想用 °F 睇溫度，', '  因為我慣咗華氏。'] },
      {
        at: 2,
        lines: [
          '',
          '## 驗收條件（Acceptance Criteria）',
          '- AC1 Given 第一次打開，Then 顯示 °C',
          '- AC2 When 撳切換掣，Then 面板、逐小時',
          '      預報、圖例全部即時轉 °F',
          '- AC3 Given 揀咗 °F，When 重新載入，',
          '      Then 仍然係 °F',
          '- AC4 °F = °C × 9/5 + 32，四捨五入到整數',
        ],
      },
      { at: 3, lines: ['', '## 非目標（Non-goals）', '- 風速、氣壓單位唔喺今次範圍'] },
    ],
    notes: [
      { at: 0, text: '📁 每個功能一個資料夾' },
      { at: 1, text: '只講「咩」同「點解」，唔講「點做」' },
      { at: 2, text: '每條 AC 都要可以寫成測試' },
      { at: 3, text: 'Non-goals 防止 scope creep' },
      { at: 4, text: '💡 Agent 起草，人負責拍板', strong: true },
    ],
    steps: [
      '第一步 Specify。喺 specs 資料夾開一個 spec.md，先寫一句清楚嘅目標。',
      '跟住寫 user story：邊個想要、想要咩、點解。留意，呢度完全唔講技術。',
      '最重要係驗收條件。用 Given、When、Then 嘅格式寫，每一條都要可以測試。',
      '仲要寫非目標，講明今次唔做乜，防止 agent 自作主張擴大範圍。',
      '你可以叫 agent 幫你起草 spec，但一定要自己逐條睇過、改過。呢份就係你同 agent 之間嘅合約。',
    ],
  },

  {
    layout: 'file',
    stage: 2,
    file: 'specs/temp-unit/plan.md',
    chunks: [
      { at: 0, lines: ['# 技術方案'] },
      {
        at: 1,
        lines: ['', '## 狀態', '- appStore.ts 加 tempUnit: \'C\' | \'F\'', '  同 setTempUnit()', '- 用 localStorage 記住選擇（AC3）'],
      },
      { at: 2, lines: ['', '## 新增', '- utils/units.ts：formatTemp(c, unit)', '  集中換算同四捨五入（AC4）'] },
      {
        at: 3,
        lines: ['', '## 修改', '- WeatherPanel.tsx：現時溫度 + 逐小時', '- Legend.tsx：圖例單位跟 tempUnit', '- LayerSwitcher 旁邊加切換掣'],
      },
      { at: 4, lines: ['', '## 風險', '- 色階仍然用 °C 計，只改顯示'] },
    ],
    notes: [
      { at: 0, text: '💡 Claude Code：Shift+Tab 切去 Plan mode，只讀唔改', strong: true },
      { at: 1, text: '貼住現有架構（Zustand）' },
      { at: 2, text: '邏輯集中，唔好散落 component' },
      { at: 3, text: '改動範圍一目了然' },
      { at: 4, text: '寫低風險 = 提早 review' },
    ],
    steps: [
      '第二步 Plan。有咗 spec，就叫 agent 讀 code base，出一份技術方案。用 Claude Code 可以切去 Plan mode，佢只會讀、唔會改。',
      '方案要貼住現有架構：狀態放 Zustand store，用 localStorage 記住選擇，對應 AC3。',
      '換算邏輯集中喺一個 utility function，對應 AC4，唔好散落喺每個 component。',
      '列清楚要改邊幾個檔案。改動範圍一目了然，review 就容易好多。',
      '仲要寫低風險：色階繼續用攝氏計，只改顯示，避免影響其他圖層。',
    ],
  },

  {
    layout: 'file',
    stage: 3,
    file: 'specs/temp-unit/tasks.md',
    chunks: [
      { at: 0, lines: ['# Tasks', ''] },
      {
        at: 1,
        lines: [
          '- [ ] T1 新增 utils/units.ts（AC4）',
          '- [ ] T2 appStore 加 tempUnit + localStorage（AC1, AC3）',
          '- [ ] T3 WeatherPanel 用 formatTemp（AC2）',
          '- [ ] T4 Legend 跟 tempUnit 顯示單位（AC2）',
          '- [ ] T5 加 °C/°F 切換掣 + i18n 文字（AC2）',
          '- [ ] T6 逐條對 AC 驗收',
        ],
      },
    ],
    notes: [
      { at: 0, text: '一張 checklist' },
      { at: 1, text: '一個 task ≈ 一個 commit' },
      { at: 2, text: '每個 task 標明對應 AC → 可追溯' },
      { at: 3, text: 'T1、T2 互不依賴 → 可以並行', strong: true },
    ],
    steps: [
      '第三步 Tasks。將 plan 拆成一張 checklist。',
      '每個 task 要夠細，細到一個 commit 就做得完，而且完成之後可以驗證。',
      '每個 task 標明對應邊條驗收條件，咁樣每一行 code 都追溯得返去 spec。',
      'T1 同 T2 冇互相依賴，甚至可以開兩個 agent 同時做。',
    ],
  },

  {
    layout: 'terminal',
    stage: 4,
    chunks: [
      {
        at: 0,
        kind: 'you',
        lines: [
          '讀 specs/temp-unit/ 入面嘅 spec.md、plan.md、tasks.md。',
          '只做 T1。完成後跑 npm run typecheck 同 npm run lint，',
          '通過就喺 tasks.md 剔返 T1，然後停低等我 review。',
        ],
      },
      { at: 1, kind: 'agent', lines: ['● 讀取 spec.md、plan.md、tasks.md', '● 建立 src/utils/units.ts'] },
      { at: 2, kind: 'agent', lines: ['● $ npm run typecheck    ✓', '● $ npm run lint         ✓', '● 更新 tasks.md：[x] T1'] },
      { at: 3, kind: 'done', lines: ['T1 完成：新增 1 個檔案，更新 tasks.md。等你 review。'] },
    ],
    steps: [
      '第四步 Implement。Prompt 要講清楚四樣嘢：讀邊幾份文件、做邊一個 task、做完點檢查、幾時停。',
      'Agent 會先讀 spec 同 plan，再只改 plan 列明嘅檔案。',
      '佢自己跑 typecheck 同 lint，通過先會剔 task。',
      '最後停低等你 review。睇 diff 嘅時候，你只需要問一個問題：呢個改動係咪符合 spec？',
      'OK 就 commit，再叫佢做 T2。一個 task、一個 commit、一次 review。',
    ],
  },

  {
    layout: 'bullets',
    stage: 5,
    kicker: 'Step 5 · Verify',
    title: '驗證：對返 spec，唔係對感覺',
    items: [
      { at: 1, icon: '✅', text: '逐條 AC 打剔：AC1 至 AC4 各自要有證據' },
      { at: 2, icon: '🧪', text: 'AC 盡量變成自動化測試（例如 Vitest）' },
      { at: 3, icon: '🤖', text: '開另一個 agent session 做 reviewer：「對住 spec 檢查呢個 PR」' },
      { at: 4, icon: '📝', text: '發現 spec 有漏洞 → 先改 spec，再改 code' },
    ],
    tone: 'good',
    steps: [
      '第五步 Verify。所有 task 做完，唔好靠感覺話「應該得」。',
      '拎 spec 出嚟逐條驗收條件打剔，每一條都要有證據，例如截圖或者測試結果。',
      '最好將驗收條件寫成自動化測試，之後每次改 code 都會自動再驗一次。',
      '仲可以開一個全新嘅 agent session 做 reviewer，叫佢對住 spec 檢查成個 PR，佢冇之前嘅偏見。',
      '如果驗收時發現 spec 本身有漏洞，記住：先改 spec，再改 code。',
    ],
  },

  {
    layout: 'repo',
    kicker: '落地',
    title: '放入 repo',
    tree: [
      'weather-map/',
      '├─ CLAUDE.md',
      '├─ specs/',
      '│  └─ temp-unit/',
      '│     ├─ spec.md',
      '│     ├─ plan.md',
      '│     └─ tasks.md',
      '└─ src/ …',
    ],
    rules: [
      { at: 1, text: '## 開發規則' },
      { at: 1, text: '- 新功能先喺 specs/<feature>/ 寫 spec.md' },
      { at: 1, text: '- spec 未 approve 唔好寫 code' },
      { at: 1, text: '- 每次只做 tasks.md 入面一個 task' },
      { at: 1, text: '- 做完跑 typecheck + lint 先剔 task' },
      { at: 2, text: '- spec 同 code 有衝突 → 停低問人', strong: true },
    ],
    steps: [
      '實際放入 repo 係咁：每個功能一個 specs 資料夾，入面三份文件。',
      '再喺 CLAUDE.md 寫低規則。Claude Code 每次開 session 都會自動讀呢個檔，agent 就會次次跟同一套流程。',
      '最後一條好重要：spec 同 code 有衝突嘅時候，叫 agent 停低問人，唔好自己估。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '工具',
    title: '現成工具',
    items: [
      { at: 1, icon: '🧰', text: 'GitHub Spec Kit：/speckit.specify → plan → tasks → implement' },
      { at: 2, icon: '👻', text: 'Kiro：內建 Spec 模式（requirements → design → tasks）' },
      { at: 3, icon: '✳️', text: 'Claude Code：Plan mode + CLAUDE.md + 自訂 slash command' },
    ],
    steps: [
      '唔想由零開始，都有現成工具。',
      'GitHub 開源嘅 Spec Kit 提供一套 slash command，由 specify、plan、tasks 一路去到 implement。',
      'Kiro 內建 Spec 模式，會產生 requirements、design 同 tasks 三份文件。',
      '用 Claude Code 嘅話，Plan mode 加 CLAUDE.md，再將常用 prompt 放入 .claude/commands 做成 slash command，已經好夠用。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '陷阱',
    title: '常見陷阱',
    items: [
      { at: 1, icon: '❌', text: 'Spec 寫成技術文件 → 技術細節留返喺 plan' },
      { at: 2, icon: '❌', text: 'AC 模糊（「要快」「要好用」）→ 寫成可量度嘅條件' },
      { at: 3, icon: '❌', text: '一次過叫 agent 做晒所有 task → 一個 task 一次 review' },
      { at: 4, icon: '❌', text: 'Code 改咗，spec 冇更新 → spec 慢慢變廢紙' },
      { at: 5, icon: '❌', text: '改一行都寫 spec → 小修小補直接 prompt 就得' },
    ],
    tone: 'bad',
    steps: [
      '最後講幾個常見陷阱。',
      '一：spec 寫成技術文件。spec 講要咩，技術細節留返喺 plan。',
      '二：驗收條件太模糊，例如「要快」、「要好用」。要改成可以量度嘅條件，例如「一秒內更新」。',
      '三：一次過叫 agent 做晒所有 task。改動太大，你根本 review 唔到。',
      '四：code 改咗但 spec 冇跟住更新，spec 好快就會變成廢紙。',
      '五：過度使用。改一行 typo 都寫 spec 就太重，小修小補直接 prompt 就得。',
    ],
  },

  {
    layout: 'outro',
    title: '重點總結',
    items: [
      { at: 1, text: '先 spec，後 code' },
      { at: 1, text: '驗收條件要可以測試' },
      { at: 2, text: 'Plan 貼住現有架構' },
      { at: 2, text: '一個 task、一個 commit、一次 review' },
      { at: 3, text: '需求變 → 先改 spec' },
    ],
    closing: { at: 4, text: '你嘅角色：寫規格、做決定、把關質素' },
    steps: [
      '總結一下。',
      '先寫 spec，再寫 code；驗收條件一定要可以測試。',
      'Plan 要貼住現有架構；一個 task、一個 commit、一次 review。',
      '需求有變，永遠先改 spec。',
      '你唔再係逐行打 code 嘅人，而係寫規格、做決定、把關質素嘅人。多謝收睇！',
    ],
  },
];
