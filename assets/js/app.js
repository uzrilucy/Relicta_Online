(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const C=D.chars, byId=Object.fromEntries(C.map(c=>[c.id,c])), GN=Object.fromEntries(D.groups.map(g=>[g.id,g]));
const head=id=>`img/${id}_h.webp`, full=id=>`img/${id}_f.webp`, emb=e=>`emblem/${e}.svg`;

/* ── 별하늘: 고해상도에서도 유휴 상태에는 다시 그리지 않음 ── */
(()=>{const cv=$('#stars'),x=cv.getContext('2d');if(!x)return;let pending=0;
 function draw(){pending=0;const dpr=Math.min(devicePixelRatio||1,1.5),w=innerWidth,h=innerHeight;
  cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);x.setTransform(dpr,0,0,dpr,0,0);
  const count=Math.min(180,Math.max(40,Math.round(w*h/9000)));
  for(let i=0;i<count;i++){x.globalAlpha=.35+Math.random()*.55;x.fillStyle=Math.random()<.12?'#ebd6a4':'#e9e1ff';x.beginPath();x.arc(Math.random()*w,Math.random()*h,Math.random()*1.2+.3,0,7);x.fill()}}
 function resize(){if(!pending)pending=requestAnimationFrame(draw)}
 addEventListener('resize',resize,{passive:true});draw()})();

/* ── 동시 접속: 실제로 보이는 동안에만 숫자 갱신 ── */
(()=>{let n=1512804117,timer=0,visible=false;const el=$('#ccu');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const stop=()=>{clearInterval(timer);timer=0};
 const sync=()=>{if(!visible||document.hidden||document.body.classList.contains('modal-active')){stop();return}
  if(!timer)timer=setInterval(()=>{n+=Math.round((Math.random()-.45)*4800);el.textContent=n.toLocaleString('ko-KR')},1600)};
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()}).observe(el);
 document.addEventListener('visibilitychange',sync);document.addEventListener('relicta:modal',sync)})();

/* ── 화면 밖의 SVG·장식 애니메이션 일시 정지 ── */
const effectObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('fx-paused',!e.isIntersecting)));
function watchEffects(root=document){root.querySelectorAll('.map-svg,.glitch').forEach(el=>{el.classList.add('fx-paused');effectObserver.observe(el)})}
watchEffects();
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('page-idle',document.hidden));
/* 재생한 PV도 화면 밖·백그라운드·상세창 뒤에서는 디코딩 중단 */
(()=>{const video=$('.pv video');if(!video)return;
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&document.fullscreenElement!==video&&!video.webkitDisplayingFullscreen)video.pause()}).observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause()});
 document.addEventListener('relicta:modal',()=>{if(document.body.classList.contains('modal-active'))video.pause()})})();


/* ── 소식 ── */
const NEWS=[
{k:'notice',t:'렐릭타 온라인 서비스 3주년을 맞이하며',d:'2076.04.03',b:['2073년 4월 3일, 첫 에테르 클론이 시작의 신전에서 눈을 뜬 지 꼭 3년이 되었습니다. 오늘 이 순간에도 15억 명의 솜니움이 엘리시온의 하늘 아래 각자의 이야기를 쓰고 있습니다.','회장님께서는 여러분이 만들어 갈 다음 장면을 누구보다 기대하고 계십니다. 부디 예측할 수 없는 이야기를 들려주십시오.'],s:'오네이로스 네트워크 비서실장 이현오'},
{k:'event',t:'[3주년] 기적의 제단 특별 개방 — 빛기둥 연출 강화',d:'2076.04.03',b:['3주년을 기념해 모든 마을의 제단에 특별 빛기둥 연출이 적용됩니다. 신급 아이템 획득 시 서버 전체 방송과 함께 3주년 기념 칭호 「기적의 목격자」가 지급됩니다.','제단의 확률 정보는 운영 정책에 따라 공개하지 않습니다. 빛의 색은 등급과 무관합니다.'],s:'라이브운영팀'},
{k:'notice',t:'붉은 낙인 정책 재안내 (엘리시안 주민 대상 PK)',d:'2076.03.28',b:['엘리시안 주민을 살해한 솜니움에게는 영구적인 붉은 낙인이 부여됩니다. 낙인 상태에서는 퀘스트를 받을 수 없으며, 모든 몬스터의 적대가 최대로 고정됩니다.','붉은 낙인을 해제하는 방법은 존재하지 않습니다. 낙인 해제를 미끼로 한 사기 거래에 주의해 주십시오.'],s:'라이브운영팀 GM 결'},
{k:'notice',t:'나락 원정 시 강제 로그아웃 불가 현상 관련 안내',d:'2076.03.21',b:['나락 4층 「소리를 삼키는 잿빛 사막」에서 강제 로그아웃 후 아바타가 혼수 상태로 남는 현상, 7층 「깨어나지 않는 정원」에서 로그아웃 버튼이 보이지 않는 현상이 접수되고 있습니다.','해당 현상은 콘텐츠의 의도된 기믹이며, 자율 AI 코어의 판단에 따라 별도 조치는 진행되지 않습니다. 현실의 캡슐에서 의료 경보가 울릴 경우 즉시 솜누스 의료센터로 연락해 주십시오.'],s:'라이브운영팀'},
{k:'update',t:'「바벨 강의」 공식 가이드 방송 제휴 안내',d:'2076.03.15',b:['플래티넘 길드 바벨의 공식 방송 「바벨 강의」와 신규 솜니움 가이드 제휴를 시작합니다. 시작의 신전 게시판에서 방송 채널로 바로 이동할 수 있습니다.'],s:'라이브운영팀'},
{k:'check',t:'4월 7일(화) 정기 점검 안내 (06:00~10:00)',d:'2076.04.04',b:['점검 시간 동안 접속 중인 솜니움은 순차적으로 로그아웃됩니다. 장시간 다이브 중인 이용자께서는 캡슐 영양 팩 잔량을 미리 확인해 주십시오.','점검 중에도 하늘의 붉은 눈은 관측됩니다. 이는 정상입니다.'],s:'라이브운영팀'},
{k:'notice',t:'통각 제한 해제 불법 모듈 단속 협조 안내',d:'2076.02.27',b:['통각 제한(30%)을 해제하는 불법 모듈의 사용은 「가상공간 안전법」 위반입니다. 국가 가상공간안전처의 단속에 협조하고 있으며, 적발 시 계정이 영구 정지됩니다.'],s:'콘텐츠 안전팀'},
{k:'update',t:'[대격변 패치] 나락 개방 · 일곱 군주 등장',d:'2075.10.31',b:['아우렐리아와 레노아 사이 바다 밑에 끝없는 지하 지옥 「나락」이 열립니다. 입구는 코발트 군도 끝자락에 생성되며, 각 층의 군주는 처치할 수 없습니다.','패치 이후 하늘에 붉은 눈이 관측되며, 기존 몬스터가 전반적으로 강화됩니다.'],s:'개발팀'},
];
function renderNews(k){$('#posts').innerHTML=NEWS.filter(n=>k==='all'||n.k===k).map((n,i)=>`<details class="post"${i===0&&k==='all'?' open':''}><summary><span class="k ${n.k}">${{notice:'공지',update:'업데이트',event:'이벤트',check:'점검'}[n.k]}</span><span class="tt">${esc(n.t)}</span><span class="dt">${n.d}</span></summary><div class="body">${n.b.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="sign">— ${esc(n.s)}</p></div></details>`).join('')}
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));renderNews(b.dataset.k)}));
renderNews('all');

/* ── 지도 ── */
const R={
zero:{k:'접근 불가 · 정중앙',n:'제0구역',e:'Sanctuary of Genesis',p:'하늘에 떠 있는 거대하고 순결한 부유대륙, 「창세의 성역」. 붉은 결계로 봉인되어 있으며 지배 길드는 없습니다. 모든 솜니움의 궁극 목표입니다.',sys:'[Damage: 0 (Immune)]<br>[Condition: ???]'},
abyss:{k:'접근 주의 · 바다 밑',n:'나락 입구',e:'The Abyss',p:'대격변 패치와 함께 두 대륙 사이 바다 밑에 열린 일곱 층의 지하 지옥. 용암과 독기가 가득하고, 일곱 군주는 처치할 수 없습니다.',dl:[['입구','코발트 군도 끝자락'],['인근 세력','리바이어던, 등대지기']],sys:'[WARNING] 강제 로그아웃 불가 구역 포함'},
krater:{k:'레노아 · 북',n:'크라테르 설원',e:'Krater Snowfield',g:'valhalla',p:'혹한의 설원. 최상급 광석과 강화석 광산이 있습니다.',dl:[['지배','발할라'],['법','힘이 곧 법. 세금은 거의 없고, 발할라 길드원을 결투로 이기면 1주일 채굴권'],['산하·거주','칠일장']]},
mementos:{k:'레노아 · 고대 유적',n:'메멘토스 유적',e:'Mementos Ruins',g:'babel',p:'뒤틀린 중력과 떠다니는 잔해. 렐릭타 최고의 꿈조각 발굴지입니다.',dl:[['지배','바벨'],['법','지식 독점. 모든 던전 입구를 쥐고, 획득한 꿈조각의 50%를 상납받는다']]},
redsand:{k:'레노아 · 서',n:'레드샌드 협곡',e:'Redsand Canyon',g:'midas',p:'극한 기후의 사막. 몬스터 리젠 1위 사냥터입니다.',dl:[['지배','마이다스 신디케이트'],['법','모든 장비와 포션은 마이다스 승인가로만 거래. 위반 시 고용 용병이 처단'],['산하·거주','그늘(무허가)']]},
arcadia:{k:'레노아 · 중앙',n:'아르카디아 분지',e:'Arcadia Basin',g:'olympus',p:'비옥한 평원이자 경제의 중심. 길드 성을 세우기에 가장 좋은 노른자 땅입니다.',dl:[['지배','올림포스'],['법','PK 전면 금지. 대신 상업세 30%와 산하 길드의 주간 다이아 공물'],['산하·거주','시계탑']]},
silveria:{k:'레노아 · 동',n:'실베리아 몽환림',e:'Silveria Dreamwood',g:'blackmoon',p:'안개 늪과 고목의 숲. 희귀 마수와 연금·요리 재료가 납니다.',dl:[['지배','검은 달'],['법','그림자 통행세. 통행증 없이 사냥하면 추적과 경험치 흡수. PK 청부도 받는다'],['산하·거주','구름다방']]},
cobalt:{k:'레노아 · 남',n:'코발트 군도',e:'Cobalt Archipelago',g:'leviathan',p:'휴양지 같은 섬들. 해상전의 중심이며, 영토 끝자락에 나락 입구가 열렸습니다.',dl:[['지배','리바이어던'],['법','절대 무법. 세금도 보호도 없다. 길드장이 재미로 개인 섬을 포격한다'],['산하·거주','등대지기']]},
solarium:{k:'아우렐리아 · 중앙',n:'솔라리움 제국',e:'Solarium Empire',el:'solarium',p:'최강의 군사력과 오만한 귀족 사회. 귀족들은 솜니움을 경멸하면서도 그들이 들여오는 사치품의 가장 큰손입니다.',dl:[['솜니움을 부르는 말','불사자 용병']]},
marcatus:{k:'아우렐리아 · 남서 해안',n:'마르카투스 왕국',e:'Kingdom of Marcatus',el:'marcatus',p:'항구와 경매장의 상업 왕국. 솜니움을 가장 크게 환영하는 교역의 중심지입니다.',dl:[['솜니움을 부르는 말','손님']]},
valor:{k:'아우렐리아 · 북방',n:'발로르 왕국',e:'Kingdom of Valor',el:'valor',p:'순수한 무력의 나라. 꿈조각에 기대는 솜니움을 경멸하지만, 맨몸의 전투 감각을 증명하면 깊이 존중합니다. 낙인자는 국경에서 벱니다.',dl:[['솜니움을 부르는 말','꿈 도둑']]},
arcanum:{k:'아우렐리아 · 서',n:'아르카눔 왕국',e:'Kingdom of Arcanum',el:'arcanum',p:'마법과 학자의 나라. 고대 기적에 집착하며, 학자들은 솜니움을 연구하고 해부하고 싶어 합니다.',dl:[['솜니움을 부르는 말','표본']]},
silvanus:{k:'아우렐리아 · 동',n:'실바누스 왕국',e:'Kingdom of Silvanus',el:'silvanus',p:'숲과 밭의 농업국. 솜니움 덕분에 마수 피해에서 회복하고 있으며, 솜니움 요리사에게 최상급 식재료를 댑니다.',dl:[['솜니움을 부르는 말','은인']]},
sanctus:{k:'아우렐리아 · 남',n:'상투스 왕국',e:'Kingdom of Sanctus',el:'sanctus',p:'절대신을 광신하는 신정 국가. 솜니움을 신이 보낸 천사이자 사도로 숭배합니다.',dl:[['솜니움을 부르는 말','천사, 사도']]},
noctua:{k:'아우렐리아 · 지하',n:'녹투아 왕국',e:'Kingdom of Noctua',el:'noctua',p:'빈민가와 지하 암시장의 나라. 장물, 불법 정보, 밀수 꿈조각이 돌고, 낙인자들의 마지막 피난처가 됩니다.',dl:[['솜니움을 부르는 말','돈 많은 유령'],['산하·거주','낙인 (지하)']]},
};
function region(id){const r=R[id];$$('.hs').forEach(h=>h.classList.toggle('on',h.dataset.r===id));
 const g=r.g?D.groups.find(x=>x.id===r.g):null;
 $('#rinfo').innerHTML=`<span class="kind">${esc(r.k)}</span>${g?`<img class="em" src="${emb(g.em)}" alt="${esc(g.name)} 엠블럼" loading="lazy" decoding="async">`:''}<h3>${esc(r.n)}</h3><span class="eng">${esc(r.e)}</span><p>${esc(r.p)}</p>${r.dl?`<dl>${r.dl.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`:''}${r.sys?`<div class="sys">${r.sys}</div>`:''}${(r.g||r.el)?`<a class="btn ghost" style="align-self:flex-start;margin-top:6px" href="#people" data-jump="${r.g||r.el}">이 지역의 인물 보기</a>`:''}${id==='abyss'?`<a class="btn ghost" style="align-self:flex-start;margin-top:6px" href="#abyss">나락 층별 정보</a>`:''}`;
 const j=$('#rinfo [data-jump]');if(j)j.addEventListener('click',()=>{setFilter(GN[j.dataset.jump].c==='plat'||GN[j.dataset.jump].c==='mid'?'player':(GN[j.dataset.jump].c==='elys'?'elys':'all'),j.dataset.jump)})}
$$('.hs').forEach(h=>{h.addEventListener('click',()=>region(h.dataset.r));h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();region(h.dataset.r)}})});
region('zero');

/* ── 길드 ── */
const GUILD={
olympus:{e:'OLYMPOS',t:'plat',reg:'아르카디아 분지',p:'12신의 이름을 딴 12좌 평의회가 다스리는 귀족정. 좌석은 실력으로 따내거나 거액에 사고판다.',law:'PK 전면 금지 · 상업세 30% · 산하 길드 주간 다이아 공물'},
valhalla:{e:'VALHALLA',t:'plat',reg:'크라테르 설원',p:'결투 서열이 곧 계급인 전사의 전당. 현실의 운동선수와 격투가가 몰려 있다.',law:'힘이 곧 법 · 세금 거의 0% · 결투로 이기면 1주일 채굴권'},
blackmoon:{e:'BLACK MOON',t:'plat',reg:'실베리아 몽환림',p:'수뇌부가 달의 위상을 코드네임으로 쓰는 익명 조직. 길드원끼리도 서로의 현실 정체를 모른다.',law:'그림자 통행세 · 무단 사냥 시 추적과 경험치 흡수 · PK 청부'},
midas:{e:'MIDAS SYNDICATE',t:'plat',reg:'레드샌드 협곡',p:'회장과 이사가 다스리는 기업형 길드. 장인과 상인과 요리사가 모였고, 돈으로 최상위 랭커를 산다.',law:'모든 장비·포션은 마이다스 승인가로만 · 위반 시 용병이 처단'},
leviathan:{e:'LEVIATHAN',t:'plat',reg:'코발트 군도',p:'빌런 롤플레이를 즐기는 해적 선단. 영토 끝에 나락 입구가 열리며 원정의 최전선이 됐다.',law:'절대 무법 · 세금도 보호도 없음'},
babel:{e:'BABEL',t:'plat',reg:'메멘토스 유적',p:'유적 위 10층 탑의 층주 서열로 움직이는 마법사 학회. 6길드 중 시스템의 비밀에 가장 가깝다.',law:'지식 독점 · 모든 던전 입구 장악 · 꿈조각 50% 상납'},
clocktower:{e:'CLOCKTOWER',t:'gold',reg:'아르카디아 · 올림포스 산하',p:'올림포스에 공물을 가장 먼저, 가장 정확하게 바치는 모범 산하 길드. 아르카디아 동쪽 시계탑 성의 주인.',law:'매주 월요일 정각, 공물 납부'},
lighthouse:{e:'LIGHTKEEPERS',t:'silver',reg:'코발트 군도 · 나락 입구',p:'나락에 갇힌 아바타를 건져 오는 유일한 전문 구조대. 낡은 등대가 거점이다.',law:'구조비 정가제 · 낼 수 없으면 순서가 밀린다'},
cloudcafe:{e:'CLOUD TEAROOM',t:'bronze',reg:'실베리아 몽환림 언저리',p:'숲의 재료로 차와 디저트를 내는 작은 찻집. 꿈은 하늘 영토로 이사 가는 것.',law:'검은 달에 통행세 납부'},
sevenday:{e:'SEVEN DAYS',t:'silver',reg:'크라테르 설원',p:'매주 일요일 발할라에 결투를 거는 광부 길드. 1년째 한 번도 이기지 못했다. 52전 52패.',law:'목표: 1주일 채굴권'},
shade:{e:'SHADE',t:'silver',reg:'레드샌드 협곡 (무허가)',p:'승인가를 깨고 가난한 유저에게 싼 포션을 흘리는 밀거래 길드. 사막 유저들에겐 의적이다.',law:'마이다스 현상금 목록 상위'},
brand:{e:'BRANDED',t:'bronze',reg:'아우렐리아 녹투아 지하',p:'붉은 낙인을 받은 자들의 은신처. 퀘스트를 받을 수 없는 사람들의 마지막 집.',law:'"누군가를 위해" 낙인을 받은 사람만 거둔다'},
};
const TIER={plat:'플래티넘',gold:'골드',silver:'실버',bronze:'브론즈'};
function gcard(id){const g=GUILD[id],gg=GN[id],n=C.filter(c=>c.g===id).length;
 return `<article class="panel gc" tabindex="0" role="button" data-g="${id}" aria-label="${esc(gg.name)} 인물 보기"><img src="${emb(gg.em)}" alt="" loading="lazy" decoding="async"><div><h4>${esc(gg.name)}</h4><span class="eng">${g.e}</span><div class="meta"><span class="t-${g.t}">${TIER[g.t]}</span><span>${esc(g.reg)}</span><span>수록 인물 ${n}명</span></div><p>${esc(g.p)}</p><div class="law">${esc(g.law)}</div><div class="go">소속 인물 보기 →</div></div></article>`}
$('#gPlat').innerHTML=['olympus','valhalla','blackmoon','midas','leviathan','babel'].map(gcard).join('');
$('#gMid').innerHTML=['clocktower','lighthouse','cloudcafe','sevenday','shade','brand'].map(gcard).join('');
$$('.gc').forEach(el=>{const go=()=>{setFilter('player',el.dataset.g);$('#people').scrollIntoView()};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});

/* ── 인물 도감 ── */
const CATS=[['all','전체'],['player','솜니움 (플레이어)'],['elys','엘리시안 (7국)'],['abyss','나락'],['real','네오 서울']];
const SUB={player:['olympus','valhalla','blackmoon','midas','leviathan','babel','clocktower','lighthouse','cloudcafe','sevenday','shade','brand','unaffiliated'],elys:['solarium','marcatus','valor','arcanum','silvanus','sanctus','noctua'],abyss:['abyss','retainers'],real:['reality']};
const inCat=(c,k)=>k==='all'?c.c!=='hidden':(k==='player'?['plat','mid','solo'].includes(c.c):c.c===k);
let st={cat:'all',sub:null,q:'',more:false},list=[];
$('#cats').innerHTML=CATS.map(([k,l])=>`<button type="button" data-c="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
function renderSubs(){const s=SUB[st.cat];$('#subs').innerHTML=s?[`<button type="button" data-s="" aria-pressed="${!st.sub}">전체</button>`,...s.map(id=>`<button type="button" data-s="${id}" aria-pressed="${st.sub===id}">${esc(GN[id].name)}</button>`)].join(''):'';
 $$('#subs button').forEach(b=>b.addEventListener('click',()=>{st.sub=b.dataset.s||null;renderSubs();renderCards()}))}
function setFilter(cat,sub){st.cat=cat;st.sub=sub||null;st.more=false;$$('#cats button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat));renderSubs();renderCards()}
window.__setFilter=setFilter;
$$('#cats button').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.c,null)));
$('#q').addEventListener('input',e=>{st.q=e.target.value.trim();renderCards()});
function renderCards(){const q=st.q.toLowerCase();
 list=C.filter(c=>inCat(c,st.cat)&&(!st.sub||c.g===st.sub)&&(!q||(c.n+c.b+c.r+GN[c.g].name).toLowerCase().includes(q)));
 $('#count').textContent=`${list.length}명`;
 const cut=(!st.more&&!q&&!st.sub&&list.length>28)?28:list.length;
 $('#cards').innerHTML=list.length?list.slice(0,cut).map((c,i)=>`<button class="card" type="button" data-i="${i}"><span class="ph"><img loading="lazy" src="${head(c.id)}" alt="" decoding="async">${c.em?`<img class="em" src="${emb(c.em)}" alt="" loading="lazy" decoding="async">`:''}${c.rk?`<span class="rk">#${c.rk}</span>`:''}${c.fl?`<span class="rk" style="color:#ff8ea2;border-color:rgba(255,77,109,.5)">${c.fl}층</span>`:''}</span><span class="tx"><span class="nm">${esc(c.n)}</span><span class="bh">${c.b?'「'+esc(c.b)+'」':''}</span><span class="rl">${esc(GN[c.g].name)} · ${esc(c.r)}</span></span></button>`).join('')+(cut<list.length?`<button class="more" type="button" id="more">${list.length}명 모두 보기</button>`:''):'<p class="empty">찾는 인물이 없습니다. 검색어를 바꾸거나 분류를 전체로 돌려 보세요.</p>';
 const mb=$('#more');if(mb)mb.addEventListener('click',()=>{st.more=true;renderCards()});
 $$('#cards .card').forEach(b=>b.addEventListener('click',()=>openM(list,+b.dataset.i)))}
setFilter('all');

/* 모달 · 인물 상세 파일 */
const byName=Object.fromEntries(C.map(c=>[c.n,c]));
// 본문에서 쓰는 전체 이름·별칭도 같은 인물로 연결한다.
const NAME_ALIASES={'메이블 헤이즈':'c123','바솔로뮤 브루어':'c125','바트':'c125'};
Object.entries(NAME_ALIASES).forEach(([name,id])=>{if(byId[id])byName[name]=byId[id]});
const HSEC={};
const PJ=s=>{const k='RELICTA',b=atob(s||''),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i)^k.charCodeAt(i%k.length);return JSON.parse(new TextDecoder('utf-8').decode(u))};
let SECR=null;
const secOf=id=>{if(SECR===null&&window.RELICTA_SECRETS){try{const records=PJ(window.RELICTA_SECRETS);if(records&&typeof records==='object'&&!Array.isArray(records))SECR=records}catch(e){}}return (SECR&&SECR[id])||HSEC[id]||[]};
const PROFS=()=>(typeof PROF==='object'&&PROF)||{};
const PART={'가':'이','를':'을','는':'은','와':'과','와의':'과의','와는':'과는','로':'으로'};
const rich=t=>esc(t)
 .replace(/\{\{user\}\}(와의|와는|가|를|는|와|로)?/g,(m,p)=>`<em class="you">당신</em>${p?PART[p]:''}`)
 .replace(/⟦([^⟧]+)⟧/g,(m,n)=>{const c=byName[n];return c?`<button type="button" class="lk" data-go="${c.id}">${n}</button>`:`<span class="nm">${n}</span>`});
const items=t=>{let a=t.split(' · ');if(/[①②③④⑤]/.test(t))a=a.flatMap(s=>s.split(/\s(?=[②③④⑤])/));return a.map(s=>s.trim()).filter(Boolean)};
const LBL=/^([^"「(:：⟦\[]{1,18}):\s(.+)$/;
const li=s=>{const m=s.match(LBL);return m?`<li><b>${rich(m[1])}</b>${rich(m[2])}</li>`:`<li>${rich(s)}</li>`};
function body(t,tag){const it=items(t);let pre='';
 if(tag&&/^"/.test(it[0]))pre=`<p class="tagline">${rich(it.shift())}</p>`;
 if(!it.length)return pre;
 if(it.length===1&&!LBL.test(it[0]))return pre+`<p>${rich(it[0])}</p>`;
 return pre+`<ul class="fl">${it.map(li).join('')}</ul>`}
function mood(t){const it=items(t);const f=it.shift();let h='';
 if(f&&f.includes(' ↔ ')){const [a,b]=f.split(' ↔ ');
  h=`<div class="gap"><div><small>첫 만남</small>${rich(a.replace(/^첫 만남(엔|은|에는)?\s*/,''))}</div><i aria-hidden="true">↔</i><div><small>가까이 가면</small>${rich(b.replace(/^가까이 가면\s*/,''))}</div></div>`}
 else if(f)it.unshift(f);
 return h+(it.length?`<ul class="fl">${it.map(li).join('')}</ul>`:'')}
function rels(t){const it=items(t),rest=[];let net='';
 it.forEach(s=>/^관계망:/.test(s)?net=s.replace(/^관계망:\s*/,''):rest.push(s));
 let h=rest.length?`<ul class="fl">${rest.map(li).join('')}</ul>`:'';
 if(net){const parts=[];const pre=net.split('⟦')[0].replace(/[,\s]+$/,'').trim();
  if(pre)pre.split(/,\s*/).forEach(x=>{const n=Object.keys(byName).filter(k=>x.startsWith(k)).sort((a,b)=>b.length-a.length)[0];{let d=x.slice(n?n.length:0).trim();if(n&&d.startsWith('(')){const j=d.indexOf(')');d=j>0?d.slice(1,j)+d.slice(j+1):d.slice(1)}parts.push(n?[n,d.replace(/^[.\s]+/,'')]:[null,x])}});
  const re=/⟦([^⟧]+)⟧\s*([^⟦]*?)(?=\s*,?\s*⟦|$)/g;let m;
  while((m=re.exec(net)))parts.push([m[1],m[2].replace(/[,\s]+$/,'')]);
  h+=`<div class="rels">${parts.map(([n,d])=>{const c=n&&byName[n];
   if(c)return `<button type="button" class="rel" data-go="${c.id}"><img src="${head(c.id)}" alt="" loading="lazy" decoding="async"><span><b>${esc(n)}</b>${rich(d)}</span></button>`;
   return `<div class="rel nolink"><span class="ph" aria-hidden="true">✦</span><span>${n?`<b>${esc(n)}</b>`:''}${rich(d)}</span></div>`}).join('')}</div>`}
 return h}
const lines=t=>`<ul class="lines">${t.split('\n').filter(Boolean).map(s=>{const m=s.match(/^\(([^)]*)\)\s*(.*)$/);return m?`<li><i>${rich(m[1])}</i>${rich(m[2])}</li>`:`<li>${rich(s)}</li>`}).join('')}</ul>`;
const VAULT=[['생전','생전의 영웅','ORIGIN'],['생전의 정체','생전의 정체','ORIGIN'],['배경','숨은 이력','HISTORY'],['관계','숨은 관계','RELATIONS'],['심층 코어','심층 코어','CORE'],['그림자','그림자','SHADOW'],['쥔 단서','쥔 단서','CLUE'],['미덕 회복','미덕 회복','VIRTUE'],['권속 연동','권속 연동','BOND'],['공략 열쇠','공략 열쇠','KEY'],['서사 떡밥','서사 떡밥','FORESHADOW']];
const LOCK='<svg class="lki" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7.5" rx="1.6"/><path class="sh" d="M5 7V5a3 3 0 0 1 6 0v2" fill="none"/></svg>';
function specHTML(c){const P=PROFS()[c.id]||[];
 const b=(P.find(x=>x[0]==='기본')||(c.g==='retainers'&&P.find(x=>x[0]==='생전'))||[])[1];if(!b)return '';
 return items(b).filter(s=>!/^별호/.test(s)&&s!==c.n).map(s=>{const m=s.match(/^(실명|이름|외견|표면|진실)[:\s]\s*(.+)$/);
  return m?`<li><small>${m[1]}</small>${rich(m[2])}</li>`:`<li>${rich(s)}</li>`}).join('')}
function profHTML(c){const P=PROFS()[c.id];const toc=[];let out='';
 if(P){const m={};P.forEach(([l,t])=>{(m[l]=m[l]||[]).push(t)});const g=l=>(m[l]||[])[0];
  const sec=(key,title,en,inner,cls='')=>{out+=`<section class="ps ${cls}" id="ps-${key}"><h4>${title}<small>${en}</small></h4>${inner}</section>`;toc.push([key,title])};
  let look=g('외형'),rlook=null;if(look&&look.includes(' · 현실 외모: '))[look,rlook]=look.split(' · 현실 외모: ');
  if(g('게임')||g('현실 정체')){
   const on=g('게임')?`<section class="ps on"><h4>게임 속<small>ONLINE</small></h4>${body(g('게임'))}</section>`:'';
   const off=g('현실 정체')?`<section class="ps off"><h4>현실<small>OFFLINE</small></h4>${isPlayer(c)?`<button type="button" class="rview" data-form="1"><img src="${head(c.id+'r')}" alt="" loading="lazy" decoding="async"><span>현실 모습 보기</span></button>`:''}${body(g('현실 정체')+(rlook?' · 현실 외모: '+rlook:''))}</section>`:'';
   out+=`<div class="duo" id="ps-duo">${on}${off}</div>`;toc.push(['duo','게임 · 현실'])}
  [['능력','능력','ABILITY'],['권능','권능','AUTHORITY'],['권능 / 힘','권능','AUTHORITY'],['힘','힘','POWER'],['현실에서의 힘','현실에서의 힘','POWER']].forEach(([l,t,e])=>{if(g(l))sec('pw',t,e,body(g(l)),c.c==='real'?'off':'')});
  ['솜니움을 보는 눈','렐릭타를 보는 눈','이야기를 보는 눈'].forEach(l=>{if(g(l))sec('gz',l,'GAZE',body(g(l)))});
  if(look)sec('lk','외형','APPEARANCE',body(look,true));
  if(g('분위기'))sec('md','분위기','FIRST · CLOSER',mood(g('분위기')));
  if(g('텍스처'))sec('vc','말투와 버릇','VOICE',body(g('텍스처')));
  if(g('배경'))sec('hs','배경','HISTORY',body(g('배경')));
  if(g('로맨스 성향'))sec('rm','로맨스','ROMANCE',body(g('로맨스 성향')));
  if(g('관계'))sec('rl','관계','RELATIONS',rels(g('관계')));
  if(g('등장 조건'))sec('cd','등장 조건','CONDITION',body(g('등장 조건')));
  if(g('로그아웃 뒤'))sec('lo','로그아웃 뒤','AFTER LOGOUT',body(g('로그아웃 뒤')));
  if(g('샘플 대사'))sec('ln','대사','LINES',lines(g('샘플 대사')));
 }
 const nh=naiHTML(c);if(nh){out+=nh;toc.push(['nai','NAI 태그'])}
 const vault=vaultHTML(c);if(vault){out+=vault;toc.push(['vt','봉인 기록'])}
 return {out,toc}}
function vaultHTML(c){const S=secOf(c.id);
 if(!S.length){if(SECR!==null||HSEC[c.id])return '';
  return `<section class="vault" id="ps-vt" aria-busy="true"><header><div><span class="eyebrow">Classified</span><h4>봉인 기록</h4></div></header><div class="sxb"><p class="vault-status" role="status">봉인 기록을 불러오는 중…</p><button type="button" class="cp secrets-retry" hidden>다시 불러오기</button></div></section>`}
 const sm={};S.forEach(([l,t])=>{sm[l]=t});
 const rows=VAULT.filter(([l])=>sm[l]).map(([l,t,e])=>`<details class="sx"><summary>${LOCK}<span class="t">${t}</span><span class="k">${e}</span><span class="op"></span></summary><div class="sxb">${l==='관계'?rels(sm[l]):body(sm[l])}</div></details>`).join('');
 return `<section class="vault" id="ps-vt"><header><div><span class="eyebrow">Classified</span><h4>봉인 기록</h4><p>이 인물의 숨은 동기와 반전이 들어 있습니다. 직접 열어 보세요.</p></div><button type="button" class="sxall">모두 열기</button></header>${rows}</section>`}
function loadProfileSecrets(c,token){if(SECR!==null||HSEC[c.id])return;
 const vault=$('#ps-vt');if(!vault)return;
 vault.setAttribute('aria-busy','true');vault.querySelector('.vault-status').textContent='봉인 기록을 불러오는 중…';vault.querySelector('.secrets-retry').hidden=true;
 ensureSealed().then(()=>{if(token!==profileLoadToken||!$('#modal').classList.contains('open')||ml[mi].id!==c.id)return;
  const current=$('#ps-vt');if(!current)return;const refocus=current.contains(document.activeElement);current.outerHTML=vaultHTML(c);
  if(refocus)$('#ps-vt summary')?.focus()
 }).catch(()=>{if(token!==profileLoadToken||!$('#modal').classList.contains('open')||ml[mi].id!==c.id)return;
  const current=$('#ps-vt');if(!current)return;current.setAttribute('aria-busy','false');current.querySelector('.vault-status').textContent='봉인 기록을 불러오지 못했습니다. 연결을 확인하고 다시 시도해주세요.';current.querySelector('.secrets-retry').hidden=false})}

const NAIX=()=>(typeof NAI==='object'&&NAI)||{tags:{}};
function naiHTML(c){const N=NAIX(),T=N.tags[c.id];if(!T)return '';
 const tabs=T.length>1?`<div class="ntabs" role="tablist">${T.map(([l],i)=>`<button type="button" role="tab" data-l="${l}" aria-selected="${i===0}">${l}</button>`).join('')}</div>`:'';
 const row=(b,s,t)=>`<div class="pr"><div class="pl"><b>${b}</b>${s?`<small>${s}</small>`:''}</div><pre>${esc(t)}</pre><button type="button" class="cp">복사</button></div>`;
 const panes=T.map(([l,t],i)=>`<div class="npane" role="tabpanel"${i?' hidden':''}>${row('캐릭터 태그','',t)}</div>`).join('');
 return `<section class="ps nai" id="ps-nai"><h4>NAI 태그<small>PROMPT</small></h4><p class="nnote">NovelAI 이미지 생성용 캐릭터 태그예요.</p>${tabs}${panes}</section>`}
function naiTab(i){const t=$$('#mProf .nai [role=tab]'),p=$$('#mProf .nai .npane');t.forEach((x,j)=>x.setAttribute('aria-selected',j===i));p.forEach((x,j)=>x.hidden=j!==i)}
function copyText(btn){const pre=btn.parentElement.querySelector('pre'),txt=pre.textContent;
 const ok=()=>{btn.textContent='복사됨';btn.classList.add('done');setTimeout(()=>{btn.textContent='복사';btn.classList.remove('done')},1400)};
 const fb=()=>{const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='선택됨'};
 try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}}
let ml=[],mi=0,lastFocus=null,hist=[],profileLoadToken=0;
function openM(arr,i){ml=arr;mi=i;hist=[];lastFocus=document.activeElement;fillM();$('#modal').classList.add('open');document.body.classList.add('modal-active');document.dispatchEvent(new Event('relicta:modal'));$('#mClose').focus()}
const isPlayer=c=>['plat','mid','solo'].includes(c.c);
function imgForms(c){if(isPlayer(c))return [[c.id,'게임 속'],[c.id+'r','현실']];
 if(c.alt)return c.n==='에테르딘'?[[c.id,'인간의 모습'],[c.alt,'신의 형상']]:[[c.id,'현실'],[c.alt,'아바타']];return [[c.id,'']]}
let curForm=0;
function fillImg(k){const c=ml[mi],F=imgForms(c);curForm=k=Math.min(k||0,F.length-1);const [id,lab]=F[k];
 $('#mImg').src=full(id);$('#mImg').alt=`${c.n} 전신 일러스트${lab?' ('+lab+')':''}`;
 $('#mAlt').innerHTML=F.length>1?F.map(([,l],i)=>`<button type="button" aria-pressed="${i===k}" data-a="${i}">${l}</button>`).join(''):'';
 $$('#mAlt button').forEach(b=>b.addEventListener('click',()=>fillImg(+b.dataset.a)));
 $('#mCap').textContent=`CHARACTER FILE · No.${c.id.replace(/\D/g,'')}${lab?' · '+lab:''}`;
 const t=$$('#mProf .nai [role=tab]');const j=t.findIndex(x=>x.dataset.l===lab);if(j>=0)naiTab(j)}
function fillM(){const c=ml[mi],g=GN[c.g];
 $('#mFac').innerHTML=`${g.em?`<img src="${emb(g.em)}" alt="" loading="lazy" decoding="async">`:''}<span>${esc(g.name)}</span>`;
 $('#mName').textContent=c.n;$('#mBh').textContent=c.b?`「${c.b}」`:'';$('#mRl').textContent=c.r;
 const sp=specHTML(c);$('#mSpec').innerHTML=sp;$('#mSpec').hidden=!sp;
 const s=[];if(c.lv)s.push(['레벨',`Lv.${c.lv}`]);if(c.rk)s.push(['종합 랭킹',`${c.rk}위`]);else if(c.lv)s.push(['종합 랭킹','집계 외']);if(c.fl)s.push(['나락',`${c.fl}층`]);
 $('#mStats').innerHTML=s.map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('');$('#mStats').hidden=!s.length;
 $('#mQ').style.display=c.q?'':'none';$('#mQ').textContent=c.q;
 const {out,toc}=profHTML(c);
 $('#mTx').style.display=c.t&&!out?'':'none';$('#mTx').textContent=c.t;
 $('#mProf').innerHTML=out;
 $('#mToc').innerHTML=toc.map(([k,t])=>`<button type="button" data-k="${k}"${k==='vt'?' class="lock"':''}>${t}</button>`).join('');$('#mToc').hidden=!toc.length;
 const bk=hist.length?hist[hist.length-1]:null;$('#mBack').hidden=!bk;if(bk)$('#mBack').textContent=`← ${bk[0][bk[1]].n}에게 돌아가기`;
 $('#mPrev').disabled=ml.length<2;$('#mNext').disabled=ml.length<2;
 fillImg(0);$('#mInfo').scrollTop=0;$('.mbox').scrollTop=0;loadProfileSecrets(c,++profileLoadToken)}
function go(id){const c=byId[id];if(!c||c===ml[mi])return;hist.push([ml,mi]);ml=C.filter(x=>x.g===c.g);mi=ml.indexOf(c);if(mi<0){ml=[c];mi=0}fillM()}
$('#mBack').addEventListener('click',()=>{const h=hist.pop();if(h){[ml,mi]=h;fillM()}});
$('#mProf').addEventListener('click',e=>{if(e.target.closest('.secrets-retry')){loadProfileSecrets(ml[mi],++profileLoadToken);return}const b=e.target.closest('[data-go]');if(b){go(b.dataset.go);return}
 const cp=e.target.closest('.cp');if(cp){copyText(cp);return}
 const tb=e.target.closest('.nai [role=tab]');if(tb){naiTab($$('#mProf .nai [role=tab]').indexOf(tb));return}
 const rv=e.target.closest('.rview');if(rv){fillImg(+rv.dataset.form);if(innerWidth<=760)$('.mbox').scrollTo({top:0,behavior:'smooth'});return}
 if(e.target.closest('.sxall')){const all=$$('#mProf .sx');const open=all.some(d=>!d.open);all.forEach(d=>d.open=open);e.target.closest('.sxall').textContent=open?'모두 닫기':'모두 열기'}});
$('#mToc').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const el=$('#ps-'+b.dataset.k);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});
function closeM(){profileLoadToken++;$('#modal').classList.remove('open');document.body.classList.remove('modal-active');document.dispatchEvent(new Event('relicta:modal'));hist=[];lastFocus&&lastFocus.focus()}
$('#mClose').addEventListener('click',closeM);
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeM()});
$('#mPrev').addEventListener('click',()=>{mi=(mi-1+ml.length)%ml.length;hist=[];fillM()});
$('#mNext').addEventListener('click',()=>{mi=(mi+1)%ml.length;hist=[];fillM()});
addEventListener('keydown',e=>{if(!$('#modal').classList.contains('open'))return;if(e.key==='Escape')closeM();if(e.target.closest&&e.target.closest('summary'))return;if(e.key==='ArrowLeft')$('#mPrev').click();if(e.key==='ArrowRight')$('#mNext').click()});

/* ── 랭킹 ── */
const ranked=C.filter(c=>c.rk).sort((a,b)=>a.rk-b.rk).slice(0,20);
const gemSvg=col=>`<svg class="gem" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1 L17 8 L10 19 L3 8 Z" fill="${col}"/><path d="M10 1 L13 8 L10 19 L7 8 Z" fill="#fff" opacity=".35"/></svg>`;
$('#podium').innerHTML=ranked.slice(0,3).map((c,i)=>`<article class="panel podium p${i+1}" tabindex="0" role="button" data-id="${c.id}"><span class="n">${['I','II','III'][i]}</span><img src="${head(c.id)}" alt="" loading="lazy" decoding="async"><div><span>${i+1}위 · ${esc(GN[c.g].name)}</span><b>${esc(c.n)}</b><span style="color:var(--gold)">「${esc(c.b)}」 · Lv.${c.lv}</span></div></article>`).join('');
$('#rbody').innerHTML=ranked.slice(3).map(c=>`<tr data-id="${c.id}" tabindex="0"><td>${c.rk<=10?gemSvg('#cdbcff'):''} ${c.rk}</td><td><span class="who"><img src="${head(c.id)}" alt="" loading="lazy" decoding="async">${esc(c.n)}</span></td><td>${esc(c.b)}</td><td>${esc(GN[c.g].name)}</td><td>Lv.${c.lv}</td></tr>`).join('');
$$('#podium [data-id],#rbody [data-id]').forEach(el=>{const go=()=>openM(ranked,ranked.findIndex(c=>c.id===el.dataset.id));el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'){go()}})});

/* ── 나락 ── */
const FL=[
['오만','거꾸로 매달린 황금성','뒤틀린 중력 탓에 방심하면 "위로" 추락한다. 대공과 눈이 마주치면 즉사한다.','황금 가고일, 거꾸로 선 근위대'],
['탐욕','저주받은 보석 광맥','현금화할 수 있는 최상급 보석이 깔렸다. 보석을 인벤토리에 넣으면 초마다 HP가 깎인다.','보석 미믹, 금화 골렘'],
['분노','피가 끓는 칼데라','입장하는 즉시 강제 PvP. 파티원끼리도 서로를 공격할 수 있다.','피의 망령 검투사'],
['나태','소리를 삼키는 잿빛 사막','머물수록 이동과 시전 속도가 최대 99%까지 느려진다. 소리를 내면 공자가 깬다.','재의 모래벌레, 잠꼬대 그림자'],
['질투','깨진 거울의 수정 미궁','거울에 비친 모습이 도플갱어가 되어 기어 나온다.','도플갱어, 거울 파편 정령'],
['폭식','부해의 위장','장기 속 같은 유기질 지형. 위산 웅덩이가 장비 내구도를 깎는다.','위산 슬라임, 식탐 인형'],
['탐닉','깨어나지 않는 정원','빛나는 기이한 식물로 가득한 최하층. 포자가 행복한 환각을 일으켜 현실의 기억을 흐린다.','꿈을 먹는 몽마 무리, 발광 포자 식물'],
];
const lords=C.filter(c=>c.g==='abyss').sort((a,b)=>a.fl-b.fl), rets=C.filter(c=>c.g==='retainers').sort((a,b)=>a.fl-b.fl);
const abyssList=[...lords];
$('#floors').innerHTML=FL.map((f,i)=>{const L=lords[i],T=rets[i];return `<article class="floor" tabindex="0" role="button" data-i="${i}" aria-label="${i+1}층 ${esc(L.n)} 자세히"><div class="b">B${i+1}<small>${f[0]}</small></div><img class="lord" src="${head(L.id)}" alt="" loading="lazy" decoding="async"><div><h4>${esc(L.n)}</h4><div class="dom">${esc(f[1])}</div><p>${esc(f[2])}</p><div class="mob">출현: ${esc(f[3])}</div></div><div class="ret" data-r="${T.id}"><img src="${head(T.id)}" alt="" loading="lazy" decoding="async"><span><b>${esc(T.n)}</b>${esc(T.r.replace(/^\d층 /,''))}</span></div></article>`}).join('');
$$('.floor').forEach(el=>{const go=e=>{const r=e.target.closest('.ret');if(r){openM(rets,rets.findIndex(c=>c.id===r.dataset.r))}else openM(lords,+el.dataset.i)};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter')openM(lords,+el.dataset.i)})});

/* ── v1.3.0: 좁은 화면 메뉴 (펼침 목록) ── */
(()=>{const g=$('.gnb'),b=$('.gnb .menu-btn'),nav=$('#gnav');if(!g||!b||!nav)return;const lbl=b.querySelector('.lbl');
 const set=o=>{g.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?'메뉴 닫기':'메뉴 열기');if(lbl)lbl.textContent=o?'닫기':'메뉴'};set(false);
 b.addEventListener('click',e=>{e.stopPropagation();set(!g.classList.contains('open'))});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
 document.addEventListener('click',e=>{if(g.classList.contains('open')&&!g.contains(e.target))set(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&g.classList.contains('open')){set(false);b.focus()}});
 const wide=matchMedia('(min-width:761px)');const onWide=e=>{if(e.matches)set(false)};wide.addEventListener?wide.addEventListener('change',onWide):wide.addListener(onWide)})();

/* ── v1.3.0: 배포 버튼 (주소가 비어 있으면 숨김) ── */
(()=>{$$('[data-dl]').forEach(a=>{const h=(a.getAttribute('href')||'').trim();if(!h||h==='#'){a.hidden=true;return}a.target='_blank';a.rel='noopener'});
 const ext=$('[data-dl="ext"]'),code=$('[data-ext-url]');if(ext&&!ext.hidden&&code){code.textContent=ext.href;code.closest('.dv-ext-url').hidden=false}
 const dl=$('.dv-dl');if(dl&&!$$('.dv-dl [data-dl]').some(a=>!a.hidden))dl.hidden=true})();

/* ── v1.3.0: PV 전환 (3주년 PV · 퍼스트 티저) ── */
(()=>{const v=$('.pv video'),tabs=$$('.pv-tabs button'),cap=$('#pvCap');if(!v||!tabs.length)return;
 tabs.forEach(b=>b.addEventListener('click',()=>{if(b.getAttribute('aria-selected')==='true')return;
  tabs.forEach(x=>x.setAttribute('aria-selected',String(x===b)));v.pause();const teaser=b.dataset.loop==='1';
  v.src=b.dataset.src;v.poster=b.dataset.poster;v.loop=teaser;v.muted=teaser;v.preload='none';v.load();if(cap)cap.textContent=b.dataset.cap}))})();

/* ── GNB 현재 위치 ── */
const secs=$$('main section[id]');const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){$$('#gnav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>io.observe(s));

/* ── 봉인 문서 ── */
let sealedRequest=null;
function ensureSealed(){if(SECR!==null&&window.RELICTA_SEALED)return Promise.resolve();if(sealedRequest)return sealedRequest;
 sealedRequest=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='assets/js/sealed.js?v=1.2.1';script.async=true;
  script.onload=()=>{try{if(!window.RELICTA_SEALED||!window.RELICTA_SECRETS)throw new Error('Missing records');
   const records=PJ(window.RELICTA_SECRETS);if(!records||typeof records!=='object'||Array.isArray(records))throw new Error('Invalid records');SECR=records;resolve()
  }catch(error){script.remove();reject(error)}};
  script.onerror=()=>{script.remove();reject(new Error('Document unavailable'))};document.head.append(script)
 }).catch(error=>{sealedRequest=null;throw error});return sealedRequest}

let HID=[];
function loadSealed(){if(HID.length)return;const s=PJ(window.RELICTA_SEALED);
 s.chars.forEach(c=>{if(!byId[c.id]){C.push(c);byId[c.id]=c;byName[c.n]=c}});
 const P=PROFS();Object.entries(s.prof||{}).forEach(([id,o])=>{P[id]=o.p;HSEC[id]=o.s});Object.assign(NAIX().tags,s.nai||{});
 HID=s.hid;HID.forEach(h=>{const c=byId[h.id];c.t=h.p;c.r=h.sf});
 $('#secret').innerHTML=s.html;watchEffects($('#secret'))}
function fillHidden(){$('#hidden').innerHTML=HID.map((h,i)=>{const c=byId[h.id];return `<article class="hc" tabindex="0" role="button" data-i="${i}"><img src="${head(c.id)}" alt="" loading="lazy" decoding="async"><div><b>${esc(c.n)}</b><div class="sf">${esc(h.sf)}</div><p>${esc(h.p)}</p></div></article>`}).join('');
 const hl=HID.map(h=>byId[h.id]);$$('.hc').forEach(el=>{el.addEventListener('click',()=>openM(hl,+el.dataset.i));el.addEventListener('keydown',e=>{if(e.key==='Enter')openM(hl,+el.dataset.i)})})}
function unseal(){loadSealed();$('#seal').classList.add('open');fillHidden();try{sessionStorage.setItem('relicta-unsealed','1')}catch(e){}}
$('#unseal').addEventListener('click',()=>{$('#dlg').classList.add('open');$('#dlgYes').focus()});
let sealAttempt=0;
$('#dlgNo').addEventListener('click',()=>{sealAttempt++;$('#dlg').classList.remove('open');$('#unseal').focus()});
$('#dlgYes').addEventListener('click',async()=>{const attempt=++sealAttempt,btn=$('#dlgYes'),status=$('#sealStatus');btn.disabled=true;btn.textContent='불러오는 중…';status.hidden=true;
 try{await ensureSealed();if(attempt!==sealAttempt)return;unseal();$('#dlg').classList.remove('open');$('#secret').scrollIntoView()}
 catch(e){if(attempt===sealAttempt){status.hidden=false;status.textContent='문서를 불러오지 못했습니다. 연결을 확인하고 다시 시도해주세요.'}}
 finally{btn.disabled=false;btn.textContent='열람하기'}});
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#dlg').classList.contains('open'))$('#dlgNo').click()});
try{if(sessionStorage.getItem('relicta-unsealed'))ensureSealed().then(unseal).catch(()=>{})}catch(e){}
})();
