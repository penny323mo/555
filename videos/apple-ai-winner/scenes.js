// Apple 終將成為 AI 年代的最大贏家？（資料截至 2026 年 9 月）
// 每個 step：say = 配音（廣東話口語），sub = 畫面字幕（書面語，==關鍵字== 會高亮）。畫面文字一律用書面語。
window.META = {
  slug: 'apple-ai-winner',
  title: 'Apple 終將成為 AI 年代的最大贏家',
  brand: '<b>科技</b> × 未來',
  stages: [],
};

window.SCENES = [
  {
    layout: 'title',
    title: 'Apple 終將成為\n==AI 年代的最大贏家==',
    subtitle: '一個反直覺的論點',
    chips: ['iPhone', 'Apple Intelligence', 'Siri × Gemini', '資料截至 2026 年 9 月'],
    imgs: [
      ['Red apple', 170, 120, 320],
      ['Brain', 30, 360, 190],
      ['Mobile phone', 420, 330, 200],
      ['Trophy', 440, 40, 160],
      ['Sparkles', 60, 80, 130],
    ],
    steps: [
      { say: '今集講一個好反直覺嘅講法：Apple 最終會成為 AI 年代嘅最大贏家。', sub: '本集探討一個反直覺的論點：Apple 終將成為 ==AI 年代的最大贏家==。' },
      { say: '我哋會拆解支持呢個講法嘅理由，亦會認真睇埋反方觀點。', sub: '我們將拆解支持此論點的理由，也會認真檢視反方觀點。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '反直覺',
    title: '「AI 落後」的 Apple？',
    img: 'Thinking face',
    points: [
      { at: 0, text: 'Siri 升級一再延期' },
      { at: 0, text: 'AI 人才流失，新 Siri 要靠 ==Google Gemini==' },
      { at: 1, text: '但股價一年升近 ==60%==，市值觸及 5 萬億美元' },
    ],
    steps: [
      {
        say: '過去兩年，Apple 成日俾人話 AI 落後：Siri 升級一再延期，AI 人才流失，連新 Siri 都要靠 Google 嘅 Gemini。',
        sub: '過去兩年，Apple 常被指 AI 落後：Siri 一再延期、人才流失，新 Siri 更要靠 ==Google Gemini==。',
      },
      { say: '但係市場好似唔係咁睇：Apple 股價一年升咗接近六成。', sub: '但市場似乎不這樣看：Apple 股價一年上升接近 ==60%==。' },
      { say: '點解一間俾人話落後嘅公司，反而俾投資者咁睇好？', sub: '為何一家被指落後的公司，反而獲投資者如此看好？' },
    ],
  },

  {
    layout: 'bignum',
    kicker: '里程碑',
    value: '5 萬億',
    unit: '美元',
    label: '2026 年 7 月，Apple 市值首次觸及此水平',
    more: '全球==第二間==達到這個里程碑的公司',
    moreAt: 1,
    source: '資料來源：CNBC（2026 年 7 月 28 日）',
    img: 'Red apple',
    steps: [
      { say: '2026 年 7 月 28 號，Apple 市值第一次觸及 5 萬億美元。', sub: '2026 年 7 月 28 日，Apple 市值首次觸及 ==5 萬億美元==。' },
      { say: '佢係全球第二間去到呢個里程碑嘅公司。', sub: '它是全球第二家達到這個里程碑的公司。' },
    ],
  },

  {
    layout: 'timeline',
    kicker: '歷史',
    title: 'Apple 很少做第一個',
    events: [
      { at: 0, date: '2001', img: 'Musical note', title: 'iPod', text: 'MP3 機早已存在' },
      { at: 0, date: '2007', img: 'Mobile phone', title: 'iPhone', text: '智能手機早已存在' },
      { at: 1, date: '2015', img: 'Watch', title: 'Apple Watch', text: '智能手錶早已存在' },
      { at: 1, date: '2016', img: 'Headphone', title: 'AirPods', text: '藍牙耳機早已存在' },
      { at: 2, date: '2020', img: 'Gear', title: 'Apple 晶片', text: '自家晶片取代 Intel' },
    ],
    steps: [
      { say: '先睇歷史。iPod 出嘅時候，MP3 機早就有；iPhone 出嘅時候，智能手機都早就有。', sub: '先看歷史：iPod 面世時 MP3 機早已存在；iPhone 面世時智能手機亦早已存在。' },
      { say: 'Apple Watch 同 AirPods 都一樣，佢唔係第一個，但最後都做到市場上最成功。', sub: 'Apple Watch 與 AirPods 亦然：不是第一個，卻成為==市場上最成功==的產品。' },
      { say: '2020 年佢用自家晶片取代 Intel，亦係後發先至。所以有人相信，AI 都會係咁。', sub: '2020 年以自家晶片取代 Intel，同樣==後發先至==。因此有人相信 AI 亦會如此。' },
    ],
  },

  // ───────── 01 不參與軍備競賽 ─────────
  {
    layout: 'chapter',
    no: '01',
    title: '不參與軍備競賽',
    subtitle: '讓別人燒錢，自己收錢',
    img: 'Money bag',
    warm: true,
    steps: [{ say: '第一個理由：Apple 冇參與 AI 軍備競賽，由得人哋燒錢。', sub: '第一個理由：Apple 沒有參與 AI 軍備競賽，讓別人燒錢。' }],
  },

  {
    layout: 'bars',
    kicker: '數據',
    title: '2026 年資本開支',
    bars: [
      { at: 0, label: 'Amazon', value: 200, display: '2,000 億' },
      { at: 0, label: 'Microsoft', value: 190, display: '1,900 億' },
      { at: 0, label: 'Alphabet', value: 180, display: '≈1,800 億' },
      { at: 0, label: 'Meta', value: 125, display: '≈1,250 億' },
      { at: 1, label: 'Apple', value: 14, display: '≈140 億', hl: true },
    ],
    note: '單位：美元。Alphabet、Meta 取公司指引中位數；Apple 為 2026 財年估算',
    noteAt: 2,
    steps: [
      { say: '睇吓今年嘅資本開支：Amazon、Microsoft、Google 同 Meta，每間都要用過千億美元，主要就係起 AI 數據中心。', sub: '看看今年的資本開支：Amazon、Microsoft、Google 與 Meta 各自投入逾==千億美元==，主要用於 AI 數據中心。' },
      { say: 'Apple 呢？大約 140 億美元，連人哋嘅零頭都唔夠。', sub: 'Apple 呢？約 ==140 億美元==，不及對手的零頭。' },
      { say: '四大雲端巨頭加埋大約七千二百五十億美元，比舊年多咗接近八成。', sub: '四大雲端巨頭合計約 7,250 億美元，按年增加約 ==77%==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '邏輯',
    title: '為何不跟？',
    img: 'Chequered flag',
    points: [
      { at: 0, text: '建數據中心要先付錢，回報卻未確定' },
      { at: 1, text: 'AI 模型愈來愈多，價格持續下跌' },
      { at: 2, text: '投資者開始視「少花錢」為==優點==' },
    ],
    steps: [
      { say: '點解 Apple 唔跟？因為起數據中心要先俾錢，但幾時回本仲未知。', sub: '為何 Apple 不跟？因為興建數據中心須先付錢，回報時間仍未確定。' },
      { say: '而且 AI 模型愈嚟愈多，價錢一路跌，今日最貴嘅模型，聽日可能好平。', sub: '而且 AI 模型愈來愈多、價格持續下跌，今天的頂尖模型明天或已廉價。' },
      { say: '今年 7 月 Apple 股價大升，其中一個原因，就係投資者開始覺得佢少啲燒錢係優點。', sub: '今年 7 月 Apple 股價大升，原因之一正是投資者開始視其==節制開支==為優點。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '收租',
    title: 'App Store：AI 的收費站',
    img: 'Classical building',
    warm: true,
    points: [
      { at: 0, text: '2025 年從生成式 AI App 抽成約 ==9 億美元==' },
      { at: 1, text: '其中約 75% 來自 ChatGPT' },
      { at: 2, text: '2026 年預計逾 10 億美元' },
    ],
    steps: [
      { say: '仲有一樣：無論邊間 AI 公司贏，佢哋都要經 App Store 收費。2025 年，Apple 由 AI App 抽成大約 9 億美元。', sub: '無論哪家 AI 公司勝出，都要經 App Store 收費：2025 年 Apple 從 AI App 抽成約 ==9 億美元==。' },
      { say: '其中大約四分三嚟自 ChatGPT，即係對手賺錢，Apple 都有份。', sub: '其中約四分之三來自 ChatGPT——對手賺錢，Apple 亦分一杯羹。' },
      { say: '今年呢個數字預計會超過 10 億美元。', sub: '今年此數字預計將突破 ==10 億美元==。' },
    ],
  },

  // ───────── 02 25 億部裝置 ─────────
  {
    layout: 'chapter',
    no: '02',
    title: '25 億部裝置',
    subtitle: 'AI 最終要落到用戶手上',
    img: 'Mobile phone',
    steps: [{ say: '第二個理由：AI 最終都要落到用戶手上，而 Apple 手上有 25 億部裝置。', sub: '第二個理由：AI 最終要落到用戶手上，而 Apple 擁有 ==25 億部==活躍裝置。' }],
  },

  {
    layout: 'bignum',
    kicker: '規模',
    value: '25 億',
    unit: '部',
    label: 'Apple 全球活躍裝置（2026 年 1 月）',
    more: '一年增加 ==1.5 億部==，遍及逾 175 個國家',
    moreAt: 1,
    source: '資料來源：Apple 2026 財年第一季業績',
    img: 'Globe with meridians',
    steps: [
      { say: '今年 1 月，Apple 宣布全球活躍裝置超過 25 億部。', sub: '今年 1 月，Apple 宣布全球活躍裝置超過 ==25 億部==。' },
      { say: '一年多咗 1.5 億部，遍佈超過 175 個國家。', sub: '一年增加 1.5 億部，遍及逾 175 個國家。' },
    ],
  },

  {
    layout: 'hub',
    kicker: '入口',
    title: '每部裝置都是 AI 入口',
    center: 'Apple\n裝置生態',
    nodes: [
      { at: 1, img: 'Mobile phone', title: 'iPhone', text: '最常用的個人裝置' },
      { at: 1, img: 'Laptop', title: 'Mac', text: '本地運行大型模型' },
      { at: 2, img: 'Watch', title: 'Apple Watch', text: '健康數據' },
      { at: 2, img: 'Headphone', title: 'AirPods', text: '語音與即時翻譯' },
      { at: 3, img: 'Goggles', title: 'Vision Pro', text: '空間運算' },
      { at: 3, img: 'Desktop computer', title: 'iPad 等', text: '學習與創作' },
    ],
    steps: [
      { say: '呢啲裝置唔止係硬件，每一部都係 AI 嘅入口。', sub: '這些裝置不只是硬件，每一部都是 ==AI 的入口==。' },
      { say: 'iPhone 係大家最常用嘅裝置；Mac 用統一記憶體，可以喺本地行大型模型。', sub: 'iPhone 是最常用的個人裝置；Mac 的統一記憶體可在本地運行大型模型。' },
      { say: 'Apple Watch 有你嘅健康數據，AirPods 可以做語音助手同即時翻譯。', sub: 'Apple Watch 掌握健康數據，AirPods 可做語音助手與即時翻譯。' },
      { say: '加埋 Vision Pro 同 iPad，AI 可以跟住你由朝到晚。', sub: '再加上 Vision Pro 與 iPad，AI 可伴隨用戶由早到晚。' },
    ],
  },

  {
    layout: 'stats',
    kicker: '硬件依然強勁',
    title: 'iPhone 17 的成績',
    items: [
      { at: 0, img: 'Money bag', value: '1,700 億', label: 'iPhone 17 系列首年批發收入（美元）', source: 'Counterpoint Research' },
      { at: 1, img: 'Trophy', value: '第 1', label: '2026 上半年全球最暢銷手機（iPhone 17）', source: '按銷量計' },
      { at: 2, img: 'Chart increasing', value: '+35%', label: '中國收入按代增長', source: 'Counterpoint Research', hl: true },
    ],
    steps: [
      { say: '而且硬件賣得好好。iPhone 17 系列第一年嘅批發收入超過 1700 億美元，打破紀錄。', sub: '硬件亦依然強勁：iPhone 17 系列首年批發收入逾 ==1,700 億美元==，創下紀錄。' },
      { say: '基本款 iPhone 17 係今年上半年全球最暢銷嘅手機。', sub: '基本款 iPhone 17 是今年上半年全球最暢銷的手機。' },
      { say: '喺中國，iPhone 17 系列嘅收入仲比上一代多咗 35%。', sub: '在中國，iPhone 17 系列收入更較上一代增長 ==35%==。' },
    ],
  },

  {
    layout: 'compare',
    kicker: '關鍵',
    title: '模型公司 vs 平台公司',
    left: {
      title: '模型公司',
      img: 'Brain',
      at: 0,
      items: [
        { at: 0, text: '模型愈來愈相似，陷入價格戰' },
        { at: 0, text: '要付錢找用戶、找入口' },
      ],
    },
    right: {
      title: 'Apple',
      img: 'Red apple',
      at: 1,
      items: [
        { at: 1, text: '擁有==用戶關係==與裝置入口' },
        { at: 2, text: '可以挑選最好的模型接入' },
        { at: 2, text: '模型可以換，用戶不會輕易換' },
      ],
    },
    steps: [
      { say: '呢度有個關鍵：模型公司之間愈嚟愈似，最後可能變成價格戰，仲要俾錢搵用戶。', sub: '關鍵在於：模型公司愈來愈相似，或陷入價格戰，還要付錢爭取用戶。' },
      { say: 'Apple 就擁有用戶關係同裝置入口。', sub: 'Apple 則擁有==用戶關係==與裝置入口。' },
      { say: '佢可以揀最好嘅模型接入；模型可以換，但用戶唔會咁易換手機。', sub: '它可挑選最好的模型接入；模型可以換，用戶卻不會輕易換手機。' },
    ],
  },

  // ───────── 03 私隱與晶片 ─────────
  {
    layout: 'chapter',
    no: '03',
    title: '私隱與晶片',
    subtitle: '別人難以複製的護城河',
    img: 'Locked',
    warm: true,
    steps: [{ say: '第三個理由：私隱同晶片，呢兩樣係人哋好難抄嘅護城河。', sub: '第三個理由：私隱與晶片，是別人難以複製的==護城河==。' }],
  },

  {
    layout: 'flow',
    kicker: '原理',
    title: 'Apple Intelligence 如何處理請求',
    items: [
      { hl: 0, img: 'Mobile phone', en: '裝置端', zh: 'Neural Engine', desc: '簡單任務本機完成' },
      { hl: 1, img: 'Shield', en: '私有雲', zh: 'PCC', desc: '資料不儲存' },
      { hl: 2, img: 'Handshake', en: '外部模型', zh: 'Gemini 等', desc: '經 PCC 運行' },
      { hl: 3, img: 'Check mark button', en: '回傳', zh: '結果', desc: '可供研究員驗證' },
    ],
    loopText: '原則：==能在本機做的，就不上雲==',
    steps: [
      { say: 'Apple Intelligence 點樣處理你嘅要求？簡單嘅任務，直接喺手機嘅 Neural Engine 做晒。', sub: 'Apple Intelligence 如何處理請求？簡單任務直接在手機的 Neural Engine 完成。' },
      { say: '複雜啲嘅，就交俾 Apple 嘅私有雲運算，資料唔會儲存，只用喺嗰次要求。', sub: '較複雜的交由 Apple 私有雲運算（PCC），資料==不會儲存==，只用於該次請求。' },
      { say: '就算用到 Gemini 呢類外部模型，都係經呢套私有雲架構運行。', sub: '即使用到 Gemini 等外部模型，亦經此私有雲架構運行。' },
      { say: '而且獨立研究員可以檢查呢套系統，呢樣喺業界好少見。', sub: '而且獨立研究員可檢驗這套系統，在業界相當罕見。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '晶片',
    title: '自家晶片的優勢',
    img: 'Gear',
    points: [
      { at: 0, text: 'Neural Engine 自 ==2017 年==起內置於 iPhone' },
      { at: 1, text: 'Mac 統一記憶體：本地可運行大型模型' },
      { at: 2, text: '自研晶片：省電、可控、成本由自己掌握' },
    ],
    steps: [
      { say: 'Apple 由 2017 年開始，已經喺 iPhone 入面放咗專做 AI 運算嘅 Neural Engine。', sub: 'Apple 自 ==2017 年==起已在 iPhone 內置專門處理 AI 的 Neural Engine。' },
      { say: 'Mac 嘅統一記憶體設計，令好多開發者直接喺自己部電腦行大型模型。', sub: 'Mac 的統一記憶體設計，讓不少開發者直接在電腦本地運行大型模型。' },
      { say: '晶片係自己設計，省電、可控，成本都由自己話事。', sub: '晶片自行設計，省電、可控，成本亦由自己掌握。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '私隱',
    title: '私隱：難以複製的賣點',
    img: 'Shield',
    points: [
      { at: 0, text: 'AI 愈了解你，愈需要接觸私人資料' },
      { at: 1, text: '2026 年 PCC 擴展至 Google Cloud 及 NVIDIA 機密運算' },
      { at: 1, text: '仍維持「不儲存、可驗證」的承諾' },
    ],
    steps: [
      { say: 'AI 愈了解你，就愈需要接觸你嘅私人資料，所以私隱會變成最重要嘅賣點之一。', sub: 'AI 愈了解你，便愈需接觸私人資料，因此==私隱==將成為最重要的賣點之一。' },
      { say: '今年 Apple 將私有雲擴展到 Google Cloud 同 NVIDIA 嘅機密運算，但仍然維持唔儲存、可驗證嘅承諾。', sub: '今年 Apple 把私有雲擴展至 Google Cloud 及 NVIDIA 機密運算，仍維持不儲存、可驗證的承諾。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '已推出',
    title: 'Apple Intelligence 現在能做甚麼？',
    items: [
      { at: 0, img: 'Pencil', text: '**書寫工具**：改寫、校對、摘要' },
      { at: 0, img: 'Framed picture', text: '**相片**：清除雜物、擴展畫面' },
      { at: 1, img: 'Bell', text: '**通知摘要**：長訊息一眼看完' },
      { at: 1, img: 'Speech balloon', text: '**即時翻譯**：訊息、通話' },
      { at: 2, img: 'Magic wand', text: '**開發者**：App 可免費使用裝置端模型' },
    ],
    steps: [
      { say: '咁而家 Apple Intelligence 做到啲乜？有書寫工具幫你改寫、校對，相片可以一撳清走雜物。', sub: '目前 Apple Intelligence 能做甚麼？書寫工具可改寫、校對，相片可一鍵清除雜物。' },
      { say: '通知摘要令你一眼睇晒長訊息，仲有即時翻譯。', sub: '通知摘要讓長訊息一眼看完，亦有即時翻譯。' },
      { say: '更重要係，開發者可以喺自己個 App 免費用 Apple 嘅裝置端模型，唔使俾雲端費用。', sub: '更重要的是，開發者可在 App 中==免費使用==裝置端模型，無須支付雲端費用。' },
    ],
  },

  // ───────── 04 借力打力 ─────────
  {
    layout: 'chapter',
    no: '04',
    title: '借力打力',
    subtitle: '不自己造最強模型',
    img: 'Handshake',
    steps: [{ say: '第四個理由：Apple 唔堅持自己造最強嘅模型，而係借力打力。', sub: '第四個理由：Apple 不堅持自造最強模型，而是==借力打力==。' }],
  },

  {
    layout: 'timeline',
    kicker: '時間線',
    title: '新 Siri 之路',
    events: [
      { at: 0, date: '2024.06', img: 'Sparkles', title: 'WWDC 預告', text: '個人化 Siri' },
      { at: 0, date: '2025.03', img: 'Hourglass not done', title: '宣布延期', text: '功能未達標準' },
      { at: 1, date: '2026.01', img: 'Handshake', title: '與 Google 合作', text: 'Gemini 驅動新 Siri' },
      { at: 2, date: '2026 春', img: 'Mobile phone', title: 'iOS 26.4', text: '第一階段推出' },
      { at: 3, date: '2026.06', img: 'Speech balloon', title: 'WWDC 2026', text: '全新 Siri、iOS 27' },
    ],
    steps: [
      { say: '新 Siri 行咗好長嘅路：2024 年發佈會預告，2025 年 3 月宣布延期。', sub: '新 Siri 之路漫長：2024 年發佈會預告，2025 年 3 月宣布==延期==。' },
      { say: '今年 1 月，Apple 確認同 Google 合作，由 Gemini 驅動新 Siri，報道指每年大約 10 億美元。', sub: '今年 1 月，Apple 確認與 Google 合作，由 Gemini 驅動新 Siri，據報每年約 ==10 億美元==。' },
      { say: '春天 iOS 26.4 推出第一階段，Siri 開始識睇畫面、理解上下文。', sub: '春季 iOS 26.4 推出第一階段，Siri 開始能理解畫面與上下文。' },
      { say: '6 月發佈會，Apple 正式推出全新 Siri 同 iOS 27。', sub: '6 月發佈會，Apple 正式推出==全新 Siri== 與 iOS 27。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '解讀',
    title: '合作不是示弱',
    img: 'Key',
    warm: true,
    points: [
      { at: 0, text: '最強模型每隔數月易手，自己造未必划算' },
      { at: 1, text: 'Gemini 經 PCC 運行，據報 Google 無法取得用戶資料' },
      { at: 2, text: '==入口==在 Apple 手上，模型隨時可換' },
    ],
    steps: [
      { say: '有人話同 Google 合作係示弱，但其實最強嘅模型每隔幾個月就易手，自己造未必划算。', sub: '有人認為與 Google 合作是示弱，但最強模型每隔數月便易手，自己造未必划算。' },
      { say: '而且據報道，Gemini 經 Apple 嘅私有雲運行，Google 攞唔到用戶資料。', sub: '而且據報道，Gemini 經 Apple 私有雲運行，Google 無法取得用戶資料。' },
      { say: '最重要係，入口喺 Apple 手，模型隨時可以換。', sub: '最重要的是，==入口==在 Apple 手上，模型隨時可以更換。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '領導層',
    title: '新 CEO：硬件工程師',
    img: 'Crown',
    points: [
      { at: 0, text: '2026 年 9 月 1 日：==John Ternus== 接任 CEO' },
      { at: 1, text: '25 年資深硬件工程師，主導 iPhone 與 Mac' },
      { at: 2, text: '市場解讀：AI 硬件或成下一個重點' },
    ],
    steps: [
      { say: '仲有一個轉變：今年 9 月 1 號，John Ternus 接替 Tim Cook 做 CEO，Cook 就轉做執行主席。', sub: '另一轉變：今年 9 月 1 日，==John Ternus== 接替 Tim Cook 出任 CEO，Cook 轉任執行主席。' },
      { say: 'Ternus 喺 Apple 做咗 25 年硬件工程，iPhone 同 Mac 都係佢主導。', sub: 'Ternus 在 Apple 從事硬件工程 25 年，主導 iPhone 與 Mac 開發。' },
      { say: '市場解讀係，Apple 下一步可能會用硬件去承載 AI，不過呢點仲要觀察。', sub: '市場解讀：Apple 下一步或以硬件承載 AI，惟仍有待觀察。' },
    ],
  },

  // ───────── 05 反方觀點 ─────────
  {
    layout: 'chapter',
    no: '05',
    title: '反方觀點',
    subtitle: '這個論點可能錯在哪裡？',
    img: 'Thinking face',
    warm: true,
    steps: [{ say: '不過，呢個論點都可能會錯。我哋睇吓反方點講。', sub: '不過，這個論點也可能出錯。以下是反方觀點。' }],
  },

  {
    layout: 'bullets',
    kicker: '風險',
    title: '五個隱憂',
    tone: 'bad',
    items: [
      { at: 0, img: 'Busts in silhouette', text: '**人才流失**：基礎模型團隊約 50–60 人，2025 年約十多人離開' },
      { at: 1, img: 'Handshake', text: '**依賴對手**：核心 AI 能力靠 Google' },
      { at: 2, img: 'Hourglass not done', text: '**執行力**：Siri 一再延期，用戶耐性有限' },
      { at: 3, img: 'Chart decreasing', text: '**資金流向**：投資者轉回 AI 基建，市值被 NVIDIA 反超' },
      { at: 4, img: 'Balance scale', text: '**監管**：App Store 抽成受各地監管壓力' },
    ],
    steps: [
      { say: '第一係人才。Apple 基礎模型團隊只有大約五六十人，2025 年就走咗十幾個，包括團隊主管。', sub: '第一是人才：Apple 基礎模型團隊僅約 50–60 人，2025 年約十多人離開，包括團隊主管。' },
      { say: '第二係依賴對手，核心 AI 能力靠 Google，將來條件點談都唔知。', sub: '第二是==依賴對手==：核心 AI 能力靠 Google，未來條款難以預料。' },
      { say: '第三係執行力，Siri 一延再延，用戶嘅耐性有限。', sub: '第三是執行力：Siri 一再延期，用戶耐性有限。' },
      { say: '第四係資金流向，最近投資者又轉返去 AI 基建股，Apple 市值再俾 NVIDIA 反超。', sub: '第四是資金流向：投資者近期轉回 AI 基建股，Apple 市值再被 NVIDIA ==反超==。' },
      { say: '第五係監管，App Store 嘅抽成喺唔同地方都受到壓力，收租模式未必長久。', sub: '第五是監管：App Store 抽成在各地受壓，收租模式未必長久。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '新對手',
    title: 'OpenAI × Jony Ive',
    img: 'Loudspeaker',
    points: [
      { at: 0, text: '2025 年以 ==65 億美元==收購 Jony Ive 的 io' },
      { at: 1, text: '首款產品延至 2027 年初，據報為帶鏡頭的智能喇叭' },
      { at: 2, text: '目標是全新類別，而非取代手機' },
    ],
    steps: [
      { say: '仲有新對手。OpenAI 2025 年用 65 億美元，收購咗前 Apple 設計總監 Jony Ive 嘅公司。', sub: '還有新對手：OpenAI 於 2025 年以 ==65 億美元==收購前 Apple 設計總監 Jony Ive 的公司。' },
      { say: '佢哋第一件產品延咗去 2027 年初，報道指係一部有鏡頭嘅智能喇叭。', sub: '其首款產品延至 2027 年初，據報為一部帶鏡頭的智能喇叭。' },
      { say: 'Sam Altman 話佢唔係要取代手機，而係做一個全新類別。', sub: 'Sam Altman 表示並非要取代手機，而是開創全新類別。' },
    ],
  },

  {
    layout: 'stats',
    kicker: '市場怎樣看',
    title: '市值競賽（2026 年 9 月 25 日）',
    items: [
      { at: 0, img: 'Gear', value: '5.43 萬億', label: 'NVIDIA 市值（美元）', source: 'Yahoo Finance' },
      { at: 0, img: 'Red apple', value: '4.93 萬億', label: 'Apple 市值（美元）', source: 'Yahoo Finance' },
      { at: 1, img: 'Balance scale', value: '≈5,000 億', label: '兩者差距（美元）', source: '計算所得', hl: true },
    ],
    steps: [
      { say: '市場點睇？9 月 25 號，NVIDIA 市值大約 5.43 萬億美元，Apple 大約 4.93 萬億。', sub: '市場怎樣看？9 月 25 日，NVIDIA 市值約 5.43 萬億美元，Apple 約 4.93 萬億。' },
      { say: '兩者差距大約 5000 億，Apple 曾經短暫登頂，之後又被反超。', sub: '兩者相差約 ==5,000 億美元==，Apple 曾短暫登頂，其後再被反超。' },
    ],
  },

  // ───────── 結論 ─────────
  {
    layout: 'compare',
    kicker: '結論',
    title: '「贏家」怎樣定義？',
    left: {
      title: '短期贏家',
      img: 'Pick',
      at: 0,
      items: [
        { at: 0, text: '賣「鏟子」的：NVIDIA、雲端服務' },
        { at: 0, text: '賺的是==建設期==的錢' },
      ],
    },
    right: {
      title: '長期贏家？',
      img: 'Trophy',
      at: 1,
      items: [
        { at: 1, text: '擁有用戶與入口的平台' },
        { at: 1, text: '賺的是==使用期==的錢' },
      ],
    },
    steps: [
      { say: '所以關鍵係點樣定義贏家。短期嘅贏家，係賣鏟子嘅 NVIDIA 同雲端公司，賺嘅係建設期嘅錢。', sub: '關鍵在於如何定義贏家：短期贏家是賣「鏟子」的 NVIDIA 與雲端公司，賺的是==建設期==的錢。' },
      { say: '但當 AI 變成日常，長期贏家可能係擁有用戶同入口嘅平台，賺嘅係使用期嘅錢。', sub: '但當 AI 普及，長期贏家或是擁有用戶與入口的平台，賺的是==使用期==的錢。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '觀察',
    title: '未來一年的五個指標',
    items: [
      { at: 0, img: 'Speech balloon', text: '新 Siri 的用戶評價與使用率' },
      { at: 0, img: 'Money bag', text: 'Apple 能否直接為 AI 功能收費' },
      { at: 1, img: 'Brain', text: '自家模型能否追上' },
      { at: 1, img: 'Crown', text: '新 CEO 的首款 AI 硬件' },
      { at: 2, img: 'Balance scale', text: 'App Store 抽成的監管結果' },
    ],
    steps: [
      { say: '未來一年可以留意五個指標：新 Siri 用戶評價點樣，同埋 Apple 可唔可以直接為 AI 功能收費。', sub: '未來一年可留意五個指標：新 Siri 的評價，以及 Apple 能否==直接為 AI 收費==。' },
      { say: '自家模型追唔追得上，同埋新 CEO 會唔會推出第一件 AI 硬件。', sub: '自家模型能否追上，以及新 CEO 會否推出首款 AI 硬件。' },
      { say: '最後係 App Store 抽成嘅監管結果。', sub: '最後是 App Store 抽成的監管結果。' },
    ],
  },

  {
    layout: 'outro',
    title: '重點總結',
    items: [
      { at: 0, text: '不燒錢：資本開支僅對手約 ==2%==' },
      { at: 0, text: '25 億部裝置 = 最大 AI 入口' },
      { at: 1, text: '私隱與晶片：難以複製的護城河' },
      { at: 1, text: '風險：人才、依賴 Google、執行力' },
    ],
    closing: { at: 2, text: '模型會換，==入口==才是長久的' },
    steps: [
      { say: '總結：Apple 唔燒錢，資本開支只係對手嘅百分之二左右，但手上有 25 億部裝置，係最大嘅 AI 入口。', sub: '總結：Apple 不燒錢，資本開支僅為對手約 ==2%==，卻擁有 25 億部裝置這個最大 AI 入口。' },
      { say: '佢有私隱同晶片做護城河，但人才、依賴 Google 同執行力都係真實嘅風險。', sub: '它有私隱與晶片作護城河，但人才、依賴 Google 與執行力皆是真實風險。' },
      { say: '模型會換，入口先至長久。你覺得 Apple 會唔會係最大贏家？歡迎留言，多謝收睇！', sub: '模型會換，==入口==才是長久的。你認為 Apple 會是最大贏家嗎？歡迎留言，謝謝收看！' },
    ],
  },
];
