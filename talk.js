/* 💬 Talk with Sofía: real back-and-forth conversations in Mexican Spanish, written out ahead of time so every line is
   right. You answer by voice (or typing); Sofía listens for the key words, replies, and keeps going. Stuck? 💡 gives you a
   line to say, and "I'm done" takes you to your next lesson. Works with no signal except the 🎤 (phone speech recognition).
   Script nodes: say {es,en} (or a function of the chat's memory), hint {es,en}, expect [{m:[phrases], next, reply?}].
   A phrase matches when all its words are in what you said ("*" matches anything). Accents and capitals don't matter. */

const HOUR = () => new Date().getHours();
const GREET = () => HOUR() < 12 ? "Buenos días" : HOUR() < 19 ? "Buenas tardes" : "Buenas noches";
const GREET_EN = () => HOUR() < 12 ? "good morning (until noon)" : HOUR() < 19 ? "good afternoon (noon until dark)" : "good evening (after dark)";
const GREET_EN1 = () => HOUR() < 12 ? "Good morning" : HOUR() < 19 ? "Good afternoon" : "Good evening";
const NUMS = ["dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","2","3","4","5","6","7","8","9","10","uno","una"];

const TALKS = [
 {id:"saludos", title:"Good morning chat", who:"Sofía", nights:[1,3], userFirst:true,
  intro:() => ({es:"", en:`You start: greet Sofía the way you would right now (it's ${GREET_EN().split(" (")[0]} time).`}),
  start:"greet", nodes:{
  greet:{hint:() => ({es:`¡${GREET()}! ¿Cómo está?`, en:`${GREET_EN1()}! How are you?`}),
   expect:[{m:["buenos dias","buen dia","buenas tardes","buenas noches","buenas","hola","que tal"], next:"howru", reply:(v, said) => {
     const g = GREET(), gn = g.toLowerCase().replace("í","i"), wrong = ["buenos dias","buenas tardes","buenas noches"].find(x => said.includes(x) && x !== gn);
     v.askedBack = /como esta|como estas/.test(said);
     return {es:`¡${g}! ` + (v.askedBack ? "Muy bien, gracias. ¿Y usted, cómo está?" : "¿Cómo está?"), en:(wrong ? `(Right now we say ${g.toLowerCase()}: ${GREET_EN()}.) ` : "") + `${GREET_EN1()}! ` + (v.askedBack ? "Very well, thanks. And how are you?" : "How are you?")}; }}]},
  howru:{hint:{es:"Muy bien, gracias. ¿Y usted?", en:"Very well, thanks. And you?"},
   expect:[{m:["bien","excelente","super","mas o menos","regular","mal","cansado","cansada","feliz","contento","contenta"], next:v => v.back || v.askedBack ? "plans" : "askback", reply:(v, said) => {
     v.back = /\b(y usted|y tu|usted|tu)\b/.test(said);
     const sad = /\b(mal|cansad[oa])\b/.test(said), so = /mas o menos|regular/.test(said);
     const first = sad ? "¡Ay, lo siento! Hoy descanse un poco." : so ? "Bueno, poco a poco." : "¡Qué bueno!";
     const fen = sad ? "Oh, I'm sorry! Rest a bit today." : so ? "Well, little by little." : "Great!";
     if (v.askedBack) return {es:first + " ¿Qué va a hacer hoy?", en:fen + " What are you going to do today?"};   // she already said how she is
     return v.back ? {es:first + " Yo estoy muy bien, gracias. ¿Qué va a hacer hoy?", en:fen + " I'm very well, thanks. What are you going to do today?"}
                   : {es:first, en:fen + " (Tip: ask her back: ¿Y usted?)"}; }}]},
  askback:{hint:{es:"¿Y usted?", en:"And you?"},
   expect:[{m:["y usted","y tu","usted","tu","como esta","como estas"], next:"plans", reply:{es:"Muy bien, gracias. ¿Qué va a hacer hoy?", en:"Very well, thanks. What are you going to do today?"}}]},
  plans:{hint:{es:"Voy a la playa.", en:"I'm going to the beach."},
   expect:[
    {m:["playa","mar"], next:"bye", reply:{es:"¡Qué padre! No olvide el bloqueador. Bueno, que le vaya muy bien.", en:"How cool! Don't forget the sunscreen. Well, have a great day."}},
    {m:["alberca","piscina","nadar"], next:"bye", reply:{es:"¡Qué rico! Bueno, que le vaya muy bien.", en:"Lovely! Well, have a great day."}},
    {m:["comer","restaurante","tacos","desayunar","cenar"], next:"bye", reply:{es:"¡Buen provecho! Bueno, que le vaya muy bien.", en:"Enjoy your meal! Well, have a great day."}},
    {m:["trabajar","trabajo"], next:"bye", reply:{es:"¡Ánimo! Bueno, que le vaya muy bien.", en:"You've got this! Well, have a great day."}},
    {m:["*"], next:"bye", reply:{es:"¡Qué bien! Bueno, que le vaya muy bien.", en:"Nice! Well, have a great day."}}]},
  bye:{hint:{es:"Gracias, igualmente. ¡Hasta luego!", en:"Thanks, you too. See you later!"},
   expect:[{m:["gracias","igualmente","hasta luego","adios","nos vemos","bye"], next:"END", reply:{es:"¡Hasta luego!", en:"See you later!"}}]}}},

 {id:"presentaciones", title:"Meeting someone", who:"Sofía", nights:[2],
  start:"name", nodes:{
  name:{say:{es:"¡Hola! Me llamo Sofía. ¿Cómo se llama usted?", en:"Hi! My name is Sofía. What's your name?"}, hint:{es:"Me llamo Daniel.", en:"My name is Daniel. (use your own name)"},
   expect:[{m:["llamo","soy","nombre","*"], next:"from", reply:v => ({es:`Mucho gusto${v.name ? ", " + v.name : ""}. ¿De dónde es?`, en:`Nice to meet you${v.name ? ", " + v.name : ""}. Where are you from?`}), grab:"name"}]},
  from:{hint:{es:"Soy de Canadá.", en:"I'm from Canada."},
   expect:[{m:["canada"], next:"where", reply:{es:"¡Canadá! ¡Qué padre! ¿De qué parte?", en:"Canada! How cool! What part?"}},
           {m:["*"], next:"family", reply:{es:"¡Qué padre! ¿Viene con su familia?", en:"How cool! Did you come with your family?"}}]},
  where:{hint:{es:"Soy de Columbia Británica.", en:"I'm from British Columbia."},
   expect:[{m:["*"], next:"family", reply:{es:"¡Ah, hace mucho frío allá! ¿Viene con su familia?", en:"Ah, it's very cold there! Did you come with your family?"}}]},
  family:{hint:{es:"Sí, con mi esposa y mis hijos.", en:"Yes, with my wife and my kids."},
   expect:[{m:["si","familia","esposa","esposo","hijos","hijas"], next:"howmany", reply:{es:"¡Qué bonito! ¿Cuántos son?", en:"How nice! How many of you are there?"}},
           {m:["no","solo","sola"], next:"END", reply:{es:"¡Bienvenido a México! Que le vaya muy bien.", en:"Welcome to Mexico! Have a great time."}}]},
  howmany:{hint:{es:"Somos seis.", en:"There are six of us."},
   expect:[{m:NUMS.concat(["somos"]), next:"END", reply:{es:"¡Una familia grande! ¡Bienvenidos a México!", en:"A big family! Welcome to Mexico!"}}]}}},

 {id:"restaurante", title:"At the restaurant", who:"Mesero", nights:[3,4,5,6],
  start:"table", nodes:{
  table:{say:() => ({es:`¡${GREET()}! Bienvenidos. ¿Mesa para cuántos?`, en:`${GREET_EN1()}! Welcome. A table for how many?`}), hint:{es:"Una mesa para seis, por favor.", en:"A table for six, please."},
   expect:[{m:NUMS.concat(["mesa","para"]), next:"drinks", reply:{es:"Pásenle, por aquí. Aquí está el menú. ¿Qué van a tomar?", en:"Come in, this way. Here's the menu. What will you have to drink?"}}]},
  drinks:{hint:{es:"Quisiera agua, por favor.", en:"I'd like water, please."},
   expect:[{m:["agua","refresco","coca","jugo","limonada","cerveza","cafe","horchata","jamaica","leche","te"], next:"food", reply:{es:"Muy bien. ¿Y para comer?", en:"Very good. And to eat?"}}]},
  food:{hint:{es:"Para mí, los tacos al pastor.", en:"For me, the tacos al pastor."},
   expect:[{m:["tacos","taco","quesadilla","quesadillas","enchiladas","pozole","torta","sopa","hamburguesa","pescado","camarones","pollo","guacamole","chilaquiles","burrito","nachos","ensalada"], next:"more", reply:{es:"Excelente. ¿Algo más?", en:"Excellent. Anything else?"}}]},
  more:{hint:{es:"No, gracias. ¿Dónde está el baño?", en:"No, thanks. Where's the bathroom?"},
   expect:[{m:["bano"], next:"more2", reply:{es:"Al fondo, a la izquierda. ¿Algo más?", en:"At the back, on the left. Anything else?"}},
           {m:["no","es todo","nada mas","gracias"], next:"eat", reply:{es:"Ahorita se los traigo.", en:"I'll bring it right away."}}]},
  more2:{hint:{es:"No, gracias.", en:"No, thanks."}, expect:[{m:["no","es todo","nada mas","gracias"], next:"eat", reply:{es:"Ahorita se los traigo.", en:"I'll bring it right away."}}]},
  eat:{say:{es:"Aquí tienen. ¡Buen provecho!", en:"Here you go. Enjoy your meal!"}, hint:{es:"¡Gracias! ¡Está delicioso!", en:"Thanks! It's delicious!"},
   expect:[{m:["gracias","delicioso","rico","muy bueno"], next:"check", reply:{es:"¡Qué bueno que les gustó! ¿Les traigo algo más?", en:"So glad you like it! Can I bring you anything else?"}}]},
  check:{hint:{es:"No, gracias. La cuenta, por favor.", en:"No, thanks. The bill, please."},
   expect:[{m:["cuenta"], next:"pay", reply:{es:"Claro. Son seiscientos cincuenta pesos. ¿Va a pagar con tarjeta o en efectivo?", en:"Of course. It's 650 pesos. Paying by card or cash?"}},
           {m:["no","gracias"], next:"check2", reply:{es:"Muy bien.", en:"Very good."}}]},
  check2:{hint:{es:"La cuenta, por favor.", en:"The bill, please."}, expect:[{m:["cuenta"], next:"pay", reply:{es:"Claro. Son seiscientos cincuenta pesos. ¿Va a pagar con tarjeta o en efectivo?", en:"Of course. It's 650 pesos. Paying by card or cash?"}}]},
  pay:{hint:{es:"Con tarjeta, por favor.", en:"By card, please."},
   expect:[{m:["tarjeta","efectivo","cash"], next:"END", reply:{es:"Perfecto. ¡Gracias, vuelvan pronto!", en:"Perfect. Thank you, come back soon!"}}]}}},

 {id:"mercado", title:"Haggling at the market", who:"Vendedora", nights:[5],
  start:"hi", nodes:{
  hi:{say:{es:"¡Pásele, pásele! ¿Qué le damos?", en:"Come on in! What can I get you?"}, hint:{es:"¿Cuánto cuesta este sombrero?", en:"How much is this hat?"},
   expect:[{m:["cuanto","cuesta","cuestan","precio"], next:"price", reply:{es:"Ese cuesta cuatrocientos pesos.", en:"That one is 400 pesos."}}]},
  price:{hint:{es:"Es muy caro. ¿Me lo deja en trescientos?", en:"It's very expensive. Will you let me have it for 300?"},
   expect:[{m:["caro","mucho","menos","deja","descuento","trescientos","doscientos"], next:"deal", reply:{es:"Ay, no… se lo dejo en trescientos cincuenta.", en:"Oh, no… I'll let you have it for 350."}},
           {m:["esta bien","si","bueno","ok"], next:"card", reply:{es:"¡Muy bien!", en:"Very good!"}}]},
  deal:{hint:{es:"Está bien. ¿Acepta tarjeta?", en:"OK. Do you take cards?"},
   expect:[{m:["tarjeta"], next:"cash", reply:{es:"No, nomás efectivo.", en:"No, cash only."}},
           {m:["esta bien","si","bueno","ok","efectivo"], next:"card", reply:{es:"¡Muy bien!", en:"Very good!"}}]},
  card:{say:{es:"¿Va a pagar en efectivo?", en:"Are you paying cash?"}, hint:{es:"Sí, aquí tiene.", en:"Yes, here you go."}, expect:[{m:["*"], next:"END", reply:{es:"¡Gracias! ¡Que le vaya bien!", en:"Thanks! Have a good one!"}}]},
  cash:{hint:{es:"Bueno, aquí tiene.", en:"OK, here you go."}, expect:[{m:["*"], next:"END", reply:{es:"¡Gracias! ¡Que le vaya bien!", en:"Thanks! Have a good one!"}}]}}},

 {id:"taxi", title:"Taking a taxi", who:"Taxista", nights:[5,6],
  start:"where", nodes:{
  where:{say:() => ({es:`${GREET()}. ¿A dónde los llevo?`, en:`${GREET_EN1()}. Where can I take you?`}), hint:{es:"Al hotel, por favor.", en:"To the hotel, please."},
   expect:[{m:["hotel","aeropuerto","playa","centro","restaurante","tienda","mercado","al","a la"], next:"price", reply:{es:"Muy bien. Son doscientos pesos.", en:"Very good. It's 200 pesos."}}]},
  price:{hint:{es:"¿Doscientos? Es muy caro.", en:"200? That's very expensive."},
   expect:[{m:["caro","mucho","menos","descuento","ciento"], next:"ok", reply:{es:"Bueno, se lo dejo en ciento ochenta.", en:"OK, I'll do it for 180."}},
           {m:["esta bien","si","bueno","ok","vamos"], next:"ride", reply:{es:"Súbanse, por favor. ¿De dónde son?", en:"Get in, please. Where are you from?"}}]},
  ok:{hint:{es:"Está bien, gracias.", en:"OK, thanks."}, expect:[{m:["esta bien","si","bueno","ok","gracias","vamos"], next:"ride", reply:{es:"Súbanse, por favor. ¿De dónde son?", en:"Get in, please. Where are you from?"}}]},
  ride:{hint:{es:"Somos de Canadá.", en:"We're from Canada."}, expect:[{m:["*"], next:"arrive", reply:{es:"¡Qué padre! … Ya llegamos.", en:"How cool! … Here we are."}}]},
  arrive:{hint:{es:"Gracias. Aquí tiene.", en:"Thanks. Here you go."}, expect:[{m:["*"], next:"END", reply:{es:"¡Gracias a ustedes! Que les vaya bien.", en:"Thank you! Have a good time."}}]}}},

 {id:"hotel", title:"Checking into the hotel", who:"Recepcionista", nights:[7],
  start:"res", nodes:{
  res:{say:{es:"¡Bienvenidos al hotel! ¿Tienen reservación?", en:"Welcome to the hotel! Do you have a reservation?"}, hint:{es:"Sí, tenemos una reservación.", en:"Yes, we have a reservation."},
   expect:[{m:["si","reservacion","tenemos"], next:"whose", reply:{es:"¿A nombre de quién?", en:"Under what name?"}}]},
  whose:{hint:{es:"A nombre de García.", en:"Under the name García. (use your last name)"},
   expect:[{m:["*"], next:"id", reply:{es:"Perfecto, aquí está. Seis personas, siete noches. ¿Me permite una identificación?", en:"Perfect, here it is. Six people, seven nights. May I see some ID?"}}]},
  id:{hint:{es:"Sí, aquí tiene.", en:"Yes, here you go."}, expect:[{m:["*"], next:"ask", reply:{es:"Gracias. Aquí están sus llaves. ¿Tiene alguna pregunta?", en:"Thank you. Here are your keys. Any questions?"}}]},
  ask:{hint:{es:"¿A qué hora es el desayuno?", en:"What time is breakfast?"},
   expect:[
    {m:["desayuno"], next:"ask", reply:{es:"El desayuno es de siete a once, en el restaurante. ¿Algo más?", en:"Breakfast is from 7 to 11, in the restaurant. Anything else?"}, hint2:{es:"¿Dónde está la alberca?", en:"Where's the pool?"}},
    {m:["alberca","piscina"], next:"ask", reply:{es:"Allá, a la derecha. ¿Algo más?", en:"Over there, on the right. Anything else?"}, hint2:{es:"No, gracias. ¡Muy amable!", en:"No, thanks. Very kind of you!"}},
    {m:["playa"], next:"ask", reply:{es:"Por aquí, derecho. ¿Algo más?", en:"This way, straight ahead. Anything else?"}},
    {m:["wifi","internet","contrasena"], next:"ask", reply:{es:"La contraseña está en su llave. ¿Algo más?", en:"The password is on your key card. Anything else?"}},
    {m:["no","gracias","amable","es todo"], next:"END", reply:{es:"¡Con gusto! Disfruten su estancia.", en:"My pleasure! Enjoy your stay."}}]}}}
];

/* ---------- engine ---------- */
let talk = null;   // {script, node, vars, turns, misses, log:[]}
const TKEY = "sofia-talk-v1";
let TALKLOG = {};
try { TALKLOG = JSON.parse(localStorage.getItem(TKEY) || "{}") || {}; } catch(_){}
const val = (x, v, s) => typeof x === "function" ? x(v, s) : x;
const talkNorm = s => " " + norm(s).join(" ") + " ";
const REPEAT = ["mande","no entiendo","repite","repita","otra vez","mas despacio","como"];
function matchAny(phrases, said){ return phrases.some(p => p === "*" ? said.trim().length > 0 : p.split(" ").every(w => said.includes(" " + w + " "))); }

function talkLine(who, es, en, cls){
  const box = $("#talk-chat"), b = el("div", "bub " + cls);
  if (who) b.append(el("div", "who", who));
  if (es) { const t = el("div", "es", es); b.append(t); }
  if (en) { const e = el("div", "en", en); if (cls === "her" && !$("#talk-en").checked && es) e.hidden = true; b.append(e); }
  if (cls === "her" && es) { b.append(button("🔊", () => speak(es, 0.75), "mini")); b.onclick = ev => { if (ev.target.tagName !== "BUTTON") { const e = b.querySelector(".en"); if (e) e.hidden = !e.hidden; } }; }
  box.append(b); box.scrollTop = box.scrollHeight; return b;
}
function startTalk(id){
  const script = TALKS.find(t => t.id === id); if (!script) return;
  talk = {script, node:script.start, vars:{}, turns:0, misses:0, hintNext:null};
  $("#talk-chat").replaceChildren(); $("#talk-end").replaceChildren(); $("#talk-play").hidden = false;
  $("#talk-title").textContent = `💬 ${script.title} · with ${script.who}`;
  renderTalkPicker();
  if (script.userFirst) { const i = val(script.intro); talkLine("", "", i.en, "sys"); note("Your turn: tap 🎤 and say it, or type below.", "ok", "#talk-status"); showHint(false); }
  else herSays(val(script.nodes[talk.node].say, talk.vars));
}
async function herSays(line){
  if (!line) return;
  talk.lastLine = line;
  talkLine(talk.script.who, line.es, line.en, "her");
  showHint(false);
  await speak(line.es, talkRate());
  if (talk && talk.node !== "END" && $("#talk-hands").checked) setTimeout(() => talk && $("#talk-mic").click(), 300);
}
const talkRate = () => $("#talk-slow").checked ? 0.7 : 0.9;
function currentHint(){ if (talk && talk.ai) return talk.hintNext; const n = talk && talk.script.nodes[talk.node]; return n ? (talk.hintNext || val(n.hint, talk.vars)) : null; }
function showHint(open){
  const h = currentHint(), box = $("#talk-hint"); box.replaceChildren(); box.hidden = !open || !h;
  if (!open || !h) return;
  box.append(el("div", "muted", "Try saying:"), el("b", "", h.es), el("small", "", h.en));
  const brk = el("div", "syl"); brk.textContent = phraseBreak(h.es); box.append(brk);
  box.append(button("🔊 Hear it", () => speak(h.es, 0.7), "btn small"));
}
function grabName(raw){
  const m = raw.match(/(?:me llamo|mi nombre es|soy)\s+([A-Za-zÁÉÍÓÚÑáéíóúñ]+)/i) || raw.trim().match(/^([A-Za-zÁÉÍÓÚÑáéíóúñ]+)$/);
  return m ? m[1][0].toUpperCase() + m[1].slice(1).toLowerCase() : "";
}
function userSaid(alts){
  if (!talk || talk.node === "END") return;
  const texts = alts.map(a => a.t).filter(Boolean); if (!texts.length) return;
  if (talk.ai) return aiTurn(texts[0]);
  const n = talk.script.nodes[talk.node];
  // which alternative the recognizer heard matches something Sofía expects
  let hit = null, said = talkNorm(texts[0]), raw = texts[0];
  for (const t of texts) { const s = talkNorm(t); const e = n.expect.find(x => !x.m.includes("*") && matchAny(x.m, s)); if (e) { hit = e; said = s; raw = t; break; } }
  talkLine("", raw, "", "me");
  if (!hit && matchAny(REPEAT, said) && said.trim().split(" ").length <= 3) {   // ¿mande? / no entiendo → she says it again, slowly
    const last = talk.lastLine;
    if (!last) { talkLine("", "", "You start: say hello first.", "sys"); return; }
    talkLine(talk.script.who, "Claro. " + last.es, "Of course (slower): " + last.en, "her");
    speak(last.es, 0.6); return;
  }
  if (!hit) hit = n.expect.find(x => x.m.includes("*"));
  if (!hit) {
    talk.misses++;
    if (talk.misses === 1) { talkLine(talk.script.who, "¿Mande?", "Sorry, what? (She didn't catch a word she expected. Try again, or tap 💡.)", "her"); speak("¿Mande?", 0.9); }
    else { talkLine("", "", "Here's something you can say. Or tap ⏭ Skip.", "sys"); showHint(true); }
    return;
  }
  talk.misses = 0; talk.turns++;
  if (hit.grab === "name") talk.vars.name = grabName(raw);
  const reply = val(hit.reply, talk.vars, said), next = val(hit.next, talk.vars, said);
  talk.hintNext = hit.hint2 || null;
  talk.node = next;
  if (next === "END") { herSays(reply).then(() => endTalk(true)); return; }
  const n2 = talk.script.nodes[next];
  herSays(reply && n2.say ? {es:reply.es + " " + val(n2.say, talk.vars).es, en:reply.en + " " + val(n2.say, talk.vars).en} : (reply || val(n2.say, talk.vars)));
}
/* ✨ Free chat: Sofía answers anything, through Workers AI on her server (needs a signal). */
function startAi(){
  if (!navigator.onLine) { note("Free chat needs a signal. The other conversations work offline.", "bad", "#talk-status"); return; }
  const n = learnNight(), L = LESSONS.find(x => x.n === n);
  talk = {ai:true, script:{id:"ai", title:"Free chat", who:"Sofía", nodes:{}}, node:"ai", vars:{}, turns:0, misses:0, hist:[], busy:false,
          topic: L ? L.title : "plática del día", lesson: L ? (L.phrases || []).map(p => p.es).join("; ") : "",
          hintNext:{es:"Muy bien, gracias. ¿Y usted?", en:"Very well, thanks. And you?"}};
  $("#talk-chat").replaceChildren(); $("#talk-end").replaceChildren(); $("#talk-play").hidden = false;
  $("#talk-title").textContent = "💬 Free chat with Sofía (AI, beta)";
  renderTalkPicker();
  talkLine("", "", "Say anything in Spanish, or in English if you're stuck. Sofía answers in Mexican Spanish and ✏️ marks a fix. The AI can slip now and then; the other conversations are checked word by word.", "sys");
  const open = {es:`¡${GREET()}! ¿Cómo está hoy?`, en:`${GREET_EN1()}! How are you today?`};
  talk.hist.push({who:"her", es:open.es});
  herSays(open);
}
async function aiTurn(raw){
  const said = talkNorm(raw);
  talkLine("", raw, "", "me");
  if (matchAny(REPEAT, said) && said.trim().split(" ").length <= 3 && talk.lastLine) { talkLine(talk.script.who, "Claro. " + talk.lastLine.es, "Of course (slower): " + talk.lastLine.en, "her"); speak(talk.lastLine.es, 0.6); return; }
  if (talk.busy) return;
  talk.busy = true; talk.hist.push({who:"me", es:raw.slice(0, 300)});
  const me = talk, thinking = talkLine("", "", "Sofía is thinking…", "sys");
  try {
    if (!navigator.onLine) throw new Error("Free chat needs a signal. The other conversations work offline.");
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 20000);
    let r; try { r = await fetch(AI_BASE + "/chat", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({history:me.hist.slice(-12), topic:me.topic, lesson:me.lesson}), signal:ctl.signal}); } finally { clearTimeout(t); }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || "Couldn't reach Sofía (" + r.status + ").");
    thinking.remove(); if (talk !== me) return;
    me.turns++; me.hist.push({who:"her", es:d.es});
    me.hintNext = d.suggest ? {es:d.suggest, en:"(something you could say)"} : null;
    if (d.tip) talkLine("", "", "✏️ " + d.tip, "sys tipline");
    me.busy = false;
    await herSays({es:d.es, en:d.en});
  } catch (e) {
    thinking.remove(); me.hist.pop(); me.busy = false;
    if (talk === me) talkLine("", "", e.name === "AbortError" ? "Sofía took too long to answer. Say it again." : (e.message || "Couldn't reach Sofía."), "sys");
  }
}
function endTalk(finished){
  if (!talk) return;
  const s = talk.script, rec = TALKLOG[learnWho()] = TALKLOG[learnWho()] || {};
  const r = rec[s.id] = rec[s.id] || {done:0, best:0}; r.best = Math.max(r.best, talk.turns); if (finished) r.done++;
  try { localStorage.setItem(TKEY, JSON.stringify(TALKLOG)); } catch(_){}
  const box = $("#talk-end"); box.replaceChildren();
  box.append(el("div", "score", finished ? "¡Lo lograste! 🎉" : `¡Buen trabajo! ${talk.turns} answer${talk.turns === 1 ? "" : "s"}.`));
  box.append(el("p", "muted", finished ? `You got all the way through with ${s.who}.` : "That's where we stop today. Pick it up again any time."));
  const n = learnNight(), b = el("div", "btns");
  b.append(button(nightDone(n) ? "🎤 Practise Night " + n : "📚 Start my next lesson (Night " + n + ")", () => nightDone(n) ? setTab("practise") : openLearn(n), "btn"));
  b.append(button("↻ Talk again", () => startTalk(s.id), "btn ghost"));
  box.append(b);
  talk = null; $("#talk-play").hidden = true; $("#talk-hint").hidden = true; note("", "", "#talk-status"); renderTalkPicker();
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
}
function renderTalkPicker(){
  const box = $("#talk-pick"), n = learnNight(), rec = TALKLOG[learnWho()] || {}; box.replaceChildren();
  const sorted = TALKS.slice().sort((a,b) => (b.nights.includes(n)) - (a.nights.includes(n)));
  if (typeof AI_BASE === "string" && AI_BASE) { const b = button("✨ Free chat (AI, beta)" + (rec.ai && rec.ai.best ? " ✓" : ""), startAi, ""); b.setAttribute("aria-pressed", !!(talk && talk.ai)); box.append(b); }
  for (const t of sorted) {
    const r = rec[t.id], b = button((r && r.done ? "✓ " : "") + t.title + (t.nights.includes(n) ? " ★" : ""), () => startTalk(t.id), "");
    b.setAttribute("aria-pressed", talk && talk.script.id === t.id); box.append(b);
  }
}
$("#talk-mic").onclick = () => { if (!talk) { note("Pick a conversation first.", "bad", "#talk-status"); return; } listen($("#talk-mic"), "#talk-status", userSaid); };
$("#talk-send").onclick = () => { const t = $("#talk-type").value.trim(); if (!t) { note("Type your answer first, or tap 🎤.", "bad", "#talk-status"); return; } if (!talk) { note("Pick a conversation first.", "bad", "#talk-status"); return; } $("#talk-type").value = ""; userSaid([{t, c:1}]); };
$("#talk-type").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $("#talk-send").click(); } });
$("#talk-hintb").onclick = () => { if (!talk) return; showHint($("#talk-hint").hidden); };
$("#talk-again").onclick = () => { const last = talk && talk.lastLine; if (last) speak(last.es, 0.6); else note("Your turn first: say hello.", "", "#talk-status"); };
$("#talk-skip").onclick = () => { if (!talk) return; const n = talk.script.nodes[talk.node], h = currentHint(); if (h) userSaid([{t:h.es, c:1}]); else if (talk.ai) note("Say anything, even “No sé” (I don't know).", "", "#talk-status"); else { const e = n.expect[0]; talk.node = val(e.next, talk.vars, ""); if (talk.node === "END") endTalk(true); else herSays(val(e.reply, talk.vars, "")); } };
$("#talk-stop").onclick = () => endTalk(false);
$("#talk-en").onchange = () => $("#talk-chat").querySelectorAll(".bub.her .en").forEach(e => e.hidden = !$("#talk-en").checked);
try { $("#talk-hands").checked = localStorage.getItem("sofia-talk-hands") === "1"; $("#talk-en").checked = localStorage.getItem("sofia-talk-en") !== "0"; } catch(_){}
$("#talk-hands").addEventListener("change", () => { try { localStorage.setItem("sofia-talk-hands", $("#talk-hands").checked ? "1" : "0"); } catch(_){} });
$("#talk-en").addEventListener("change", () => { try { localStorage.setItem("sofia-talk-en", $("#talk-en").checked ? "1" : "0"); } catch(_){} });
nightSel.addEventListener("change", renderTalkPicker);
renderTalkPicker();
