/* 📚 Learn: how to read Spanish (once) and tonight's grammar, as short cards and games, before the speaking.
   Loaded after the main script, so it uses its helpers ($, el, button, speak, note, syllables, stressIndex, nightSel, who).
   Lesson data: READING (do once) and GRAMMAR[night]. Sofía adds a GRAMMAR entry for every new night she writes.
   Question types: pick (choose an answer), read (choose how a word sounds), listen (hear it, pick what she said),
   stress (tap the loud syllable), order (tap the words into the right order). */

const READING = [
 {id:"R1", title:"The 5 vowels", cards:[
  {h:"Five vowels, five sounds, always", p:"Spanish vowels never change their sound, whatever word they're in. Learn these five and you can read almost anything.", ex:[{es:"casa",en:"a = ah · KAH-sah"},{es:"mesa",en:"e = eh · MEH-sah"},{es:"sí",en:"i = ee · SEE"},{es:"todo",en:"o = oh · TOH-doh"},{es:"uno",en:"u = oo · OO-noh"}]},
  {h:"Every letter is said", p:"No silent e at the end like in English. Noche is NOH-cheh, two syllables.", ex:[{es:"noche",en:"NOH-cheh"},{es:"tarde",en:"TAR-deh"}]},
  {h:"Keep them short", p:"Don't slide the vowel. “No” is a clean noh, not “no-oo”.", ex:[{es:"no",en:"noh"},{es:"bueno",en:"BWEH-noh"}]}],
  quiz:[
  {t:"read", w:"mesa", opts:["MEH-sah","MEE-sah","MAY-zuh"], a:"MEH-sah", why:"e always says eh."},
  {t:"read", w:"noche", opts:["NOH-cheh","NOTCH","NOH-chee"], a:"NOH-cheh", why:"The final e is said: eh."},
  {t:"read", w:"uno", opts:["OO-noh","YOU-noh","UN-oh"], a:"OO-noh", why:"u always says oo."},
  {t:"listen", say:"piso", opts:["piso","peso","paso"], a:"piso", why:"i = ee: PEE-soh."},
  {t:"listen", say:"mesa", opts:["masa","mesa","misa"], a:"mesa", why:"e = eh: MEH-sah."},
  {t:"read", w:"sí", opts:["SEE","SIGH","SAY"], a:"SEE", why:"i = ee."},
  {t:"listen", say:"todo", opts:["toda","todo","tudo"], a:"todo", why:"o = oh at the end: TOH-doh."}]},
 {id:"R2", title:"Letters that sound different", cards:[
  {h:"h is silent", p:"Always. Hola is OH-lah, hotel is oh-TEL.", ex:[{es:"hola",en:"OH-lah"},{es:"hotel",en:"oh-TEL"}]},
  {h:"j, and g before e or i: a breathy h", p:"Like a soft h from the back of your throat.", ex:[{es:"jugo",en:"HOO-goh"},{es:"gente",en:"HEN-teh"}]},
  {h:"ll and y: like the y in “yes”", p:"In Mexico both sound the same.", ex:[{es:"me llamo",en:"meh YAH-moh"},{es:"playa",en:"PLAH-yah"}]},
  {h:"ñ = ny, like canyon", p:"", ex:[{es:"baño",en:"BAH-nyoh"},{es:"mañana",en:"mah-NYAH-nah"}]},
  {h:"qu = k (the u is silent)", p:"", ex:[{es:"queso",en:"KEH-soh"},{es:"¿qué?",en:"KEH"}]},
  {h:"c before e or i, and z: a plain s", p:"In Mexico there's no lisp. That's a Spain thing.", ex:[{es:"cinco",en:"SEEN-koh"},{es:"diez",en:"dee-EHS"}]},
  {h:"v sounds like a soft b", p:"", ex:[{es:"vamos",en:"BAH-mohs"}]},
  {h:"r is one quick tap, rr is rolled", p:"Pero (but) has a tap, like the tt in “butter”. Perro (dog) is rolled.", ex:[{es:"pero",en:"PEH-roh (tap)"},{es:"perro",en:"PEH-rrroh (roll)"}]}],
  quiz:[
  {t:"read", w:"hotel", opts:["oh-TEL","HOH-tel","hoh-TEL"], a:"oh-TEL", why:"The h is silent."},
  {t:"read", w:"gente", opts:["HEN-teh","JEN-tee","GEN-teh"], a:"HEN-teh", why:"g before e is a breathy h."},
  {t:"read", w:"playa", opts:["PLAH-yah","PLAY-uh","PLAH-lyah"], a:"PLAH-yah", why:"y sounds like the y in yes."},
  {t:"read", w:"mañana", opts:["mah-NYAH-nah","MAN-ah-nah","mah-NAH-nah"], a:"mah-NYAH-nah", why:"ñ = ny."},
  {t:"read", w:"queso", opts:["KEH-soh","KWEH-soh","KAY-zoh"], a:"KEH-soh", why:"qu = k, the u is silent."},
  {t:"read", w:"diez", opts:["dee-EHS","dee-ETH","DEEZ"], a:"dee-EHS", why:"z is a plain s in Mexico."},
  {t:"listen", say:"perro", opts:["pero","perro"], a:"perro", why:"Rolled rr: perro (dog). Pero (but) has one tap."},
  {t:"listen", say:"pero", opts:["pero","perro"], a:"pero", why:"One quick tap: pero (but)."}]},
 {id:"R3", title:"Which syllable is loud?", cards:[
  {h:"Rule 1: ends in a vowel, n or s", p:"Stress the second-to-last syllable.", ex:[{es:"casa",en:"CA-sa"},{es:"playa",en:"PLA-ya"},{es:"tacos",en:"TA-cos"}]},
  {h:"Rule 2: ends in any other consonant", p:"Stress the last syllable.", ex:[{es:"hotel",en:"ho-TEL"},{es:"ciudad",en:"ciu-DAD"},{es:"comer",en:"co-MER"}]},
  {h:"Rule 3: an accent mark beats both rules", p:"The syllable with the mark (á é í ó ú) is the loud one.", ex:[{es:"menú",en:"me-NÚ"},{es:"teléfono",en:"te-LÉ-fo-no"},{es:"reservación",en:"re-ser-va-CIÓN"}]}],
  quiz:[
  {t:"stress", w:"casa"},{t:"stress", w:"hotel"},{t:"stress", w:"playa"},{t:"stress", w:"menú"},
  {t:"stress", w:"teléfono"},{t:"stress", w:"ciudad"},{t:"stress", w:"desayuno"},{t:"stress", w:"reservación"}]},
 {id:"R4", title:"Accents, ¿ and ¡", cards:[
  {h:"¿ and ¡ open the sentence", p:"You know it's a question or an exclamation before you start reading, so your voice can go up at the end.", ex:[{es:"¿Dónde está?",en:"Where is it?"},{es:"¡Qué padre!",en:"How cool!"}]},
  {h:"Some accents change the meaning", p:"Same letters, different word.", ex:[{es:"sí / si",en:"yes / if"},{es:"tú / tu",en:"you / your"},{es:"él / el",en:"he / the"},{es:"está / esta",en:"is / this"}]}],
  quiz:[
  {t:"pick", q:"“Sí” (with the accent) means…", opts:["yes","if"], a:"yes"},
  {t:"pick", q:"Which one means “he”?", opts:["él","el"], a:"él", why:"el (no accent) means “the”."},
  {t:"pick", q:"In “Esta es mi esposa”, esta means…", opts:["this","is"], a:"this", why:"está (with the accent) means “is”."},
  {t:"pick", q:"Where does ¿ go?", opts:["At the start of a question","At the end","Only in long questions"], a:"At the start of a question"},
  {t:"read", w:"¿Dónde está?", opts:["DOHN-deh ehs-TAH","dohn-DAY ES-tah","DON-dee es-TAY"], a:"DOHN-deh ehs-TAH", why:"Both accents show the loud syllable."}]}
];

const GRAMMAR = {
 1:{title:"Usted or tú? Buenos or buenas?", cards:[
  {h:"Two ways to say “you”", p:"Spanish has a polite “you” (usted) for adults you don't know, staff and drivers, and a friendly one (tú) for kids and friends. In Mexico, start with usted.", ex:[{es:"¿Cómo está?",en:"How are you? (usted, polite)"},{es:"¿Cómo estás?",en:"How are you? (tú, friendly)"}]},
  {h:"The -s gives tú away", p:"Verbs for tú usually end in -s: está → estás, habla → hablas.", ex:[{es:"Bien, gracias. ¿Y usted?",en:"Good, thanks. And you? (polite)"},{es:"Bien, gracias. ¿Y tú?",en:"Good, thanks. And you? (friendly)"}]},
  {h:"Buenos días, buenas tardes", p:"Every word is masculine or feminine. Día is masculine (el día), so it's buenos días. Tarde and noche are feminine (la tarde, la noche), so it's buenas tardes and buenas noches.", ex:[{es:"Buenos días",en:"Good morning (until noon)"},{es:"Buenas tardes",en:"Good afternoon (noon until dark)"},{es:"Buenas noches",en:"Good evening / good night"}]}],
  quiz:[
  {t:"pick", q:"The hotel receptionist greets you. You ask how she is:", opts:["¿Cómo está?","¿Cómo estás?"], a:"¿Cómo está?", why:"Staff you don't know get usted."},
  {t:"pick", q:"A 10-year-old says hi to you. You ask:", opts:["¿Cómo está?","¿Cómo estás?"], a:"¿Cómo estás?", why:"Kids get tú."},
  {t:"pick", q:"Buen___ días", opts:["Buenos","Buenas"], a:"Buenos", why:"El día is masculine."},
  {t:"pick", q:"Buen___ noches", opts:["Buenos","Buenas"], a:"Buenas", why:"La noche is feminine."},
  {t:"pick", q:"It's 3 pm. You walk into a shop and say:", opts:["Buenos días","Buenas tardes","Buenas noches"], a:"Buenas tardes", why:"Noon until dark."},
  {t:"read", w:"Buenos días", opts:["BWEH-nohs DEE-ahs","boo-EE-nohs DIE-ahs","BWAY-nus DYES"], a:"BWEH-nohs DEE-ahs"},
  {t:"order", es:"Bien, gracias. ¿Y usted?", en:"Good, thanks. And you?"},
  {t:"pick", q:"“¿Y tú?” is said to…", opts:["a friend or a kid","the taxi driver","the hotel manager"], a:"a friend or a kid"}]},
 2:{title:"Soy, somos, me llamo", cards:[
  {h:"Ser: who you are and where you're from", p:"soy = I am · es = he/she is, you are (usted) · somos = we are.", ex:[{es:"Soy de Canadá",en:"I'm from Canada"},{es:"Somos de Canadá",en:"We're from Canada"},{es:"Él es mi hijo",en:"He is my son"}]},
  {h:"Me llamo = I call myself", p:"That's how Spanish says “my name is”. To ask: ¿Cómo se llama usted? (polite) or ¿Cómo te llamas? (to a kid).", ex:[{es:"Me llamo Daniel",en:"My name is Daniel"},{es:"¿Cómo se llama usted?",en:"What's your name? (polite)"}]},
  {h:"Este or esta? Él or ella?", p:"este for a man or boy, esta for a woman or girl. él = he, ella = she.", ex:[{es:"Esta es mi esposa",en:"This is my wife"},{es:"Este es mi hijo",en:"This is my son"},{es:"Ella es mi hija",en:"She is my daughter"}]}],
  quiz:[
  {t:"pick", q:"“We're from Canada.”", opts:["Soy de Canadá","Somos de Canadá","Es de Canadá"], a:"Somos de Canadá"},
  {t:"pick", q:"“I'm from Canada.”", opts:["Soy de Canadá","Somos de Canadá","Es de Canadá"], a:"Soy de Canadá"},
  {t:"pick", q:"___ es mi esposa.", opts:["Este","Esta"], a:"Esta", why:"esta for a woman."},
  {t:"pick", q:"___ es mi hijo.", opts:["Este","Esta"], a:"Este", why:"este for a man or boy."},
  {t:"pick", q:"Ask an adult you don't know their name:", opts:["¿Cómo se llama usted?","¿Cómo te llamas?"], a:"¿Cómo se llama usted?"},
  {t:"pick", q:"“Ella es mi hija” means…", opts:["She is my daughter","He is my son","This is my wife"], a:"She is my daughter"},
  {t:"read", w:"Me llamo", opts:["meh YAH-moh","mee LAM-oh","meh LAH-moh"], a:"meh YAH-moh", why:"ll sounds like y."},
  {t:"order", es:"Somos una familia de seis", en:"We're a family of six"}]},
 3:{title:"Saying no, and asking politely", cards:[
  {h:"No goes before the verb", p:"Just put no in front: entiendo (I understand) → no entiendo.", ex:[{es:"No entiendo",en:"I don't understand"},{es:"No hablo español",en:"I don't speak Spanish"}]},
  {h:"A question is just a tone", p:"Same words as a sentence, but your voice goes up at the end. Writing adds ¿ at the start.", ex:[{es:"¿Habla inglés?",en:"Do you speak English? (usted)"}]},
  {h:"Disculpe, con permiso, ¿mande?", p:"Disculpe gets someone's attention. Con permiso is for squeezing past someone. ¿Mande? is the polite Mexican “pardon?”.", ex:[{es:"Disculpe",en:"Excuse me (to get attention)"},{es:"Con permiso",en:"Excuse me (passing by)"},{es:"¿Mande?",en:"Pardon?"}]}],
  quiz:[
  {t:"pick", q:"Say “I don't understand”:", opts:["No entiendo","Entiendo no","No entender"], a:"No entiendo"},
  {t:"pick", q:"Make it negative: “Hablo español.”", opts:["No hablo español.","Hablo no español.","Hablo español no."], a:"No hablo español."},
  {t:"pick", q:"You need to squeeze past someone in a store aisle:", opts:["Con permiso","Disculpe","De nada"], a:"Con permiso"},
  {t:"pick", q:"You want the waiter's attention:", opts:["Con permiso","Disculpe","De nada"], a:"Disculpe"},
  {t:"pick", q:"You didn't catch what someone said. The polite Mexican way:", opts:["¿Mande?","¿Qué?","De nada"], a:"¿Mande?", why:"A bare ¿qué? can sound blunt."},
  {t:"pick", q:"Someone says “¡Gracias!” You answer:", opts:["De nada","Por favor","Con permiso"], a:"De nada"},
  {t:"read", w:"gracias", opts:["GRAH-see-ahs","GRAH-thee-ahs","GRASS-yus"], a:"GRAH-see-ahs", why:"In Mexico c before i is a plain s."},
  {t:"order", es:"Más despacio, por favor", en:"More slowly, please"}]},
 4:{title:"Un or una? One or many?", cards:[
  {h:"Every noun is masculine or feminine", p:"Masculine words take un (a/an), feminine take una. Most words ending in -o are masculine, most ending in -a are feminine.", ex:[{es:"un taco",en:"a taco"},{es:"una mesa",en:"a table"}]},
  {h:"More than one: add -s", p:"Ends in a vowel? Add -s. Ends in a consonant? Add -es.", ex:[{es:"tacos",en:"taco → tacos"},{es:"hoteles",en:"hotel → hoteles"}]},
  {h:"Your age uses tener", p:"Spanish says “I have 13 years”, never “I am 13”.", ex:[{es:"Tengo trece años",en:"I'm 13 years old"}]}],
  quiz:[
  {t:"pick", q:"___ taco", opts:["un","una"], a:"un"},
  {t:"pick", q:"___ mesa", opts:["un","una"], a:"una"},
  {t:"pick", q:"Two hotels:", opts:["dos hoteles","dos hotels","dos hotel"], a:"dos hoteles"},
  {t:"pick", q:"Three tacos:", opts:["tres tacos","tres tacoes","tres taco"], a:"tres tacos"},
  {t:"pick", q:"“I'm 14.”", opts:["Tengo catorce años","Soy catorce años","Estoy catorce"], a:"Tengo catorce años"},
  {t:"listen", say:"doce", opts:["2","12","10"], a:"12"},
  {t:"listen", say:"quince", opts:["5","15","50"], a:"15"},
  {t:"read", w:"cuatro", opts:["KWAH-troh","koo-AT-roh","KWAT-row"], a:"KWAH-troh"}]},
 5:{title:"Cuesta or cuestan? Building numbers", cards:[
  {h:"One thing or more?", p:"¿Cuánto cuesta? for one thing. ¿Cuánto cuestan? for more than one.", ex:[{es:"¿Cuánto cuesta el sombrero?",en:"How much is the hat?"},{es:"¿Cuánto cuestan los tacos?",en:"How much are the tacos?"}]},
  {h:"Numbers snap together", p:"16 to 29 are one word: dieciséis, veintidós. From 31 up you add y: treinta y cinco. 100 on its own is cien.", ex:[{es:"dieciséis",en:"16"},{es:"veintidós",en:"22"},{es:"treinta y cinco",en:"35"},{es:"cien",en:"100"}]}],
  quiz:[
  {t:"pick", q:"¿Cuánto ___ el jugo?", opts:["cuesta","cuestan"], a:"cuesta", why:"One juice."},
  {t:"pick", q:"¿Cuánto ___ las playeras? (the T-shirts)", opts:["cuesta","cuestan"], a:"cuestan", why:"More than one."},
  {t:"pick", q:"35 is…", opts:["treinta y cinco","treintacinco","tres cinco"], a:"treinta y cinco"},
  {t:"pick", q:"17 is…", opts:["diecisiete","sietediez","diez siete"], a:"diecisiete"},
  {t:"listen", say:"cuarenta", opts:["14","40","4"], a:"40"},
  {t:"listen", say:"sesenta", opts:["60","70","16"], a:"60"},
  {t:"pick", q:"“Es muy caro” means…", opts:["It's very expensive","It's very cheap","It's very good"], a:"It's very expensive"},
  {t:"order", es:"Cuesta cincuenta pesos", en:"It costs 50 pesos"}]},
 6:{title:"El, la, los, las · quisiera", cards:[
  {h:"“The” has four forms", p:"el (masculine), la (feminine), los (masculine plural), las (feminine plural).", ex:[{es:"el menú",en:"the menu"},{es:"la cuenta",en:"the bill"},{es:"los tacos",en:"the tacos"},{es:"las bebidas",en:"the drinks"}]},
  {h:"Quisiera = I'd like", p:"The polite way to order. Quiero (I want) is fine with friends; quisiera sounds nicer to a waiter.", ex:[{es:"Quisiera agua, por favor",en:"I'd like water, please"}]},
  {h:"Está: where something is, how it is right now", p:"", ex:[{es:"¿Dónde está el baño?",en:"Where's the bathroom?"},{es:"¡Está delicioso!",en:"It's delicious!"}]}],
  quiz:[
  {t:"pick", q:"___ cuenta, por favor", opts:["La","El"], a:"La"},
  {t:"pick", q:"___ menú, por favor", opts:["La","El"], a:"El"},
  {t:"pick", q:"Para mí, ___ tacos", opts:["los","las","el"], a:"los"},
  {t:"pick", q:"The politest way to order water:", opts:["Quisiera agua, por favor","Quiero agua","Dame agua"], a:"Quisiera agua, por favor"},
  {t:"pick", q:"“Where's the bathroom?”", opts:["¿Dónde está el baño?","¿Dónde es el baño?","¿Dónde baño?"], a:"¿Dónde está el baño?", why:"Where something is uses está."},
  {t:"read", w:"jugo", opts:["HOO-goh","JOO-goh","YOO-goh"], a:"HOO-goh"},
  {t:"read", w:"delicioso", opts:["deh-lee-see-OH-soh","deh-LISH-us","deh-lee-thee-OH-soh"], a:"deh-lee-see-OH-soh"},
  {t:"order", es:"Una mesa para seis, por favor", en:"A table for six, please"}]},
 7:{title:"Review: tener, ser or estar?", cards:[
  {h:"Tener = to have", p:"tengo = I have · tenemos = we have.", ex:[{es:"Tenemos una reservación",en:"We have a reservation"}]},
  {h:"Ser or estar?", p:"Ser: who or what, and where you're from. Estar: where something is, and how it is right now.", ex:[{es:"Somos de Canadá",en:"We're from Canada (ser)"},{es:"¿Dónde está la alberca?",en:"Where's the pool? (estar)"}]},
  {h:"Asking the time of something", p:"¿A qué hora…? = At what time…? The answer starts with a las.", ex:[{es:"¿A qué hora es el desayuno?",en:"What time is breakfast?"},{es:"A las siete",en:"At seven"}]}],
  quiz:[
  {t:"pick", q:"“We have a reservation.”", opts:["Tenemos una reservación","Somos una reservación","Tengo una reservación"], a:"Tenemos una reservación"},
  {t:"pick", q:"¿Dónde ___ la alberca?", opts:["está","es"], a:"está", why:"Where something is uses estar."},
  {t:"pick", q:"___ de Canadá. (we)", opts:["Somos","Estamos"], a:"Somos", why:"Where you're from uses ser."},
  {t:"pick", q:"“Breakfast is at seven.” The time part:", opts:["a las siete","en siete","por siete"], a:"a las siete"},
  {t:"pick", q:"In Mexico, the pool is…", opts:["la alberca","la pileta","la bañera"], a:"la alberca", why:"Piscina is understood too, but alberca is the Mexican word."},
  {t:"stress", w:"reservación"},
  {t:"read", w:"alberca", opts:["ahl-BEHR-kah","AL-ber-kah","ahl-ber-KAH"], a:"ahl-BEHR-kah"},
  {t:"order", es:"¿A qué hora es el desayuno?", en:"What time is breakfast?"}]}
};

/* ---------- saved results, per person: best % for each unit (R1…, N1…) ---------- */
const LKEY = "sofia-learn-v1", LPASS = 70;
let LEARN = {people:{}};
try { LEARN = JSON.parse(localStorage.getItem(LKEY) || "null") || LEARN; } catch(_){}
const learnWho = () => (who.value || "").trim() || "Me";
const learnMine = () => (LEARN.people[learnWho()] = LEARN.people[learnWho()] || {});
const learnBest = id => learnMine()[id] ?? null;
function learnSave(id, pct){ const m = learnMine(); m[id] = Math.max(m[id] ?? 0, pct); try { localStorage.setItem(LKEY, JSON.stringify(LEARN)); } catch(_){} }
const nightDone = n => !GRAMMAR[n] || (learnBest("N"+n) ?? 0) >= LPASS;
const shuffle = a => { const b = a.slice(); for (let i=b.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [b[i],b[j]] = [b[j],b[i]]; } return b; };

/* ---------- the Learn tab ---------- */
let learnView = null;   // null = overview, else {kind:"R"|"N", id, unit}
const learnNight = () => parseInt(nightSel.value, 10) || 1;
function openLearn(n){ if (n) { nightSel.value = String(n); renderList(); } learnView = null; setTab("learn"); }
function renderLearn(){
  const top = $("#learn-top"), body = $("#learn-body"); top.replaceChildren(); body.replaceChildren();
  if (learnView) { renderUnit(body); top.hidden = true; return; }
  top.hidden = false;
  const n = learnNight(), L = LESSONS.find(x=>x.n===n), G = GRAMMAR[n];
  top.append(el("h2", "", "📚 Learn first, then speak"));
  top.append(el("p", "muted", "A few minutes of reading rules and grammar makes the speaking much easier. Cards first, then a quick game."));
  const sel = document.createElement("select"); sel.setAttribute("aria-label", "Lesson night");
  [...nightSel.options].forEach(o => sel.append(new Option(o.text, o.value))); sel.value = nightSel.value;
  sel.onchange = () => { nightSel.value = sel.value; renderList(); renderLearn(); updateNudge(); };
  const lab = el("label", ""); lab.style.cssText = "display:flex;flex-direction:column;gap:3px;font-size:13px;color:var(--muted);margin-top:10px"; lab.append("Lesson", sel); top.append(lab);

  const step = (num, title, sub, done, btns) => { const r = el("div", "step" + (done ? " done" : "")); const t = el("div", "t"); t.append(el("b", "", (done ? "✓ " : num + " ") + title)); if (sub) t.append(el("small", "", sub)); r.append(t); const a = el("div", "acts"); btns.forEach(b => a.append(b)); r.append(a); body.append(r); };
  const rDone = READING.filter(u => (learnBest(u.id) ?? 0) >= LPASS).length;
  body.append(el("h3", "", "① How to read Spanish (do these once)"));
  for (const u of READING) { const b = learnBest(u.id); step("·", u.title, b == null ? "Not tried yet" : `Best ${b}%`, (b ?? 0) >= LPASS, [button(b == null ? "Start" : "Again", () => { learnView = {id:u.id, unit:u}; renderLearn(); })]); }
  body.append(el("h3", "", `② Tonight's grammar${L ? " · Night " + n : ""}`));
  if (G) { const b = learnBest("N"+n); step("·", G.title, b == null ? "Cards, then 8 quick questions" : `Best ${b}%`, (b ?? 0) >= LPASS, [button(b == null ? "Start" : "Again", () => { learnView = {id:"N"+n, unit:G}; renderLearn(); })]); }
  else body.append(el("p", "muted", "Sofía hasn't written grammar for this night yet. Do the reading units, or pick an earlier night."));
  body.append(el("h3", "", "③ Then speak it"));
  step("·", "Say tonight's phrases", "Sofía checks every word", false, [button("🎤 Practise", () => setTab("practise"))]);
  step("·", "Talk with Sofía", "A real back-and-forth in Mexican Spanish", false, [button("💬 Talk", () => setTab("talk"))]);
  if (rDone < READING.length) body.append(el("p", "muted", `Reading units done: ${rDone} of ${READING.length}.`));
}

/* one unit: cards, then the game */
function renderUnit(body){
  const {unit, id} = learnView;
  const back = button("← Back to Learn", () => { learnView = null; renderLearn(); }, "btn ghost small"); body.append(back);
  body.append(el("h2", "", unit.title)); body.style.display = "";
  for (const c of unit.cards) {
    const card = el("div", "lcard"); card.append(el("h3", "", c.h)); if (c.p) card.append(el("p", "", c.p));
    for (const x of c.ex || []) { const r = el("button", "ex"); r.type = "button"; r.innerHTML = "<span>🔊</span><b></b><small></small>"; r.querySelector("b").textContent = x.es; r.querySelector("small").textContent = x.en; r.onclick = () => speak(x.es.replace(/ \/ /g, ", "), 0.75); card.append(r); }
    body.append(card);
  }
  const qs = unit.quiz.filter(q => q.t !== "listen" || HAS_TTS);
  const go = button(`▶ Start the game (${qs.length} questions)`, () => playGame(id, qs), "btn"); go.style.marginTop = "12px"; body.append(go);
  window.scrollTo({top: $("#learn-body").offsetTop - 10});
}

function playGame(id, qs){
  const body = $("#learn-body"); let i = 0, right = 0; const order = qs.slice();
  const status = () => el("div", "muted qcount", `Question ${i+1} of ${order.length} · ${right} right`);
  function next(){
    body.replaceChildren(button("← Back to Learn", () => { learnView = null; renderLearn(); }, "btn ghost small"));
    if (i >= order.length) return finish();
    body.append(status());
    const q = order[i], box = el("div", "qbox"); body.append(box);
    const fb = el("div", "say-status"); const nx = button(i+1 < order.length ? "Next →" : "See my score", () => { i++; next(); }, "btn"); nx.hidden = true;
    const answered = (ok, fix, why, sayAfter) => { if (ok) right++; fb.className = "say-status " + (ok ? "ok" : "bad"); fb.textContent = (ok ? "✓ ¡Correcto! " : "✗ It's: " + fix + ". ") + (why || ""); nx.hidden = false; nx.focus(); if (sayAfter) speak(sayAfter, 0.8); };
    if (q.t === "pick" || q.t === "read" || q.t === "listen") {
      const prompt = q.t === "read" ? `How do you say “${q.w}”?` : q.t === "listen" ? "Listen, then tap what Sofía said." : q.q;
      box.append(el("div", "qprompt", prompt));
      if (q.t === "listen") { const h = button("🔊 Play it again", () => speak(q.say, 0.8), "btn ghost small"); box.append(h); setTimeout(() => speak(q.say, 0.8), 250); }
      const opts = el("div", "opts");
      for (const o of shuffle(q.opts)) { const b = button(o, () => { opts.querySelectorAll("button").forEach(x => { x.disabled = true; if (x.textContent === q.a) x.classList.add("right"); }); if (o !== q.a) b.classList.add("wrong"); answered(o === q.a, q.a, q.why, q.t === "read" ? q.w : q.t === "pick" && /[áéíóúñ¿¡]|^[A-ZÁÉÍÓÚ¿¡][a-zñ]/.test(q.a) && !/^[A-Z][a-z]+ /.test(q.a) ? q.a : null); }, "opt"); opts.append(b); }
      box.append(opts);
    } else if (q.t === "stress") {
      const syl = syllables(q.w), st = stressIndex(syl, q.w);
      box.append(el("div", "qprompt", `Tap the loud syllable in “${q.w}”`));
      const opts = el("div", "opts syls");
      syl.forEach((s, k) => { const b = button(s, () => { opts.querySelectorAll("button").forEach((x, j) => { x.disabled = true; if (j === st) x.classList.add("right"); }); if (k !== st) b.classList.add("wrong"); answered(k === st, syl.map((x,j)=> j===st ? x.toUpperCase() : x).join("-"), "", q.w); }, "opt"); opts.append(b); });
      box.append(opts);
    } else if (q.t === "order") {
      const words = q.es.split(/\s+/); let pool = shuffle(words.map((w, k) => ({w, k})));
      if (pool.every((p, k) => p.k === k) && words.length > 1) pool = pool.slice(1).concat(pool[0]);
      box.append(el("div", "qprompt", `Put the words in order: “${q.en}”`));
      const built = el("div", "built"), opts = el("div", "opts"); const picked = [];
      const draw = () => {
        built.replaceChildren(...(picked.length ? picked.map(p => { const b = button(p.w, () => { picked.splice(picked.indexOf(p), 1); draw(); }, "opt chosen"); return b; }) : [el("span", "muted", "Tap the words below…")]));
        opts.replaceChildren(...pool.filter(p => !picked.includes(p)).map(p => button(p.w, () => { picked.push(p); draw(); if (picked.length === words.length) check(); }, "opt")));
      };
      const check = () => { const ok = picked.map(p => p.w).join(" ") === q.es; built.querySelectorAll("button").forEach(b => { b.disabled = true; b.classList.add(ok ? "right" : "wrong"); }); answered(ok, q.es, "", q.es); };
      box.append(built, opts); draw();
    }
    box.append(fb, nx);
  }
  function finish(){
    const pct = Math.round(100 * right / order.length); learnSave(id, pct); updateNudge();
    const pass = pct >= LPASS, n = learnNight();
    const card = el("div", "qbox"); card.append(el("div", "score", `${pct}% · ${pass ? "¡Muy bien! 🎉" : "¡Casi! Try it once more."}`));
    card.append(el("p", "muted", `${right} of ${order.length} right. ${pass ? "Saved." : `${LPASS}% passes.`}`));
    const b = el("div", "btns");
    if (pass && id.startsWith("N")) { b.append(button("🎤 Now say tonight's phrases", () => { learnView = null; setTab("practise"); }, "btn"), button("💬 Talk with Sofía", () => { learnView = null; setTab("talk"); }, "btn ghost")); }
    else if (pass) { const nextR = READING.find(u => (learnBest(u.id) ?? 0) < LPASS); b.append(nextR ? button("Next: " + nextR.title, () => { learnView = {id:nextR.id, unit:nextR}; renderLearn(); }, "btn") : button(GRAMMAR[n] ? "Tonight's grammar →" : "← Back to Learn", () => { learnView = GRAMMAR[n] ? {id:"N"+n, unit:GRAMMAR[n]} : null; renderLearn(); }, "btn")); }
    b.append(button("↻ Play again", () => playGame(id, order), pass ? "btn ghost" : "btn"), button("← Back to Learn", () => { learnView = null; renderLearn(); }, "btn ghost"));
    card.append(b); $("#learn-body").append(card);
    if (pass) speak(pct === 100 ? "¡Perfecto!" : "¡Muy bien!", 0.9);
  }
  next();
}

/* Practise tab nudge: grammar first */
let nudgeSkipped = new Set();
function updateNudge(){
  const n = learnNight(), box = $("#learn-nudge"); if (!box) return;
  box.hidden = nightDone(n) || nudgeSkipped.has(n);
  if (!box.hidden) $("#learn-nudge-t").textContent = `Night ${n} grammar first: ${GRAMMAR[n].title} (about 5 minutes). It makes the speaking easier.`;
}
$("#learn-nudge-go").onclick = () => openLearn();
$("#learn-nudge-skip").onclick = () => { nudgeSkipped.add(learnNight()); updateNudge(); };
nightSel.addEventListener("change", updateNudge);
who.addEventListener("change", () => { updateNudge(); if (tabNow === "learn") renderLearn(); });
updateNudge();
// a new night opens on 📚 Learn until its grammar is done
if (tabNow === "practise" && !nightDone(learnNight())) setTab("learn");
else if (tabNow === "learn") renderLearn();
