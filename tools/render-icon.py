import asyncio, pathlib, base64
from playwright.async_api import async_playwright
JS = """(size)=>{ const c=document.createElement('canvas'); c.width=size; c.height=size; document.body.appendChild(c); const ctx=c.getContext('2d'); const S=size/1024;
 ctx.scale(S,S); const g=ctx.createLinearGradient(0,0,0,1024); g.addColorStop(0,'#070b17'); g.addColorStop(1,'#1c1640'); ctx.fillStyle=g; ctx.fillRect(0,0,1024,1024);
 const n=ctx.createRadialGradient(300,280,10,300,280,520); n.addColorStop(0,'rgba(255,95,216,.28)'); n.addColorStop(1,'rgba(255,95,216,0)'); ctx.fillStyle=n; ctx.fillRect(0,0,1024,1024);
 const n2=ctx.createRadialGradient(760,760,10,760,760,480); n2.addColorStop(0,'rgba(76,201,255,.25)'); n2.addColorStop(1,'rgba(76,201,255,0)'); ctx.fillStyle=n2; ctx.fillRect(0,0,1024,1024);
 for(let i=0;i<120;i++){ const x=(i*137.5)%1024, y=(i*263.7)%1024; ctx.fillStyle=i%9?'rgba(232,240,255,.8)':'#ffd27a'; const r=i%7?2:4; ctx.fillRect(x,y,r,r); }
 const pg=ctx.createRadialGradient(700,300,10,780,330,220); pg.addColorStop(0,'#ffcf8a'); pg.addColorStop(.6,'#e0704a'); pg.addColorStop(1,'#5a2440'); ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(780,330,190,0,Math.PI*2); ctx.fill();
 ctx.strokeStyle='rgba(255,220,180,.6)'; ctx.lineWidth=14; ctx.beginPath(); ctx.ellipse(780,330,330,64,-0.35,0,Math.PI*2); ctx.stroke();
 ctx.save(); ctx.translate(470,610); ctx.scale(14,14); ctx.lineCap='round'; ctx.lineJoin='round'; const OUT='#141826';
 ctx.strokeStyle='#2b3242'; ctx.lineWidth=2.8; ctx.beginPath(); ctx.moveTo(-3,3); ctx.lineTo(-4,9.4); ctx.moveTo(3,3); ctx.lineTo(4,9.4); ctx.stroke();
 ctx.fillStyle='#b9c3cf'; ctx.beginPath(); ctx.arc(-4,9.6,1.9,0,Math.PI*2); ctx.arc(4,9.6,1.9,0,Math.PI*2); ctx.fill();
 ctx.fillStyle='#4cc9ff'; ctx.beginPath(); ctx.roundRect(-6.5,-6,13,11,4); ctx.fill(); ctx.lineWidth=1.4; ctx.strokeStyle=OUT; ctx.stroke();
 ctx.fillStyle='rgba(255,255,255,.22)'; ctx.beginPath(); ctx.roundRect(-4.5,-4.6,6,4,1.5); ctx.fill();
 ctx.fillStyle='#e3e9f0'; ctx.beginPath(); ctx.arc(0,-12,5.7,0,Math.PI*2); ctx.fill(); ctx.lineWidth=1.3; ctx.stroke();
 ctx.fillStyle='#141a26'; ctx.beginPath(); ctx.roundRect(-1,-13.4,6.6,2.8,1.4); ctx.fill(); ctx.fillStyle='#7ff3ff'; ctx.fillRect(2,-12.7,3,0.8);
 ctx.fillStyle='#4cc9ff'; ctx.fillRect(-1,-17.6,2,3);
 ctx.fillStyle='#4a5260'; ctx.beginPath(); ctx.roundRect(1,-3,11,3.2,1); ctx.fill(); ctx.lineWidth=1; ctx.stroke(); ctx.strokeStyle='#bff6ff'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(12,-1.6); ctx.lineTo(16,-2); ctx.stroke();
 ctx.fillStyle='rgba(255,226,138,.85)'; ctx.beginPath(); ctx.arc(17,-2,2.4,0,Math.PI*2); ctx.fill();
 ctx.restore();
 return c.toDataURL('image/png'); }"""
async def main():
    async with async_playwright() as p:
        import os; b = await (p.chromium.launch(executable_path=os.environ['CHROME']) if os.environ.get('CHROME') else p.chromium.launch())
        pg = await b.new_page()
        for size, out in [(1024,str(pathlib.Path(__file__).resolve().parent.parent/'app'/'assets')+'/'+'icon.png'),(1024,str(pathlib.Path(__file__).resolve().parent.parent/'app'/'assets')+'/'+'splash-icon.png')]:
            d = await pg.evaluate(JS, size); pathlib.Path(out).write_bytes(base64.b64decode(d.split(',')[1]))
        await b.close()
asyncio.run(main())
