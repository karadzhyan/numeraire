/* Headless verification of the monopsony apparatus.
   Core functions are COPIED VERBATIM from the apparatus source (v05).        */
const INF=60;
const MRP=L=>2-L;
const wS=(L,e)=> e>=INF?1:Math.pow(Math.max(L,1e-9),1/e);
function Lm(e){ if(e>=INF) return 1; let lo=1e-6,hi=1; const g=L=>wS(L,e)*(1+1/e)-MRP(L);
  for(let i=0;i<90;i++){const m=(lo+hi)/2; if(g(m)>0)hi=m; else lo=m;} return (lo+hi)/2; }
const wm=e=>wS(Lm(e),e);
const mu=e=> e>=INF?0:1/(e+1);
const wageShareOfProduct=e=> e>=INF?1:e/(e+1);
/* ---- independent oracles (NOT from source) ---- */
const MCL=(L,e)=>wS(L,e)*(1+1/e);          // marginal cost of labour
const closedShare=e=>e/(e+1);              // Pigou: monopsony wage share
// robust generic monopsony solver for an ARBITRARY MRP (tests form-independence)
function LmGeneric(e, mrpf){
  let lo=1e-9, hi=1; const g=L=>wS(L,e)*(1+1/e)-mrpf(L);
  while(g(hi)<0 && hi<1e6) hi*=2;          // expand until sign change
  for(let i=0;i<200;i++){const m=(lo+hi)/2; if(g(m)>0)hi=m; else lo=m;} return (lo+hi)/2;
}
const approx=(a,b,t=1e-6)=>Math.abs(a-b)<=t;
const EPS=[1,1.5,2,3,4,6,10,20,40,60];
let pass=0, fail=0; const note=(ok,msg)=>{ (ok?pass++:fail++); if(!ok) console.log("   FAIL:",msg); };
console.log("eps      L_m       w_m      MRP(Lm)   MCL(Lm)   w_m/MRP   e/(e+1)   markdown  resid");
for(const e of EPS){
  const L=Lm(e), w=wm(e), mrp=MRP(L), mcl=MCL(L,e), ratio=w/mrp, cf=closedShare(e), md=mu(e), resid=mcl-mrp;
  console.log([e,L,w,mrp,mcl,ratio,cf,md,resid].map((x,i)=>i===0?String(x).padEnd(6):(+x).toFixed(6).padStart(9)).join(" "));
  if(e<INF){
    note(approx(mcl,mrp,1e-4), `I1 equilibrium MCL=MRP at e=${e} (resid ${resid.toExponential(2)})`);
    note(approx(ratio,cf,1e-4), `I2 w_m/MRP = e/(e+1) at e=${e} (${ratio.toFixed(6)} vs ${cf.toFixed(6)})`);
    note(approx(md,1-ratio,1e-4), `I3 markdown = 1 - w_m/MRP at e=${e}`);
    note(approx(wageShareOfProduct(e)+mu(e),1,1e-12), `I4 share+markdown=1 at e=${e}`);
    note(L>0 && L<1, `I7a 0<L_m<1 at e=${e} (L=${L})`);
    note(w<mrp && w<1, `I7b w_m<MRP and w_m<w_c=1 at e=${e}`);
  }
}
// I5 monotonic markdown
let mono=true; for(let i=1;i<EPS.length;i++) if(mu(EPS[i])>mu(EPS[i-1])) mono=false;
note(mono,"I5 markdown strictly decreasing in eps");
// I6 competitive limit
note(approx(wm(INF),1,1e-9)&&approx(MRP(Lm(INF)),1,1e-9)&&mu(INF)===0,"I6 competitive limit e->inf: w_m=MRP=1, markdown=0");
// I8 functional-form independence: alt MRPs (incl. one NOT through (1,1))
console.log("\nI8 form-independence  w_m/MRP = e/(e+1) under alternate MRP curves:");
const altMRPs={"2-L (orig)":L=>2-L, "2.5-L (not thru 1,1)":L=>2.5-L, "3-2L":L=>3-2*L, "1.8*exp(-0.5L)":L=>1.8*Math.exp(-0.5*L)};
for(const [name,mrpf] of Object.entries(altMRPs)){
  let okall=true, sample=[];
  for(const e of [2,4,10]){ const L=LmGeneric(e,mrpf), w=wS(L,e), r=w/mrpf(L); sample.push(`e=${e}:${r.toFixed(5)}`); if(!approx(r,closedShare(e),1e-4)) okall=false; }
  console.log(`   ${name.padEnd(22)} -> ${sample.join("  ")}  [target e/(e+1)=0.66667,0.80000,0.90909]`);
  note(okall,`I8 form-independence for MRP=${name}`);
}
console.log(`\n==== RESULT: ${pass} checks PASS, ${fail} FAIL ====`);
