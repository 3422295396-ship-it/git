(function(){
  'use strict';
  const $=s=>document.querySelector(s);
  const game=new ChallengeGame(window.CHALLENGE_CARDS,Math.random,window.GENERATED_CARDS);
  const types={mix:{label:'随机混抽',color:'#a485ff',icon:'dice'},action:{label:'动作模仿',color:'#ff997d',icon:'mask'},image:{label:'看图挑战',color:'#94a9ff',icon:'eye'},quick:{label:'速画快答',color:'#6edac0',icon:'pen'},infinite:{label:'无限挑战',color:'#f0ca83',icon:'spark'}};
  $('.deck-bottom').textContent=`${game.cards.length} CARDS · ENDLESS FUN`;
  $('#reset-dialog p').textContent=`${game.cards.length} 张固定题恢复，组合生成轮次重新开始，当前挑战与最近抽卡清空。今日参与、成功和失败统计保留。`;
  const stage=$('#card-stage'), idleHTML=stage.innerHTML;
  let busy=false, animationTimeout, toastTimeout, timerInterval, timerDuration=15, remaining=15, deadline=0, timerRunning=false;
  let soundEnabled=false,audioContext;
  const icon=id=>`<svg aria-hidden="true"><use href="#${id}"/></svg>`;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
  function sound(kind){
    if(!soundEnabled)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return; audioContext=audioContext||new Audio();audioContext.resume().catch(()=>{});
      const notes=kind==='success'?[523,659,784]:kind==='end'?[660,660,440]:kind==='draw'?[330,494]:[440];
      notes.forEach((freq,i)=>{const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),start=audioContext.currentTime+i*.10;oscillator.type='sine';oscillator.frequency.value=freq;gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.035,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+.16);oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(start);oscillator.stop(start+.18);});
    }catch{ /* 音频不可用不影响游戏 */ }
  }
  function updateDashboard(){
    document.querySelectorAll('[data-count]').forEach(el=>el.textContent=el.dataset.count==='infinite'||game.repeat?'∞':game.count(el.dataset.count));
    const infinite=game.mode==='infinite';
    const total=game.cards.length,left=total-game.used.size;
    $('#pool-label').textContent=infinite?'组合生成':'本轮卡池';
    $('#pool-total').textContent=infinite?`第 ${game.generatedRound||1} 轮 · ${game.generatedPosition} / ${game.generatedCards.length}`:game.repeat?'∞ 可重复':`${left} / ${total}`;
    $('#pool-progress').style.width=(infinite?(1-game.generatedPosition/game.generatedCards.length)*100:game.repeat?100:left/total*100)+'%';
    $('#pool-note').textContent=infinite?'轮内不重复 · 用完自动续轮':game.repeat?'从完整题库随机抽取':'每一张都是新挑战';
    $('#repeat-status').innerHTML=`<i></i>${infinite?'持续生成':game.repeat?'允许重复':'不重复模式'}`;
    $('#repeat-toggle').disabled=infinite;
    $('#repeat-toggle').title=infinite?'此设置仅影响固定题库；无限挑战每轮不重复':'允许固定题库重复抽取';
    $('#participants').textContent=String(game.stats.participants).padStart(2,'0');
    $('#success-count').textContent=game.stats.success;$('#failure-count').textContent=game.stats.failure;
    renderHistory();
  }
  function renderHistory(){
    $('#history').innerHTML=game.history.length?game.history.map(entry=>{
      const card=entry.card,meta=types[card.type];
      const title=card.type==='image'&&!entry.revealed?'待揭晓':card.title;
      return `<li><i class="history-dot" style="background:${meta.color}"></i><span class="history-info"><strong>${escape(title)}</strong><small>${meta.label} · ${card.id}</small></span><span class="history-result">${entry.result==='success'?'✓':entry.result==='failure'?'×':'—'}</span></li>`;
    }).join(''):'<li class="history-empty">你的第一张挑战，<br>即将登场。</li>';
  }
  function renderCard(){
    const entry=game.current;if(!entry)return;
    const c=entry.card,meta=types[c.type];stage.style.setProperty('--accent',meta.color);
    const head=`<div class="card-meta"><span class="card-type">${icon(meta.icon)}${meta.label}卡${c.generated?' · 组合生成':''}</span><span class="card-id">${c.id}</span></div>`;
    if(c.type==='image'){
      const revealed=entry.revealed;
      stage.innerHTML=`<article class="challenge-card image-card">${head}<h2>${revealed?`答案：${escape(c.title)}`:'猜猜这是谁？'}</h2><div class="image-frame ${revealed?'answer':'guess'}"><img src="${escape(revealed?c.answer:c.guess)}" alt="${revealed?escape(c.title)+'完整角色图':'角色局部猜题图'}" draggable="false"></div><p class="image-caption">${revealed?'《'+escape(c.source)+'》':'看看细节，想到了哪位角色？'}</p></article>`;
      const image=stage.querySelector('img');image.addEventListener('error',()=>{
        image.hidden=true;const message=document.createElement('p');message.className='image-error';message.textContent='图片暂时无法显示，请工作人员换一张挑战。';image.parentNode.append(message);notify('请确认使用的是完整解压后的项目');
      },{once:true});
    }else if(c.type==='action'&&c.reference){
      const ref=c.reference,label=c.referenceLabel||(ref.example?'参考示例':'图示角色');
      stage.innerHTML=`<article class="challenge-card action-card">${head}<div class="task-body"><figure class="action-reference"><button class="reference-button" type="button" aria-label="查看${escape(ref.name)}角色大图"><img src="${escape(ref.image)}" alt="${escape(ref.name)}的原作角色参考图" draggable="false"><span>点击看大图 ↗</span></button><figcaption>${label}：${escape(ref.name)}</figcaption></figure><div class="action-copy"><h2>${escape(c.title)}</h2><p>${escape(c.task)}</p>${ref.example?'<small>可以换成熟悉的角色来演出</small>':''}</div></div><div class="card-bottom"><span>${escape(ref.source)}</span><span>图示为角色外观 · 动作按文字完成</span></div></article>`;
      stage.querySelector('.reference-button').onclick=()=>showReference(ref,label);
      const im=stage.querySelector('img');im.addEventListener('error',()=>{im.hidden=true;stage.querySelector('.reference-button span').textContent='角色图加载失败';stage.querySelector('.reference-button').disabled=true;notify('请确认项目内的 assets 文件夹完整');},{once:true});
    }else{
      const note=c.type==='action'?'轻松摆个动作，不需要喊台词':c.kind==='draw'||c.id.startsWith('Q0')&&+c.id.slice(1)<=4?'准备纸笔，灵魂画手也算数':'想到什么就说什么，放轻松';
      stage.innerHTML=`<article class="challenge-card">${head}<div class="task-body"><span class="task-symbol">${icon(meta.icon)}</span><h2>${escape(c.title)}</h2><p>${escape(c.task)}</p></div><div class="card-bottom"><span>${escape(c.source)}</span><span>${note}</span></div></article>`;
    }
    $('#reveal-answer').hidden=c.type!=='image'||entry.revealed;
    $('#judge-controls').hidden=false;
    $('#success').disabled=busy||!!entry.result;$('#failure').disabled=busy||!!entry.result;
    $('#result-banner').hidden=!entry.result;
    if(entry.result){$('#result-banner').classList.toggle('failed',entry.result==='failure');$('#result-banner').textContent=entry.result==='success'?'挑战成功！这份默契，属于二次元同好。':'挑战已记录。没关系，开心参与就很棒！';}
    $('#draw-card span').textContent='下一张';
    $('#play-hint').textContent=entry.result?'结果已记录，点击「下一张」迎接下一位同好。':c.generated?'组合挑战：不熟悉角色可以换熟悉的同类角色，再由工作人员判定。':'完成挑战后由工作人员记录结果，也可以直接下一张。';
  }
  function showReference(ref,label){
    $('#reference-title').textContent=`${label}：${ref.name}`;
    $('#reference-image').src=ref.image;$('#reference-image').alt=ref.name+'的原作角色图';
    $('#reference-note').textContent=`《${ref.source}》 · 角色外观参考，动作按题目要求演出${ref.example?'，也可以换成熟悉的角色。':'。'}`;
    if($('#reference-dialog').showModal)$('#reference-dialog').showModal();
  }
  $('#close-reference').onclick=()=>$('#reference-dialog').close();
  $('#reference-dialog').addEventListener('click',e=>{if(e.target===$('#reference-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  function setBusy(value){busy=value;$('#draw-card').disabled=value;$('#reveal-answer').disabled=value;$('#success').disabled=value||!!game.current?.result;$('#failure').disabled=value||!!game.current?.result;document.querySelectorAll('[data-mode]').forEach(b=>b.disabled=value);}
  function draw(){
    if(busy)return;
    resetTimer();
    const entry=game.draw();
    if(!entry){renderExhausted();return;}
    setBusy(true);renderCard();setDuration(entry.card.seconds);updateDashboard();sound('draw');
    stage.classList.remove('dealing','revealing');void stage.offsetWidth;stage.classList.add('dealing');
    clearTimeout(animationTimeout);animationTimeout=setTimeout(()=>{stage.classList.remove('dealing');setBusy(false);},500);
  }
  function renderExhausted(){
    const label=game.mode==='mix'?'全部挑战卡':types[game.mode].label+'卡';
    stage.style.removeProperty('--accent');stage.innerHTML=`<div class="exhausted-state"><span>✦</span><h2>${label}已经全部抽完！</h2><p>这一轮的挑战，全部解锁。<br>重置卡池、切换模式，或进入无限挑战。</p><div class="exhausted-actions"><button data-empty="reset">重置卡池</button><button data-empty="mode">切换模式</button><button data-empty="infinite">进入无限挑战</button></div></div>`;
    $('#reveal-answer').hidden=true;$('#judge-controls').hidden=true;$('#result-banner').hidden=true;
    $('#draw-card span').textContent='抽一张';$('#play-hint').textContent='卡池已抽完，准备好再来一轮了吗？';
    stage.querySelector('[data-empty=reset]').onclick=showReset;
    stage.querySelector('[data-empty=mode]').onclick=()=>{const mode=['action','image','quick','mix'].find(m=>game.count(m)>0&&m!==game.mode);if(mode){selectMode(mode);draw();}else notify('所有卡池都抽完了，请重置卡池或开启重复模式。');};
    stage.querySelector('[data-empty=infinite]').onclick=()=>{selectMode('infinite');draw();};
  }
  function selectMode(mode){game.setMode(mode);document.querySelectorAll('[data-mode]').forEach(b=>{const selected=b.dataset.mode===mode;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});updateDashboard();}
  function setRepeat(value){game.repeat=value;updateDashboard();notify(value?'已开启重复：从完整题库随机抽取。':'已关闭重复：继续原来的不重复卡池。');}
  function showReset(){if($('#reset-dialog').showModal)$('#reset-dialog').showModal();else if(window.confirm('重置所有卡池？今日战绩保留。'))resetPool();}
  function resetPool(){clearTimeout(animationTimeout);stage.classList.remove('dealing','revealing');game.resetPool();resetTimer();setBusy(false);stage.innerHTML=idleHTML;stage.style.removeProperty('--accent');$('#reveal-answer').hidden=true;$('#judge-controls').hidden=true;$('#result-banner').hidden=true;$('#draw-card span').textContent='抽一张';$('#play-hint').textContent='选择模式 → 抽一张 → 完成挑战 → 工作人员记录结果';updateDashboard();notify(`卡池已重置，${game.cards.length} 张固定题与组合轮次重新开始！`);}
  function displayTimer(){
    $('#timer-display').innerHTML=`${String(remaining).padStart(2,'0')}<span>s</span>`;
    $('#timer-display').setAttribute('aria-label',`剩余${remaining}秒`);
    $('.timer-panel').classList.toggle('time-up',remaining===0);
  }
  function stopTimer(){clearInterval(timerInterval);timerRunning=false;}
  function resetTimer(){stopTimer();remaining=timerDuration;$('#timer-start').textContent='开始计时';$('#timer-label').textContent='准备就绪';displayTimer();}
  function setDuration(seconds){timerDuration=seconds;document.querySelectorAll('[data-seconds]').forEach(b=>{const selected=+b.dataset.seconds===seconds;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});resetTimer();}
  function tick(){
    // 使用绝对截止时间，切后台/休眠后也不会漏掉已过去的时间。
    remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));displayTimer();
    if(remaining===0){stopTimer();$('#timer-start').textContent='再计一次';$('#timer-label').textContent='时间到！';notify('时间到！请工作人员判定挑战结果。');sound('end');}
  }
  function toggleTimer(){
    if(timerRunning){tick();stopTimer();$('#timer-start').textContent=remaining?'继续计时':'再计一次';$('#timer-label').textContent=remaining?'已暂停':'时间到！';return;}
    if(remaining===0)remaining=timerDuration;
    deadline=Date.now()+remaining*1000;timerRunning=true;$('#timer-start').textContent='暂停计时';$('#timer-label').textContent='挑战进行中';displayTimer();timerInterval=setInterval(tick,100);sound('click');
  }
  $('#draw-card').onclick=draw;
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{if(!busy)selectMode(b.dataset.mode);});
  $('#repeat-toggle').onchange=e=>setRepeat(e.target.checked);
  $('#reset-pool').onclick=showReset;
  $('#reset-dialog').addEventListener('close',()=>{if($('#reset-dialog').returnValue==='reset')resetPool();});
  $('#reveal-answer').onclick=()=>{if(busy||game.current?.revealed)return;game.reveal();renderCard();renderHistory();stage.classList.remove('revealing');void stage.offsetWidth;stage.classList.add('revealing');sound('click');};
  ['success','failure'].forEach(result=>$('#'+result).onclick=()=>{if(busy||!game.judge(result))return;resetTimer();$('#timer-label').textContent='挑战已结束';renderCard();updateDashboard();sound(result==='success'?'success':'click');});
  document.querySelectorAll('[data-seconds]').forEach(b=>b.onclick=()=>setDuration(+b.dataset.seconds));
  $('#timer-start').onclick=toggleTimer;$('#timer-reset').onclick=resetTimer;
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&timerRunning)tick();});
  $('#sound-toggle').onclick=()=>{soundEnabled=!soundEnabled;$('#sound-toggle').setAttribute('aria-pressed',String(soundEnabled));$('#sound-toggle').setAttribute('aria-label',soundEnabled?'关闭音效':'开启音效');$('.mute-line').hidden=soundEnabled;sound('click');notify(soundEnabled?'轻量音效已开启':'音效已关闭');};
  $('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else notify('此浏览器不支持全屏，可将网页添加到主屏幕。');}catch{notify('可使用浏览器全屏，或将网页添加到主屏幕。');}};
  updateDashboard();displayTimer();
  // 支持该浏览器能力时，结构化操作复用同一个状态；不向猜题阶段泄露答案。
  const context=document.modelContext;
  if(context?.registerTool){
    const lifecycle=new AbortController();
    const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
    register({name:'read_challenge_status',description:'读取当前模式、剩余卡数、统计和挑战状态；未揭晓的角色名不会返回。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({mode:game.mode,repeat:game.repeat,remaining:game.mode==='infinite'||game.repeat?'infinite':game.count(),generationRound:game.generatedRound,stats:{...game.stats},current:game.current?{id:game.current.card.id,type:game.current.card.type,title:game.current.card.type==='image'&&!game.current.revealed?'待揭晓':game.current.card.title,result:game.current.result}:null})});
    register({name:'draw_challenge_card',description:'选择抽卡模式并抽一张挑战；固定题默认去重，无限挑战自动续轮。',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['mix','action','image','quick','infinite']}},required:['mode'],additionalProperties:false},annotations:{readOnlyHint:false},execute:async input=>{if(!input||!Object.prototype.hasOwnProperty.call(types,input.mode))throw new Error('无效模式');if(busy)throw new Error('抽卡正在进行');selectMode(input.mode);const available=game.count();draw();await new Promise(resolve=>setTimeout(resolve,510));return {remaining:game.mode==='infinite'||game.repeat?'infinite':game.count(),status:available?'ready':'exhausted'};}});
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
  // 只预加载本地文件，file:// 下不使用 fetch、ES module 或 Service Worker。
  new Set([...window.CHALLENGE_CARDS.flatMap(c=>c.type==='image'?[c.guess,c.answer]:[]),...window.CHARACTER_MEDIA.map(m=>m.image)]).forEach(path=>{const image=new Image();image.src=path;});
  if(location.protocol==='file:')$('#offline-state').textContent='本地离线可用 · 一人一张';
  else if('serviceWorker' in navigator&&window.isSecureContext){
    navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{$('#offline-state').textContent='离线已就绪 · 一人一张';}).catch(()=>{$('#offline-state').textContent='一人一张 · 轻松挑战';});
  }
})();
