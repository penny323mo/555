// Elon Musk 未來版圖：畫面 + 廣東話旁白（資料截至 2026 年 9 月）。
// 每個 step = 一句旁白 = 一句字幕；item 嘅 `at` = 喺第幾句出現。
window.META = {
  slug: 'musk-future',
  title: 'Elon Musk 嘅未來版圖',
  brand: '<b>科技</b> × 未來',
  stages: [],
};

window.SCENES = [
  {
    layout: 'title',
    title: 'Elon Musk 嘅未來版圖',
    subtitle: 'AI、太空、自動駕駛……一個人砌出嚟嘅帝國有幾恐怖？',
    chips: ['SpaceX', 'Tesla', 'xAI', 'Neuralink', '資料截至 2026 年 9 月'],
    steps: [
      '今集講一個人：Elon Musk。佢嘅公司已經伸到 AI、太空、汽車，甚至人腦。',
      '我哋睇吓呢個版圖有幾大、點樣砌埋一齊，同埋點解有人話佢恐怖。',
    ],
  },

  {
    layout: 'repo',
    kicker: '版圖',
    title: '一個人，幾多間公司？',
    treeTitle: '🗺️ 公司結構（2026 年）',
    tree: [
      'Elon Musk',
      '├─ SpaceX（2026 年 6 月上市）',
      '│  ├─ Starlink 衛星上網',
      '│  ├─ Starship 火箭',
      '│  └─ xAI（2026 年 2 月併入）',
      '│     ├─ Grok',
      '│     └─ X（前 Twitter）',
      '├─ Tesla',
      '│  ├─ Robotaxi / Cybercab',
      '│  └─ Optimus 機械人',
      '├─ Neuralink',
      '└─ The Boring Company',
    ],
    rulesTitle: '🎯 佢點樣形容目標',
    rules: [
      { at: 1, text: '## 各公司方向' },
      { at: 1, text: '- SpaceX：令人類變成多星球物種' },
      { at: 1, text: '- xAI：理解宇宙嘅真正本質' },
      { at: 1, text: '- Tesla：電動車、自動駕駛、機械人' },
      { at: 2, text: '- 共通點：全部都係十年以上嘅長線賭注', strong: true },
    ],
    steps: [
      '先睇地圖。2026 年 2 月，SpaceX 併購咗 xAI，而 X 早喺 2025 年已經併入 xAI。',
      '即係話，火箭、衛星上網、AI 同社交媒體，而家係同一間公司。',
      '再加上 Tesla、Neuralink 同 Boring Company，全部都由佢主導。',
    ],
  },

  {
    layout: 'flow',
    kicker: '拼圖',
    title: '五塊拼圖點樣互相幫手',
    items: [
      { hl: 1, en: '能源', zh: 'Tesla', desc: '電池、太陽能' },
      { hl: 2, en: '算力', zh: 'xAI', desc: 'Colossus 超級電腦' },
      { hl: 3, en: '數據', zh: 'X + Tesla', desc: '貼文、行車影像' },
      { hl: 4, en: '網絡', zh: 'Starlink', desc: '全球衛星上網' },
      { hl: 5, en: '實體', zh: 'Tesla', desc: '無人車、機械人' },
    ],
    loopText: '↺ 每一塊都令其他幾塊更強',
    steps: [
      '真正厲害嘅唔係單一間公司，而係佢哋點樣互相餵養。',
      '第一塊係能源：Tesla 嘅電池同太陽能，可以供電俾數據中心。',
      '第二塊係算力：xAI 喺美國孟菲斯起咗超大型 AI 訓練中心 Colossus。',
      '第三塊係數據：X 平台嘅貼文，加上 Tesla 車隊拍到嘅道路影像。',
      '第四塊係網絡：Starlink 衛星令地球上幾乎任何地方都可以連線。',
      '第五塊係實體：AI 最後落地，變成自動駕駛車同人形機械人。',
    ],
  },

  {
    layout: 'bullets',
    kicker: 'AI',
    title: 'Grok 同 Colossus',
    items: [
      { at: 1, icon: '💬', text: 'Grok 直接整合喺 X 平台入面' },
      { at: 2, icon: '🏭', text: 'Colossus：全球規模最大嘅 AI 訓練叢集之一' },
      { at: 3, icon: '🔗', text: '2026 年 2 月併入 SpaceX，合併估值約 1.25 萬億美元' },
    ],
    steps: [
      '先講 AI。',
      'xAI 嘅聊天機械人 Grok，直接放咗入 X，每日面對大量用戶。',
      '佢哋喺孟菲斯嘅 Colossus 超級電腦，規模同耗電量都係全球數一數二。',
      '2026 年 2 月，xAI 併入 SpaceX，兩間公司合計估值大約 1.25 萬億美元。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '太空',
    title: '佢最領先嘅戰場',
    items: [
      { at: 1, icon: '🛰️', text: 'Starlink：超過 11,000 粒衛星，佔軌道上運作衛星嘅大多數' },
      { at: 2, icon: '🌍', text: '超過 1,200 萬用戶，覆蓋 160 多個國家同地區' },
      { at: 3, icon: '🚀', text: '2026 年 9 月 28 日：Starship 首次入軌，放出 26 粒新一代衛星' },
      { at: 4, icon: '☀️', text: '已向美國 FCC 申請：最多 100 萬粒 AI 運算衛星' },
    ],
    steps: [
      '再講太空，呢度係佢最領先嘅地方。',
      'Starlink 已經有超過一萬一千粒衛星，係地球軌道上運作緊嘅衛星嘅大多數。',
      '用戶超過一千二百萬，覆蓋一百六十幾個國家同地區。',
      '2026 年 9 月 28 日，Starship 第一次成功入軌，仲放出 26 粒新一代 Starlink 衛星。',
      '更誇張嘅係，SpaceX 已經向美國監管機構申請，最多發射一百萬粒衛星喺太空做 AI 運算。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '路面同工廠',
    title: '自動駕駛同機械人',
    items: [
      { at: 1, icon: '🚕', text: 'Robotaxi：德州、佛州多個城市已有無人駕駛載客' },
      { at: 2, icon: '🚙', text: 'Cybercab：冇軚盤、冇踏板嘅專用車，已開始生產' },
      { at: 3, icon: '🤖', text: 'Optimus 人形機械人：目標 2026 年底開始量產' },
    ],
    steps: [
      '第三個戰場，係路面同工廠。',
      'Tesla 嘅 Robotaxi 已經喺德州同佛羅里達幾個城市，做冇安全員嘅無人駕駛載客。',
      '專用嘅 Cybercab 冇軚盤、冇踏板，已經開始生產。',
      '人形機械人 Optimus，Tesla 嘅目標係今年年底開始量產。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '人腦',
    title: 'Neuralink：將晶片放入大腦',
    items: [
      { at: 1, icon: '🧠', text: '腦機接口：癱瘓病人用意念控制電腦同手機' },
      { at: 2, icon: '🩺', text: '而家：小規模臨床試驗' },
      { at: 2, icon: '🏭', text: '下一步：大量生產、手術自動化' },
    ],
    steps: [
      '最後一塊，係人腦。',
      'Neuralink 將晶片植入大腦，令癱瘓病人可以用意念控制電腦同手機。',
      '而家仍然係小規模臨床試驗，但公司已經講明，下一步係大量生產同自動化手術。',
    ],
  },

  {
    layout: 'file',
    kicker: '錢',
    heading: '市場點樣押注佢',
    file: '數字一覽.md',
    chunks: [
      { at: 0, lines: ['# 2026 年 6 月 12 日：SpaceX 上市', '- 代號 SPCX', '- 集資約 750 億美元：史上最大 IPO', '- 首日收市市值約 2.1 萬億美元'] },
      { at: 2, lines: ['', '# Tesla CEO 薪酬方案（2025 年 11 月）', '- 約 75% 股東投票贊成', '- 全數達標：最高約 1 萬億美元股票'] },
      { at: 3, lines: ['', '## 達標條件包括', '- 市值去到 8.5 萬億美元', '- 100 萬部 Optimus 機械人', '- 100 萬架 Robotaxi 商業營運'] },
    ],
    notes: [
      { at: 0, text: '史上最大 IPO' },
      { at: 1, text: '上市首日市值超越 Tesla' },
      { at: 2, text: '股東用錢投票支持佢' },
      { at: 3, text: '錢 + 控制權 = 捱得起長線賭注', strong: true },
    ],
    steps: [
      '講埋錢。2026 年 6 月，SpaceX 上市，集資大約 750 億美元，係史上最大嘅 IPO。',
      '首日收市，市值大約 2.1 萬億美元，仲高過 Tesla。',
      '另一邊，Tesla 股東喺 2025 年 11 月通過佢嘅薪酬方案，全數達標最高值大約一萬億美元。',
      '條件包括市值去到 8.5 萬億、一百萬部機械人同一百萬架 Robotaxi，等於股東直接押注佢嘅版圖。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '擔心',
    title: '點解有人覺得恐怖？',
    tone: 'bad',
    items: [
      { at: 1, icon: '🎛️', text: '權力集中：通訊、AI、交通、社交媒體，同一個人拍板' },
      { at: 2, icon: '⚔️', text: '私人決定影響戰爭：2022 年拒絕喺克里米亞附近為烏克蘭開通 Starlink' },
      { at: 3, icon: '📢', text: '輿論影響力：發佈渠道（X）同 AI 答案（Grok）都喺佢手' },
      { at: 4, icon: '⚖️', text: '監管追唔上：無人車、腦機接口、太空擠塞，規則仲寫緊' },
    ],
    steps: [
      '咁點解有人覺得恐怖？',
      '第一，權力集中。衛星通訊、AI、交通同社交媒體，最後都係同一個人拍板。',
      '第二，私人決定可以影響戰爭。據傳記記載，2022 年佢拒絕喺克里米亞附近為烏克蘭開通 Starlink。',
      '第三，輿論。佢擁有 X 呢個發佈渠道，又有 Grok 答你問題，兩頭都喺佢手。',
      '第四，監管追唔上。無人車、腦機接口、太空衛星擠塞，好多規則仲喺度寫緊。',
    ],
  },

  {
    layout: 'bullets',
    kicker: '另一面',
    title: '不過，唔好一面倒',
    tone: 'good',
    items: [
      { at: 1, icon: '📡', text: 'Starlink 令偏遠地區、災區、船同飛機都上到網' },
      { at: 2, icon: '♻️', text: '可重用火箭大幅降低發射成本，帶動成個航天業' },
      { at: 3, icon: '⏳', text: '好多承諾都延期：全自動駕駛講咗好多年' },
      { at: 4, icon: '🏁', text: '對手唔弱：Waymo、Google、OpenAI、中國航天同自動駕駛' },
    ],
    steps: [
      '不過，睇嘢唔好一面倒。',
      'Starlink 的確令偏遠地區、災區，甚至飛機同船都上到網。',
      '可重用火箭亦都大幅降低咗發射成本，帶動成個航天業。',
      '另外，佢好多承諾都延期，全自動駕駛就講咗好多年，時間表要打個折。',
      '而且對手都唔弱：Waymo、Google、OpenAI，仲有中國嘅航天同自動駕駛公司。',
    ],
  },

  {
    layout: 'outro',
    title: '點樣睇呢個版圖？',
    items: [
      { at: 1, text: '睇佢做到咩，唔好淨係睇佢講咩' },
      { at: 1, text: '留意監管同制衡跟唔跟得上' },
      { at: 2, text: '資料同服務唔好全押喺一個平台' },
      { at: 2, text: '對新技術保持好奇，亦保持懷疑' },
    ],
    closing: { at: 3, text: '真正要問：呢啲基建應該由邊個話事？' },
    steps: [
      '最後，點樣睇呢個版圖？',
      '睇佢做到咩，唔好淨係睇佢講咩；同時留意監管同制衡跟唔跟得上。',
      '自己嘅資料同服務唔好全部押喺同一個平台；對新技術保持好奇，亦要保持懷疑。',
      '恐怖嘅未必係一個人有野心，而係全世界嘅基建，越嚟越依賴同一個人。',
      '你點睇？歡迎留言講吓。多謝收睇！',
    ],
  },
];
