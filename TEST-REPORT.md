# 图像扩展版实际验收记录

验收日期：2026-10-08。项目运行仅需浏览器。

当前版本：204 张固定题（96 动作、36 看图、72 速画快答）；23 个作品系列、83 个角色图片条目；组合挑战每轮 1324 道，其中 668 道动作全部附本地参考图。项目包含 119 张 JPEG，图片来源及校验记录在 assets 下。

## 已执行检查

- 通过：original 36 unchanged; 204 unique fixed cards; all 96 fixed + 668 generated action tasks have local reference images; 36 independent quizzes; all referenced images cached。
- 通过：four fixed pools: exhaustive no-repeat, depletion and reset。
- 通过：3 complete combination rounds, distinct boundaries, preserved fixed pool and single result。
- 通过：offline touch: action photo, enlarge/close, rapid draw and result lock。
- 通过：9 desktop/tablet/phone viewports: visible photos, text/footer separated, enlarged image fits screen, no horizontal overflow。
- 通过：browser all 204 mixed cards: 96 photos + 36 crops/answers load offline, no answer leak in quiz DOM/history, no repeats or missing content。
- 通过：browser full 1324-combination round with every action reference, automatic continuation。
- 通过：119 photos plus all scripts cached in v3; HTTP first load then true offline reload, photo enlargement and answer reveal。
- 通过：WebKit iPad touch emulation: picture, native dialog and quiz reveal with external requests blocked。

## 布局与图片人工检查

在 1366×900、1194×834、1024×768、1280×800、768×1024、820×1180、800×1280、390×844、360×740 检查动作卡、图像大图及横向溢出。照片宽度、任务文本与底部信息的位置由浏览器测量确认没有相互覆盖。手机将图片与文字上下排列，平板及电脑并排展示。允许页面自然纵向滚动。

已人工查看原始角色联系表、新增 24 道局部 / 答案联系表、实际平板与手机动作卡截图。修正了角色对应关系、官网多视图的裁切、火影角色的完整轮廓和猜题中出现文字的范围。原有 36 道题的内容不变，动作题仅增加图片相关字段。

## 环境与限制

Microsoft Edge / Chromium 的 file:// 页面和网络离线模式，完成全部 204 张固定卡与 1324 张组合卡逐张浏览。Service Worker v3 首次完整缓存后真正关闭浏览器网络，验证离线刷新、参考图放大及猜图答案。WebKit 使用 iPad 横屏尺寸、触摸与 Safari 参数，本地 HTTP 加阻断外部请求，验证动作图、原生大图对话框、猜图和揭晓。

没有使用用户的实体平板实机测试；网络测试不证明用户所在网络一定能访问某个公网托管服务。浏览器页内 JavaScript 错误记录为空。原有倒计时、重复开关等功能此前通过测试，本次未改动其逻辑，重点复测与新增图片和扩展数量相关的流程。

## 打包验证

对全部 119 张 JPEG 进行解码、对 83 个角色条目及 24 个新猜题校验 SHA256；对完整项目包和 GitHub 根目录上传包进行 ZIP CRC 检验及逐文件字节一致性验证。部署包不含中间下载、测试工具、账号凭证或 Sites 项目管理信息。
