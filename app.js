(() => {
  const S = window.SURVEY, CFG = window.SURVEY_CONFIG || {};
  const KEY = "pngmk-survey-" + S.version;
  const app = document.getElementById("app");

  // Global question numbers (1–150) stay fixed even when skip logic hides some.
  let n = 0;
  for (const s of S.sections) for (const q of s.qs) q.n = ++n;
  const byId = Object.fromEntries(S.sections.flatMap(s => s.qs.map(q => [q.id, q])));

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} };
  const clear = () => { try { localStorage.removeItem(KEY); } catch {} };
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() :
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c == "x" ? r : (r & 3 | 8)).toString(16); }));

  let st = load() || { answers: {}, page: -1, started: Date.now(), clientId: uuid() };

  const val = o => Array.isArray(o) ? o[0] : o;
  const lab = o => Array.isArray(o) ? o[1] : o;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function matches(cond) {
    if (!cond) return true;
    const src = byId[cond.q];
    if (src && !qVisible(src)) return false;
    const a = st.answers[cond.q];
    if (Array.isArray(a)) return a.some(v => cond.in.includes(v));
    return cond.in.includes(a);
  }
  const sectionOf = Object.fromEntries(S.sections.flatMap(s => s.qs.map(q => [q.id, s])));
  function qVisible(q) { const s = sectionOf[q.id]; return matches(s.show) && matches(q.show); }
  const pages = () => S.sections.filter(s => matches(s.show) && s.qs.some(q => matches(q.show)));
  const ended = () => {
    for (const q of Object.values(byId)) if (q.end && q.end.in.includes(st.answers[q.id])) return q.end.msg;
    return null;
  };

  function renderQ(q) {
    const a = st.answers[q.id];
    const name = "q_" + q.id;
    const head = `<span class="num">Q${q.n}</span>${esc(q.t)}${q.req ? ' <span aria-hidden="true">*</span>' : ""}`;
    const hint = q.hint ? `<div class="hint">${esc(q.hint)}</div>` : (q.max ? `<div class="hint">Choose up to ${q.max}.</div>` : (q.type === "multi" ? `<div class="hint">Choose all that apply.</div>` : ""));
    let body = "";
    if (q.type === "single" || q.type === "multi") {
      const type = q.type === "single" ? "radio" : "checkbox";
      const full = q.max && Array.isArray(a) && a.length >= q.max;
      body = `<div class="opts">` + q.o.map((o, i) => {
        const v = val(o), on = q.type === "single" ? a === v : (Array.isArray(a) && a.includes(v));
        return `<label class="opt"><input type="${type}" name="${name}" id="${name}_${i}" value="${esc(v)}"${on ? " checked" : ""}${full && !on ? " disabled" : ""}><span>${esc(lab(o))}</span></label>`;
      }).join("") + `</div>`;
    } else if (q.type === "scale") {
      body = `<div class="scale">` + q.o.map((o, i) =>
        `<label><input type="radio" name="${name}" id="${name}_${i}" value="${i + 1}"${a === i + 1 ? " checked" : ""}><span class="n">${i + 1}</span><span>${esc(o)}</span></label>`).join("") + `</div>`;
    } else if (q.type === "nps") {
      body = `<div class="scale nps">` + Array.from({ length: 11 }, (_, i) =>
        `<label><input type="radio" name="${name}" id="${name}_${i}" value="${i}"${a === i ? " checked" : ""}><span class="n">${i}</span></label>`).join("") +
        `</div><div class="ends"><span>0 · Not at all likely</span><span>10 · Extremely likely</span></div>`;
    } else if (q.type === "text") {
      body = `<textarea name="${name}" id="${name}" maxlength="2000">${esc(a || "")}</textarea>`;
    } else if (q.type === "email") {
      body = `<input type="email" name="${name}" id="${name}" autocomplete="email" maxlength="200" value="${esc(a || "")}">`;
    }
    const wrapTag = q.type === "text" || q.type === "email";
    return wrapTag
      ? `<div class="q" data-q="${q.id}"><label class="label" for="${name}">${head}</label>${hint}${body}</div>`
      : `<div class="q" data-q="${q.id}"><fieldset><legend>${head}</legend>${hint}${body}</fieldset></div>`;
  }

  function progressHtml(i, total) {
    const pct = Math.round((i / total) * 100);
    return `<div class="progress"><div class="meta"><span>Section ${i + 1} of ${total}</span><span>${pct}% done</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`;
  }

  function render() {
    const end = ended();
    if (end) return renderEnd(end);
    if (st.page < 0) return renderWelcome();
    const ps = pages();
    if (st.page >= ps.length) return renderSubmit();
    const s = ps[st.page];
    app.innerHTML = progressHtml(st.page, ps.length) +
      `<h2>${esc(s.title)}</h2>` + (s.intro ? `<p class="intro">${esc(s.intro)}</p>` : "") +
      `<form id="f" novalidate>` + s.qs.filter(q => matches(q.show)).map(renderQ).join("") +
      `<p class="err" id="err" hidden></p>
       <div class="nav"><button type="button" class="ghost" id="back">Back</button>
       <button type="submit">${st.page === ps.length - 1 ? "Review and send" : "Next"}</button></div></form>`;
    bindForm(s);
    document.getElementById("back").onclick = () => { st.page--; save(); render(); scrollTop(); };
  }

  function bindForm(s) {
    const f = document.getElementById("f");
    f.addEventListener("input", e => {
      const el = e.target, id = el.name && el.name.slice(2), q = byId[id];
      if (!q) return;
      if (q.type === "multi") {
        st.answers[id] = [...f.querySelectorAll(`[name="q_${id}"]:checked`)].map(x => x.value);
      } else if (q.type === "scale" || q.type === "nps") {
        st.answers[id] = Number(el.value);
      } else {
        st.answers[id] = el.value;
      }
      save();
      // Re-render when this answer controls skip logic or a max-choice limit, keeping scroll position.
      const controls = s.qs.some(x => x.show && x.show.q === id) || q.max;
      if (controls && el.type !== "textarea" && el.type !== "email") {
        const y = window.scrollY; render(); window.scrollTo(0, y);
        document.getElementById(el.id)?.focus({ preventScroll: true });
      }
    });
    f.addEventListener("submit", e => {
      e.preventDefault();
      const missing = s.qs.filter(q => q.req && matches(q.show) && (st.answers[q.id] == null || st.answers[q.id] === ""));
      const err = document.getElementById("err");
      if (missing.length) { err.textContent = "Please answer the questions marked *."; err.hidden = false; return; }
      st.page++; save(); render(); scrollTop();
    });
  }

  function renderWelcome() {
    const resumed = Object.keys(st.answers).length > 0;
    app.innerHTML = `<section class="panel">
      <p>We're planning a private, ad-free online home for everyone who grew up as a missionary kid in Papua New Guinea: chat, a photo archive from our PNG years, a member directory and map, reunions, memorials, and confidential support.</p>
      <p>Before anything is built, we want to hear from you. Your answers decide what goes in, what it costs, and who it's for.</p>
      <ul class="facts">
        <li><b>About 20 minutes</b>Sections that don't apply to you are skipped.</li>
        <li><b>Anonymous</b>Your name isn't asked. Email at the end is optional.</li>
        <li><b>Skip anything</b>Only the first two questions are required.</li>
        <li><b>Saves as you go</b>Close the page and come back on this device to carry on.</li>
      </ul>
      <div class="nav"><span></span><button type="button" id="start">${resumed ? "Carry on where I left off" : "Start the survey"}</button></div>
      ${resumed ? `<p><button type="button" class="ghost" id="restart">Start again from scratch</button></p>` : ""}
    </section>`;
    document.getElementById("start").onclick = () => { st.page = Math.max(0, st.page); save(); render(); scrollTop(); };
    const r = document.getElementById("restart");
    if (r) r.onclick = () => { st = { answers: {}, page: 0, started: Date.now(), clientId: uuid() }; save(); render(); scrollTop(); };
  }

  function answered() {
    const out = {};
    for (const q of Object.values(byId)) {
      if (q.type === "email" || !qVisible(q)) continue;
      const a = st.answers[q.id];
      if (a == null || a === "" || (Array.isArray(a) && !a.length)) continue;
      out[q.id] = typeof a === "string" ? a.trim().slice(0, 2000) : a;
    }
    return out;
  }

  function renderSubmit(errMsg) {
    const ps = pages(), count = Object.keys(answered()).length;
    app.innerHTML = progressHtml(ps.length - 1, ps.length).replace(/\d+% done/, "Last step") + `<section class="panel">
      <h2>Ready to send</h2>
      <p>You've answered ${count} questions. Thank you for giving this your time.</p>
      <p>Press Send to record your answers. You can go back to change anything first.</p>
      <label class="hp" aria-hidden="true">Leave blank <input id="website" tabindex="-1" autocomplete="off"></label>
      ${errMsg ? `<p class="err">${esc(errMsg)}</p>` : ""}
      <div class="nav"><button type="button" class="ghost" id="back">Back</button><button type="button" id="send">Send my answers</button></div>
    </section>`;
    document.getElementById("back").onclick = () => { st.page = ps.length - 1; save(); render(); scrollTop(); };
    document.getElementById("send").onclick = send;
  }

  async function send() {
    const btn = document.getElementById("send");
    btn.disabled = true; btn.textContent = "Sending…";
    if (document.getElementById("website").value) return renderThanks();
    const email = (st.answers.w_email || "").trim();
    const body = {
      client_id: st.clientId,
      version: S.version,
      answers: answered(),
      email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email.slice(0, 200) : null,
      duration_sec: Math.round((Date.now() - st.started) / 1000),
    };
    try {
      if (!CFG.supabaseUrl) throw new Error("not configured");
      const r = await fetch(CFG.supabaseUrl + "/rest/v1/mk_survey_responses?on_conflict=client_id", {
        method: "POST",
        headers: { apikey: CFG.anonKey, Authorization: "Bearer " + CFG.anonKey, "Content-Type": "application/json", Prefer: "return=minimal,resolution=ignore-duplicates" },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      clear(); renderThanks();
    } catch (e) {
      renderSubmit("Your answers didn't send. Check your internet connection and press Send again; nothing has been lost.");
    }
  }

  function renderThanks() {
    app.innerHTML = `<section class="panel"><h2>Tenkyu tru!</h2>
      <p>Your answers are in. We'll share what we learn with everyone who took part.</p>
      <p>Please pass the link on to other PNG MKs, siblings and schoolmates. The more of us answer, the better the platform will fit.</p></section>`;
    scrollTop();
  }

  function renderEnd(msg) {
    app.innerHTML = `<section class="panel"><h2>Thank you</h2><p>${esc(msg)}</p>
      <div class="nav"><button type="button" class="ghost" id="back">Change my answer</button></div></section>`;
    document.getElementById("back").onclick = () => { delete st.answers.age18; delete st.answers.link; st.page = 0; save(); render(); };
  }

  const scrollTop = () => window.scrollTo(0, 0);
  render();
})();
