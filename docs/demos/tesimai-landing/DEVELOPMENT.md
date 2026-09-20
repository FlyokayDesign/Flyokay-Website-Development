# TESIMAI 整合开发基准 · INTEGRATED-07

此文件为导航、Hero、Catalog、About Us、Trusted Feedback整合版的当前开发规范，只记录现行要求。以本目录实际代码与预览为视觉基准。后续开发从本整合版继续，不重新拼回旧独立包中的导航或语言实现。

## 当前页面与文件职责

- index.html：导航、Hero、Catalog、About Us、Trusted Feedback、Contact Us、Footer；Footer 替代旧的底部测试留白。
- preview.html：1920px/390px白底预览工作台，只用于验收。
- style.css / app.js / content.js：导航及Hero现行样式、交互、文案。
- catalog/：产品数据、六语言字典、目录样式、卡片/轮播交互、入场编排。
- about/：About Us 的六语言内容、图片/视频配置、布局、微交互与入场编排。
- motion.js：Catalog、About Us 与 Trusted Feedback 共用的首次可见观察器及动画生命周期。
- components.css：两板块共用 CTA 样式；各板块只保留定位。
- i18n.js：唯一全局语言状态。
- site.js：统一导航目标与搜索内容注册。
- integration.css / integration.js：板块连接、下拉几何计算、当前板块注册。
- assets/：共享品牌素材和Roboto；catalog/assets/：产品图、Inter及目录箭头。字节相同的图片/字体只保留一份。

脚本依赖顺序：i18n → site → content → app → catalog/products → catalog/catalog → catalog/locales → motion → catalog/entrance → integration → about/content → about/about。不新增框架、动画库、CMS或后台。当前代码为普通HTML/CSS/JavaScript，无生产npm依赖。

## 导航与语言

顶部透明；桌面悬停变纯白，离开且面板关闭后恢复透明。手机顶部触控保持透明。下滚隐藏、上滚显示白色；打开面板时保持可操作。导航与Menu手机版高度64px，字标183×61px，在390px下位置均为x103.5/y1.5。左右44×44px控件中心分别为42/32与348/32，Menu控件180ms淡入。

桌面下拉与导航为同一纯白背景。语言246px宽、搜索560px宽；22px内凹圆角衔接。integration.js测量导航高度和触发按钮位置，以--drop-left、--drop-width、--nav-height统一驱动面板和两侧圆角。打开、窗口缩放均重算，保留1px重叠消除细缝。不要为面板和圆角分别推算位置。

六语言顺序固定：EN/English、ES/Español、FR/Français、ZH-CN/中文(简体)、ZH-TW/中文(繁體)、JA/日本語。选择立即更新全文并记忆；语言列表无勾选符号，箭头在固定位置旋转。手机选择后返回Menu导航内容。当前Catalog新增翻译属于预览译稿，正式上线前校对。

Menu为白色，固定在当前视口顶部，背景锁滚动；高度为Hero摄影区的70%，不含Hero卡片，最大100dvh。关闭恢复原滚动位置。手机和平板沿用已确认的搜索设计：返回入口、标题、全宽灰色圆角输入框、提示/结果，顶栏保留语言和关闭。

## 搜索

桌面输入与关闭同排，无额外Search标题，无矩形输入边框。鼠标移出保持打开；关闭按钮、Escape、再次点击Search及导航外部点击保留现有关闭行为。清空只删除查询并恢复初始提示、输入焦点，面板和白色导航保持打开。点击关闭后鼠标不在导航区域时，顶部背景恢复透明。

按当前语言检索产品和页面内容，180ms防抖。切换语言清空查询。当前索引覆盖Hero、Catalog和About Us。结果类别使用所属区块当前语言名称。

## Hero与Catalog

Hero字标向下、标题向右、两张卡作为一组向左同时淡入，800ms，仅页面加载播放。正常随页面滚出。桌面Hero卡片独立向上展开图片，文字和底部保持稳定；手机/触控直接显示图片。两张卡仅展示。

Catalog以Figma桌面211:2、手机213:50为视觉来源。产品顺序永久01→02→03→04，activeProductId仅管理选择，不重排数组或DOM。桌面1大3小，500ms同步变形；小卡点击只选中，大卡仅有真实detailUrl时导航。当前地址均null。手机单卡轮播400ms，滑动/分页同步，Swipe不触发Tap；键盘可操作。首次轻微滑动提示在入场完成后执行。

Catalog入场达到约20%可见时播放一次，无持久存储。桌面标题0/600ms、右文0/650ms、CTA120/600ms、四卡延迟280/340/400/460ms且各600ms、分隔线520/550ms。Active缩放跟随触发时实际选择。手机采用独立轮播外层纵向淡入，总长1040ms。入场、卡片变形、轮播轨道和滑动提示互相隔离。减少动态效果时直接显示最终状态。

主验收尺寸1920px/390px；现有899/900px断点统一用于紧凑/桌面布局。其他尺寸需自适应、检查长文案与横竖屏，不将某个宽度自动等同于所有平板。

## 新Section接入合同

每个新Section必须同时接入以下三项，不能只添加静态布局：

```js
// 1. 提供六语言完整字典；立即应用当前语言，再响应后续切换。
const stopLanguage = TESIMAI_I18N.register('about', locale => {
  renderAbout(aboutCopy[locale]);
});
// 2. 目标返回真实已存在的DOM节点。函数支持延迟挂载。
const stopTarget = TESIMAI_SITE.registerTarget('about', () => document.getElementById('about'));
// 3. 搜索内容按调用时语言生成，不缓存旧语言。
const stopSearch = TESIMAI_SITE.registerSearch('about', locale => [{
  title: aboutCopy[locale].title,
  desc: aboutCopy[locale].description,
  target: 'about',
  section: aboutCopy[locale].label
}]);
// SPA/动态卸载时调用三个stop函数；本静态页面不需要反复注册。
```

导航语言入口统一调用TESIMAI_I18N.setLanguage，不为各板块另建localStorage、cookie或独立语言状态。字典包含所有可见文案、表单占位、反馈、按钮、无障碍标签及搜索摘要。保留产品选择和有效URL。

联系区块完成后注册目标id“contact”。导航、Hero、Catalog、About Us的Get in touch均连接这一真实目标；使用当前页面平滑滚动，减少动态效果时即时定位。Contact Us已注册contact目标，所有入口滚动到真实表单。产品详情页仍只通过正式detailUrl接入。

新CSS使用板块前缀，不写会覆盖全站的h1、header、nav button等泛化规则。共享基础样式由主页面拥有。全局查询必须限定区块根元素，避免新增内容被Hero更新逻辑误改。Observer和事件在动态卸载时释放；不要重复挂载同一控制器。

## 固定回归门槛

每次融合或改动共享代码后，必须实际浏览器复核，不能只看单个静态截图：

1. 1920/390基准以及900、1000、1100、1280、1440宽度。语言与搜索打开后连续缩放，白色连接无缝、圆角不分离、面板不越界。
2. 顶部透明、桌面悬停白色、关闭搜索后离开透明、手机顶部触控透明、上下滚动隐藏/显示。
3. Menu打开前后Logo坐标和两侧中心一致；关闭保留滚动位置。
4. 六语言更新所有已接入板块；刷新记忆；新板块延迟注册立即获得当前语言；当前语言搜索含该板块。
5. 无结果→Clear search仍保持面板打开；语言切换后查询清空；搜索结果类别准确。
6. Hero两卡独立展开；Catalog快速选择顺序不变且只有一个Active；触控Swipe不跳详情，Tap仅对真实URL导航；分页仅选择。
7. Catalog首次滚入播放、滚回不重播；减少动态效果直接显示；所有原交互继续正常。
8. 无脚本错误、素材失败、横向溢出；长译文、200%文字放大和字体加载不会裁掉正文。新增字体/素材优先复用，去重必须核对字节指纹。
9. 联系区块接入后验证所有CTA到同一真实目标，标题不被固定导航遮住。按目标设置scroll-margin-top，桌面110px、紧凑64px。

## 版本和边界

后续唯一入口是本整合包；旧独立包保留作历史快照，不作为新功能源。每次验收后更新说明、QA、文件指纹及整合ZIP，防止交付代码与文档脱节。

本规范和回归门槛用于防止已知问题再次出现，不能替代尚未实现板块的实际验收。平板独立视觉、正式翻译、真实联系与详情目标均按后续交付验证，不宣称已完成。

## About Us · 2026-09-17

视觉来源：Figma a2HFViaYnZXH76IoaLRBCZ，桌面211:134（1920×984）、手机213:126（390×650）。英文逐字沿用设计稿，包括当前风力发电相关占位描述；不擅自改成新的产品或企业文案。其他五种语言为预览译稿，需上线前校对。

桌面最大容器1350px，左右36px内边距；标签x321/y51，CTA x321/y129；信息卡x321/y271.5与约566.97，宽273/274.5、高约276.04（由媒体等高规则计算）；大图x627/y271.5、972×571.5。标题Inter Light 30/37.5，正文Roboto 16.5/19.5。手机标签x17/y22；主标题x19/y60、340px宽、Inter Regular 15/17；图片x9/y138、370×211；双卡x9与201/y377、178×183；分隔线x18/y578、341×1；CTA x131/y596、120×28。手机不显示桌面支持描述。圆角22px。布局使用正常文档流，译文和放大文字使内容自然增高；不裁切正文。沿用899/900断点。

共享motion.js只维护一个Section入场IntersectionObserver，Catalog时间表不变。About桌面：标签0/600、右文0/650、CTA120/600、卡1 260/600、卡2 340/600、媒体300/800ms。手机：标签0/550、标题80/600、媒体180/800、卡1 300/600、卡2 360/600、线480/550、CTA560/550ms。首次约20%可见触发，完成后不重播；媒体内层从1.035收回1，外层只负责位移和透明度。Hover另设内层（图片1.015/600ms、图标1.04/280ms），不覆盖入场变换。无视差或点击行为。减少动态效果直接显示最终状态，同时暂停视频。

媒体配置在about/content.js的media中：type、src、poster。默认image，复用与Figma导出字节完全一致的assets/card-building.png，不额外复制大图。未来设type:'video'及真实src、poster即可；不改布局。运行时可调用TESIMAI_ABOUT.setMedia(config)。视频静音、循环、行内播放，无新增控件；拒绝自动播放或加载失败保留poster；未填poster使用现有建筑图兜底。图片替代说明/视频标签由当前语言字典alt提供。当前交付未包含正式视频。

About的Get in touch复用section-cta和TESIMAI_SITE.requestContact。真实Contact已接入contact目标。About注册about导航目标与全文/双卡搜索项，立即应用当前语言。TESIMAI_ABOUT.destroy()可释放该板块的语言、搜索、导航、入场、媒体监听及播放；移除动态节点前调用。静态预览不需重复初始化。

## Catalog 产品图响应式修正 · 2026-09-17

所有产品图使用object-fit:contain、居中、保持原始比例，完整显示包含底座的素材，不裁切或拉伸。紧凑布局图片宽度沿用45.17%，高度改由159/150容器比例自适应，取消固定150px高度；390px基准容器仍约159×150px，平板随容器放大，卡片按内容自然增高。桌面原容器和交互不变，图像同样完整显示。后续融合不得恢复cover或固定手机图片高度。

## About Us 桌面等高联动 · 2026-09-17

当前规则是顶部与底部同时对齐。Figma来源211:134：媒体972×571.5，两卡原始各274.5，卡间距19.43。新等高约束下基准媒体仍571.5高，两卡各约276.04高，按(媒体高−间距)/2自动分配，不再独立固定高度。

about-content使用同一Grid行及align-items:stretch；媒体正常文档流和972/571.5 aspect-ratio决定行高。about-features使用repeat(2,minmax(min-content,1fr))分配两卡，不再使用contain:size排除正文的尺寸需求；正常文案保持原媒体比例，超长文案允许共享行增高，媒体以cover填满同一行，保持两侧上下等高且图片不变形；无JS测量或写入高度。媒体图片与视频共用同一容器。卡间距clamp(12px,1.52035cqw,19.43px)。列宽clamp(220px,21.47887%,274.5px)，右侧占剩余空间；共享列间距与外边距连续缩放。

Desktop内部采用内容网格宽度cqw的clamp插值：图标容器32–60px、图标14–21px、标题16–24px/1.5、正文12–16.5px/1.181818；四边padding及内部间距各有上下限，以Figma基准为最大值。西语/法语长文本使用紧凑密度：图标容器最大48px、标题最大20px、正文最大14.5px，字号下限相同，内容不删减。自然换行，不插入br，不隐藏正文，不缩放整张卡。

899/900断点不变。手机about-content使用display:contents，保留独立媒体、并排双卡及原间距，不绑定高度。Entrance、Hover与媒体切换逻辑均不修改；动画变换只作用视觉，不参与尺寸计算。Section裁掉横向入场越界像素，卡片正文不裁切。


## Trusted Feedback · INTEGRATED-05

Figma 文件 a2HFViaYnZXH76IoaLRBCZ：Desktop 211:246，Mobile 213:184。1920px 与390px为主要参考；沿用899px及以下紧凑布局。

- trusted/content.js 集中维护六语言标题、桌面长反馈、手机短反馈、媒体和地图配置。英文使用Figma原文，其余语言为待审校预览译稿。
- 桌面共享双栏Grid，列宽558:711、最大容器1350px；内容使用自然流，媒体558/432。手机通过布局重排为标签、地图、标题、媒体、反馈、分隔线、居中CTA；媒体369/243。无固定Section高度、无文字高度绑定、无JS高度计算。
- 地图使用Figma原始透明PNG，完整contain显示，不添加背景、交互或地图依赖。TESIMAI_TRUSTED.setMap({src,alt})可替换。
- 建筑图片复用assets/card-building.png。media.js统一管理About与Trusted的图片/视频生命周期，布局仍由各Section负责。TESIMAI_TRUSTED.setMedia({type:'video',src,poster})切换视频；muted、loop、playsInline、无controls；减弱动态时暂停。恢复图片使用TESIMAI_TRUSTED_CONTENT.media。
- CTA沿用section-cta和TESIMAI_SITE.requestContact；Contact已接入，滚动到真实表单。
- 标签、标题、反馈和搜索接入全局六语言。入场使用现有TESIMAI_MOTION观察器，每次加载一次；移动端时序0/100/180/260/380/480/540ms，桌面按本次确认时序实现。减弱动态直接显示最终状态。
- 只扩展Trusted所需实现；导航、Hero、Catalog原文件未改，About媒体生命周期抽为共享模块，保留尺寸、动画及交互。


## Contact Us · INTEGRATED-05

- Figma Desktop211:330、Mobile214:94、Tablet215:2。桌面容器1350、Form819，双栏；899px以下采用移动阅读顺序，600–899沿用全站平板两列表单，599以下单列。390表单370宽，输入53高，Message137高；桌面输入79.5高、Message205.5高；平板Message180高。Section和字段行由内容撑高。Figma个别字段的小幅左右偏移统一落入共享Grid，不使用位置补丁。
- contact/contact.css只作用于contact。复用section-cta、TESIMAI_SITE和TESIMAI_MOTION，没有新增框架、Observer或resize测量逻辑。
- contact/content.js集中内容、选项和submit适配器。国家代码从IANA tzdb iso3166.tab导入249项ISO alpha-2，浏览器Intl.DisplayNames提供六语言显示，保留英文/代码搜索。countryOptions与UI解耦。
- TESIMAI_CONTACT.setOptions('region'|'business'|'source', [{value,label}])替换选项。business和source中__other保留为自定义输入标记并始终置于末尾。选项value不可重复。TESIMAI_CONTACT.setSubmitHandler(async payload=>result)替换提交适配器；默认返回{mode:'preview'}，明确提示未发送。正式接入时由适配器返回真实结果message并按业务完善成功状态，当前不发请求、不收集或存储用户输入。
- Required：name/company/email/region/business/source/message。Phone可空。Distributor/Google search初始仅placeholder，不是假设用户已选择。Region仅接受有效选项。sourceOther去除首尾空格且不可空。提交时聚焦首个错误，修改后解除错误，输入保留。
- 下拉为同一控件连续白底延伸，覆盖后续字段，最高260px（手机受短视口限制），内部滚动；一次一个，外部点击/Escape/Tab关闭，方向键+Enter选择。手机被下拉覆盖的后续字段需先关闭列表或Tab离开，符合覆盖式交互。
- Message为原生textarea，resize:none，内部滚动；不自动增高、不添加JS光标滚动引擎。
- 全站Get in touch滚动到contact；仅表单内按钮执行校验/预览提交。联系方式沿用Figma文本，但未确认正式有效，所以不生成mailto或WhatsApp生产链接。
- 六语言切换保留已填内容和选项ID；非英文文案为预览译稿。搜索只索引静态标题，不索引用户输入。
- Entrance复用既有单次观察器，Desktop左侧标签/标题/描述/联系方式与右侧Form错峰进入；字段轻微按行错峰。Mobile纵向揭示。Reduced Motion取消过渡及入场动画，交互保留。


### Contact 字段焦点视觉确认

普通Focus/Active/Open不显示outline、focus shadow，不改变背景；下拉面板不增加外部阴影。保留原透明1px占位边框以确保内部尺寸不变，只有aria-invalid显示既有错误边框。DOM焦点、Tab、方向键选择、placeholder、箭头旋转均保持。提交按钮的键盘焦点样式保留。本规则仅限Contact字段。


### Business type 自定义输入

六个固定选项后统一追加本地化Type other，复用source的同字段输入、箭头返回、trim必填校验；Region不加入自定义模式。内部仍使用稳定选项ID，提交payload.businessType为配置中的实际选项名称，或去除首尾空格后的自定义文字，不输出Type other/__other。两个字段状态独立；source/sourceOther既有数据格式不变。


## 全站 Responsive Content Safety · 2026-09-18

- Contact表单采用auto-fit与字段最小可用宽度进行列分配：桌面270px、平板230px；容器不足时自动单列，不按一组屏幕宽度写补丁。手机保留单列。字段宽度100%、min-width:0。
- 下拉文字与箭头分占Flex空间，文字末端保留8px间隔；常规箭头区域44px，沿用窄桌面的38px规则。默认提示在六语言、测试宽度中完整显示；用户输入的任意长文字仍使用原生单行编辑及水平光标跟随，不进入箭头区域。选项列表长文字可换行。
- section-cta保留原始最小高度和最大宽度，长标签可换行撑高，箭头不收缩；pill同样分离文字与箭头。没有恢复Contact焦点描边。
- About移除阻止正文参与行高计算的size containment，保证长描述完整可见并维持左右等高。正常文案保持原来的972/571.5媒体比例；超长文案超过比例基准高度时共享行自然增高，媒体使用原有cover显示，不拉伸。手机仍不绑定两侧高度。
- Catalog标签允许换行，标题及正文支持超长单词换行；既有Morph、图片contain、轮播与分页逻辑不改。
- Hero窄桌面卡片组最大宽度由标题占据的空间决定，保留24px分隔；卡片可收缩，解决900px时标题与卡片重叠。紧凑布局取消该宽度限制，继续原手机Grid。
- 本次未新增JS响应式测量、ResizeObserver、框架或动画依赖；所有运行时JS保持修改前原样。


## Footer · INTEGRATED-06（2026-09-18）

- 视觉来源：Figma `a2HFViaYnZXH76IoaLRBCZ`，Desktop `211:590`（1920×654），Mobile `215:110`（390×639）。素材原样导出，不修改已有 Section。
- `footer/footer.css` 仅使用 `.footer` scope；背景为独立绝对定位层，内容使用正常 Grid/Flex 文档流。桌面最小高度654px、手机639px，内容增加时自然增长；900px沿用全站布局分界。Logo始终contain。
- Desktop：Heading / Scroll to top → Menu / Contacts → Brand。Mobile：Brand → Heading → Menu → 并排 Contacts → Scroll to top。
- `TESIMAI.navigation` 是 Header/Footer 共用目标顺序；两者均由现有 `app.js` 的 `button[data-target]` 处理。目标为home/catalog/about/contact；继续采用既有无hash滚动、菜单关闭行为和各Section滚动偏移。没有增加第二套导航处理。
- `footer/content.js` 集中管理背景、联系方式、六语言返回顶部标签。菜单/Heading沿用全局六语言内容。非英文内容仍为待审核预览译稿。
- Email已配置mailto；WhatsApp的href为null，当前仅展示号码。获确认的真实链接只在contacts配置中更换，无伪造WhatsApp跳转。
- `TESIMAI_FOOTER.setMedia({type:'video',src,poster,alt:''})` 可替换背景，不改变布局；图片模式支持mobileSrc，900px媒体查询切换素材。视频复用TESIMAI_MEDIA，muted/loop/playsInline、metadata预载、无controls；减少动态效果时暂停。
- 首次入场复用TESIMAI_MOTION，无新增Observer：Desktop heading650ms，top延迟100ms，nav180ms，contacts220ms，brand280ms/850ms；Mobile按阅读顺序80ms间隔。焦点进入或减少动态效果直接显示。Hover只作用于内部transform，与入场translate/scale分离。
- Footer媒体原文件包含来源水印；本次保留原始Figma素材，不加工图片。替换正式素材时更新配置并复核桌面/手机主体构图。
- 已删除不再使用的preview-scroll-space标记及样式。既有Section样式、动画、表单和卡片逻辑未改动。


## Global Fluid Typography / Adaptive CTA · INTEGRATED-07（2026-09-19）

本节替代历史固定CTA宽度及语言专用尺寸说明。布局、导航目标、表单、产品状态与动画逻辑不变。

- `components.css` 为统一字体与CTA尺寸入口，在Section样式之后加载。角色变量包含display、heading、section-heading、label、body、feedback、nav、small、input、form-label及cta；桌面使用有上下限的clamp，1920px为最大视觉参考，900px以下采用独立手机规格。
- `.section-cta` 使用大号规格，`.pill` 使用中号规格，手机与`.footer-top`使用紧凑规格。统一fit-content、max-width、最低视觉宽度、自动高度、独立label/icon区域。图标不压缩；文字变长优先增宽，只有容器不足时换行，极长不可分词保留应急换行能力。不使用ellipsis。
- 标准Section CTA：桌面字号15–18px、最低高度44–58.5px、圆形图标34–48px；手机保持12px字号、28px视觉高度，透明命中区域扩展至至少44px。长翻译可增加宽度/高度。
- Header导航间距、按钮内距与字号连续收缩；操作组按内容宽度分配，父级Flex允许自然重排。沿用900px手机导航与既有滚动偏移，不新增JS字体/按钮尺寸计算。
- Search标签删除原有文案中的尾部省略号，六种语言统一完整显示；搜索功能未改动。
- 移除About Us对法语/西语的专用字体和图标缩小规则。长正文由现有内容驱动网格自然增高，不裁切。
- 清除style/footer/catalog/about旧CTA固定尺寸声明及空规则；颜色、放置位置、Hover/Press/Entrance由原组件继续负责。
- 新增语言无需CSS语言分支。德语仅作为浏览器临时压力测试文案，没有加入正式语言菜单。
- 不要重新加入固定CTA宽度、语言专用宽度、文字省略、整页scale或JS resize字号补丁。未来CTA复用本文件的规格变量。
