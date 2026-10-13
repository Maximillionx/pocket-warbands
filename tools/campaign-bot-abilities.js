const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(process.env.F||require('path').join(__dirname,'..','game','pocket-warbands.html'),'utf8');
function runCampaign(seedHint, verbose){
const dom=new JSDOM(html.replace(/<script>[\s\S]*<\/script>/,''),{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window; w.scrollTo=()=>{}; w.matchMedia=()=>({matches:true}); w.HTMLElement.prototype.scrollIntoView=()=>{};
w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({},{get:(t,k)=>t[k]!==undefined?t[k]:((k==='createLinearGradient'||k==='createRadialGradient')?()=>({addColorStop(){}}):()=>{}),set:(t,k,v)=>{t[k]=v;return true}})};
let src=html.match(/<script>([\s\S]*)<\/script>/)[1];
const idx=src.lastIndexOf('})();');
src=src.slice(0,idx)+"window.__t={get state(){return state},get B(){return B},startBattle,skip,finishBattle,chooseRoad,resolveEvent,mapAvail,markVisit,chooseRoadObj,PERKS,startArena,arenaReady,claimChest,claimQuest,ensureDaily,get meta(){return meta},deployed,advance,chooseBoon,choose,equipRing,RINGS,openPicks,onAct,render,EVENTS};"+src.slice(idx);
const errs=[]; w.addEventListener('error',e=>errs.push(e.message));
w.eval(src);
const T=w.__t; const log=[]; let guard=0;
const act=(a,extra={})=>T.onAct({dataset:{act:a,...extra},disabled:false});
while(guard++<320){
  const st=T.state;
  if(st.screen==='end'||st.ended||(process.env.STOP&&st.battle>+process.env.STOP)){ break; }
  if(st.boonOffer){ T.chooseBoon(st.boonOffer[0]); continue; }
  const pend=st.roster.filter(u=>u.pending>0);
  if(pend.length){ T.openPicks(); const u=pend[0]; T.choose(u.offer[0]); continue; }
  if(st.screen==='results'){ act('camp'); continue; }
  // equip gear
  for(const u of st.roster){ if(!u.gear && st.stash.length){ const id=st.stash[0]; /* simple */ u.gear=id; st.stash.shift(); } }
  if(!st.node){ const av=T.mapAvail(); if(!av.length){ log.push('NOAVAIL'); break; } const nd=av[0]; T.markVisit(nd); T.chooseRoadObj({type:nd.type,nem:nd.nem}); log.push('road:'+st.node.type); continue; }
  const n=st.node;
  if(n.type==='event'){ if(!n.done){ const ev=T.EVENTS[n.event]; let i=ev.choices.findIndex(c=>!c.can||c.can(n.ctx||{})); T.resolveEvent(i<0?0:i); log.push('event:'+n.event); } else T.advance(); continue; }
  if(n.type==='market'){ T.advance(); continue; }
  act('fill'); if(!st.roster.some(u=>!u.benched&&!u.wounded)) act('rest');
  T.claimChest(); [0,1,2].forEach(i=>T.claimQuest(i));
  if(T.arenaReady() && T.deployed().length && st.fights>0){ T.startArena('bot'+(st.battle%3)); if(T.B){ T.skip(); T.finishBattle(); log.push('ARENA:'+(T.state.results.win?'W':'L')); } continue; }
  if(st.mythic && st.gold>=st.mythic.cost && st.roster.length<12){ act('hiremythic'); log.push('MYTHIC'); }
  (st.ringShop||[]).forEach((o,j)=>{ if(!o.sold&&st.gold>=o.price+40) { act('ringbuy',{i:String(j)}); log.push('RING:'+o.id); } });
  while(st.rings.length){ const id=st.rings[0]; const R=T.RINGS[id]; const u=st.roster.filter(u=>!u.benched).find(u=>R.kind==='ult'?!u.ult:(u.spells||[]).filter(Boolean).length<2&&!(u.spells||[]).includes(id)); if(!u) break; T.equipRing(u,id); }
  st.shop.forEach((o,j)=>{ if(o&&st.gold>=o.cost+20&&st.roster.length<12) act('hire',{i:String(j)}); });
  T.startBattle(); if(!T.B){ log.push("NOARMY"); break; } T.B.autoCmd=true; T.skip(); T.finishBattle();
  const r=T.state.results; log.push(`b${r.battle}${r.boss?'B':r.elite?'E':''}:${r.win?'W':'L'}${((r.rows||[]).reduce((a,x)=>a+(x.casts||0),0)?'{c'+(r.rows||[]).reduce((a,x)=>a+(x.casts||0),0)+((r.rows||[]).some(x=>x.ult)?'U':'')+'}':'')+(r.cards.length?'['+r.cards.map(c=>c.kind).join(',')+']':'')}`);
}
const st=T.state;
const out = {meta:{renown:T.meta.renown, ach:Object.keys(T.meta.ach).length, arena:T.meta.arena.rating, codexP:Object.keys(T.meta.codex.perks).length, q:T.ensureDaily().quests.map(q=>q.id+':'+q.prog+(q.claimed?'c':''))}, log, errs, end:st.ended, battle:st.battle, wins:st.wins, nem:st.nemeses.length, nemSlain:st.stats.nemSlain, stash:st.stash.length, boons:st.boons, roster:st.roster.map(u=>u.cls[0]+u.level+(u.gear?'*':'')+(u.bond?'&':'')+((u.spells||[]).filter(Boolean).length?'s'+(u.spells||[]).filter(Boolean).length:'')+(u.ult?'U':'')+'['+u.perks.filter(p=>['legendary','mythic'].includes(T.PERKS?.[p]?.rarity)).join('/')+']').join(','), shop0:T.shop0};
try{w.close()}catch(_){}
return out;
}
for(let i=0;i<(+process.env.N||5);i++){ const r=runCampaign(i); console.log(JSON.stringify({end:r.end,battle:r.battle,wins:r.wins,meta:r.meta,errs:r.errs.slice(0,3)})); console.log('  '+r.log.join(' ')); console.log('  roster '+r.roster); }
