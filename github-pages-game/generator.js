/* 本地组合生成。题目是明确的有限组合；完整一轮后自动洗牌续轮。 */
(function () {
  'use strict';
  const cards=[];
  const add=(type,title,task,source,seconds,kind)=>cards.push({id:'G'+String(cards.length+1).padStart(4,'0'),type,title,task,source,seconds,kind,generated:true});
  const actions=[
    ['角色登场',name=>`用一个站姿和一个小手势，演出${name}登场的感觉，保持3秒。`],
    ['角色打招呼',name=>`想象${name}来到动漫社，用动作演出TA会怎样打招呼，不需要说台词。`],
    ['发现宝箱',name=>`用表情和小动作，演出${name}发现一个宝箱时的反应。`],
    ['角色思考',name=>`用一个托腮、扶额或抱胸的动作，演出${name}认真思考的样子。`],
    ['角色胜利',name=>`设计一个符合${name}气质的小幅度胜利动作，保持3秒。`],
    ['角色待机',name=>`假装你是${name}，演出TA等队友时的待机动作，持续3秒。`],
    ['拍照时间',name=>`如果${name}来拍动漫社合照，TA会摆什么姿势？用动作演出来。`],
    ['礼物时刻',name=>`只用表情和手势，演出${name}收到喜欢的礼物时的反应。`]
  ];
  const drawings=[
    ['头像速写',name=>`15秒画出${name}的头像，保留一个最明显的特征。`,15],
    ['几何画手',name=>`15秒只用圆形、三角形和直线画${name}，让工作人员猜。`,15],
    ['标志性物品',name=>`15秒画一个能让人联想到${name}的物品或服装细节，不写名字。`,15],
    ['背影挑战',name=>`15秒画${name}的背影，用发型或服装帮助工作人员认出TA。`,15],
    ['表情小卡',name=>`15秒为${name}画一张开心的表情小卡，保留一个角色特征。`,15],
    ['社团海报',name=>`30秒画一张${name}来动漫社做客的小海报，简笔画也可以。`,30]
  ];
  const talks=[
    ['两位伙伴',source=>`10秒说出两位《${source}》角色。`,10],
    ['组队选择',source=>`10秒从《${source}》选两位搭档，说一个组队理由。`,10],
    ['关键词猜作品',source=>`15秒用三个关键词介绍《${source}》，不说作品名，让工作人员猜。`,15],
    ['角色安利',source=>`15秒推荐一位《${source}》角色，说一个你喜欢TA的理由。`,15],
    ['场景速答',source=>`10秒说出一个你记得的《${source}》场景、地点或日常活动。`,10],
    ['动漫社来客',source=>`15秒选一位《${source}》角色来当动漫社摊位嘉宾，说说TA会负责什么。`,15]
  ];
  for (const world of window.CHALLENGE_WORLDS) {
    for (const name of world.characters) {
      const target=`《${world.source}》的${name}`;
      for (const [title,task] of actions) add('action',`${name} · ${title}`,task(target),world.source,10,'action');
      for (const [title,task,seconds] of drawings) add('quick',`${name} · ${title}`,task(target),world.source,seconds,'draw');
    }
    for (const [title,task,seconds] of talks) add('quick',title,task(world.source),world.source,seconds,'talk');
  }
  const free=[
    ['角色接龙','10秒说出三个不同作品的角色。'],['动物伙伴','10秒说出两个动漫或游戏里的动物伙伴。'],
    ['帽子角色','10秒说出两位戴帽子的角色。'],['眼镜同好','10秒说出两位戴眼镜的角色。'],
    ['剑士集合','10秒说出两位用剑的角色。'],['长发同好','10秒说出两位长发角色。'],
    ['短发同好','10秒说出两位短发角色。'],['老师来客','10秒说出一位老师或师父角色，再说一个特点。'],
    ['旅行搭档','10秒选一位动漫或游戏角色陪你旅行，说一个理由。'],['社长人选','10秒推荐一位角色当动漫社社长，说一个理由。'],
    ['摊位厨师','10秒选一位角色负责招新摊位的点心，说一个理由。'],['拍照搭档','10秒选一位角色负责动漫社拍照，说一个理由。'],
    ['萌物速画','15秒画一个动漫或游戏里的萌物，让工作人员猜。'],['道具速画','15秒画一个你喜欢的动漫或游戏道具。'],
    ['角色小贴纸','15秒为你喜欢的角色画一张小贴纸。'],['耳朵挑战','15秒画一个有明显耳朵特征的角色或吉祥物。'],
    ['像素小人','15秒用方块画一个熟悉的角色。'],['动漫社徽章','15秒为动漫社设计一个带角色元素的小徽章。'],
    ['角色合照','30秒画两个熟悉角色的简笔合照。'],['专属吉祥物','30秒给动漫社画一个自己的吉祥物。'],
    ['无声安利','只用三个小动作介绍一个你喜欢的角色，让工作人员猜。'],['取出道具','假装从口袋取出一个角色道具，用动作让工作人员猜。'],
    ['同好招呼','设计一个动漫社同好见面的小手势，保持3秒。'],['角色送别','任选一个角色，用动作演出TA向同好告别的样子。']
  ];
  free.forEach(([title,task],i)=>add(i>=20?'action':'quick',title,task,'动漫 / 游戏 · 自由选择',task.startsWith('30秒')?30:task.startsWith('15秒')?15:10,i>=20?'action':i>=12?'draw':'talk'));
  // 72 角色 × (8 动作 + 6 速画) + 12 作品 × 6 快答 + 24 自由题 = 1104。
  window.GENERATED_CARDS=cards;
})();
