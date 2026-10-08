/* 角色图片与看图扩展。全部使用本地原作素材；来源见 assets/visual-sources.json。 */
(function () {
  'use strict';
  const media=[
  {
    "key": "C001",
    "name": "五条悟",
    "source": "咒术回战",
    "image": "assets/images/I01_answer.jpg"
  },
  {
    "key": "C002",
    "name": "灶门炭治郎",
    "source": "鬼灭之刃",
    "image": "assets/images/I02_answer.jpg"
  },
  {
    "key": "C003",
    "name": "阿尼亚",
    "source": "间谍过家家",
    "image": "assets/images/I03_answer.jpg"
  },
  {
    "key": "C004",
    "name": "漩涡鸣人",
    "source": "火影忍者",
    "image": "assets/images/I04_answer.jpg"
  },
  {
    "key": "C005",
    "name": "胡桃",
    "source": "原神",
    "image": "assets/images/I05_answer.jpg"
  },
  {
    "key": "C006",
    "name": "雷电将军",
    "source": "原神",
    "image": "assets/images/I06_answer.jpg"
  },
  {
    "key": "C007",
    "name": "三月七",
    "source": "崩坏：星穹铁道",
    "image": "assets/images/I07_answer.jpg"
  },
  {
    "key": "C008",
    "name": "邦布",
    "source": "绝区零",
    "image": "assets/images/I08_answer.jpg"
  },
  {
    "key": "C009",
    "name": "李白",
    "source": "王者荣耀",
    "image": "assets/images/I09_answer.jpg"
  },
  {
    "key": "C010",
    "name": "瑶",
    "source": "王者荣耀",
    "image": "assets/images/I10_answer.jpg"
  },
  {
    "key": "C011",
    "name": "红蝶",
    "source": "第五人格",
    "image": "assets/images/I11_answer.jpg"
  },
  {
    "key": "C012",
    "name": "园丁",
    "source": "第五人格",
    "image": "assets/images/I12_answer.jpg"
  },
  {
    "key": "C013",
    "name": "宇智波佐助",
    "source": "火影忍者",
    "image": "assets/characters/C013.jpg"
  },
  {
    "key": "C014",
    "name": "春野樱",
    "source": "火影忍者",
    "image": "assets/characters/C014.jpg"
  },
  {
    "key": "C015",
    "name": "旗木卡卡西",
    "source": "火影忍者",
    "image": "assets/characters/C015.jpg"
  },
  {
    "key": "C016",
    "name": "日向雏田",
    "source": "火影忍者",
    "image": "assets/characters/C016.jpg"
  },
  {
    "key": "C017",
    "name": "我爱罗",
    "source": "火影忍者",
    "image": "assets/characters/C017.jpg"
  },
  {
    "key": "C018",
    "name": "灶门祢豆子",
    "source": "鬼灭之刃",
    "image": "assets/characters/C018.jpg"
  },
  {
    "key": "C019",
    "name": "我妻善逸",
    "source": "鬼灭之刃",
    "image": "assets/characters/C019.jpg"
  },
  {
    "key": "C020",
    "name": "嘴平伊之助",
    "source": "鬼灭之刃",
    "image": "assets/characters/C020.jpg"
  },
  {
    "key": "C021",
    "name": "富冈义勇",
    "source": "鬼灭之刃",
    "image": "assets/characters/C021.jpg"
  },
  {
    "key": "C022",
    "name": "蝴蝶忍",
    "source": "鬼灭之刃",
    "image": "assets/characters/C022.jpg"
  },
  {
    "key": "C023",
    "name": "虎杖悠仁",
    "source": "咒术回战",
    "image": "assets/characters/C023.jpg"
  },
  {
    "key": "C024",
    "name": "伏黑惠",
    "source": "咒术回战",
    "image": "assets/characters/C024.jpg"
  },
  {
    "key": "C025",
    "name": "钉崎野蔷薇",
    "source": "咒术回战",
    "image": "assets/characters/C025.jpg"
  },
  {
    "key": "C026",
    "name": "禅院真希",
    "source": "咒术回战",
    "image": "assets/characters/C026.jpg"
  },
  {
    "key": "C027",
    "name": "熊猫",
    "source": "咒术回战",
    "image": "assets/characters/C027.jpg"
  },
  {
    "key": "C028",
    "name": "洛伊德",
    "source": "间谍过家家",
    "image": "assets/characters/C028.jpg"
  },
  {
    "key": "C029",
    "name": "约尔",
    "source": "间谍过家家",
    "image": "assets/characters/C029.jpg"
  },
  {
    "key": "C030",
    "name": "邦德",
    "source": "间谍过家家",
    "image": "assets/characters/C030.jpg"
  },
  {
    "key": "C031",
    "name": "路飞",
    "source": "海贼王",
    "image": "assets/characters/C031.jpg"
  },
  {
    "key": "C032",
    "name": "索隆",
    "source": "海贼王",
    "image": "assets/characters/C032.jpg"
  },
  {
    "key": "C033",
    "name": "娜美",
    "source": "海贼王",
    "image": "assets/characters/C033.jpg"
  },
  {
    "key": "C034",
    "name": "山治",
    "source": "海贼王",
    "image": "assets/characters/C034.jpg"
  },
  {
    "key": "C035",
    "name": "乔巴",
    "source": "海贼王",
    "image": "assets/characters/C035.jpg"
  },
  {
    "key": "C036",
    "name": "乌索普",
    "source": "海贼王",
    "image": "assets/characters/C036.jpg"
  },
  {
    "key": "C037",
    "name": "皮卡丘",
    "source": "宝可梦",
    "image": "assets/characters/C037.jpg"
  },
  {
    "key": "C038",
    "name": "伊布",
    "source": "宝可梦",
    "image": "assets/characters/C038.jpg"
  },
  {
    "key": "C039",
    "name": "小火龙",
    "source": "宝可梦",
    "image": "assets/characters/C039.jpg"
  },
  {
    "key": "C040",
    "name": "杰尼龟",
    "source": "宝可梦",
    "image": "assets/characters/C040.jpg"
  },
  {
    "key": "C041",
    "name": "妙蛙种子",
    "source": "宝可梦",
    "image": "assets/characters/C041.jpg"
  },
  {
    "key": "C042",
    "name": "可达鸭",
    "source": "宝可梦",
    "image": "assets/characters/C042.jpg"
  },
  {
    "key": "C043",
    "name": "孙悟空",
    "source": "龙珠",
    "image": "assets/characters/C043.jpg"
  },
  {
    "key": "C044",
    "name": "贝吉塔",
    "source": "龙珠",
    "image": "assets/characters/C044.jpg"
  },
  {
    "key": "C045",
    "name": "克林",
    "source": "龙珠",
    "image": "assets/characters/C045.jpg"
  },
  {
    "key": "C046",
    "name": "布尔玛",
    "source": "龙珠",
    "image": "assets/characters/C046.jpg"
  },
  {
    "key": "C047",
    "name": "比克",
    "source": "龙珠",
    "image": "assets/characters/C047.jpg"
  },
  {
    "key": "C048",
    "name": "孙悟饭",
    "source": "龙珠",
    "image": "assets/characters/C048.jpg"
  },
  {
    "key": "C049",
    "name": "纳西妲",
    "source": "原神",
    "image": "assets/characters/C049.jpg"
  },
  {
    "key": "C050",
    "name": "钟离",
    "source": "原神",
    "image": "assets/characters/C050.jpg"
  },
  {
    "key": "C051",
    "name": "温迪",
    "source": "原神",
    "image": "assets/characters/C051.jpg"
  },
  {
    "key": "C052",
    "name": "派蒙",
    "source": "原神",
    "image": "assets/characters/C052.jpg"
  },
  {
    "key": "C053",
    "name": "丹恒",
    "source": "崩坏：星穹铁道",
    "image": "assets/characters/C053.jpg"
  },
  {
    "key": "C054",
    "name": "景元",
    "source": "崩坏：星穹铁道",
    "image": "assets/characters/C054.jpg"
  },
  {
    "key": "C055",
    "name": "安比",
    "source": "绝区零",
    "image": "assets/characters/C055.jpg"
  },
  {
    "key": "C056",
    "name": "妮可",
    "source": "绝区零",
    "image": "assets/characters/C056.jpg"
  },
  {
    "key": "C057",
    "name": "比利",
    "source": "绝区零",
    "image": "assets/characters/C057.jpg"
  },
  {
    "key": "C058",
    "name": "艾莲",
    "source": "绝区零",
    "image": "assets/characters/C058.jpg"
  },
  {
    "key": "C059",
    "name": "企业",
    "source": "碧蓝航线",
    "image": "assets/characters/C059.jpg"
  },
  {
    "key": "C060",
    "name": "琪亚娜（空之律者）",
    "source": "崩坏3",
    "image": "assets/characters/C060.jpg"
  },
  {
    "key": "C061",
    "name": "安琪拉",
    "source": "王者荣耀",
    "image": "assets/characters/C061.jpg"
  },
  {
    "key": "C062",
    "name": "孙悟空",
    "source": "王者荣耀",
    "image": "assets/characters/C062.jpg"
  },
  {
    "key": "C063",
    "name": "庄周",
    "source": "王者荣耀",
    "image": "assets/characters/C063.jpg"
  },
  {
    "key": "C064",
    "name": "妲己",
    "source": "王者荣耀",
    "image": "assets/characters/C064.jpg"
  },
  {
    "key": "C065",
    "name": "柯南",
    "source": "名侦探柯南",
    "image": "assets/characters/C065.jpg"
  },
  {
    "key": "C066",
    "name": "黑崎一护",
    "source": "死神 BLEACH",
    "image": "assets/characters/C066.jpg"
  },
  {
    "key": "C067",
    "name": "后藤一里",
    "source": "孤独摇滚！",
    "image": "assets/characters/C067.jpg"
  },
  {
    "key": "C068",
    "name": "桐人",
    "source": "刀剑神域",
    "image": "assets/characters/C068.jpg"
  },
  {
    "key": "C069",
    "name": "蕾姆",
    "source": "Re：从零开始的异世界生活",
    "image": "assets/characters/C069.jpg"
  },
  {
    "key": "C070",
    "name": "鹿目圆",
    "source": "魔法少女小圆",
    "image": "assets/characters/C070.jpg"
  },
  {
    "key": "C071",
    "name": "初音未来",
    "source": "初音未来 / Piapro",
    "image": "assets/characters/C071.jpg"
  },
  {
    "key": "C072",
    "name": "卡比",
    "source": "星之卡比",
    "image": "assets/characters/C072.jpg"
  },
  {
    "key": "C073",
    "name": "索尼克",
    "source": "索尼克",
    "image": "assets/characters/C073.jpg"
  },
  {
    "key": "C074",
    "name": "医生",
    "source": "第五人格",
    "image": "assets/characters/C074.jpg"
  },
  {
    "key": "C075",
    "name": "卡芙卡",
    "source": "崩坏：星穹铁道",
    "image": "assets/characters/C075.jpg"
  },
  {
    "key": "C076",
    "name": "流萤",
    "source": "崩坏：星穹铁道",
    "image": "assets/characters/C076.jpg"
  },
  {
    "key": "C077",
    "name": "贝姬",
    "source": "间谍过家家",
    "image": "assets/characters/C077.jpg"
  },
  {
    "key": "C078",
    "name": "达米安",
    "source": "间谍过家家",
    "image": "assets/characters/C078.jpg"
  },
  {
    "key": "C079",
    "name": "先知",
    "source": "第五人格",
    "image": "assets/characters/C079.jpg"
  },
  {
    "key": "C080",
    "name": "摄影师",
    "source": "第五人格",
    "image": "assets/characters/C080.jpg"
  },
  {
    "key": "C081",
    "name": "佣兵",
    "source": "第五人格",
    "image": "assets/characters/C081.jpg"
  },
  {
    "key": "C082",
    "name": "开拓者",
    "source": "崩坏：星穹铁道",
    "image": "assets/characters/C082.jpg"
  },
  {
    "key": "C083",
    "name": "星见雅",
    "source": "绝区零",
    "image": "assets/characters/C083.jpg"
  }
];
  const images=[
  {
    "id": "I13",
    "type": "image",
    "title": "路飞",
    "source": "海贼王",
    "guess": "assets/images/I13_guess.jpg",
    "answer": "assets/characters/C031.jpg",
    "seconds": 30
  },
  {
    "id": "I14",
    "type": "image",
    "title": "索隆",
    "source": "海贼王",
    "guess": "assets/images/I14_guess.jpg",
    "answer": "assets/characters/C032.jpg",
    "seconds": 30
  },
  {
    "id": "I15",
    "type": "image",
    "title": "乔巴",
    "source": "海贼王",
    "guess": "assets/images/I15_guess.jpg",
    "answer": "assets/characters/C035.jpg",
    "seconds": 30
  },
  {
    "id": "I16",
    "type": "image",
    "title": "孙悟空",
    "source": "龙珠",
    "guess": "assets/images/I16_guess.jpg",
    "answer": "assets/characters/C043.jpg",
    "seconds": 30
  },
  {
    "id": "I17",
    "type": "image",
    "title": "贝吉塔",
    "source": "龙珠",
    "guess": "assets/images/I17_guess.jpg",
    "answer": "assets/characters/C044.jpg",
    "seconds": 30
  },
  {
    "id": "I18",
    "type": "image",
    "title": "柯南",
    "source": "名侦探柯南",
    "guess": "assets/images/I18_guess.jpg",
    "answer": "assets/characters/C065.jpg",
    "seconds": 30
  },
  {
    "id": "I19",
    "type": "image",
    "title": "皮卡丘",
    "source": "宝可梦",
    "guess": "assets/images/I19_guess.jpg",
    "answer": "assets/characters/C037.jpg",
    "seconds": 30
  },
  {
    "id": "I20",
    "type": "image",
    "title": "伊布",
    "source": "宝可梦",
    "guess": "assets/images/I20_guess.jpg",
    "answer": "assets/characters/C038.jpg",
    "seconds": 30
  },
  {
    "id": "I21",
    "type": "image",
    "title": "可达鸭",
    "source": "宝可梦",
    "guess": "assets/images/I21_guess.jpg",
    "answer": "assets/characters/C042.jpg",
    "seconds": 30
  },
  {
    "id": "I22",
    "type": "image",
    "title": "黑崎一护",
    "source": "死神 BLEACH",
    "guess": "assets/images/I22_guess.jpg",
    "answer": "assets/characters/C066.jpg",
    "seconds": 30
  },
  {
    "id": "I23",
    "type": "image",
    "title": "后藤一里",
    "source": "孤独摇滚！",
    "guess": "assets/images/I23_guess.jpg",
    "answer": "assets/characters/C067.jpg",
    "seconds": 30
  },
  {
    "id": "I24",
    "type": "image",
    "title": "桐人",
    "source": "刀剑神域",
    "guess": "assets/images/I24_guess.jpg",
    "answer": "assets/characters/C068.jpg",
    "seconds": 30
  },
  {
    "id": "I25",
    "type": "image",
    "title": "蕾姆",
    "source": "Re：从零开始的异世界生活",
    "guess": "assets/images/I25_guess.jpg",
    "answer": "assets/characters/C069.jpg",
    "seconds": 30
  },
  {
    "id": "I26",
    "type": "image",
    "title": "鹿目圆",
    "source": "魔法少女小圆",
    "guess": "assets/images/I26_guess.jpg",
    "answer": "assets/characters/C070.jpg",
    "seconds": 30
  },
  {
    "id": "I27",
    "type": "image",
    "title": "初音未来",
    "source": "初音未来 / Piapro",
    "guess": "assets/images/I27_guess.jpg",
    "answer": "assets/characters/C071.jpg",
    "seconds": 30
  },
  {
    "id": "I28",
    "type": "image",
    "title": "卡比",
    "source": "星之卡比",
    "guess": "assets/images/I28_guess.jpg",
    "answer": "assets/characters/C072.jpg",
    "seconds": 30
  },
  {
    "id": "I29",
    "type": "image",
    "title": "索尼克",
    "source": "索尼克",
    "guess": "assets/images/I29_guess.jpg",
    "answer": "assets/characters/C073.jpg",
    "seconds": 30
  },
  {
    "id": "I30",
    "type": "image",
    "title": "纳西妲",
    "source": "原神",
    "guess": "assets/images/I30_guess.jpg",
    "answer": "assets/characters/C049.jpg",
    "seconds": 30
  },
  {
    "id": "I31",
    "type": "image",
    "title": "丹恒",
    "source": "崩坏：星穹铁道",
    "guess": "assets/images/I31_guess.jpg",
    "answer": "assets/characters/C053.jpg",
    "seconds": 30
  },
  {
    "id": "I32",
    "type": "image",
    "title": "安比",
    "source": "绝区零",
    "guess": "assets/images/I32_guess.jpg",
    "answer": "assets/characters/C055.jpg",
    "seconds": 30
  },
  {
    "id": "I33",
    "type": "image",
    "title": "艾莲",
    "source": "绝区零",
    "guess": "assets/images/I33_guess.jpg",
    "answer": "assets/characters/C058.jpg",
    "seconds": 30
  },
  {
    "id": "I34",
    "type": "image",
    "title": "琪亚娜（空之律者）",
    "source": "崩坏3",
    "guess": "assets/images/I34_guess.jpg",
    "answer": "assets/characters/C060.jpg",
    "seconds": 30
  },
  {
    "id": "I35",
    "type": "image",
    "title": "企业",
    "source": "碧蓝航线",
    "guess": "assets/images/I35_guess.jpg",
    "answer": "assets/characters/C059.jpg",
    "seconds": 30
  },
  {
    "id": "I36",
    "type": "image",
    "title": "卡芙卡",
    "source": "崩坏：星穹铁道",
    "guess": "assets/images/I36_guess.jpg",
    "answer": "assets/characters/C075.jpg",
    "seconds": 30
  }
];
  const byKey=key=>media.find(m=>m.key===key);
  window.CHARACTER_MEDIA=media;
  window.findCharacterMedia=(name,source)=>media.find(m=>m.name===name&&m.source===source);
  const reference=(key,example=false)=>({...byKey(key),example});
  const core=['C004','C043','C065','C037','C032','C073','C006','C007','C009','C012','C031','C003'];
  const groups=[
    ['C004','C013','C015','C016','C017'],['C002','C018','C019','C020','C022'],
    ['C001','C001','C024','C025','C027'],['C003','C028','C029','C030','C003'],
    ['C031','C032','C033','C034','C035'],['C037','C038','C042','C040','C037'],
    ['C043','C044','C043','C047','C043'],['C005','C050','C051','C049','C052'],
    ['C007','C053','C054','C082','C007'],['C008','C057','C055','C056','C058'],
    ['C009','C010','C061','C062','C063'],['C012','C011','C074','C079','C080']
  ].flat();
  const examples=new Set(['A01','A04','A05','A06','A07','A08','A09','A10','A11','A12','A24','A32','A42','A45','A47','A57']);
  for(const c of window.CHALLENGE_CARDS.filter(c=>c.type==='action')) {
    const number=Number(c.id.slice(1));c.reference=reference(number<=12?core[number-1]:groups[number-13],examples.has(c.id));
    if(c.id==='A04'||c.id==='A42')c.referenceLabel='伙伴示例';
  }
  const actions=[
    ['C031','草帽同好','假装扶住路飞的草帽，抬手向新同好打个招呼。'],
    ['C032','剑士合照','参考索隆的站姿，假装扶住腰间的剑，保持3秒。'],
    ['C035','乔巴欢呼','用双手比出鹿角，再演出乔巴听见好消息时的开心反应。'],
    ['C043','悟空来访','参考孙悟空的道服造型，双手叉腰，摆一个有精神的站姿。'],
    ['C044','贝吉塔迎战','参考贝吉塔的姿态，抬起双手，演出准备迎接挑战的感觉。'],
    ['C065','侦探亮相','假装调整柯南的领结，再做一个想到答案的小表情。'],
    ['C037','电气伙伴','参考皮卡丘的耳朵和小短手，做一个开心打招呼的动作。'],
    ['C038','伊布歪头','用双手比出伊布的大耳朵，歪头等一个回应。'],
    ['C042','可达鸭发愁','双手扶头，演出可达鸭努力想起答案的样子。'],
    ['C066','一护出发','参考黑崎一护的造型，假装背好武器，摆一个准备出发的姿势。'],
    ['C067','波奇合照','参考后藤一里的造型，演出想拍合照又有点紧张的反应。'],
    ['C068','黑衣剑士','参考桐人的站姿，假装调整背后的剑，再向同好点头致意。'],
    ['C069','蕾姆欢迎','参考蕾姆的女仆造型，用一个礼貌的小招手欢迎新同好。'],
    ['C070','小圆心愿','参考鹿目圆的造型，双手轻握在胸前，演出许一个小愿望的感觉。'],
    ['C071','初音舞台','假装握住麦克风，参考初音未来的造型摆一个演出结束的姿势。'],
    ['C072','卡比坐星星','用双手比出小圆脸，演出卡比乘着星星出发的感觉。'],
    ['C073','索尼克集合','参考索尼克的姿态，竖起拇指，再做一个准备跑步的动作。'],
    ['C049','草元素小智慧','用一个托腮和轻轻点头的动作，演出纳西妲找到办法的感觉。'],
    ['C053','丹恒守候','假装一手握长枪，摆一个丹恒安静等待队友的姿势。'],
    ['C055','安比午餐','参考安比的造型，演出认真思考汉堡要不要加料的小表情。'],
    ['C058','艾莲下班','参考艾莲的造型，伸一个小懒腰，再向同好告别。'],
    ['C060','空之律者登场','参考图中的琪亚娜空之律者形象，抬起一只手，保持一个自信姿势3秒。'],
    ['C059','企业启航','参考企业的舰装造型，假装整理帽子，摆一个准备出发的姿势。'],
    ['C075','卡芙卡雨伞','假装撑开一把伞，用一个从容的小招手模仿卡芙卡。']
  ];
  actions.forEach(([key,title,task],i)=>{
    const m=byKey(key);window.CHALLENGE_CARDS.push({id:'A'+String(73+i).padStart(2,'0'),type:'action',title,task,source:m.source,seconds:10,reference:reference(key)});
  });
  window.CHALLENGE_CARDS.push(...images);
  // 把新作品同时加入本地组合生成，角色名与图片来自同一记录。
  for(const c of images) {
    let world=window.CHALLENGE_WORLDS.find(w=>w.source===c.source);
    if(!world){world={source:c.source,characters:[]};window.CHALLENGE_WORLDS.push(world);}
    if(!world.characters.includes(c.title))world.characters.push(c.title);
  }
})();
