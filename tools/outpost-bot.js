const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(process.env.F||require('path').join(__dirname,'..','game','pocket-warbands.html'),'utf8');
function run(strategy){
const dom=new JSDOM(html.replace(/<script>[\s\S]*<\/script>/,''),{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window; w.scrollTo=()=>{}; w.matchMedia=()=>({matches:true}); w.HTMLElement.prototype.scrollIntoView=()=>{};
w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({},{get:(t,k)=>t[k]!==undefined?t[k]:((k==='createLinearGradient'||k==='createRadialGradient')?()=>({addColorStop(){}}):()=>{}),set:(t,k,v)=>{t[k]=v;return true}})};
let src=html.match(/<script>([\s\S]*)<\/script>/)[1]; const idx=src.lastIndexOf('})();');
src=src.slice(0,idx)+"window.__o={opStart,get OP(){return OP},opStep,opBuild,opUpgrade,opBeginWave,opChoosePerk,opFireball,opRally,opAbility2,opFireballHit,OWAVES,OSPAWN,OBUILD,opAlive};"+src.slice(idx);
const errs=[]; w.addEventListener('error',e=>errs.push(e.message)); w.eval(src);
const T=w.__o; T.opStart(process.env.HERO||'ace'); const O=()=>T.OP; const log=[];
const segDist=(p,a,b)=>{ const dx=b.x-a.x, dy=b.y-a.y, t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy))); return Math.hypot(p.x-(a.x+t*dx), p.y-(a.y+t*dy)); };
for (let guard=0; guard<40; guard++){
  const op=O(); if (op.phase==='over') break;
  if (op.phase==='perk'){ T.opChoosePerk(op.perkOffer[0]); continue; }
  if (op.phase==='build'){
    const W=T.OWAVES[op.wave-1], core=op.core;
    const score=p=>Math.min(...W.from.map(k=>segDist(p,T.OSPAWN[k],core)));
    const pads=op.pads.slice().sort((a,b)=>score(a)-score(b));
    if (strategy!=='none'){
      let spent=true; let n=0;
      while (spent && n++<20){ spent=false;
        if (op.wave<=3 && !op.pads.some(p=>p.b&&p.b.type==='refinery') && op.credits>=60){ const p=op.pads.filter(p=>!p.b).sort((a,b)=>score(b)-score(a))[0]; if(p&&T.opBuild(p.id,'refinery')) { spent=true; continue; } }
        const free=pads.filter(p=>!p.b && score(p)<40);
        const turrets=op.pads.filter(p=>p.b&&p.b.type==='turret').length, pylons=op.pads.filter(p=>p.b&&p.b.type==='pylon').length, bar=op.pads.filter(p=>p.b&&p.b.type==='barracks').length;
        if (free.length){ const type = turrets<=pylons*2 ? 'turret' : (bar<turrets/2 ? 'barracks' : 'pylon'); if (T.opBuild(free[0].id, type)){ spent=true; continue; } }
        const up=op.pads.filter(p=>p.b&&p.b.lvl<3&&p.b.type!=='pylon').sort((a,b)=>a.b.lvl-b.b.lvl)[0]; if (up && T.opUpgrade(up.id)){ spent=true; continue; }
      }
    }
    T.opBeginWave(); continue;
  }
  if (op.phase==='wave'){
    let steps=0;
    while (O().phase==='wave' && steps++<30*240){
      const o=O();
      if (strategy==='smart'){
        if (o.cds.fire<=0){ const en=o.units.filter(u=>u.side===1&&T.opAlive(u)); let best=null,bn=0; for(const e of en){ const n=en.filter(q=>Math.hypot(q.x-e.x,q.y-e.y)<40).length+(e.boss?3:0); if(n>bn){bn=n;best=e;} } if(best&&bn>=2) T.opFireball(best.x,best.y); }
        if (o.cds.rally<=0 && o.cmd.dead<=0 && o.cmd.hp<o.cmd.max*0.5) T.opAbility2();
        const en=o.units.filter(u=>u.side===1&&T.opAlive(u)); if (en.length){ const near=en.reduce((a,b)=>Math.hypot(b.x-o.core.x,b.y-o.core.y)<Math.hypot(a.x-o.core.x,a.y-o.core.y)?b:a); if (process.env.HERO==='warden'){ o.cmd.tx=near.x; o.cmd.ty=near.y; } else { o.cmd.tx=(near.x+o.core.x)/2; o.cmd.ty=(near.y+o.core.y)/2; } }
      }
      T.opStep(1/30);
      // advance fx timers for fireball
      for (let i=o.fx.length-1;i>=0;i--){ const f=o.fx[i]; if (f.k==='fb'){ f.t+=1/30; if (f.t>=f.dur){ o.fx.splice(i,1); T.opFireballHit(f); } } }
    }
    log.push(`w${O().wave}${O().phase==='over'?(O().result.won?'WIN':'L'):''}:core${Math.round(O().core.hp)}`);
  }
}
const op=O(); try{w.close()}catch(_){}
return {res: op.result, wave: op.wave, log, errs: errs.slice(0,3)};
}
for (const s of (process.env.S||'smart,naive').split(',')) for (let i=0;i<(+process.env.N||3);i++){ const r=run(s); console.log(s, JSON.stringify({won:r.res&&r.res.won, wave:r.wave, errs:r.errs}), r.log.join(' ')); }
