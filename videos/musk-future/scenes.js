// Elon Musk 的兩盤大棋：太空 AI 運算站 × 全球交通數據樞紐（資料截至 2026 年 9 月）
// 每個 step：say = 配音（廣東話口語），sub = 畫面字幕（書面語，==關鍵字== 會高亮）。畫面文字一律用書面語。
// img = Fluent 3D 插圖名稱（fetch_assets.py 下載）。
window.META = {
  slug: 'musk-future',
  title: 'Elon Musk 的兩盤大棋',
  brand: '<b>科技</b> × 未來',
  stages: [],
};

window.SCENES = [
  {
    layout: 'title',
    title: 'Elon Musk 的\n==兩盤大棋==',
    subtitle: '太空 AI 運算站 × 全球交通數據樞紐',
    chips: ['SpaceX', 'xAI', 'Tesla', 'Starlink', '資料截至 2026 年 9 月'],
    imgs: [
      ['Rocket', 200, 40, 300],
      ['Satellite', 20, 250, 220],
      ['Brain', 400, 300, 200],
      ['Taxi', 150, 420, 200],
      ['Sun', 430, 60, 150],
    ],
    steps: [
      {
        say: '今集講 Elon Musk 兩盤大棋：將 AI 運算站擺上太空，同埋將全世界嘅交通變成一個數據樞紐。',
        sub: '本集聚焦 Elon Musk 的兩盤大棋：把 ==AI 運算站送上太空==，以及把全球交通變成==數據樞紐==。',
      },
      { say: '我哋會用大約九分鐘，拆解佢點樣做、有咩難關，同埋點解有人覺得恐怖。', sub: '我們將用約九分鐘，拆解其做法、難關，以及為何有人感到憂慮。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '背景',
    title: '為何現在要關注？',
    img: 'Chart increasing',
    points: [
      { at: 0, text: '2026 年 2 月：SpaceX 併購 xAI，合併估值約 ==1.25 萬億美元==' },
      { at: 1, text: '2026 年 6 月：SpaceX 上市，集資約 750 億美元，==史上最大 IPO==' },
      { at: 2, text: '火箭、衛星、AI、社交媒體同屬一家公司' },
    ],
    steps: [
      { say: '點解而家要睇？因為今年 2 月，SpaceX 併購咗 xAI，合併估值大約 1.25 萬億美元。', sub: '為何現在要關注？今年 2 月，SpaceX 併購 xAI，合併估值約 ==1.25 萬億美元==。' },
      { say: '6 月 SpaceX 上市，集資大約 750 億美元，係史上最大嘅 IPO。', sub: '6 月 SpaceX 上市，集資約 750 億美元，是==史上最大 IPO==。' },
      { say: '即係話，火箭、衛星、AI 同社交媒體，而家係同一間公司，兩盤棋可以互相支援。', sub: '換言之，火箭、衛星、AI 與社交媒體已同屬一家公司，兩盤棋可互相支援。' },
    ],
  },

  {
    layout: 'timeline',
    kicker: '時間線',
    title: '過去一年的關鍵事件',
    events: [
      { at: 0, date: '2025.11', img: 'Money bag', title: 'Tesla 薪酬方案', text: '條件包括 100 萬輛 Robotaxi' },
      { at: 1, date: '2026.01', img: 'Satellite', title: 'FCC 申請', text: '最多 100 萬顆 AI 運算衛星' },
      { at: 2, date: '2026.02', img: 'Link', title: '併購 xAI', text: 'SpaceX 與 xAI 合併' },
      { at: 2, date: '2026.06', img: 'Bar chart', title: 'SpaceX 上市', text: '集資約 750 億美元' },
      { at: 3, date: '2026.09', img: 'Rocket', title: 'Starship 入軌', text: '部署 26 顆 Starlink V3' },
    ],
    steps: [
      {
        say: '先快速睇吓過去一年。2025 年 11 月，Tesla 股東通過佢嘅薪酬方案，條件包括一百萬架 Robotaxi。',
        sub: '先回顧過去一年：2025 年 11 月，Tesla 股東通過其薪酬方案，條件包括 ==100 萬輛 Robotaxi==。',
      },
      { say: '2026 年 1 月，SpaceX 向美國通訊委員會申請，最多發射一百萬粒 AI 運算衛星。', sub: '2026 年 1 月，SpaceX 向美國 FCC 申請發射最多 ==100 萬顆== AI 運算衛星。' },
      { say: '2 月，SpaceX 併購 xAI；6 月，SpaceX 上市。', sub: '2 月，SpaceX 併購 xAI；6 月，SpaceX 上市。' },
      { say: '9 月 28 號，Starship 第一次成功入軌，放出 26 粒新一代 Starlink 衛星。', sub: '9 月 28 日，Starship 首次成功入軌，部署 26 顆新一代 Starlink 衛星。' },
    ],
  },

  // ───────── 第一盤棋 ─────────
  {
    layout: 'chapter',
    no: '01',
    title: '把 AI 運算站送上太空',
    subtitle: '用太空的太陽能，解決 AI 缺電',
    img: 'Satellite',
    steps: [{ say: '第一盤棋：將 AI 運算站擺上太空，用太空嘅太陽能解決 AI 缺電。', sub: '第一盤棋：把 AI 運算站送上太空，以太空太陽能解決 AI 缺電。' }],
  },

  {
    layout: 'bars',
    kicker: '問題',
    title: '全球數據中心用電急升',
    bars: [
      { at: 0, label: '2024', value: 415, display: '415 TWh' },
      { at: 1, label: '2030', value: 945, display: '945 TWh', hl: true },
      { at: 2, label: '2035', value: 1200, display: '≈1,200 TWh' },
    ],
    note: '資料來源：國際能源署（IEA）《Energy and AI》基準情境',
    steps: [
      { say: '先講問題。國際能源署估計，2024 年全球數據中心用咗大約 415 太瓦時電。', sub: '先談問題：國際能源署估計，2024 年全球數據中心耗電約 ==415 太瓦時==。' },
      { say: '去到 2030 年會翻一倍到 945 太瓦時，差唔多等於成個日本一年嘅用電。', sub: '2030 年將倍增至 ==945 太瓦時==，約等於日本全國一年用電。' },
      { say: '2035 年仲會升到大約 1200 太瓦時，而最主要嘅推手就係 AI。', sub: '2035 年更將升至約 1,200 太瓦時，最主要的推手正是 ==AI==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '瓶頸',
    title: '在地球興建的三大難處',
    img: 'High voltage',
    warm: true,
    points: [
      { at: 0, text: '**電網**：不少新項目須排隊等候供電' },
      { at: 1, text: '**土地與社區**：選址困難、居民反對' },
      { at: 2, text: '**冷卻**：需要大量用水散熱' },
    ],
    steps: [
      { say: '喺地球起數據中心，第一個樽頸係電網，好多新項目要排隊等供電。', sub: '在地球興建數據中心，首要瓶頸是==電網==：不少新項目須排隊等候供電。' },
      { say: '第二係土地同社區，唔少地方嘅居民反對喺附近起大型數據中心。', sub: '其次是土地與社區：不少地方的居民反對在附近興建大型數據中心。' },
      { say: '第三係冷卻，大型數據中心要用大量水散熱。', sub: '第三是冷卻：大型數據中心需要大量用水散熱。' },
    ],
  },

  {
    layout: 'compare',
    kicker: '構想',
    title: '地球 vs 太空：誰的陽光更好？',
    left: {
      title: '地球',
      img: 'Sun behind cloud',
      at: 0,
      items: [
        { at: 0, text: '晝夜與天氣令發電不穩' },
        { at: 0, text: '陽光經大氣層削弱' },
        { at: 0, text: '需要電網、土地與水' },
      ],
    },
    right: {
      title: '太空',
      img: 'Sun',
      at: 1,
      items: [
        { at: 1, text: '日照約 ==1,361 W/m²==' },
        { at: 2, text: '合適軌道近乎全天受光' },
        { at: 2, text: '年發電量約為地面 ==3–5 倍==' },
      ],
    },
    steps: [
      { say: '所以 Musk 嘅諗法係：唔好喺地球起，擺上太空。喺地球，太陽能有日夜同天氣限制。', sub: '因此 Musk 構想把數據中心送上太空。在地球，太陽能受晝夜與天氣限制。' },
      { say: '喺太空冇大氣層阻擋，陽光強度大約每平方米 1361 瓦。', sub: '太空沒有大氣層阻隔，日照強度約每平方米 ==1,361 瓦==。' },
      {
        say: '有分析估計，同一塊太陽能板喺合適嘅軌道，一年發電量可以係地面嘅三到五倍。',
        sub: '有分析估計，同一塊太陽能板在合適軌道上，年發電量可達地面的 ==3 至 5 倍==。',
      },
    ],
  },

  {
    layout: 'hero',
    kicker: '原理',
    title: '晨昏軌道',
    img: 'Globe with meridians',
    caption: '沿晝夜分界線運行',
    points: [
      { at: 0, text: '衛星沿地球==晝夜分界線==飛行' },
      { at: 0, text: '幾乎不進入地球陰影，可持續發電' },
      { at: 1, text: '但這類軌道空間有限，無法無限擴充' },
    ],
    steps: [
      {
        say: '關鍵係一種叫晨昏軌道嘅路線：衛星沿住地球日夜嘅分界線飛，幾乎唔會入地球陰影，太陽能板可以一直發電。',
        sub: '關鍵在於==晨昏軌道==：衛星沿晝夜分界線飛行，幾乎不進入地球陰影，可持續發電。',
      },
      { say: '不過呢類軌道嘅空間有限，唔可以無限咁擺。', sub: '不過，這類軌道空間有限，無法無限擴充。' },
    ],
  },

  {
    layout: 'flow',
    kicker: '方案',
    title: 'SpaceX 的太空算力方案',
    items: [
      { hl: 0, img: 'Rocket', en: '發射', zh: 'Starship', desc: '可重用、低成本' },
      { hl: 1, img: 'Satellite', en: '運算', zh: 'AI 衛星', desc: '太陽能板 + AI 晶片' },
      { hl: 2, img: 'Satellite antenna', en: '回傳', zh: '雷射 + Starlink', desc: '結果傳回地面' },
      { hl: 3, img: 'Brain', en: '使用', zh: 'xAI 等', desc: '訓練與運行 AI' },
    ],
    loopText: '2026 年 1 月向美國 FCC 申請：最多 ==100 萬顆==衛星',
    steps: [
      { say: 'SpaceX 嘅方案分四步。第一步，用可以重用嘅 Starship 平價大量發射。', sub: 'SpaceX 的方案分四步：首先以可重用的 Starship ==低成本大量發射==。' },
      { say: '第二步，每粒衛星都係細型運算站，有太陽能板同 AI 晶片。', sub: '第二步，每顆衛星都是小型運算站，配備太陽能板與 AI 晶片。' },
      { say: '第三步，衛星之間用雷射連接，再經 Starlink 將結果傳返地面。', sub: '第三步，衛星以雷射互連，再經 Starlink 把結果傳回地面。' },
      { say: '第四步，俾 xAI 同其他客戶用嚟訓練同運行 AI。', sub: '第四步，供 xAI 等客戶訓練與運行 AI。' },
    ],
  },

  {
    layout: 'bignum',
    kicker: '規模',
    value: '100 萬',
    unit: '顆',
    label: 'SpaceX 申請發射的 AI 運算衛星上限',
    more: '目前 Starlink 在軌約 11,000 顆，相差約 ==90 倍==',
    moreAt: 1,
    source: '資料來源：美國 FCC 申請文件（2026 年 1 月）',
    img: 'Satellite antenna',
    steps: [
      { say: '一百萬粒係咩概念？', sub: '100 萬顆是甚麼概念？' },
      { say: '而家 Starlink 喺軌道上大約有一萬一千粒衛星，一百萬粒即係多九十倍。', sub: '目前 Starlink 在軌衛星約 11,000 顆，100 萬顆約為其 ==90 倍==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '運力',
    title: 'Starship：關鍵的一環',
    img: 'Rocket',
    points: [
      { at: 0, text: '設計目標：==完全重用==，大幅降低每公斤發射成本' },
      { at: 1, text: '2026 年 9 月 28 日：第 14 次試飛首次入軌' },
      { at: 2, text: '部署 26 顆 Starlink V3，首次執行有收入的任務' },
    ],
    steps: [
      {
        say: '要發射咁多衛星，就要靠 Starship。佢嘅設計目標係完全重用，令每公斤嘅發射成本大幅下降。',
        sub: '發射如此多衛星須靠 Starship，其設計目標是==完全重用==，大幅降低每公斤發射成本。',
      },
      { say: '2026 年 9 月 28 號，Starship 第十四次試飛，第一次成功入軌。', sub: '2026 年 9 月 28 日，Starship 第 14 次試飛首次成功入軌。' },
      { say: '仲放出咗 26 粒新一代 Starlink V3 衛星，係佢第一次運載有收入嘅貨物。', sub: '並部署 26 顆 Starlink V3 衛星，是其首次執行==有收入的任務==。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '難關',
    title: '專家指出的四大難關',
    tone: 'bad',
    items: [
      { at: 1, img: 'Thermometer', text: '**散熱**：真空中只能靠輻射散熱，需要巨大散熱板' },
      { at: 2, img: 'Radioactive', text: '**輻射與溫差**：高能粒子損壞晶片，零件易老化' },
      { at: 3, img: 'Hourglass not done', text: '**晶片過時**：兩三年便落後，難以維修更換' },
      { at: 4, img: 'Money with wings', text: '**成本與傳輸**：數據須傳回地球，成本仍高於地面' },
    ],
    steps: [
      { say: '不過，專家指出有四大難關。', sub: '不過，專家指出四大難關。' },
      { say: '第一係散熱。太空係真空，唔可以用風扇或者水冷，熱力只可以靠輻射散走，要好大塊散熱板。', sub: '第一是==散熱==：真空中無法風冷或水冷，只能靠輻射散熱，需要巨大散熱板。' },
      { say: '第二係輻射同溫差，高能粒子會損壞晶片，冷熱交替亦令零件老化。', sub: '第二是==輻射與溫差==：高能粒子會損壞晶片，冷熱交替亦令零件老化。' },
      { say: '第三係晶片過時。AI 晶片兩三年就落後，但上咗太空好難維修同更換。', sub: '第三是==晶片過時==：AI 晶片兩三年便落後，送上太空後難以維修更換。' },
      { say: '第四係成本同傳輸，大量數據要傳返地球，整體成本目前仍然比地面高。', sub: '第四是==成本與傳輸==：大量數據須傳回地球，整體成本仍高於地面。' },
    ],
  },

  {
    layout: 'compare',
    kicker: '時間表',
    title: 'Musk 的預期 vs 專家的看法',
    left: {
      title: 'Musk',
      img: 'Alarm clock',
      at: 0,
      items: [
        { at: 0, text: '==30 至 36 個月==內，太空將成為運行 AI 最划算之處' },
        { at: 0, text: '目標 2027 年底開始發射' },
      ],
    },
    right: {
      title: '專家',
      img: 'Magnifying glass tilted left',
      at: 1,
      items: [
        { at: 1, text: '德意志銀行：==2030 年代==才接近成本持平' },
        { at: 1, text: '基金經理：大規模部署是「下一個十年的事」' },
      ],
    },
    steps: [
      { say: '時間表方面，Musk 話 30 到 36 個月內，太空就會成為運行 AI 最划算嘅地方。', sub: '時間表方面，Musk 稱 ==30 至 36 個月==內，太空將成為運行 AI 最划算之處。' },
      {
        say: '但德意志銀行估計要去到 2030 年代先接近成本持平，有基金經理更形容係下一個十年嘅事。',
        sub: '但德意志銀行估計要到 ==2030 年代==才接近成本持平，有基金經理形容這是「下一個十年的事」。',
      },
    ],
  },

  {
    layout: 'bullets',
    kicker: '競爭',
    title: '不只 Musk 在做',
    items: [
      { at: 0, img: 'Light bulb', text: '**Google Suncatcher**：AI 晶片上軌道測試，2027 年再發兩顆衛星' },
      { at: 1, img: 'Satellite', text: '**Starcloud**：2025 年 11 月已把 NVIDIA H100 送上太空' },
      { at: 2, img: 'Rocket', text: '**SpaceX 優勢**：==自有火箭與衛星網絡==，對手也要搭乘' },
    ],
    steps: [
      {
        say: '唔止 Musk 一個人咁諗。Google 嘅 Suncatcher 計劃，準備將自家 AI 晶片送上軌道測試，2027 年再發射兩粒衛星驗證互聯。',
        sub: '有此構想的不只 Musk：Google「Suncatcher」準備把 AI 晶片送上軌道測試，2027 年再發射兩顆衛星驗證互聯。',
      },
      { say: '初創公司 Starcloud，2025 年 11 月已經將一塊 NVIDIA H100 送上太空。', sub: '初創公司 Starcloud 已於 2025 年 11 月把 NVIDIA H100 送上太空。' },
      {
        say: '但 SpaceX 最大嘅優勢係火箭同衛星網絡都係自己嘅，連 Google 嘅測試衛星都安排搭 SpaceX 火箭。',
        sub: '但 SpaceX 最大優勢是==自有火箭與衛星網絡==，連 Google 的測試衛星也安排搭乘其火箭。',
      },
    ],
  },

  // ───────── 第二盤棋 ─────────
  {
    layout: 'chapter',
    no: '02',
    title: '全球交通數據樞紐',
    subtitle: '車隊、衛星與 AI 的結合',
    img: 'Taxi',
    warm: true,
    steps: [{ say: '第二盤棋：交通。車隊、衛星同 AI 加埋，可能變成一個全球交通數據樞紐。', sub: '第二盤棋：交通。車隊、衛星與 AI 結合，或成為==全球交通數據樞紐==。' }],
  },

  {
    layout: 'bars',
    kicker: '數據',
    title: 'Tesla 輔助駕駛年度里程',
    bars: [
      { at: 0, label: '2021', value: 0.06, display: '600 萬' },
      { at: 0, label: '2022', value: 0.8, display: '8,000 萬' },
      { at: 1, label: '2023', value: 6.7, display: '6.7 億' },
      { at: 1, label: '2024', value: 22.5, display: '22.5 億' },
      { at: 1, label: '2025', value: 42.5, display: '42.5 億', hl: true },
    ],
    note: '單位：英里。2026 年 8 月累計突破 ==140 億英里==（第三方追蹤統計）',
    noteAt: 2,
    steps: [
      { say: '先睇數據。Tesla 輔助駕駛每年行嘅里程，2021 年只係大約六百萬英里。', sub: '先看數據：Tesla 輔助駕駛的年度里程，2021 年僅約 600 萬英里。' },
      { say: '去到 2024 年已經有 22 億幾，2025 年再翻一倍去到大約 42 億英里。', sub: '2024 年已逾 22 億，2025 年再倍增至約 ==42.5 億英里==。' },
      {
        say: '到 2026 年 8 月，累計里程已經突破 140 億英里。呢啲行車影像，就係訓練自動駕駛 AI 嘅燃料。',
        sub: '截至 2026 年 8 月累計突破 ==140 億英里==，這些影像正是訓練自動駕駛 AI 的燃料。',
      },
    ],
  },

  {
    layout: 'hero',
    kicker: '第一塊',
    title: 'Robotaxi 與 Cybercab',
    img: 'Oncoming automobile',
    warm: true,
    points: [
      { at: 0, text: '德州、佛州 ==6 個城市==無人駕駛載客' },
      { at: 1, text: 'Cybercab：無方向盤、無踏板，已開始生產' },
      { at: 2, text: 'Musk 稱約需 100 億英里數據，車隊已超越' },
    ],
    steps: [
      { say: '呢啲數據已經用喺 Robotaxi。Tesla 喺德州同佛羅里達六個城市，提供冇安全員嘅無人駕駛載客。', sub: '這些數據已用於 Robotaxi：Tesla 在德州及佛州==六個城市==提供無人駕駛載客。' },
      { say: '專用嘅 Cybercab 冇軚盤、冇踏板，已經開始生產。', sub: '專用車 Cybercab 沒有方向盤與踏板，已開始生產。' },
      { say: 'Musk 今年初講過，要大約一百億英里數據先可以安全咁無人駕駛，而車隊而家已經超過呢個數。', sub: 'Musk 今年初稱約需 ==100 億英里==數據才能安全無人駕駛，車隊現已超越此數。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '第二塊',
    title: '車內的 Grok',
    img: 'Speech balloon',
    points: [
      { at: 0, text: '語音導航、撥打電話、調校溫度' },
      { at: 1, text: '處理電郵、日程與文件' },
      { at: 1, text: '→ AI 掌握你的==行程安排==' },
    ],
    steps: [
      { say: '第二塊係 Grok。xAI 嘅 AI 已經裝咗入 Tesla 車，可以用把口叫佢導航、打電話、較冷氣。', sub: '第二塊是 Grok：xAI 的 AI 已整合至 Tesla 車內，可語音導航、撥號、調校溫度。' },
      { say: '佢仲可以幫你處理電郵同日程，即係 AI 會知道你嘅行程安排。', sub: '它亦可處理電郵與日程，意味著 AI 能掌握你的==行程安排==。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '第三塊',
    title: 'Starlink 直連手機',
    img: 'Mobile phone',
    points: [
      { at: 0, text: '沒有基站的地區，手機亦可直連衛星' },
      { at: 1, text: '2025 年 9 月：以約 ==170 億美元==購入 EchoStar 頻譜' },
      { at: 2, text: '再申請最多 15,000 顆直連手機衛星' },
    ],
    steps: [
      { say: '第三塊係 Starlink 直連手機。就算附近冇基站，手機都可以直接連衛星上網。', sub: '第三塊是 Starlink 直連手機：即使附近沒有基站，手機也能直接連上衛星。' },
      { say: '2025 年 9 月，SpaceX 用大約 170 億美元，買咗 EchoStar 嘅頻譜嚟擴大呢個服務。', sub: '2025 年 9 月，SpaceX 斥資約 ==170 億美元==購入 EchoStar 頻譜擴展服務。' },
      { say: '佢仲申請再發射最多一萬五千粒直連手機衛星。', sub: '並申請再發射最多 15,000 顆直連手機衛星。' },
    ],
  },

  {
    layout: 'hero',
    kicker: '第四塊',
    title: '火箭點對點運輸（構想）',
    img: 'World map',
    warm: true,
    points: [
      { at: 0, text: '以 Starship 進行洲際客運' },
      { at: 0, text: 'Musk 聲稱：倫敦至紐約約 ==29 分鐘==' },
      { at: 1, text: '現況：仍需多年，重點在月球與火星任務' },
    ],
    steps: [
      {
        say: '第四塊係 Starship 嘅一個構想：用火箭做洲際點對點運輸，Musk 聲稱倫敦去紐約只要大約 29 分鐘。',
        sub: '第四塊是 Starship 的構想：以火箭做洲際點對點運輸，Musk 稱倫敦至紐約約 ==29 分鐘==。',
      },
      { say: '不過呢個構想仲要好多年，而家 Starship 嘅重點係月球同火星任務。', sub: '不過此構想仍需多年，Starship 目前重點在月球與火星任務。' },
    ],
  },

  {
    layout: 'hub',
    kicker: '推演',
    title: '全球交通數據樞紐',
    center: '全球交通\n數據樞紐',
    tag: '⚠️ 根據公開資料的推演',
    nodes: [
      { at: 1, img: 'Automobile', title: 'Tesla 車隊', text: '路面影像、行車路線' },
      { at: 1, img: 'Taxi', title: 'Robotaxi', text: '上車地點、目的地、時間' },
      { at: 2, img: 'Brain', title: 'Grok（xAI）', text: '車內助理，了解日程' },
      { at: 2, img: 'Satellite antenna', title: 'Starlink', text: '直連手機，隨處連線' },
      { at: 3, img: 'Rocket', title: 'Starship', text: '洲際火箭運輸（構想）' },
      { at: 3, img: 'Speech balloon', title: 'X 平台', text: '社交動態、活動、輿論' },
    ],
    steps: [
      { say: '將呢幾塊拼埋一齊，就可能變成一個全球交通數據樞紐。以下係根據公開資料嘅推演。', sub: '把各部分組合起來，便可能形成==全球交通數據樞紐==。以下為根據公開資料的推演。' },
      { say: '車隊同 Robotaxi 知道你喺邊上車、去邊、幾點出發。', sub: '車隊與 Robotaxi 掌握你的==上車地點、目的地與時間==。' },
      { say: 'Grok 知道你嘅日程，Starlink 令你去到邊都連住網絡。', sub: 'Grok 了解你的日程，Starlink 讓你隨處保持連線。' },
      {
        say: '再加上 X 平台嘅社交動態，同 Starship 嘅長途運輸構想，就推測到大家想去邊、點解去。',
        sub: '再加上 X 平台的社交動態與 Starship 的長途運輸構想，便能推知人們==想去哪裡、為何前往==。',
      },
    ],
  },

  {
    layout: 'flow',
    kicker: '循環',
    title: '數據如何變成調度',
    items: [
      { hl: 0, img: 'Round pushpin', en: '收集', zh: '車・手機', desc: '出行數據' },
      { hl: 1, img: 'Satellite antenna', en: '傳輸', zh: 'Starlink', desc: '城市與偏遠地區' },
      { hl: 2, img: 'Crystal ball', en: '預測', zh: 'xAI 模型', desc: '人流與需求' },
      { hl: 3, img: 'Taxi', en: '調度', zh: 'Robotaxi', desc: '自動派車' },
    ],
    loopText: '↺ 使用愈多 → 數據愈多 → ==預測愈準==',
    steps: [
      { say: '成個循環係咁：先由車、Robotaxi 同手機收集出行數據。', sub: '整個循環：先從車輛、Robotaxi 與手機收集出行數據。' },
      { say: '經 Starlink 傳送，無論喺城市定偏遠地區。', sub: '經 Starlink 傳送，不論城市或偏遠地區。' },
      { say: '交俾 xAI 嘅模型預測邊度、幾時會有人流，將來甚至可以喺太空運算站處理。', sub: '由 xAI 模型預測何時何地出現人流，未來甚至可在太空運算站處理。' },
      { say: '最後自動派 Robotaxi 過去。用得愈多，數據愈多，預測就愈準。', sub: '最後自動調派 Robotaxi。使用愈多、數據愈多，==預測愈準==。' },
    ],
  },

  {
    layout: 'timeline',
    kicker: '想像',
    title: '2035 年的一天',
    note: '⚠️ 純屬想像情境，並非已公布計劃',
    noteAt: 4,
    events: [
      { at: 0, date: '07:30', img: 'Alarm clock', title: '提醒出門', text: 'Grok 按日程與路況計算' },
      { at: 1, date: '08:00', img: 'Taxi', title: 'Robotaxi 接載', text: '路線由 AI 預先規劃' },
      { at: 2, date: '12:00', img: 'Mountain', title: '郊外遠足', text: '無基站亦可經衛星上網' },
      { at: 3, date: '22:00', img: 'Stadium', title: '演唱會散場', text: '預測人流，自動加派車輛' },
      { at: 4, date: '翌日', img: 'Rocket', title: '洲際出差', text: '火箭航班（構想）' },
    ],
    steps: [
      { say: '我哋想像一下 2035 年嘅一日。朝早七點半，Grok 根據你嘅日程同路面情況，提你幾點出門。', sub: '想像 2035 年的一天：早上 7:30，Grok 按日程與路況提醒你出門時間。' },
      { say: '八點，Robotaxi 已經喺樓下等你，路線係 AI 預先計好。', sub: '8:00，Robotaxi 已在樓下等候，路線由 AI 預先規劃。' },
      { say: '中午去郊外行山，冇基站都可以用手機經衛星上網。', sub: '中午到郊外遠足，沒有基站也能經衛星上網。' },
      { say: '夜晚演唱會散場，系統早已預測到人流，自動加派車輛。', sub: '晚上演唱會散場，系統早已預測人流並自動加派車輛。' },
      { say: '第二日去另一個大洲出差，甚至可能搭火箭。不過記住，呢個係想像，唔係已經發生嘅事。', sub: '翌日洲際出差，甚至可能乘搭火箭。提醒：以上純屬==想像情境==。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '風險',
    title: '這有多可怕？',
    tone: 'bad',
    items: [
      { at: 0, img: 'Round pushpin', text: '**行蹤**：何時、何地、與誰同行，皆可被記錄' },
      { at: 1, img: 'Eye', text: '**推斷**：位置數據可推斷住址、職業、健康與社交' },
      { at: 2, img: 'Warning', text: '**依賴**：交通、通訊與 AI 由同一集團提供' },
      { at: 3, img: 'World map', text: '**地緣政治**：2022 年拒絕在克里米亞附近為烏克蘭開通 Starlink（據傳記）' },
      { at: 4, img: 'Balance scale', text: '**監管**：數據跨越國界，規則尚未跟上' },
    ],
    steps: [
      { say: '咁有幾恐怖？首先，你去邊、幾點、同邊個一齊，都可能被記錄。', sub: '這有多可怕？首先，你的==行蹤==——去哪裡、何時、與誰同行——都可能被記錄。' },
      { say: '位置數據仲可以推斷到你住邊、做咩工，甚至健康同社交狀況。', sub: '位置數據更可推斷你的住址、職業，甚至健康與社交狀況。' },
      { say: '第二係依賴。如果交通、通訊同 AI 都係同一個集團提供，社會就好難離開佢。', sub: '其次是==依賴==：若交通、通訊與 AI 皆由同一集團提供，社會將難以抽身。' },
      {
        say: '第三係地緣政治。據傳記記載，2022 年佢曾經拒絕喺克里米亞附近為烏克蘭開通 Starlink，一個私人決定就影響到戰爭。',
        sub: '第三是==地緣政治==：據傳記記載，2022 年他拒絕在克里米亞附近為烏克蘭開通 Starlink。',
      },
      { say: '第四係監管，呢啲數據跨越國界，規則仲未跟得上。', sub: '第四是==監管==：數據跨越國界，規則尚未跟上。' },
    ],
  },

  {
    layout: 'stats',
    kicker: '另一面',
    title: '並非沒有對手',
    items: [
      { at: 0, img: 'Oncoming automobile', value: '14', unit: '個城市', label: 'Waymo：每週逾 50 萬次付費載客', source: '2026 年 9 月' },
      { at: 1, img: 'Taxi', value: '28', unit: '個城市', label: '百度蘿蔔快跑：累計載客逾 2,200 萬次', source: '2026 年' },
      { at: 2, img: 'Automobile', value: '6', unit: '個城市', label: 'Tesla Robotaxi 無人載客', source: '2026 年 9 月', hl: true },
    ],
    steps: [
      {
        say: '不過都要持平啲睇，佢唔係冇對手。Google 旗下嘅 Waymo 已經喺 14 個城市營運，每星期超過 50 萬次付費載客。',
        sub: '不過也要持平看待：Google 旗下 Waymo 已在 ==14 個城市==營運，每週逾 50 萬次付費載客。',
      },
      { say: '中國百度嘅蘿蔔快跑，覆蓋全球 28 個城市，累計載客超過兩千二百萬次。', sub: '百度「蘿蔔快跑」覆蓋全球 ==28 個城市==，累計載客逾 2,200 萬次。' },
      { say: '相比之下，Tesla 嘅無人載客暫時只係六個城市。', sub: '相比之下，Tesla 無人載客目前只在六個城市。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '好處',
    title: '若發展順利……',
    tone: 'good',
    items: [
      { at: 0, img: 'Satellite antenna', text: '偏遠地區與災區得以上網' },
      { at: 1, img: 'Shield', text: '自動駕駛成熟後，或可減少人為事故' },
      { at: 1, img: 'Light bulb', text: '太空運算若降價，AI 服務或更便宜' },
      { at: 2, img: 'Hourglass not done', text: '但時間表經常延後，須==打個折扣==' },
    ],
    steps: [
      { say: '如果做得好，好處都唔少：Starlink 已經令偏遠地區同災區上到網。', sub: '若發展順利，好處亦不少：Starlink 已令偏遠地區與災區得以上網。' },
      { say: '自動駕駛成熟之後，有機會減少人為意外；太空運算如果真係平咗，AI 服務都可能變平。', sub: '自動駕駛成熟後或可減少人為事故；若太空運算真能降價，AI 服務亦可能更便宜。' },
      { say: '但記住，Musk 嘅時間表經常延期，全自動駕駛就講咗好多年，要打個折。', sub: '但 Musk 的時間表經常延後，全自動駕駛便承諾多年，須==打個折扣==。' },
    ],
  },

  {
    layout: 'bullets',
    kicker: '行動',
    title: '對我們有甚麼影響？',
    items: [
      { at: 0, img: 'Locked', text: '定期檢查手機與汽車的==位置權限==' },
      { at: 0, img: 'Magnifying glass tilted left', text: '細閱數據授權條款' },
      { at: 1, img: 'Compass', text: '不要把所有服務押在同一平台' },
      { at: 2, img: 'Thinking face', text: '對「一兩年內實現」的承諾保持懷疑' },
    ],
    steps: [
      { say: '咁對我哋有咩影響？最實際係定期檢查手機同車嘅位置權限，睇清楚數據授權條款。', sub: '對我們有何影響？最實際的是定期檢查手機與汽車的==位置權限==，細閱數據授權條款。' },
      { say: '唔好將所有服務押喺同一個平台，保留其他選擇。', sub: '不要把所有服務押在同一平台，保留其他選擇。' },
      { say: '對「一兩年內實現」嘅承諾，保持好奇之餘，亦要保持懷疑。', sub: '對「一兩年內實現」的承諾，保持好奇，也保持==懷疑==。' },
    ],
  },

  {
    layout: 'outro',
    title: '重點總結',
    items: [
      { at: 0, text: 'AI 缺電 → ==太空太陽能運算==' },
      { at: 0, text: '散熱、輻射、成本未解；專家看 2030 年代' },
      { at: 1, text: '車隊 + 衛星 + AI = ==交通數據樞紐==' },
      { at: 1, text: '最大風險：私隱與過度依賴' },
    ],
    closing: { at: 2, text: '關鍵不在能否做到，而在==由誰監管==' },
    steps: [
      {
        say: '總結。第一盤棋：用太空嘅太陽能解決 AI 缺電，但散熱、輻射同成本仲未解決，專家估計要 2030 年代先成熟。',
        sub: '總結：第一盤棋以太空太陽能解決 AI 缺電，但散熱、輻射與成本未解，專家估計 2030 年代才成熟。',
      },
      { say: '第二盤棋：用車隊、衛星同 AI 砌出交通數據樞紐，最大風險係私隱同過度依賴。', sub: '第二盤棋以車隊、衛星與 AI 構建交通數據樞紐，最大風險是私隱與依賴。' },
      { say: '真正要問嘅唔係做唔做得到，而係邊個嚟監管。你點睇？歡迎留言，多謝收睇！', sub: '真正的問題在於==由誰監管==。歡迎留言分享看法，謝謝收看！' },
    ],
  },
];
