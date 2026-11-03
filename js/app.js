(function () {
  'use strict';
  const D = window.DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local
  const addDays = (d, n) => { const x = new Date(d + 'T00:00:00'); x.setDate(x.getDate() + n); return x.toLocaleDateString('en-CA'); };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------------- Storage ----------------
  const KEY = 'pte55-v1';
  let S;
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
    S.start = S.start || today();
    S.days = S.days || {};
    S.cards = S.cards || {};
    S.scores = S.scores || [];
    S.rate = S.rate || 0.9;
    S.ptr = S.ptr || {};
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
  function bump(task, n = 1) { const d = (S.days[today()] = S.days[today()] || {}); d[task] = (d[task] || 0) + n; save(); }
  function logScore(task, score) { S.scores.push({ t: task, s: Math.round(score), d: today() }); if (S.scores.length > 600) S.scores = S.scores.slice(-600); save(); }
  function next(key, len) { const i = (S.ptr[key] || 0) % len; S.ptr[key] = i + 1; save(); return i; }

  // ---------------- Speech out (TTS) ----------------
  let voice = null;
  function pickVoice() {
    const vs = speechSynthesis.getVoices();
    const pref = ['en-AU', 'en-GB', 'en-US'];
    for (const p of pref) { const v = vs.find((x) => x.lang.replace('_', '-') === p && /natural|google|online|karen|catherine|lee/i.test(x.name)) || vs.find((x) => x.lang.replace('_', '-') === p); if (v) { voice = v; return; } }
    voice = vs.find((x) => /^en/i.test(x.lang)) || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, rate) {
    return new Promise((res) => {
      if (!('speechSynthesis' in window)) return res();
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = voice ? voice.lang : 'en-AU';
      u.rate = rate || S.rate;
      u.onend = u.onerror = () => res();
      speechSynthesis.speak(u);
    });
  }
  const stopSpeak = () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); };

  // ---------------- Speech in (recognition) ----------------
  const Recog = window.SpeechRecognition || window.webkitSpeechRecognition;
  function startRecog(onInterim) {
    if (!Recog) return null;
    const r = new Recog();
    r.lang = 'en-AU'; r.interimResults = true; r.continuous = true; r.maxAlternatives = 1;
    let finalText = '', interim = '', done, stopped = false, err = null;
    const p = new Promise((res) => (done = res));
    r.onresult = (e) => {
      interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += ' ' + e.results[i][0].transcript; else interim += ' ' + e.results[i][0].transcript;
      }
      onInterim && onInterim((finalText + ' ' + interim).trim());
    };
    r.onerror = (e) => { err = e.error; };
    r.onend = () => { if (!stopped && !err) { try { r.start(); return; } catch (x) { /* fallthrough */ } } done({ text: (finalText + ' ' + interim).trim(), error: err }); };
    try { r.start(); } catch (e) { return null; }
    return { stop: () => { stopped = true; try { r.stop(); } catch (e) { done({ text: finalText.trim(), error: err }); } return p; } };
  }

  // ---------------- Audio recorder (for listening to yourself) ----------------
  async function startRecorder() {
    if (!navigator.mediaDevices || !window.MediaRecorder) throw new Error('nomedia');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream); const parts = [];
    rec.ondataavailable = (e) => e.data.size && parts.push(e.data);
    rec.start();
    return { stop: () => new Promise((res) => { rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); res(URL.createObjectURL(new Blob(parts, { type: rec.mimeType || 'audio/webm' }))); }; rec.stop(); }) };
  }

  // ---------------- Compare words ----------------
  const words = (s) => String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
  function compare(target, said) {
    const a = words(target), b = words(said);
    const n = a.length, m = b.length; const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const hit = new Array(n).fill(false); let i = 0, j = 0;
    while (i < n && j < m) { if (a[i] === b[j]) { hit[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
    const tokens = String(target).split(/\s+/).filter(Boolean); let k = 0;
    const html = tokens.map((t) => { const w = words(t); if (!w.length) return esc(t); const ok = w.every(() => hit[k++]); return `<span class="${ok ? 'ok' : 'miss'}">${esc(t)}</span>`; }).join(' ');
    const pct = n ? (hit.filter(Boolean).length / n) * 100 : 0;
    return { pct, html, hits: hit.filter(Boolean).length, total: n };
  }
  function verdict(p) {
    if (p >= 90) return ['great', 'Маш сайн! 👏'];
    if (p >= 70) return ['good', 'Сайн байна. Улаан үгсээ дахин хэлж үз.'];
    if (p >= 50) return ['mid', 'Дунд. Удаан сонсоод дахин оролд.'];
    return ['low', 'Дахин оролдоё. Эхлээд удаан хурдаар сонс.'];
  }

  // ---------------- Cleanup between pages ----------------
  let cleanups = [];
  const onLeave = (fn) => cleanups.push(fn);
  function leave() { cleanups.forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); cleanups = []; stopSpeak(); }

  // ---------------- Timer ----------------
  function countdown(el, secs, label, cls) {
    return new Promise((res) => {
      let left = secs; let cancelled = false;
      el.innerHTML = `<div class="timer ${cls || ''}"><div class="tlabel">${label}</div><div class="tbar"><i style="width:100%"></i></div><div class="tnum">${left}s</div><button class="btn ghost sm skip">Алгасах ⏭</button></div>`;
      const bar = $('i', el), num = $('.tnum', el);
      const id = setInterval(() => { left--; bar.style.width = (left / secs) * 100 + '%'; num.textContent = left + 's'; if (left <= 0) end(); }, 1000);
      function end() { if (cancelled) return; cancelled = true; clearInterval(id); el.innerHTML = ''; res(); }
      $('.skip', el).onclick = end;
      onLeave(() => { cancelled = true; clearInterval(id); });
    });
  }

  // ---------------- Mic widget (speak → recognise → compare) ----------------
  // opts: target (string|null), max (secs), label, onDone({text,pct})
  function micWidget(el, opts) {
    const max = opts.max || 40;
    el.innerHTML = `<div class="mic">
      <button class="btn mic-btn">🎤 ${opts.label || 'Ярих'}</button>
      <div class="live muted"></div><div class="mic-timer"></div><div class="result"></div></div>`;
    const btn = $('.mic-btn', el), live = $('.live', el), res = $('.result', el), tEl = $('.mic-timer', el);
    let session = null, tid = null;
    if (!Recog) {
      btn.outerHTML = `<div class="note">⚠️ Энэ браузер яриа таних боломжгүй. Android дээр <b>Chrome</b>, компьютер дээр <b>Chrome / Edge</b> ашиглаарай. Доорх "Бичиж сонсох"-оор өөрийгөө сонсож болно.</div>`;
      recWidget(res);
      return { start: () => {} };
    }
    async function start() {
      stopSpeak();
      res.innerHTML = ''; live.textContent = '...сонсож байна';
      session = startRecog((t) => (live.textContent = t));
      if (!session) { live.textContent = 'Микрофон эхлүүлж чадсангүй.'; return; }
      btn.textContent = '■ Дуусгах'; btn.classList.add('rec');
      let left = max; tEl.textContent = `⏱ ${left}s`;
      tid = setInterval(() => { left--; tEl.textContent = `⏱ ${left}s`; if (left <= 0) stop(); }, 1000);
    }
    async function stop() {
      if (!session) return; clearInterval(tid); tEl.textContent = '';
      btn.textContent = '🎤 Дахин ярих'; btn.classList.remove('rec');
      const s = session; session = null; const out = await s.stop();
      live.textContent = '';
      if (out.error && out.error !== 'no-speech' && out.error !== 'aborted') { res.innerHTML = `<div class="note">⚠️ Алдаа: ${esc(out.error)}. Микрофоны зөвшөөрөл өгсөн эсэхээ шалгаарай.</div>`; return; }
      let html = `<div class="said"><b>Таны хэлсэн (апп сонссон):</b> ${esc(out.text || '— юу ч сонсогдсонгүй —')}</div>`;
      let pct = null;
      if (opts.target) {
        const c = compare(opts.target, out.text); pct = c.pct; const [cls, msg] = verdict(pct);
        html = `<div class="score ${cls}"><b>${Math.round(pct)}%</b> үг таарсан · ${msg}</div><div class="diff">${c.html}</div>` + html;
      }
      res.innerHTML = html;
      opts.onDone && opts.onDone({ text: out.text, pct, el: res });
    }
    btn.onclick = () => (session ? stop() : start());
    onLeave(() => { clearInterval(tid); if (session) session.stop(); });
    return { start, stop };
  }

  // Record & play back yourself
  function recWidget(el) {
    const box = document.createElement('div'); box.className = 'recw';
    box.innerHTML = `<button class="btn ghost sm">⏺ Бичиж сонсох</button><span class="audio"></span>`; el.appendChild(box);
    const b = $('button', box), a = $('.audio', box); let r = null;
    b.onclick = async () => {
      if (r) { const url = await r.stop(); r = null; b.textContent = '⏺ Дахин бичих'; b.classList.remove('rec'); a.innerHTML = `<audio controls src="${url}"></audio>`; return; }
      try { r = await startRecorder(); b.textContent = '■ Зогсоох'; b.classList.add('rec'); a.innerHTML = ''; } catch (e) { a.textContent = 'Микрофон нээгдсэнгүй.'; }
    };
    onLeave(() => r && r.stop());
  }

  const speakBtns = (text, extra = '') => `<div class="row">
      <button class="btn sm say" data-say="${esc(text)}" data-rate="${S.rate}">🔊 Сонсох</button>
      <button class="btn ghost sm say" data-say="${esc(text)}" data-rate="0.65">🐢 Удаан</button>${extra}</div>`;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]'); if (!b) return;
    speak(b.dataset.say, parseFloat(b.dataset.rate));
  });

  // ---------------- Daily plan ----------------
  const PLAN = [
    { k: 'cards', n: 10, icon: '🧠', title: 'Chunk цээжлэх', mn: '10 карт давтах (шинэ + хуучин)', href: '#/cards' },
    { k: 'shadow', n: 6, icon: '🗣️', title: 'Shadowing', mn: '6 өгүүлбэр дагаж хэлэх', href: '#/shadow' },
    { k: 'ra', n: 3, icon: '📖', title: 'Read Aloud', mn: '3 текст чанга унших', href: '#/pte/ra' },
    { k: 'rs', n: 10, icon: '🔁', title: 'Repeat Sentence', mn: '10 өгүүлбэр давтах', href: '#/pte/rs' },
    { k: 'wfd', n: 8, icon: '✍️', title: 'Write From Dictation', mn: '8 өгүүлбэр сонсож бичих', href: '#/pte/wfd' },
    { k: 'di', n: 2, icon: '📊', title: 'Describe Image', mn: '2 зураг тайлбарлах', href: '#/pte/di', odd: true },
    { k: 'rl', n: 1, icon: '🎓', title: 'Retell Lecture', mn: '1 лекц дахин ярих', href: '#/pte/rl', even: true },
    { k: 'asq', n: 5, icon: '❓', title: 'Answer Short Question', mn: '5 богино асуулт', href: '#/pte/asq', even: true },
    { k: 'fib', n: 3, icon: '🧩', title: 'Reading Fill in the Blanks', mn: '3 дасгал', href: '#/pte/fib', odd: true },
  ];
  const dayNo = () => Math.floor((new Date(today()) - new Date(S.start)) / 864e5) + 1;
  function planToday() { const odd = dayNo() % 2 === 1; return PLAN.filter((p) => (p.odd ? odd : p.even ? !odd : true)); }
  function streak() { let n = 0, d = today(); if (!S.days[d]) d = addDays(d, -1); while (S.days[d]) { n++; d = addDays(d, -1); } return n; }

  // ---------------- Views ----------------
  const V = {};

  V.home = (root) => {
    const td = S.days[today()] || {}; const plan = planToday();
    const done = plan.filter((p) => (td[p.k] || 0) >= p.n).length;
    const week = Math.ceil(dayNo() / 7);
    const phase = week <= 4 ? ['1-р шат: Суурь', 'Chunk + shadowing-д анхаар. Удаан, тод ярь.'] : week <= 8 ? ['2-р шат: PTE хэлбэр', 'Цагтай дасгал. Template-ээ цээжил.'] : ['3-р шат: Шалгалтын горим', 'Бүтэн mock, сул даалгавраа давт.'];
    root.innerHTML = `
      <section class="hero">${SVG.scene('site')}<div>
        <h1>Өнөөдрийн дасгал</h1>
        <p class="muted">Өдөр ${dayNo()} · ${week}-р долоо хоног · 🔥 ${streak()} өдөр дараалан</p>
        <p><b>${phase[0]}</b> — ${phase[1]}</p>
        <div class="progress"><i style="width:${(done / plan.length) * 100}%"></i></div>
        <p class="muted">${done}/${plan.length} даалгавар дууссан · ~40 минут</p></div></section>
      <ul class="plan">${plan.map((p) => { const c = td[p.k] || 0; const ok = c >= p.n; return `<li class="${ok ? 'done' : ''}"><a href="${p.href}">
        <span class="ic">${ok ? '✅' : p.icon}</span><span><b>${p.title}</b><br><small>${p.mn}</small></span><span class="cnt">${Math.min(c, p.n)}/${p.n}</span></a></li>`; }).join('')}</ul>
      <div class="card tip"><b>💡 Өнөөдрийн зөвлөгөө</b><p>${TIPS[dayNo() % TIPS.length]}</p></div>`;
  };
  const TIPS = [
    'PTE машин <b>гөлгөр ярианд</b> (fluency) их оноо өгдөг. Алдсан үгээ засах гэж зогсохгүй, үргэлжлүүлээд яв.',
    'Repeat Sentence: бүх үгийг биш, <b>хэсэг хэсгээр (chunk)</b> санаж ав. "The library / will be closed / on public holidays."',
    'Write From Dictation нь Listening, Writing хоёуланд нь оноо өгдөг. Өдөр бүр хий!',
    'Shadowing хийхдээ үгийг биш, <b>аялга, хэмнэлийг</b> дуурай. Дуучин шиг.',
    'Describe Image: бүх тоог хэлэх гэж битгий оролд. Хамгийн их, хамгийн бага, ерөнхий хандлага — хангалттай.',
    'Ажил дээрээ өдөрт 3 шинэ хэллэгийг заавал хэрэглэ. Ярьсан зүйл л цээжинд үлддэг.',
    'Микрофоноос 2-3 см зайтай, тогтмол дуугаар ярь. Хэт чанга, хэт намуун байж болохгүй.',
    'Төгсгөлийн "s", "ed"-ийг тод хэл: works, worked, bars, tied.',
  ];

  // ----- Chunks -----
  V.chunks = (root, cat) => {
    if (!cat) {
      root.innerHTML = `<h1>Chunk — бэлэн хэллэг</h1>
        <p class="muted">Ганц үг биш, <b>бүтэн хэллэгээр</b> цээжил. Сонс → дагаж хэл → өөрөө хэл. Дараа нь <a href="#/cards">карт</a>-аар давт.</p>
        <div class="grid">${D.chunkCats.map((c) => { const n = D.chunks.filter((x) => x.cat === c.id).length; return `<a class="tile" href="#/chunks/${c.id}">${SVG.scene(c.scene)}<b>${c.mn}</b><small>${c.en} · ${n} хэллэг</small></a>`; }).join('')}</div>`;
      return;
    }
    const c = D.chunkCats.find((x) => x.id === cat); if (!c) return go('#/chunks');
    const list = D.chunks.map((x, i) => ({ ...x, i })).filter((x) => x.cat === cat);
    root.innerHTML = `<a href="#/chunks" class="back">← Бүх ангилал</a><h1>${c.mn}</h1><div class="scene-wide">${SVG.scene(c.scene)}</div>
      <div class="row"><button class="btn" id="playall">▶ Бүгдийг дараалан сонсох</button><a class="btn ghost" href="#/cards">🧠 Карт давтах</a></div>
      ${list.map((x) => `<div class="card chunk"><div class="en">${esc(x.en)}</div><div class="mn">${esc(x.mn)}</div>
        <div class="ex">📝 ${esc(x.ex)}</div>${speakBtns(x.en, `<button class="btn ghost sm say" data-say="${esc(x.ex)}" data-rate="${S.rate}">🔊 Жишээ</button>`)}<div class="mw" data-t="${esc(x.en)}"></div></div>`).join('')}`;
    $$('.mw', root).forEach((el) => micWidget(el, { target: el.dataset.t, max: 8, label: 'Хэлж үзэх', onDone: (r) => { if (r.pct != null) bump('chunk'); } }));
    let stopped = false; onLeave(() => (stopped = true));
    $('#playall').onclick = async () => { for (const x of list) { if (stopped) break; await speak(x.en); await new Promise((r) => setTimeout(r, 2500)); } };
  };

  // ----- Flashcards (spaced repetition) -----
  const BOX = [0, 1, 2, 4, 7, 15, 30];
  V.cards = (root) => {
    const t = today(); const due = []; const fresh = [];
    D.chunks.forEach((x, i) => { const c = S.cards[i]; if (!c) fresh.push(i); else if (c.due <= t) due.push(i); });
    const queue = shuffle(due).concat(fresh.slice(0, 8));
    const learned = Object.values(S.cards).filter((c) => c.box >= 3).length;
    if (!queue.length) { root.innerHTML = `<h1>🧠 Карт</h1><div class="card"><p>Өнөөдрийн давталт дууслаа! 🎉 Маргааш дахин ороорой.</p><p class="muted">Цээжилсэн: ${learned}/${D.chunks.length}</p></div>`; return; }
    let qi = 0;
    function show() {
      if (qi >= queue.length) return V.cards(root);
      const i = queue[qi], x = D.chunks[i], c = S.cards[i];
      root.innerHTML = `<h1>🧠 Карт</h1><p class="muted">${qi + 1}/${queue.length} · Цээжилсэн: ${learned}/${D.chunks.length} ${c ? '' : '· <span class="tag">ШИНЭ</span>'}</p>
        <div class="card flash"><div class="small">${D.chunkCats.find((k) => k.id === x.cat).mn}</div>
          <div class="mn big">${esc(x.mn)}</div><p class="muted">Англиар чангаар хэл, дараа нь хариугаа хар.</p>
          <div class="mw"></div>
          <button class="btn" id="reveal">👁 Хариу харах</button><div id="ans"></div></div>`;
      micWidget($('.mw', root), { target: x.en, max: 8, label: 'Англиар хэлэх' });
      $('#reveal').onclick = () => {
        speak(x.en);
        $('#reveal').remove();
        $('#ans').innerHTML = `<div class="en big">${esc(x.en)}</div><div class="ex">📝 ${esc(x.ex)}</div>${speakBtns(x.en)}
          <div class="row grade"><button class="btn bad" data-g="0">😕 Мэдэхгүй</button><button class="btn mid" data-g="1">🙂 Арай</button><button class="btn good" data-g="2">😎 Мэднэ</button></div>`;
        $$('[data-g]', root).forEach((b) => (b.onclick = () => {
          const g = +b.dataset.g; const cur = S.cards[i] || { box: 0 };
          const box = g === 0 ? 1 : g === 1 ? Math.max(1, cur.box) : Math.min(BOX.length - 1, cur.box + 1);
          S.cards[i] = { box, due: addDays(t, g === 0 ? 0 : BOX[box]) };
          if (g === 0) queue.push(i);
          bump('cards'); qi++; show();
        }));
      };
    }
    show();
  };

  // ----- Shadowing -----
  V.shadow = (root, id) => {
    if (!id) {
      const suggested = D.shadow[(dayNo() - 1) % D.shadow.length].id;
      root.innerHTML = `<h1>🗣️ Shadowing — дагаж хэлэх</h1>
        <div class="card how"><b>Яаж хийх вэ?</b><ol>
          <li><b>Сонс</b> — эхлээд Монгол орчуулгатай нь ойлго.</li>
          <li><b>Удаан хурдаар</b> сонсоод араас нь хэл.</li>
          <li><b>Зэрэг хэл</b> — бичлэгтэй <i>яг зэрэг</i>, сүүдэр шиг дагаж хэл.</li>
          <li><b>Өөрөө хэл</b> — 🎤 дарж шалгуул. Ногоон = зөв, улаан = дахин.</li></ol>
          <p class="muted">Өдөрт 10–15 минут. Нэг текстийг 3–5 өдөр давтвал цээжинд үлдэнэ.</p></div>
        <div class="list">${D.shadow.map((s) => `<a class="item ${s.id === suggested ? 'sugg' : ''}" href="#/shadow/${s.id}"><span class="lvl">${s.level}</span><span><b>${s.title}</b><br><small>${s.mn}</small></span>${s.id === suggested ? '<span class="tag">Өнөөдөр</span>' : ''}</a>`).join('')}</div>`;
      return;
    }
    const s = D.shadow.find((x) => x.id === id); if (!s) return go('#/shadow');
    root.innerHTML = `<a href="#/shadow" class="back">← Бүх текст</a><h1>${s.title}</h1><p class="muted">${s.mn} · ${s.level}</p>
      <div class="scene-wide">${SVG.scene(s.scene)}</div>
      <div class="row"><button class="btn" id="all">▶ Бүтнээр сонсох</button><button class="btn ghost" id="loop">🔁 Shadow горим (дараалан, завсартай)</button>
        <label class="chk"><input type="checkbox" id="hidemn"> Монгол нуух</label><label class="chk"><input type="checkbox" id="hideen"> Англи нуух</label></div>
      ${s.lines.map(([en, mn], i) => `<div class="card line" id="l${i}"><div class="en">${esc(en)}</div><div class="mn">${esc(mn)}</div>
        ${speakBtns(en)}<div class="mw" data-t="${esc(en)}"></div></div>`).join('')}
      <div id="recall" class="card"><b>Шалгалт:</b> Бүх текстийг харахгүйгээр нэг дор хэлж үз.<div class="mw-all"></div></div>`;
    $$('.mw', root).forEach((el) => micWidget(el, { target: el.dataset.t, max: 12, label: 'Хэлж үзэх', onDone: (r) => { if (r.pct != null) { bump('shadow'); logScore('shadow', r.pct); } } }));
    micWidget($('.mw-all', root), { target: s.lines.map((l) => l[0]).join(' '), max: 60, label: 'Бүтнээр хэлэх', onDone: (r) => r.pct != null && logScore('shadow', r.pct) });
    recWidget($('#recall', root));
    $('#hidemn').onchange = (e) => root.classList.toggle('hide-mn', e.target.checked);
    $('#hideen').onchange = (e) => root.classList.toggle('hide-en', e.target.checked);
    let stopped = false; onLeave(() => { stopped = true; root.classList.remove('hide-mn', 'hide-en'); });
    const hl = (i) => { $$('.line', root).forEach((x) => x.classList.remove('now')); const el = $('#l' + i); if (el) { el.classList.add('now'); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } };
    $('#all').onclick = async () => { stopped = false; for (let i = 0; i < s.lines.length && !stopped; i++) { hl(i); await speak(s.lines[i][0]); } hl(-1); };
    $('#loop').onclick = async () => {
      stopped = false;
      for (let i = 0; i < s.lines.length && !stopped; i++) {
        hl(i); await speak(s.lines[i][0]);
        // pause roughly as long as the sentence so the learner can repeat
        await new Promise((r) => setTimeout(r, 900 + s.lines[i][0].length * 70));
        bump('shadow');
      }
      hl(-1);
    };
  };

  // ----- PTE menu -----
  const TASKS = [
    { k: 'ra', icon: '📖', t: 'Read Aloud', mn: 'Текстийг чангаар унших', w: 'Speaking + Reading', time: 'Бэлтгэл 30с · Ярих 40с' },
    { k: 'rs', icon: '🔁', t: 'Repeat Sentence', mn: 'Сонссон өгүүлбэрээ давтах', w: 'Speaking + Listening ⭐', time: 'Ярих 15с' },
    { k: 'di', icon: '📊', t: 'Describe Image', mn: 'Зураг, график тайлбарлах', w: 'Speaking', time: 'Бэлтгэл 25с · Ярих 40с' },
    { k: 'rl', icon: '🎓', t: 'Retell Lecture', mn: 'Лекц сонсоод дахин ярих', w: 'Speaking + Listening', time: 'Бэлтгэл 10с · Ярих 40с' },
    { k: 'asq', icon: '❓', t: 'Answer Short Question', mn: 'Богино асуултад 1-2 үгээр хариулах', w: 'Speaking + Listening', time: 'Ярих 10с' },
    { k: 'rts', icon: '💬', t: 'Respond to a Situation', mn: 'Нөхцөл байдалд хариулах', w: 'Speaking + Listening', time: 'Бэлтгэл 20с · Ярих 40с' },
    { k: 'wfd', icon: '✍️', t: 'Write From Dictation', mn: 'Сонссон өгүүлбэрээ бичих', w: 'Listening + Writing ⭐', time: '~1 мин' },
    { k: 'fib', icon: '🧩', t: 'Reading: Fill in the Blanks', mn: 'Зөв үгийг сонгох', w: 'Reading + Writing', time: '~2 мин' },
    { k: 'write', icon: '📝', t: 'Essay & Summarise (templates)', mn: 'Эссэ, хураангуйн загвар', w: 'Writing', time: '10–20 мин' },
  ];
  V.pte = (root, k) => {
    if (!k) {
      root.innerHTML = `<h1>🎯 PTE даалгаврууд</h1><p class="muted">⭐ = 55 оноонд хамгийн их нөлөөтэй. Өдөр бүр хий.</p>
        <div class="list">${TASKS.map((x) => `<a class="item" href="#/pte/${x.k}"><span class="ic">${x.icon}</span><span><b>${x.t}</b><br><small>${x.mn} · ${x.w}</small></span><small class="muted">${x.time}</small></a>`).join('')}</div>`;
      return;
    }
    (PTE[k] || (() => go('#/pte')))(root);
  };
  const header = (k, strat) => { const x = TASKS.find((t) => t.k === k); return `<a href="#/pte" class="back">← PTE</a><h1>${x.icon} ${x.t}</h1><p class="muted">${x.mn} · ${x.time}</p><details class="card how"><summary>📌 Стратеги (Монголоор)</summary>${strat}</details>`; };
  const nextBtn = '<button class="btn ghost" id="nx">Дараагийн ➡</button>';

  const PTE = {};
  PTE.ra = (root) => {
    const i = next('ra', D.readAloud.length); const text = D.readAloud[i];
    root.innerHTML = header('ra', `<ul><li>30 секундэд чимээгүй уншаад, хаана амсхийхээ (таслал, цэг) тэмдэглэ.</li><li>Дуу хоолой <b>тогтмол, гөлгөр</b> байх нь хамгийн чухал. Буруу хэлсэн үгээ засахгүй — үргэлжлүүл.</li><li>Мэдэхгүй үгийг итгэлтэйгээр хурдан хэлээд өнгөр.</li><li>Хэт хурдан биш, ярианы энгийн хурдаар.</li></ul>`) +
      `<div class="card passage">${esc(text)}</div><div id="tm"></div><div class="row"><button class="btn" id="go">▶ Шалгалтын горимоор эхлэх</button>${nextBtn}</div>
       <details><summary>🔊 Загвар уншлага сонсох</summary>${speakBtns(text)}</details><div id="mw"></div>`;
    const m = micWidget($('#mw', root), { target: text, max: 40, label: 'Унших', onDone: (r) => { if (r.pct != null) { bump('ra'); logScore('ra', r.pct); } } });
    $('#go').onclick = async () => { $('#go').disabled = true; await countdown($('#tm', root), 30, 'Бэлтгэл — чимээгүй унш', 'prep'); m.start(); };
    $('#nx').onclick = () => V.pte(root, 'ra');
  };
  PTE.rs = (root) => {
    const i = next('rs', D.repeat.length); const text = D.repeat[i];
    root.innerHTML = header('rs', `<ul><li>Өгүүлбэрийг <b>3 хэсэг</b> болгож сонс: "The library / will be closed / on public holidays."</li><li>Бүгдийг санахгүй бол санасан хэсгээ <b>гөлгөр, итгэлтэй</b> хэл. Чимээгүй байх нь 0 оноо.</li><li>Аялгыг нь дуурай — PTE pronunciation, fluency хоёрыг үнэлдэг.</li></ul>`) +
      `<div class="row"><button class="btn" id="play">▶ Сонсох (1 удаа)</button>${nextBtn}</div><div id="mw"></div>
       <details id="ans"><summary>👁 Өгүүлбэрийг харах</summary><div class="passage">${esc(text)}</div>${speakBtns(text)}</details>`;
    const m = micWidget($('#mw', root), { target: text, max: 15, label: 'Давтах', onDone: (r) => { if (r.pct != null) { bump('rs'); logScore('rs', r.pct); } $('#ans').open = true; } });
    $('#play').onclick = async () => { $('#play').disabled = true; await speak(text); setTimeout(() => m.start(), 300); };
    $('#nx').onclick = () => V.pte(root, 'rs');
  };
  PTE.wfd = (root) => {
    const i = next('wfd', D.repeat.length); const text = D.repeat[(i * 7 + 3) % D.repeat.length];
    root.innerHTML = header('wfd', `<ul><li>Сонсох зуураа эхний үсгүүдийг нь хурдан тэмдэглэ: "T l w b c o p h".</li><li>Дараа нь бүтэн бич. <b>Зөв бичсэн үг бүр оноо</b> — дүрмийн (-s, -ed) алдаанаас болгоомжил.</li><li>Том үсэг, цэг тавь. Хоёрдмол утгатай бол хоёулангийн хувилбарыг бичихгүй.</li></ul>`) +
      `<div class="row"><button class="btn" id="play">▶ Сонсох</button><button class="btn ghost sm say" data-say="${esc(text)}" data-rate="0.65">🐢 Удаан</button>${nextBtn}</div>
       <textarea id="ta" rows="3" placeholder="Сонссон өгүүлбэрээ энд бич..." autocapitalize="sentences" spellcheck="false"></textarea>
       <button class="btn" id="chk">✔ Шалгах</button><div id="out"></div>`;
    $('#play').onclick = () => speak(text);
    $('#chk').onclick = () => {
      const c = compare(text, $('#ta').value); const [cls, msg] = verdict(c.pct);
      $('#out').innerHTML = `<div class="score ${cls}"><b>${c.hits}/${c.total}</b> үг зөв · ${msg}</div><div class="diff">${c.html}</div>`;
      bump('wfd'); logScore('wfd', c.pct);
    };
    $('#nx').onclick = () => V.pte(root, 'wfd');
  };
  function diModel(img) {
    if (img.type === 'process') {
      const s = img.steps.map((x) => x.charAt(0).toLowerCase() + x.slice(1));
      return `The diagram shows ${img.title.toLowerCase()}. There are ${img.steps.length} main stages. First, we ${s[0]}. Next, we ${s[1]}. Then, we ${s[2]}. After that, we ${s[3]}. Finally, we ${s[4]}. In conclusion, the process is simple but each step is important.`;
    }
    const u = img.unit; const v = img.values; const l = img.labels;
    const mx = v.indexOf(Math.max(...v)), mn = v.indexOf(Math.min(...v));
    const t = img.title.replace(/\s*\(.*?\)\s*/g, ' ').trim();
    const kind = img.type === 'pie' ? 'pie chart' : img.type === 'line' ? 'line graph' : 'bar chart';
    let s = `The ${kind} shows ${t.charAt(0).toLowerCase() + t.slice(1)}. `;
    if (img.type === 'pie') {
      const order = v.map((x, i) => i).sort((a, b) => v[b] - v[a]);
      s += `The largest share is ${l[order[0]]}, at ${v[order[0]]} ${u}. This is followed by ${l[order[1]]}, with ${v[order[1]]} ${u}. The smallest share is ${l[mn]}, at only ${v[mn]} ${u}. `;
      s += `Overall, ${l[order[0]]} and ${l[order[1]]} make up the majority. `;
    } else {
      s += `The highest figure is ${l[mx]}, at ${v[mx]} ${u}. The lowest figure is ${l[mn]}, at ${v[mn]} ${u}. `;
      const first = v[0], last = v[v.length - 1];
      s += `From ${l[0]} to ${l[l.length - 1]}, the figure ${last > first ? 'increased' : last < first ? 'decreased' : 'stayed the same'} from ${first} to ${last}. `;
    }
    return s + `In conclusion, the chart gives useful information about ${t.charAt(0).toLowerCase() + t.slice(1)}.`;
  }
  PTE.di = (root) => {
    const i = next('di', D.images.length); const img = D.images[i]; const model = diModel(img);
    root.innerHTML = header('di', `<p><b>Загвар (цээжил!):</b></p><ol><li><i>The chart shows ...</i> (гарчиг)</li><li><i>The highest figure is ... at ...</i></li><li><i>The lowest figure is ... at ...</i></li><li><i>Overall, there was an increase / a decrease ...</i></li><li><i>In conclusion, the chart gives useful information about ...</i></li></ol><p>Бүх тоог хэлэх шаардлагагүй. 40 секундийг <b>зогсолтгүй</b> дүүргэ.</p>`) +
      `<div class="chartbox">${SVG.chart(img)}</div><div id="tm"></div><div class="row"><button class="btn" id="go">▶ Шалгалтын горим (25с + 40с)</button>${nextBtn}</div>
       <div id="mw"></div><details><summary>⭐ Загвар хариулт</summary><div class="passage">${esc(model)}</div>${speakBtns(model)}</details>`;
    const m = micWidget($('#mw', root), { target: null, max: 40, label: 'Тайлбарлах', onDone: (r) => {
      const n = words(r.text).length; const kw = (img.labels || img.steps).filter((l) => words(r.text).join(' ').includes(words(l).join(' '))).length;
      r.el.insertAdjacentHTML('afterbegin', `<div class="score ${n >= 60 ? 'great' : n >= 40 ? 'good' : 'mid'}"><b>${n}</b> үг хэлсэн (зорилт 60–90) · ${kw} шошго дурдсан</div>`);
      bump('di'); logScore('di', Math.min(100, (n / 70) * 100));
    } });
    $('#go').onclick = async () => { $('#go').disabled = true; await countdown($('#tm', root), 25, 'Бэлтгэл — зургийг ажигла', 'prep'); m.start(); };
    $('#nx').onclick = () => V.pte(root, 'di');
  };
  PTE.rl = (root) => {
    const i = next('rl', D.lectures.length); const L = D.lectures[i];
    const tpl = `The speaker was talking about ${L.title.toLowerCase()}. He mentioned that ... He also said that ... In addition, ... In conclusion, the speaker gave useful information about ${L.title.toLowerCase()}.`;
    root.innerHTML = header('rl', `<ul><li>Сонсох зуураа <b>түлхүүр үг</b> (нэр үг, тоо) тэмдэглэ.</li><li>Загвар: <i>The speaker was talking about ... He mentioned that ... He also said ... In conclusion ...</i></li><li>Тэмдэглэсэн үгээ загварт оруулаад 40с зогсолтгүй ярь.</li></ul>`) +
      `<div class="row"><button class="btn" id="play">▶ Лекц сонсох</button>${nextBtn}</div>
       <textarea id="notes" rows="3" placeholder="Түлхүүр үгээ энд тэмдэглэ..."></textarea><div id="tm"></div>
       <div class="card"><b>Загвар:</b> <span class="muted">${esc(tpl)}</span></div><div id="mw"></div>
       <details><summary>👁 Лекцийн текст ба түлхүүр үгс</summary><div class="passage">${esc(L.text)}</div><p>🔑 ${L.keys.map(esc).join(' · ')}</p></details>`;
    const m = micWidget($('#mw', root), { target: null, max: 40, label: 'Дахин ярих', onDone: (r) => {
      const said = words(r.text).join(' '); const hit = L.keys.filter((k) => words(k).some((w) => w.length > 3 && said.includes(w)));
      r.el.insertAdjacentHTML('afterbegin', `<div class="score ${hit.length >= 5 ? 'great' : hit.length >= 3 ? 'good' : 'mid'}">🔑 Түлхүүр санаа: <b>${hit.length}/${L.keys.length}</b> · ${words(r.text).length} үг</div>`);
      bump('rl'); logScore('rl', (hit.length / L.keys.length) * 100);
    } });
    $('#play').onclick = async () => { $('#play').disabled = true; await speak(L.text, Math.min(S.rate, 0.95)); await countdown($('#tm', root), 10, 'Бэлтгэл', 'prep'); m.start(); };
    $('#nx').onclick = () => V.pte(root, 'rl');
  };
  PTE.asq = (root) => {
    const i = next('asq', D.shortQ.length); const q = D.shortQ[i];
    root.innerHTML = header('asq', `<ul><li>Ганц үг эсвэл богино хэллэгээр хариул: "mechanic", "seven".</li><li>Бүтэн өгүүлбэр шаардлагагүй. Мэдэхгүй бол таамаглаад хэл.</li></ul>`) +
      `<div class="row"><button class="btn" id="play">▶ Асуулт сонсох</button>${nextBtn}</div><div id="mw"></div>
       <details id="ans"><summary>👁 Асуулт ба хариулт</summary><p>${esc(q.q)}</p><p><b>✔ ${q.a.map(esc).join(' / ')}</b></p></details>`;
    const m = micWidget($('#mw', root), { target: null, max: 10, label: 'Хариулах', onDone: (r) => {
      const said = words(r.text).join(' '); const ok = q.a.some((a) => said.includes(a));
      r.el.insertAdjacentHTML('afterbegin', `<div class="score ${ok ? 'great' : 'low'}">${ok ? '✔ Зөв!' : '✘ Буруу. Зөв хариулт: ' + esc(q.a[0])}</div>`);
      $('#ans').open = true; bump('asq'); logScore('asq', ok ? 100 : 0);
    } });
    $('#play').onclick = async () => { await speak(q.q); m.start(); };
    $('#nx').onclick = () => V.pte(root, 'asq');
  };
  PTE.rts = (root) => {
    const i = next('rts', D.situations.length); const x = D.situations[i];
    root.innerHTML = header('rts', `<ul><li>Хэнтэй ярьж байгаагаа санаарай: <b>мэндчил → асуудлаа хэл → шалтгаан → санал/хүсэлт → талархал</b>.</li><li>Эелдэг хэллэг: <i>Sorry to bother you · Would you mind ...? · I'd really appreciate it.</i></li></ul>`) +
      `<div class="card passage">${esc(x.s)}<div class="mn">${esc(x.mn)}</div></div>${speakBtns(x.s)}
       <div id="tm"></div><div class="row"><button class="btn" id="go">▶ Эхлэх (20с + 40с)</button>${nextBtn}</div><div id="mw"></div>
       <details><summary>⭐ Загвар хариулт</summary><div class="passage">${esc(x.model)}</div>${speakBtns(x.model)}</details>`;
    const m = micWidget($('#mw', root), { target: null, max: 40, label: 'Хариулах', onDone: (r) => { const n = words(r.text).length; r.el.insertAdjacentHTML('afterbegin', `<div class="score ${n >= 50 ? 'great' : n >= 30 ? 'good' : 'mid'}"><b>${n}</b> үг (зорилт 50+)</div>`); bump('rts'); logScore('rts', Math.min(100, n * 2)); } });
    $('#go').onclick = async () => { $('#go').disabled = true; await countdown($('#tm', root), 20, 'Бэлтгэл', 'prep'); m.start(); };
    $('#nx').onclick = () => V.pte(root, 'rts');
  };
  PTE.fib = (root) => {
    const i = next('fib', D.fib.length); const f = D.fib[i];
    let html = esc(f.text); f.blanks.forEach((opts, k) => { html = html.replace(`{${k}}`, `<select data-k="${k}"><option value="">—</option>${shuffle(opts).map((o) => `<option>${o}</option>`).join('')}</select>`); });
    root.innerHTML = header('fib', `<ul><li>Өмнөх, дараах үгийг хар: <i>the ___</i> → нэр үг, <i>to ___</i> → үйл үг, <i>more ___</i> → тэмдэг/дайвар үг.</li><li>Collocation: <i>make a decision, have an impact, play a role</i>.</li></ul>`) +
      `<div class="card passage fib">${html}</div><div class="row"><button class="btn" id="chk">✔ Шалгах</button>${nextBtn}</div><div id="out"></div>`;
    $('#chk').onclick = () => {
      let ok = 0; $$('select', root).forEach((s) => { const good = s.value === f.answer[+s.dataset.k]; s.classList.toggle('right', good); s.classList.toggle('wrong', !good); if (good) ok++; });
      $('#out').innerHTML = `<div class="score ${ok === f.answer.length ? 'great' : 'mid'}">${ok}/${f.answer.length} зөв · Хариулт: ${f.answer.join(', ')}</div>`;
      bump('fib'); logScore('fib', (ok / f.answer.length) * 100);
    };
    $('#nx').onclick = () => V.pte(root, 'fib');
  };
  const ESSAYS = [
    'Some people think that young people should learn a trade instead of going to university. To what extent do you agree or disagree?',
    'Working from home has become more common. Discuss the advantages and disadvantages for workers and employers.',
    'Governments should spend more money on public transport than on building new roads. Do you agree?',
  ];
  PTE.write = (root) => {
    root.innerHTML = header('write', `<p>Эдгээрийг апп автоматаар үнэлэхгүй. Загвараа цээжилж, цагтай бичиж дасгал хий.</p>`) +
      `<div class="card"><h3>Summarize Written Text (10 мин, 1 өгүүлбэр, 5–75 үг)</h3>
        <p class="passage">Загвар: <i>The passage discusses <b>[гол сэдэв]</b>, explaining that <b>[санаа 1]</b>, and although <b>[санаа 2]</b>, <b>[дүгнэлт]</b>.</i></p></div>
       <div class="card"><h3>Essay (20 мин, 200–300 үг)</h3><ol class="tpl">
        <li><b>Оршил:</b> <i>Nowadays, [сэдэв] is an important issue. In my opinion, [байр суурь]. This essay will explain why.</i></li>
        <li><b>Бие 1:</b> <i>Firstly, ... For example, ... As a result, ...</i></li>
        <li><b>Бие 2:</b> <i>Secondly, ... For instance, ... Therefore, ...</i></li>
        <li><b>Дүгнэлт:</b> <i>In conclusion, I believe that ... because ...</i></li></ol>
        <p class="muted">Энгийн, алдаагүй өгүүлбэр > урт, төвөгтэй өгүүлбэр. Үгийн тоо 200–300 дотор байлга!</p></div>
       <div class="card"><b>Сэдэв:</b> <span id="topic">${esc(ESSAYS[next('essay', ESSAYS.length)])}</span>
        <textarea id="ta" rows="10" placeholder="Энд бич..."></textarea><div class="row"><span id="wc" class="muted">0 үг</span></div></div>`;
    $('#ta').oninput = (e) => { const n = words(e.target.value).length; $('#wc').textContent = `${n} үг ${n < 200 ? '(хэт цөөн)' : n > 300 ? '(хэт олон)' : '✔'}`; };
  };

  // ----- Guide -----
  V.guide = (root) => {
    root.innerHTML = `<h1>📘 PTE 55 гарын авлага</h1>
      <div class="card"><h3>55 оноо гэж юу вэ?</h3><p>PTE Academic 10–90 оноотой. <b>55</b> бол дунд түвшин: энгийн сэдвээр ойлгогдохуйц ярьж, гол санааг сонсож ойлгох түвшин. Анхан шатнаас 3–6 сар өдөр бүр ~40 минут хичээллэвэл бодитой зорилт.</p>
        <p class="muted">Шалгалтын формат өөрчлөгдөж болно. Бүртгүүлэхээсээ өмнө <a href="https://www.pearsonpte.com/pte-academic" target="_blank" rel="noopener">pearsonpte.com</a> дээрээс шалгаарай. Визэнд шаардлагатай оноог homeaffairs.gov.au-аас шалга.</p></div>
      <div class="card"><h3>Хамгийн их нөлөөтэй даалгаврууд</h3><ol>
        <li><b>Repeat Sentence</b> — Speaking, Listening хоёуланд.</li><li><b>Write From Dictation</b> — Listening, Writing хоёуланд.</li>
        <li><b>Read Aloud</b> — Speaking, Reading.</li><li><b>Describe Image / Retell Lecture</b> — загвар цээжилбэл амархан оноо.</li>
        <li><b>Reading Fill in the Blanks</b> — Reading, Writing.</li></ol>
        <p>💡 Эдгээрт <b>өдөр бүр</b> цаг зарцуул. Бусад даалгаварт загвар ашиглаад хурдан өнгөр.</p></div>
      <div class="card"><h3>12 долоо хоногийн төлөвлөгөө</h3><ol>
        <li><b>1–4 долоо хоног (Суурь):</b> Chunk + shadowing өдөр бүр. Repeat Sentence, Read Aloud удаан хурдаар.</li>
        <li><b>5–8 (PTE хэлбэр):</b> Цагтай дасгал. Describe Image, Retell Lecture загвар цээжлэх. WFD өдөрт 10+.</li>
        <li><b>9–12 (Шалгалтын горим):</b> Сул даалгавраа давтах. Pearson-ий албан ёсны mock test 1–2 удаа өгөх.</li></ol></div>
      <div class="card"><h3>🗣️ Монгол хүнд түгээмэл дуудлагын алдаа</h3>
        ${D.pron.map((p) => `<div class="pron"><b>${p.t}</b><p>${p.mn}</p><div class="row"><span class="en">${esc(p.ex)}</span></div>${speakBtns(p.ex)}</div>`).join('')}</div>
      <div class="card"><h3>Ажил дээрээ англиар ярих 5 дүрэм</h3><ol>
        <li>Өдөрт 3 шинэ chunk-ийг заавал ажил дээрээ хэрэглэ.</li><li>Ойлгоогүй бол: <i>"Sorry, could you say that again?"</i> — ичих хэрэггүй.</li>
        <li>Хамт ажиллагсаддаа: <i>"I'm learning English, please correct me."</i></li><li>Машинд англи подкаст / радио (ABC) сонс.</li><li>Утсаа англи хэл дээр тохируул.</li></ol></div>`;
  };

  // ----- Progress -----
  V.progress = (root) => {
    const avg = (t) => { const a = S.scores.filter((x) => x.t === t).slice(-20); return a.length ? Math.round(a.reduce((s, x) => s + x.s, 0) / a.length) : null; };
    const total = (k) => Object.values(S.days).reduce((s, d) => s + (d[k] || 0), 0);
    const learned = Object.values(S.cards).filter((c) => c.box >= 3).length;
    const goals = [['ra', 'Read Aloud', 80], ['rs', 'Repeat Sentence', 60], ['wfd', 'Write From Dictation', 70], ['di', 'Describe Image', 70], ['rl', 'Retell Lecture', 50], ['fib', 'Fill in the Blanks', 65], ['shadow', 'Shadowing', 80]];
    const days = []; for (let k = 27; k >= 0; k--) { const d = addDays(today(), -k); const v = S.days[d] ? Object.values(S.days[d]).reduce((a, b) => a + b, 0) : 0; days.push([d, v]); }
    root.innerHTML = `<h1>📈 Ахиц</h1>
      <div class="stats"><div><b>🔥 ${streak()}</b><small>өдөр дараалан</small></div><div><b>${Object.keys(S.days).length}</b><small>нийт хичээлийн өдөр</small></div><div><b>${learned}/${D.chunks.length}</b><small>chunk цээжилсэн</small></div></div>
      <div class="card"><h3>Сүүлийн 4 долоо хоног</h3><div class="heat">${days.map(([d, v]) => `<i title="${d}: ${v}" class="h${v === 0 ? 0 : v < 10 ? 1 : v < 25 ? 2 : 3}"></i>`).join('')}</div></div>
      <div class="card"><h3>Дундаж оноо (сүүлийн 20) ба 55-ын дасгалын зорилт</h3>
        <p class="muted">Энэ бол апп-ын дасгалын оноо, албан ёсны PTE оноо биш. Зорилтод хүрвэл 55-д ойртож байна гэсэн үг.</p>
        ${goals.map(([k, n, g]) => { const a = avg(k); return `<div class="goal"><span>${n}</span><div class="gbar"><i style="width:${a || 0}%" class="${a != null && a >= g ? 'ok' : ''}"></i><em style="left:${g}%"></em></div><span>${a == null ? '—' : a + '%'} <small class="muted">/ ${g}% · ${total(k)} удаа</small></span></div>`; }).join('')}</div>
      <div class="card"><h3>⚙️ Тохиргоо</h3>
        <label>Ярианы хурд: <input type="range" id="rate" min="0.6" max="1.1" step="0.05" value="${S.rate}"> <span id="rv">${S.rate}</span></label>
        <div class="row"><button class="btn ghost sm say" data-say="Hi mate, how's it going? Let's get started." data-rate="${S.rate}" id="test">🔊 Турших</button></div>
        <p class="muted">Хоолой: ${voice ? esc(voice.name + ' (' + voice.lang + ')') : 'анхдагч'}</p>
        <button class="btn bad sm" id="reset">Бүх ахицыг устгах</button></div>`;
    $('#rate').oninput = (e) => { S.rate = +e.target.value; $('#rv').textContent = S.rate; $('#test').dataset.rate = S.rate; save(); };
    $('#reset').onclick = () => { if ($('#reset').dataset.c) { localStorage.removeItem(KEY); load(); go('#/'); } else { $('#reset').dataset.c = 1; $('#reset').textContent = 'Итгэлтэй байна уу? Дахин дар'; } };
  };

  // ---------------- Router ----------------
  function go(h) { location.hash = h; }
  function route() {
    leave();
    const root = $('#app'); root.className = '';
    const [, page, arg] = (location.hash || '#/').split('/');
    const r = { '': V.home, chunks: V.chunks, cards: V.cards, shadow: V.shadow, pte: V.pte, guide: V.guide, progress: V.progress }[page || ''] || V.home;
    r(root, arg && decodeURIComponent(arg));
    $$('nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#/' + (page || '') || (page === 'cards' && a.getAttribute('href') === '#/chunks')));
    window.scrollTo(0, 0);
  }
  load();
  window.addEventListener('hashchange', route);
  route();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
