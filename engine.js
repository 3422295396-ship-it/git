/* 与 DOM 无关的规则引擎。所有模式共享同一个 used 集合。 */
(function(global){
  'use strict';
  class ChallengeGame {
    constructor(cards, random = Math.random, generatedCards = []) {
      if (!cards.length || new Set(cards.map(c=>c.id)).size !== cards.length) throw new Error('题库为空或编号重复');
      if (new Set(generatedCards.map(c=>c.id)).size !== generatedCards.length) throw new Error('生成题编号重复');
      this.cards=cards; this.random=random; this.mode='mix'; this.repeat=false;
      this.used=new Set(); this.current=null; this.history=[];
      this.stats={participants:0,success:0,failure:0}; this.serial=0;
      this.generatedCards=generatedCards;this.generatedDeck=[];this.generatedPosition=0;this.generatedRound=0;
    }
    candidates(mode=this.mode) {if(mode==='infinite')return this.generatedDeck.slice(this.generatedPosition);return this.cards.filter(c=>(mode==='mix'||c.type===mode)&&(this.repeat||!this.used.has(c.id)));}
    count(mode=this.mode) {return mode==='infinite'&&this.generatedCards.length?Infinity:this.candidates(mode).length;}
    setMode(mode) {if(['mix','action','image','quick','infinite'].includes(mode))this.mode=mode;}
    shuffleGenerated() {
      const previous=this.current?.card.id;
      this.generatedDeck=this.generatedCards.slice();
      for(let i=this.generatedDeck.length-1;i>0;i--){const j=Math.min(i,Math.floor(this.random()*(i+1)));[this.generatedDeck[i],this.generatedDeck[j]]=[this.generatedDeck[j],this.generatedDeck[i]];}
      // 两轮交界也不连续出现同一道题。
      if(this.generatedDeck.length>1&&this.generatedDeck[0].id===previous)[this.generatedDeck[0],this.generatedDeck[1]]=[this.generatedDeck[1],this.generatedDeck[0]];
      this.generatedPosition=0;this.generatedRound++;
    }
    draw() {
      let card;
      if(this.mode==='infinite'){
        if(!this.generatedCards.length)return null;
        if(this.generatedPosition>=this.generatedDeck.length)this.shuffleGenerated();
        card=this.generatedDeck[this.generatedPosition++];
      }else{
        const pool=this.candidates();if(!pool.length)return null;
        card=pool[Math.min(pool.length-1,Math.floor(this.random()*pool.length))];
      }
      // 重复开启时不消耗无重复卡池；关闭后接着原来的无重复轮次。
      if(this.mode!=='infinite'&&!this.repeat)this.used.add(card.id);
      this.current={card,token:++this.serial,revealed:false,result:null,round:this.mode==='infinite'?this.generatedRound:null};
      this.stats.participants++;
      this.history.unshift(this.current); this.history=this.history.slice(0,6);
      return this.current;
    }
    reveal() {if(this.current?.card.type==='image')this.current.revealed=true;}
    judge(result) {
      if(!this.current||this.current.result||!['success','failure'].includes(result))return false;
      this.current.result=result; this.stats[result]++; return true;
    }
    resetPool() {this.used.clear();this.current=null;this.history=[];this.generatedDeck=[];this.generatedPosition=0;this.generatedRound=0;}
  }
  global.ChallengeGame=ChallengeGame;
})(typeof window==='undefined'?globalThis:window);
