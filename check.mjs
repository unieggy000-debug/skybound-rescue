import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('./index.html',import.meta.url);
const html=fs.readFileSync(fs.existsSync(root)?root:new URL('./dist/index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const context=vm.createContext({});
vm.runInContext(script+';this.engine={LEVELS,newFlight,stepFlight,windForce};',context);
const {LEVELS,newFlight,stepFlight}=context.engine;
const none={left:false,right:false};
let open=newFlight(LEVELS.harbour),folded=newFlight(LEVELS.harbour);folded.open=false;
for(let i=0;i<120;i++){stepFlight(open,none,1/60);stepFlight(folded,none,1/60);}
assert(folded.y>open.y+100,'Folded canopy must produce a faster dive');
let heavy=newFlight(LEVELS.beacon);for(let i=0;i<120;i++)stepFlight(heavy,none,1/60);assert(heavy.vy>open.vy,'Heavier cargo must descend faster');
for(const level of Object.values(LEVELS)){
 const f=newFlight(level);f.y=level.height-2;f.x=level.target;f.vy=70;stepFlight(f,none,.03);assert(f.success,level.id+' safe landing');
 const miss=newFlight(level);miss.y=level.height-2;miss.x=30;miss.vy=70;stepFlight(miss,none,.03);assert(miss.finished&&!miss.success&&miss.cause==='miss');
 const hard=newFlight(level);hard.y=level.height-2;hard.x=level.target;hard.vy=190;hard.open=false;stepFlight(hard,none,.03);assert(hard.cause==='hard');
 // A steering controller should be able to navigate all gaps and the landing pad.
 const pilot=newFlight(level);for(let n=0;n<18000&&!pilot.finished;n++){
  const next=level.obstacles.find(o=>o.y>pilot.y-42);const target=next?next.gap:level.target;const error=target-pilot.x-pilot.vx*.55;
  stepFlight(pilot,{left:error<-9,right:error>9},1/60);
 }
 assert(pilot.success,level.id+' must be winnable with steering');
 console.log(level.id,': safe landing, miss, hard landing, and full-flight controller passed; health',pilot.hp,'time',pilot.time.toFixed(1));
}
let damage=newFlight(LEVELS.harbour);damage.y=620;damage.x=50;stepFlight(damage,none,.016);assert.equal(damage.hp,2);stepFlight(damage,none,.016);assert.equal(damage.hp,2,'Hit invulnerability must prevent instant repeated damage');
const desc=html.match(/<h1>Skybound Rescue<\/h1><p>([^<]+)/)[1];const count=desc.split(/\s+/).length;assert(count>=20&&count<=50);console.log('About description:',count,'words; JavaScript syntax and engine checks passed.');
