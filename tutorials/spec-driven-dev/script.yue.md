# Spec-Driven Development × Coding Agent — 廣東話旁白稿


## 1. Spec-Driven Development

- `00:00:00` 歡迎收睇。今集講 Spec-Driven Development，中文可以叫「規格驅動開發」。
- `00:00:09` 目標好實際：點樣用一份 spec，令 coding agent 寫出你真正想要嘅 code。

## 2. Vibe coding：一句 prompt 就開工

- `00:00:18` 好多人用 AI 寫 code 嘅方式係：打一句 prompt，等佢寫，唔啱再 prompt，即係所謂 vibe coding。
- `00:00:30` 問題一：需求好模糊，agent 唯有自己估，估錯咗你都未必即刻發現。
- `00:00:40` 問題二：佢可能一次過改咗十幾個 file，你好難判斷邊啲改動係真係需要。
- `00:00:50` 問題三：context 會唔見。開個新 session，之前傾過嘅決定全部要重新講。
- `00:01:01` 問題四：冇 review 標準，最後變咗「睇落 OK」就 merge。

## 3. 咩係 Spec-Driven Development？

- `00:01:08` Spec-Driven Development 嘅核心只有一句：spec 係唯一嘅真相來源，code 只係 spec 嘅產物。
- `00:01:19` 即係話，寫 code 之前，先用文字講清楚要做咩、點樣先算完成。
- `00:01:28` 份 spec 係 markdown 檔，放喺 repo 入面，同 code 一齊 commit、一齊 review。
- `00:01:38` 之後需求有變，唔係直接叫 agent 改 code，而係先改 spec，再由 spec 推返落 code。

## 4. 五步流程

- `00:01:49` 成個流程可以分做五步。
- `00:01:53` 第一步 Specify：講清楚要做咩、點解要做，唔講技術細節。
- `00:02:02` 第二步 Plan：決定技術上點做，改邊啲檔案、有咩風險。
- `00:02:11` 第三步 Tasks：將 plan 拆成細、獨立、可以驗證嘅任務。
- `00:02:19` 第四步 Implement：叫 agent 一次只做一個 task。
- `00:02:25` 第五步 Verify：用 spec 入面嘅驗收條件檢查結果。每一步完成，人都要 review 先去下一步。

## 5. 點解同 Coding Agent 特別夾？

- `00:02:38` 點解呢個方法特別啱 coding agent？
- `00:02:43` 第一，agent 寫 code 好快，但佢唔識讀心。Spec 就係將你腦入面嘅意圖寫低。
- `00:02:53` 第二，agent 嘅 context 有限，session 會完、會被壓縮。Spec 係隨時可以重新讀返嘅長期記憶。
- `00:03:05` 第三，每一步都有文件，你喺改 spec 仲好平嘅時候已經可以發現問題，唔使等 code 寫完先知。
- `00:03:18` 第四，task 拆得夠獨立，就可以同時開幾個 agent 並行做。

## 6. 例子：天氣地圖加「°C / °F 切換」

- `00:03:26` 我哋用一個真實 project 做例子：一個用 React 同 Zustand 寫嘅天氣地圖。
- `00:03:36` 而家溫度全部寫死咗係攝氏，資訊面板同圖例都係 °C。
- `00:03:44` 新功能：俾用戶自己揀攝氏定華氏。我哋跟住五步行一次。

## 7. specs/temp-unit/spec.md

- `00:03:52` 第一步 Specify。喺 specs 資料夾開一個 spec.md，先寫一句清楚嘅目標。
- `00:04:02` 跟住寫 user story：邊個想要、想要咩、點解。留意，呢度完全唔講技術。
- `00:04:13` 最重要係驗收條件。用 Given、When、Then 嘅格式寫，每一條都要可以測試。
- `00:04:24` 仲要寫非目標，講明今次唔做乜，防止 agent 自作主張擴大範圍。
- `00:04:33` 你可以叫 agent 幫你起草 spec，但一定要自己逐條睇過、改過。呢份就係你同 agent 之間嘅合約。

## 8. specs/temp-unit/plan.md

- `00:04:46` 第二步 Plan。有咗 spec，就叫 agent 讀 code base，出一份技術方案。用 Claude Code 可以切去 Plan mode，佢只會讀、唔會改。
- `00:05:01` 方案要貼住現有架構：狀態放 Zustand store，用 localStorage 記住選擇，對應 AC3。
- `00:05:12` 換算邏輯集中喺一個 utility function，對應 AC4，唔好散落喺每個 component。
- `00:05:22` 列清楚要改邊幾個檔案。改動範圍一目了然，review 就容易好多。
- `00:05:31` 仲要寫低風險：色階繼續用攝氏計，只改顯示，避免影響其他圖層。

## 9. specs/temp-unit/tasks.md

- `00:05:41` 第三步 Tasks。將 plan 拆成一張 checklist。
- `00:05:47` 每個 task 要夠細，細到一個 commit 就做得完，而且完成之後可以驗證。
- `00:05:57` 每個 task 標明對應邊條驗收條件，咁樣每一行 code 都追溯得返去 spec。
- `00:06:06` T1 同 T2 冇互相依賴，甚至可以開兩個 agent 同時做。

## 10. Terminal

- `00:06:14` 第四步 Implement。Prompt 要講清楚四樣嘢：讀邊幾份文件、做邊一個 task、做完點檢查、幾時停。
- `00:06:28` Agent 會先讀 spec 同 plan，再只改 plan 列明嘅檔案。
- `00:06:35` 佢自己跑 typecheck 同 lint，通過先會剔 task。
- `00:06:41` 最後停低等你 review。睇 diff 嘅時候，你只需要問一個問題：呢個改動係咪符合 spec？
- `00:06:52` OK 就 commit，再叫佢做 T2。一個 task、一個 commit、一次 review。

## 11. 驗證：對返 spec，唔係對感覺

- `00:07:02` 第五步 Verify。所有 task 做完，唔好靠感覺話「應該得」。
- `00:07:09` 拎 spec 出嚟逐條驗收條件打剔，每一條都要有證據，例如截圖或者測試結果。
- `00:07:20` 最好將驗收條件寫成自動化測試，之後每次改 code 都會自動再驗一次。
- `00:07:29` 仲可以開一個全新嘅 agent session 做 reviewer，叫佢對住 spec 檢查成個 PR，佢冇之前嘅偏見。
- `00:07:41` 如果驗收時發現 spec 本身有漏洞，記住：先改 spec，再改 code。

## 12. 放入 repo

- `00:07:51` 實際放入 repo 係咁：每個功能一個 specs 資料夾，入面三份文件。
- `00:08:00` 再喺 CLAUDE.md 寫低規則。Claude Code 每次開 session 都會自動讀呢個檔，agent 就會次次跟同一套流程。
- `00:08:14` 最後一條好重要：spec 同 code 有衝突嘅時候，叫 agent 停低問人，唔好自己估。

## 13. 現成工具

- `00:08:25` 唔想由零開始，都有現成工具。
- `00:08:30` GitHub 開源嘅 Spec Kit 提供一套 slash command，由 specify、plan、tasks 一路去到 implement。
- `00:08:41` Kiro 內建 Spec 模式，會產生 requirements、design 同 tasks 三份文件。
- `00:08:51` 用 Claude Code 嘅話，Plan mode 加 CLAUDE.md，再將常用 prompt 放入 .claude/commands 做成 slash command，已經好夠用。

## 14. 常見陷阱

- `00:09:05` 最後講幾個常見陷阱。
- `00:09:09` 一：spec 寫成技術文件。spec 講要咩，技術細節留返喺 plan。
- `00:09:18` 二：驗收條件太模糊，例如「要快」、「要好用」。要改成可以量度嘅條件，例如「一秒內更新」。
- `00:09:31` 三：一次過叫 agent 做晒所有 task。改動太大，你根本 review 唔到。
- `00:09:40` 四：code 改咗但 spec 冇跟住更新，spec 好快就會變成廢紙。
- `00:09:48` 五：過度使用。改一行 typo 都寫 spec 就太重，小修小補直接 prompt 就得。

## 15. 重點總結

- `00:09:59` 總結一下。
- `00:10:01` 先寫 spec，再寫 code；驗收條件一定要可以測試。
- `00:10:09` Plan 要貼住現有架構；一個 task、一個 commit、一次 review。
- `00:10:17` 需求有變，永遠先改 spec。
- `00:10:21` 你唔再係逐行打 code 嘅人，而係寫規格、做決定、把關質素嘅人。多謝收睇！
