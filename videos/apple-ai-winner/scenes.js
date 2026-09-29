// Apple 不需要贏 AI，它只需做 AI 的收費站（資料截至 2026 年 9 月）
// 每個 step：say = 配音（廣東話口語，AI 會自動讀 A. I.），sub = 畫面字幕（書面語，==關鍵字== 會高亮）。
window.META = {
  slug: 'apple-ai-winner',
  title: 'Apple 不需要贏 AI，它只需做 AI 的收費站',
  brand: '<b>科技</b> × 未來',
  stages: [],
};

window.SCENES = [
  {
    layout: 'title',
    title: 'Apple 不需要贏 AI\n它只需做 AI 的==收費站==',
    subtitle: '為何 Apple 終將成為 AI 年代的最大贏家',
    chips: ['iPhone', '服務收入', 'Apple 晶片', '資料截至 2026 年 9 月', '不構成投資建議'],
    imgs: [
      ['Red apple', 170, 120, 320],
      ['Classical building', 20, 330, 200],
      ['Money bag', 430, 330, 190],
      ['Trophy', 440, 40, 160],
      ['Sparkles', 60, 80, 130],
    ],
    steps: [
      { say: '今集講一個好反直覺嘅講法：Apple 唔需要贏 AI 競賽，佢只需要做 AI 嘅收費站。', sub: '本集探討一個反直覺的論點：Apple 不需要贏 AI 競賽，它只需做 AI 的==收費站==。' },
      { say: '我哋會用大約十分鐘，拆解點解佢可能係 AI 年代最大嘅贏家，亦會認真睇埋反方。', sub: '我們將用約十分鐘，拆解它為何可能是 AI 年代最大贏家，亦會認真檢視反方。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '反直覺',
    title: '「AI 落後」的 Apple？',
    img: 'Thinking face',
    points: [
      { at: 0, text: 'Siri 一再延期、AI 人才流失、要靠 ==Google Gemini==' },
      { at: 1, text: '股價一年升近 ==60%==' },
      { at: 1, text: '2026 年 7 月市值首次觸及 5 萬億美元' },
    ],
    steps: [
      {
        say: '過去兩年，Apple 成日俾人話 AI 落後：Siri 一再延期，AI 人才流失，連新 Siri 都要靠 Google 嘅 Gemini。',
        sub: '過去兩年，Apple 常被指 AI 落後：Siri 一再延期、人才流失，新 Siri 更要靠 ==Google Gemini==。',
      },
      { say: '但股價一年升咗接近六成，今年 7 月市值仲第一次觸及 5 萬億美元。', sub: '但股價一年上升近 ==60%==，今年 7 月市值更首次觸及 5 萬億美元。' },
      { say: '點解一間俾人話落後嘅公司，反而俾投資者咁睇好？', sub: '為何一家被指落後的公司，反而獲投資者如此看好？' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '核心論點',
    title: 'AI 淘金熱的三種人',
    quote: '最賺錢的，不是挖金的人，也不是賣鏟的人，而是==收過路費==的人',
    items: [
      { at: 1, img: 'Pick', text: '**挖金者**：OpenAI 等模型公司，燒錢爭用戶' },
      { at: 1, img: 'Hammer and wrench', text: '**賣鏟者**：NVIDIA 與雲端公司，賺建設期的錢' },
      { at: 2, img: 'Classical building', text: '**收路費者**：Apple，擁有 25 億部裝置這條路' },
    ],
    steps: [
      { say: '我嘅核心論點係一句：AI 淘金熱入面，最賺錢嘅唔係挖金嘅人，亦唔係賣鏟嘅人，而係收過路費嘅人。', sub: '核心論點：AI 淘金熱中，最賺錢的不是挖金者，也不是賣鏟者，而是==收過路費==的人。' },
      { say: '挖金嘅係 OpenAI 呢類模型公司，賣鏟嘅係 NVIDIA 同雲端公司。', sub: '挖金者是 OpenAI 等模型公司，賣鏟者是 NVIDIA 與雲端公司。' },
      { say: '而 Apple，就係擁有條路嗰個，路上面有 25 億部裝置。', sub: '而 Apple 擁有這條路，路上有 ==25 億部==裝置。' },
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
      { say: 'Apple Watch 同 AirPods 都一樣，佢唔係第一個，但最後做到市場上最成功。', sub: 'Apple Watch 與 AirPods 亦然：不是第一個，卻成為==市場上最成功==的產品。' },
      { say: '2020 年用自家晶片取代 Intel，亦係後發先至。所以有人相信，AI 都會係咁。', sub: '2020 年以自家晶片取代 Intel，同樣==後發先至==。有人相信 AI 亦會如此。' },
    ],
  },

  // ───────── 01 25 億部裝置 ─────────
  {
    layout: 'chapter',
    no: '01',
    title: 'AI 的最後一公里',
    subtitle: '25 億部裝置已在用戶手上',
    img: 'Mobile phone',
    steps: [{ say: '第一點：AI 嘅最後一公里，喺你隻手度。', sub: '第一點：AI 的==最後一公里==，就在你手上。' }],
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
      { say: 'OpenAI 用幾年時間拼命爭用戶，Apple 一覺瞓醒，已經有 25 億部活躍裝置。', sub: 'OpenAI 用數年拼命爭取用戶；Apple 一覺醒來，已有 ==25 億部==活躍裝置。' },
      { say: '一年仲多咗 1.5 億部，遍佈超過 175 個國家。', sub: '一年增加 1.5 億部，遍及逾 175 個國家。' },
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
      { say: '模型點強都好，最後都要經一部裝置先去到你面前。', sub: '模型再強，最終都要經裝置才能到達用戶面前。' },
      { say: 'iPhone 係大家最常用嘅裝置；Mac 用統一記憶體，可以喺本地行大型模型。', sub: 'iPhone 是最常用的個人裝置；Mac 的統一記憶體可在本地運行大型模型。' },
      { say: 'Apple Watch 有你嘅健康數據，AirPods 可以做語音助手同即時翻譯。', sub: 'Apple Watch 掌握健康數據，AirPods 可做語音助手與即時翻譯。' },
      { say: '加埋 Vision Pro 同 iPad，AI 可以跟住你由朝到晚。', sub: '再加上 Vision Pro 與 iPad，AI 可伴隨用戶==由早到晚==。' },
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
      { say: '而且新用戶仲不斷加入。iPhone 17 系列第一年嘅批發收入超過 1700 億美元，打破紀錄。', sub: '新用戶仍不斷加入：iPhone 17 系列首年批發收入逾 ==1,700 億美元==，創下紀錄。' },
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
      { say: '佢可以揀最好嘅模型接入。記住一句：模型係商品，入口先係壟斷。', sub: '它可挑選最好的模型接入。記住：模型是商品，==入口才是壟斷==。' },
    ],
  },

  // ───────── 02 服務收入 ─────────
  {
    layout: 'chapter',
    no: '02',
    title: '75% 毛利的印鈔機',
    subtitle: '服務收入年年創新高',
    img: 'Money with wings',
    warm: true,
    steps: [{ say: '第二點：Apple 其實有一部毛利率百分之七十五嘅印鈔機。', sub: '第二點：Apple 擁有一部毛利率 ==75%== 的印鈔機。' }],
  },

  {
    layout: 'bars',
    kicker: '數據',
    title: 'Apple 服務收入（財年）',
    bars: [
      { at: 0, label: '2020', value: 538, display: '538 億' },
      { at: 0, label: '2021', value: 684, display: '684 億' },
      { at: 1, label: '2022', value: 781, display: '781 億' },
      { at: 1, label: '2023', value: 852, display: '852 億' },
      { at: 1, label: '2024', value: 962, display: '962 億' },
      { at: 2, label: '2025', value: 1092, display: '1,092 億', hl: true },
    ],
    note: '單位：美元。資料來源：Apple 10-K 年報',
    noteAt: 2,
    steps: [
      { say: 'App Store、iCloud、Apple Music 呢類服務，2020 財年收入係 538 億美元。', sub: 'App Store、iCloud、Apple Music 等服務，2020 財年收入為 538 億美元。' },
      { say: '之後年年創新高，冇一年跌過。', sub: '此後年年創新高，==從未下跌==。' },
      { say: '2025 財年去到 1092 億，五年翻咗一倍。', sub: '2025 財年達 ==1,092 億美元==，五年翻倍。' },
    ],
  },

  {
    layout: 'stats',
    kicker: '賺錢能力',
    title: '服務 vs 硬件毛利率',
    items: [
      { at: 0, img: 'Money bag', value: '75.4%', label: '服務毛利率（2025 財年）', source: 'Apple 10-K', hl: true },
      { at: 0, img: 'Mobile phone', value: '≈36%', label: '產品毛利率', source: '2025 財年第四季' },
      { at: 1, img: 'Chart increasing', value: '66%', label: '2020 年服務毛利率', source: 'Apple 10-K' },
    ],
    steps: [
      { say: '更重要係利潤。服務嘅毛利率係 75.4%，硬件大約得 36%，差唔多係兩倍。', sub: '更重要的是利潤：服務毛利率達 ==75.4%==，硬件約 36%，相差近兩倍。' },
      { say: '而且呢個比率仲一路升緊，2020 年只係 66%。', sub: '這個比率仍在上升，2020 年僅 66%。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '拍賣官',
    title: '搜尋預設位：一年一拍賣',
    img: 'Balance scale',
    warm: true,
    points: [
      { at: 0, text: '2022 年 Google 付約 ==200 億美元==做 Safari 預設' },
      { at: 1, text: '2025 年反壟斷判決：可以繼續付，但合約一年一簽' },
      { at: 2, text: '市場解讀：AI 搜尋對手每年都可競投' },
    ],
    steps: [
      { say: '仲有一筆好少人講嘅錢。根據法庭文件，2022 年 Google 俾咗 Apple 大約 200 億美元，做 Safari 嘅預設搜尋。', sub: '還有一筆少人提及的收入：據法庭文件，2022 年 Google 付 Apple 約 ==200 億美元==做 Safari 預設搜尋。' },
      { say: '2025 年反壟斷案判決，Google 可以繼續俾錢，但合約要一年一簽。', sub: '2025 年反壟斷判決：Google 可繼續付款，但合約須一年一簽。' },
      { say: '市場解讀係，AI 搜尋大戰，Apple 唔使落場，佢係拍賣官，每年都可以睇邊個出價高。', sub: '市場解讀：AI 搜尋大戰中，Apple 不必下場，而是==拍賣官==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '收過路費',
    title: 'App Store：AI 的收費站',
    img: 'Receipt',
    points: [
      { at: 0, text: '2025 年從生成式 AI App 抽成約 ==9 億美元==' },
      { at: 1, text: '其中約 75% 來自 ChatGPT' },
      { at: 2, text: '2026 年預計逾 10 億美元' },
    ],
    steps: [
      { say: '無論邊間 AI 公司贏，佢哋喺 iPhone 收費都要經 App Store。2025 年，Apple 由 AI App 抽成大約 9 億美元。', sub: '無論哪家 AI 公司勝出，在 iPhone 收費都要經 App Store：2025 年 Apple 從 AI App 抽成約 ==9 億美元==。' },
      { say: '其中大約四分三嚟自 ChatGPT，即係對手賺錢，Apple 都有份。', sub: '其中約四分之三來自 ChatGPT——對手賺錢，Apple 亦==分一杯羹==。' },
      { say: '今年呢個數字預計會超過 10 億美元。', sub: '今年此數字預計將突破 10 億美元。' },
    ],
  },

  // ───────── 03 落後是一種選擇 ─────────
  {
    layout: 'chapter',
    no: '03',
    title: '落後，是一種選擇',
    subtitle: '別人燒錢，Apple 收抽成',
    img: 'Chequered flag',
    steps: [{ say: '第三點：落後，其實係一個選擇。', sub: '第三點：落後，其實是==一種選擇==。' }],
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
      { say: '睇吓今年嘅資本開支：Amazon、Microsoft、Google 同 Meta，每間都用過千億美元，主要就係起 AI 數據中心。', sub: '今年資本開支：Amazon、Microsoft、Google 與 Meta 各自投入逾==千億美元==，主要用於 AI 數據中心。' },
      { say: 'Apple 呢？大約 140 億美元，連人哋嘅零頭都唔夠。', sub: 'Apple 呢？約 ==140 億美元==，不及對手的零頭。' },
      { say: '四大雲端巨頭加埋大約七千二百五十億美元，Apple 只係佢哋嘅百分之二左右。', sub: '四大雲端巨頭合計約 7,250 億美元，Apple 僅其約 ==2%==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '反直覺',
    title: '模型愈便宜，Apple 愈賺',
    img: 'Key',
    warm: true,
    points: [
      { at: 0, text: '建數據中心要先付錢，回報卻未確定' },
      { at: 1, text: '最強模型每隔數月易手，價格持續下跌' },
      { at: 2, text: '擁有入口的人：挑==最平最好==的那個' },
    ],
    steps: [
      { say: '點解唔跟？因為起數據中心要先俾錢，但幾時回本仲未知。', sub: '為何不跟？興建數據中心須先付錢，回報時間仍未確定。' },
      { say: '而且最強嘅模型每隔幾個月就易手，價錢一路跌。', sub: '而且最強模型每隔數月便易手，價格持續下跌。' },
      { say: '所以有個反直覺嘅結論：模型愈平，Apple 愈賺，因為擁有入口嘅人可以揀最平最好嗰個。', sub: '反直覺的結論：==模型愈便宜，Apple 愈賺==，因為擁有入口者可挑最平最好的。' },
    ],
  },

  // ───────── 04 硬件 ─────────
  {
    layout: 'chapter',
    no: '04',
    title: '硬件優勢',
    subtitle: 'AI 從雲端回到地面',
    img: 'Gear',
    warm: true,
    steps: [{ say: '第四點：硬件。AI 由雲端落返地面嗰日，就係 Apple 嘅主場。', sub: '第四點：硬件。AI 從雲端回到地面之日，便是 ==Apple 的主場==。' }],
  },

  {
    layout: 'hero',
    kicker: '晶片',
    title: '自家晶片的三個優勢',
    img: 'Gear',
    points: [
      { at: 0, text: 'Neural Engine 自 ==2017 年==起內置於 iPhone' },
      { at: 1, text: 'Mac 統一記憶體：本地可運行大型模型' },
      { at: 2, text: '連 AI 伺服器都用自家晶片（Houston 工廠已出貨）' },
    ],
    steps: [
      { say: 'Apple 由 2017 年開始，已經喺 iPhone 入面放咗專做 AI 運算嘅 Neural Engine。', sub: 'Apple 自 ==2017 年==起已在 iPhone 內置專門處理 AI 的 Neural Engine。' },
      { say: 'Mac 嘅統一記憶體設計，令好多開發者直接喺自己部電腦行大型模型。', sub: 'Mac 的統一記憶體設計，讓不少開發者直接在電腦本地運行大型模型。' },
      { say: '連 Apple 自己嘅 AI 伺服器都用自家晶片，美國 Houston 嘅工廠已經開始出貨。', sub: '連 Apple 的 AI 伺服器都用自家晶片，美國 Houston 工廠已開始出貨。' },
    ],
  },

  {
    layout: 'bignum',
    kicker: '最有殺傷力的一點',
    value: '你',
    label: '在 iPhone 上運行 AI，電費由==你==支付',
    more: '裝置端運算的成本，由 25 億名用戶分擔',
    moreAt: 1,
    img: 'Electric plug',
    warm: true,
    steps: [
      { say: '仲有一點好有殺傷力：每次你喺 iPhone 本機行 AI，俾電費嘅係你，唔係 Apple。', sub: '最有殺傷力的一點：每次你在 iPhone 本機運行 AI，==電費由你支付==，不是 Apple。' },
      { say: '即係話，AI 運算嘅成本，由 25 億個用戶幫佢分擔。', sub: '換言之，AI 運算的成本由 25 億名用戶分擔。' },
    ],
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

  // ───────── 05 深厚的機器學習 ─────────
  {
    layout: 'chapter',
    no: '05',
    title: '你用了它的 AI 很多年',
    subtitle: '只是它從不叫它做 AI',
    img: 'Brain',
    steps: [{ say: '第五點：Apple 唔講 AI，只講功能。你用咗佢嘅 AI 好多年，只係佢從來冇叫佢做 AI。', sub: '第五點：Apple 不講 AI，只講功能。你用了它的 AI ==很多年==，只是它從不這樣稱呼。' }],
  },

  {
    layout: 'timeline',
    kicker: '時間線',
    title: 'Apple 的機器學習之路',
    events: [
      { at: 0, date: '2017', img: 'Bust in silhouette', title: 'Face ID', text: '神經網絡辨識人臉' },
      { at: 0, date: '2018', img: 'Anatomical heart', title: '心電圖', text: 'Apple Watch 偵測心房顫動' },
      { at: 1, date: '2019', img: 'Camera', title: 'Deep Fusion', text: '機器學習合成相片' },
      { at: 1, date: '2023', img: 'Shopping bags', title: '收購 32 間', text: 'AI 初創收購數目居首' },
      { at: 2, date: '2025', img: 'Stethoscope', title: '高血壓提示', text: '獲美國 FDA 批准' },
    ],
    steps: [
      { say: '2017 年嘅 Face ID 已經用神經網絡；2018 年 Apple Watch 心電圖可以偵測心房顫動。', sub: '2017 年 Face ID 已用神經網絡；2018 年 Apple Watch 心電圖可偵測==心房顫動==。' },
      { say: '2019 年相機用機器學習合成相片；2023 年 Apple 收購咗 32 間 AI 初創，數目係大型科技公司之中最多。', sub: '2019 年相機以機器學習合成相片；2023 年 Apple 收購 ==32 間== AI 初創，居大型科技公司之首。' },
      { say: '2025 年 9 月，Apple Watch 嘅高血壓提示獲得美國 FDA 批准。', sub: '2025 年 9 月，Apple Watch 高血壓提示獲美國 FDA 批准。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '健康 AI',
    title: 'ChatGPT 不能告訴你有高血壓',
    img: 'Stethoscope',
    points: [
      { at: 0, text: '高血壓提示：Apple 預計首年提醒逾 ==100 萬人==' },
      { at: 1, text: 'AirPods Pro：機器學習助聽功能，獲 FDA 批准' },
      { at: 2, text: '受監管的健康功能 = 對手難以跨越的門檻' },
    ],
    steps: [
      { say: 'Apple 預計，呢個高血壓提示第一年會提醒超過一百萬個可能唔知自己有高血壓嘅人。', sub: 'Apple 預計高血壓提示首年將提醒逾 ==100 萬名==可能未察覺患病的用戶。' },
      { say: 'AirPods Pro 用機器學習做助聽功能，都已經獲 FDA 批准。', sub: 'AirPods Pro 以機器學習提供助聽功能，亦已獲 FDA 批准。' },
      { say: '呢啲受監管嘅健康功能係好高嘅門檻：ChatGPT 唔可以話你知你有高血壓，Apple Watch 可以。', sub: '受監管的健康功能是高門檻：==ChatGPT 不能告訴你有高血壓==，Apple Watch 可以。' },
    ],
  },

  // ───────── 06 下一個入口 ─────────
  {
    layout: 'chapter',
    no: '06',
    title: '借力打力',
    subtitle: '搶下一個入口：Siri、新 CEO、新硬件',
    img: 'Handshake',
    steps: [{ say: '第六點：Apple 唔堅持自己造最強嘅模型，而係借力打力，同時搶下一個入口。', sub: '第六點：Apple 不堅持自造最強模型，而是==借力打力==，同時搶佔下一個入口。' }],
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
      { at: 2, date: '2026.06', img: 'Speech balloon', title: 'WWDC 2026', text: '全新 Siri、iOS 27' },
    ],
    steps: [
      { say: '新 Siri 行咗好長嘅路：2024 年發佈會預告，2025 年 3 月宣布延期。', sub: '新 Siri 之路漫長：2024 年發佈會預告，2025 年 3 月宣布==延期==。' },
      { say: '今年 1 月，Apple 確認同 Google 合作，由 Gemini 驅動新 Siri，報道指每年大約 10 億美元。', sub: '今年 1 月，Apple 確認與 Google 合作，由 Gemini 驅動新 Siri，據報每年約 ==10 億美元==。' },
      { say: '春天推出第一階段，6 月發佈會正式推出全新 Siri 同 iOS 27。', sub: '春季推出第一階段，6 月發佈會正式推出==全新 Siri== 與 iOS 27。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '解讀',
    title: '合作不是示弱',
    img: 'Puzzle piece',
    warm: true,
    points: [
      { at: 0, text: '最強模型每隔數月易手，自己造未必划算' },
      { at: 1, text: 'Gemini 經 PCC 運行，據報 Google 無法取得用戶資料' },
      { at: 2, text: '==入口==在 Apple 手上，模型隨時可換' },
    ],
    steps: [
      { say: '有人話同 Google 合作係示弱，但最強嘅模型每隔幾個月就易手，自己造未必划算。', sub: '有人認為與 Google 合作是示弱，但最強模型每隔數月便易手，自己造未必划算。' },
      { say: '而且據報道，Gemini 經 Apple 嘅私有雲運行，Google 攞唔到用戶資料。', sub: '而且據報道，Gemini 經 Apple 私有雲運行，Google 無法取得用戶資料。' },
      { say: '最重要係，入口喺 Apple 手，模型隨時可以換。', sub: '最重要的是，==入口==在 Apple 手上，模型隨時可以更換。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '下一個入口',
    title: '新 CEO 與 2027 年',
    img: 'Glasses',
    points: [
      { at: 0, text: '9 月 1 日：硬件工程師 ==John Ternus== 接任 CEO' },
      { at: 1, text: '據報 2027 年底推出 AI 智能眼鏡（約 300–500 美元）' },
      { at: 2, text: '據報枱面機械人 2027–28 年推出' },
    ],
    steps: [
      { say: '今年 9 月 1 號，做咗 25 年硬件工程嘅 John Ternus 接替 Tim Cook 做 CEO。', sub: '今年 9 月 1 日，擁有 25 年硬件工程經驗的 ==John Ternus== 接替 Tim Cook 出任 CEO。' },
      { say: '據 Bloomberg 報道，Apple 計劃 2027 年底推出 AI 智能眼鏡，價錢大約 300 到 500 美元。', sub: '據 Bloomberg 報道，Apple 計劃 2027 年底推出 AI 智能眼鏡，售價約 300 至 500 美元。' },
      { say: '仲有一部枱面機械人，預計 2027 到 28 年推出。有記者形容，2027 年可能係 Apple 史上最大嘅產品年。', sub: '另有枱面機械人預計 2027 至 28 年推出；有記者形容 2027 年或是 Apple ==史上最大產品年==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '信任',
    title: '當 AI 要知道你的一切',
    img: 'Shield',
    points: [
      { at: 0, text: 'AI 愈了解你，愈需要接觸私人資料' },
      { at: 1, text: 'Apple：不儲存、可驗證的私有雲承諾' },
      { at: 1, text: '問題是：==你會信誰？==' },
    ],
    steps: [
      { say: 'AI 愈了解你，就愈需要接觸你嘅私人資料：訊息、相片、健康、行程。', sub: 'AI 愈了解你，便愈需接觸私人資料：訊息、相片、健康、行程。' },
      { say: '當 AI 要知道你嘅一切，你會信邊一間公司？呢個可能係 Apple 最大嘅王牌。', sub: '當 AI 要知道你的一切，==你會信誰？==這或許是 Apple 最大的王牌。' },
    ],
  },

  // ───────── 反方 ─────────
  {
    layout: 'chapter',
    no: '07',
    title: '反方觀點',
    subtitle: '這個論點可能錯在哪裡？',
    img: 'Thinking face',
    warm: true,
    steps: [{ say: '不過，呢個論點都可能會錯。我哋睇吓反方最強嘅攻擊。', sub: '不過，這個論點也可能出錯。以下是反方最有力的觀點。' }],
  },

  {
    layout: 'bullets',
    kicker: '風險',
    title: '收費站論的五大威脅',
    tone: 'bad',
    items: [
      { at: 0, img: 'Warning', text: '**AI 代理繞過 App**：AI 直接辦事，不再打開 App' },
      { at: 1, img: 'Handshake', text: '**命脈在對手手上**：新 Siri 靠 Google' },
      { at: 2, img: 'Loudspeaker', text: '**新入口出現**：OpenAI × Jony Ive 硬件，2027 年初推出' },
      { at: 3, img: 'Busts in silhouette', text: '**人才流失**：2025 年基礎模型團隊約十多人離開' },
      { at: 4, img: 'Balance scale', text: '**監管**：App Store 抽成與搜尋合約受壓' },
    ],
    steps: [
      { say: '最大嘅威脅係 AI 代理：如果 AI 直接幫你訂機票、叫外賣，你唔使開 App，收費站就可能被繞過。', sub: '最大威脅是 ==AI 代理==：若 AI 直接幫你訂機票、叫外賣而不必開 App，收費站便可能被繞過。' },
      { say: '第二係命脈喺對手手上，新 Siri 靠 Google，如果 Google 加價或者能力差距拉闊，Apple 會好被動。', sub: '第二是命脈在對手手上：新 Siri 靠 Google，若對方加價或差距拉闊，Apple 將很被動。' },
      { say: '第三係新入口。OpenAI 用 65 億美元收購 Jony Ive 嘅公司，第一件產品 2027 年初推出。', sub: '第三是新入口：OpenAI 以 65 億美元收購 Jony Ive 的公司，首款產品 2027 年初推出。' },
      { say: '第四係人才，2025 年 Apple 基礎模型團隊走咗十幾人，包括主管。', sub: '第四是人才：2025 年 Apple 基礎模型團隊約十多人離開，包括主管。' },
      { say: '第五係監管，App Store 抽成同搜尋合約，喺唔同地方都受緊壓力。', sub: '第五是監管：App Store 抽成與搜尋合約在各地均受壓。' },
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
      { say: '市場暫時點睇？9 月 25 號，NVIDIA 市值大約 5.43 萬億美元，Apple 大約 4.93 萬億。', sub: '市場暫時怎樣看？9 月 25 日，NVIDIA 市值約 5.43 萬億美元，Apple 約 4.93 萬億。' },
      { say: '即係話，短期嚟講，賣鏟嘅仍然領先。', sub: '換言之，短期而言，==賣鏟者==仍然領先。' },
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
      { say: '所以關鍵係點樣定義贏家。短期嘅贏家，係賣鏟嘅 NVIDIA 同雲端公司，賺嘅係建設期嘅錢。', sub: '關鍵在於如何定義贏家：短期贏家是賣鏟的 NVIDIA 與雲端公司，賺的是==建設期==的錢。' },
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
      { at: 1, img: 'Warning', text: 'AI 代理會否繞過 App Store' },
      { at: 1, img: 'Glasses', text: '2027 年 AI 眼鏡能否成為新入口' },
      { at: 2, img: 'Balance scale', text: '搜尋合約與 App Store 的監管結果' },
    ],
    steps: [
      { say: '未來一年可以留意五樣嘢：新 Siri 嘅評價，同埋 Apple 可唔可以直接為 AI 功能收費。', sub: '未來一年可留意五個指標：新 Siri 的評價，以及 Apple 能否==直接為 AI 收費==。' },
      { say: 'AI 代理會唔會繞過 App Store，同埋 2027 年嘅 AI 眼鏡能唔能夠成為新入口。', sub: 'AI 代理會否繞過 App Store，以及 2027 年的 AI 眼鏡能否成為新入口。' },
      { say: '最後係搜尋合約同 App Store 嘅監管結果。', sub: '最後是搜尋合約與 App Store 的監管結果。' },
    ],
  },

  {
    layout: 'outro',
    title: '重點總結',
    items: [
      { at: 0, text: '25 億部裝置 = AI 的==最後一公里==' },
      { at: 0, text: '服務毛利 75%，搜尋位一年一拍賣' },
      { at: 1, text: '不燒錢：模型愈便宜，Apple 愈賺' },
      { at: 1, text: '最大威脅：AI 代理繞過 App' },
    ],
    closing: { at: 2, text: '模型是商品，==入口才是壟斷==' },
    steps: [
      { say: '總結：Apple 有 25 億部裝置做 AI 嘅最後一公里，服務毛利率 75%，仲可以一年一次拍賣搜尋位。', sub: '總結：Apple 以 25 億部裝置掌握 AI 的==最後一公里==，服務毛利率 75%，搜尋位一年一拍賣。' },
      { say: '佢唔燒錢，模型愈平佢愈賺；但 AI 代理繞過 App，係最大嘅威脅。', sub: '它不燒錢，模型愈便宜它愈賺；但 AI 代理繞過 App 是最大威脅。' },
      { say: '記住一句：模型係商品，入口先係壟斷。以上唔構成投資建議。你覺得 Apple 會唔會係最大贏家？歡迎留言，多謝收睇！', sub: '記住：模型是商品，==入口才是壟斷==。以上不構成投資建議，歡迎留言分享看法，謝謝收看！' },
    ],
  },
];
