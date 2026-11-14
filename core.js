(function(root){
'use strict';
const groups=[
 {id:'reading',title:'وقت التلاوة',icon:'clock',unit:'دقيقة',items:[['أول تلاوة',1,'bronze','book'],['لحظات مع القرآن',15,'bronze','sun'],['ساعة سكينة',60,'silver','clock'],['حلاوة التلاوة',300,'silver','leaf'],['قارئ مثابر',600,'gold','fire'],['قنديل الذكر',1500,'gold','spark'],['رفيق المصحف',3000,'platinum','book'],['مئة ساعة من النور',6000,'platinum','sun'],['حافظ الساعات',15000,'diamond','clock'],['من أهل القرآن',30000,'diamond','heart']]},
 {id:'streak',title:'المواظبة على القراءة',icon:'fire',unit:'يوم متتابع',items:[['ورد يومي',3,'bronze','fire'],['أسبوع مع القرآن',7,'silver','fire'],['أسبوعان منيران',14,'silver','spark'],['من هلال إلى هلال',30,'gold','moon'],['قمران',60,'platinum','moon'],['عهد لا ينقطع',100,'platinum','heart'],['صحبة عام',365,'diamond','sun']]},
 {id:'tasbih',title:'رحلتك مع التسبيح',icon:'beads',unit:'تسبيحة',items:[['بداية الذكر',33,'bronze','beads'],['مئة تسبيحة',100,'bronze','leaf'],['لسان ذاكر',1000,'silver','beads'],['ذكر يتجدد',5000,'silver','sun'],['عشرة آلاف',10000,'gold','spark'],['حديقة الذكر',25000,'platinum','leaf'],['صحبة الذكر',100000,'diamond','heart']]},
 {id:'names',title:'تعلّم أسماء الله الحسنى',icon:'spark',unit:'اسم',items:[['أول معرفة',1,'bronze','spark'],['عشرة أسماء',10,'silver','book'],['معرفة تنمو',33,'gold','leaf'],['تأمّل وحفظ',66,'platinum','heart'],['تسعة وتسعون',99,'diamond','spark']]}
];
const badges=groups.flatMap(g=>g.items.map((x,i)=>({id:g.id+'-'+i,group:g.id,name:x[0],target:x[1],tier:x[2],icon:x[3],unit:g.unit})));
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function shiftDay(key,n){const [y,m,d]=key.split('-').map(Number);return dayKey(new Date(y,m-1,d+n,12));}
function empty(){return {version:1,days:{},dhikr:{},cycles:{},names:[],earned:{},bookmark:null,lastPage:1,riwaya:'hafs',goal:20,adhkar:{}};}
function streak(days,today=dayKey()){
 const qualified=Object.keys(days).filter(k=>days[k].seconds>=60).sort();let best=0,run=0,last='';
 for(const d of qualified){run=last&&shiftDay(last,1)===d?run+1:1;best=Math.max(best,run);last=d;}
 let current=0,probe=days[today]?.seconds>=60?today:shiftDay(today,-1);
 while(days[probe]?.seconds>=60){current++;probe=shiftDay(probe,-1);}
 return {current,best};
}
function metrics(s,today=dayKey()){const st=streak(s.days,today);return {reading:Object.values(s.days).reduce((n,x)=>n+x.seconds,0)/60,tasbih:Object.values(s.days).reduce((n,x)=>n+x.tasbih,0),streak:st.best,currentStreak:st.current,names:s.names.length};}
function unlock(s,date=dayKey()){const m=metrics(s,date),fresh=[];for(const b of badges){if(m[b.group]>=b.target&&!s.earned[b.id]){s.earned[b.id]=date;fresh.push(b);}}return fresh;}
function numeric(x,min,max){return typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;}
function validDay(k){if(!/^\d{4}-\d{2}-\d{2}$/.test(k))return false;const [y,m,d]=k.split('-').map(Number);return y>=2000&&y<=2200&&dayKey(new Date(y,m-1,d,12))===k;}
function validate(v){
 if(!v||v.version!==1||!v.days||typeof v.days!=='object'||Array.isArray(v.days))throw Error('صيغة النسخة غير مدعومة.');
 const s=empty();if(Object.keys(v.days).length>50000)throw Error('النسخة أكبر من الحد المدعوم.');
 for(const [k,d] of Object.entries(v.days)){if(!validDay(k)||!d||!numeric(d.seconds,0,86400)||!numeric(d.tasbih,0,10000000))throw Error('بيانات الأيام غير صالحة.');s.days[k]={seconds:Math.floor(d.seconds),tasbih:Math.floor(d.tasbih)};}
 for(const field of ['dhikr','cycles']){if(v[field]&&typeof v[field]==='object'&&!Array.isArray(v[field]))for(const [k,n] of Object.entries(v[field])){if(k.length<=120&&!['__proto__','constructor','prototype'].includes(k)&&numeric(n,0,1e10))s[field][k]=Math.floor(n);}}
 if(Array.isArray(v.names))s.names=[...new Set(v.names.filter(n=>Number.isInteger(n)&&n>=1&&n<=99))];
 if(v.earned&&typeof v.earned==='object')for(const b of badges)if(validDay(v.earned[b.id]||''))s.earned[b.id]=v.earned[b.id];
 if(numeric(v.lastPage,1,604))s.lastPage=Math.floor(v.lastPage);
 if(['hafs','warsh','qaloon'].includes(v.riwaya))s.riwaya=v.riwaya;
 if([5,10,20,30,60].includes(v.goal))s.goal=v.goal;
 if(v.bookmark&&numeric(v.bookmark.page,1,604)&&['hafs','warsh','qaloon'].includes(v.bookmark.riwaya))s.bookmark={page:Math.floor(v.bookmark.page),riwaya:v.bookmark.riwaya};
 if(v.adhkar&&typeof v.adhkar==='object'&&!Array.isArray(v.adhkar))for(const [k,n] of Object.entries(v.adhkar)){if(k.length<140&&!['__proto__','constructor','prototype'].includes(k)&&numeric(n,0,10000))s.adhkar[k]=Math.floor(n);}
 return s;
}
function zakat(values){const {cash=0,metals=0,trade=0,debts=0,price,method,hawl}=values;for(const n of [cash,metals,trade,debts,price])if(!numeric(n,0,1e15))throw Error('يرجى إدخال مبالغ صحيحة غير سالبة.');if(price<=0)throw Error('أدخل سعر الجرام الحالي.');if(!['21','24','silver'].includes(method))throw Error('اختر معيار النصاب.');const net=Math.max(0,cash+metals+trade-debts),nisab=price*(method==='silver'?595:85);return {net,nisab,eligible:net>=nisab&&!!hawl,amount:net>=nisab&&hawl?net*.025:0};}
const api={groups,badges,dayKey,shiftDay,empty,streak,metrics,unlock,validate,zakat};root.MHCore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
