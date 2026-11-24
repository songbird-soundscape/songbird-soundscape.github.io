/* Read this site in any language.
   A "Language" button opens a list of about 130 languages, each written in its own script.
   Picking one translates the page in place with Google's free website translator, which is only
   loaded when a visitor asks for it. If that can't load, the page opens through translate.goog instead.
   Visitors whose browser is set to another language get a one-line offer to switch.
   Scientific names (italic genus or species names, or anything marked class="notranslate") are left as written. */
(function(){
  const LANGS = ["af","sq","am","ar","hy","as","ay","az","bm","eu","be","bn","bho","bs","bg","ca","ceb","ny","zh-CN","zh-TW","co","hr","cs",
    "da","dv","doi","nl","eo","et","ee","fil","fi","fr","fy","gl","ka","de","el","gn","gu","ht","ha","haw","iw","hi","hmn","hu","is","ig","ilo",
    "id","ga","it","ja","jw","kn","kk","km","rw","gom","ko","kri","ku","ckb","ky","lo","la","lv","ln","lt","lg","lb","mk","mai","mg","ms","ml",
    "mt","mi","mr","mni-Mtei","lus","mn","my","ne","no","or","om","ps","fa","pl","pt","pa","qu","ro","ru","sm","sa","gd","nso","sr","st","sn",
    "sd","si","sk","sl","so","es","su","sw","sv","tg","ta","tt","te","th","ti","ts","tr","tk","ak","uk","ur","ug","uz","vi","cy","xh","yi","yo","zu"];
  const BCP = {iw:"he", jw:"jv", "mni-Mtei":"mni", gom:"kok", fil:"fil"};
  /* each language in its own words, with its English name beside it */
  const OWN = {"af": "Afrikaans", "sq": "Shqip", "am": "አማርኛ", "ar": "العربية", "hy": "Հայերեն", "as": "অসমীয়া", "ay": "Aymar aru", "az": "Azərbaycan", "bm": "Bamanankan", "eu": "Euskara", "be": "Беларуская", "bn": "বাংলা", "bho": "भोजपुरी", "bs": "Bosanski", "bg": "Български", "ca": "Català", "ceb": "Cebuano", "ny": "Chichewa", "zh-CN": "中文（简体）", "zh-TW": "中文（繁體）", "co": "Corsu", "hr": "Hrvatski", "cs": "Čeština", "da": "Dansk", "dv": "ދިވެހި", "doi": "डोगरी", "nl": "Nederlands", "eo": "Esperanto", "et": "Eesti", "ee": "Eʋegbe", "fil": "Filipino", "fi": "Suomi", "fr": "Français", "fy": "Frysk", "gl": "Galego", "ka": "ქართული", "de": "Deutsch", "el": "Ελληνικά", "gn": "Avañe'ẽ", "gu": "ગુજરાતી", "ht": "Kreyòl ayisyen", "ha": "Hausa", "haw": "ʻŌlelo Hawaiʻi", "iw": "עברית", "hi": "हिन्दी", "hmn": "Hmoob", "hu": "Magyar", "is": "Íslenska", "ig": "Igbo", "ilo": "Ilokano", "id": "Bahasa Indonesia", "ga": "Gaeilge", "it": "Italiano", "ja": "日本語", "jw": "Basa Jawa", "kn": "ಕನ್ನಡ", "kk": "Қазақ", "km": "ខ្មែរ", "rw": "Kinyarwanda", "gom": "कोंकणी", "ko": "한국어", "kri": "Krio", "ku": "Kurdî", "ckb": "کوردیی ناوەندی", "ky": "Кыргызча", "lo": "ລາວ", "la": "Latina", "lv": "Latviešu", "ln": "Lingála", "lt": "Lietuvių", "lg": "Luganda", "lb": "Lëtzebuergesch", "mk": "Македонски", "mai": "मैथिली", "mg": "Malagasy", "ms": "Bahasa Melayu", "ml": "മലയാളം", "mt": "Malti", "mi": "Te reo Māori", "mr": "मराठी", "mni-Mtei": "ꯃꯤꯇꯩꯂꯣꯟ", "lus": "Mizo ṭawng", "mn": "Монгол", "my": "မြန်မာ", "ne": "नेपाली", "no": "Norsk", "or": "ଓଡ଼ିଆ", "om": "Afaan Oromoo", "ps": "پښتو", "fa": "فارسی", "pl": "Polski", "pt": "Português", "pa": "ਪੰਜਾਬੀ", "qu": "Runa simi", "ro": "Română", "ru": "Русский", "sm": "Gagana Sāmoa", "sa": "संस्कृतम्", "gd": "Gàidhlig", "nso": "Sepedi", "sr": "Српски", "st": "Sesotho", "sn": "chiShona", "sd": "سنڌي", "si": "සිංහල", "sk": "Slovenčina", "sl": "Slovenščina", "so": "Soomaali", "es": "Español", "su": "Basa Sunda", "sw": "Kiswahili", "sv": "Svenska", "tg": "Тоҷикӣ", "ta": "தமிழ்", "tt": "Татар", "te": "తెలుగు", "th": "ไทย", "ti": "ትግርኛ", "ts": "Xitsonga", "tr": "Türkçe", "tk": "Türkmen", "ak": "Akan", "uk": "Українська", "ur": "اردو", "ug": "ئۇيغۇرچە", "uz": "Oʻzbek", "vi": "Tiếng Việt", "cy": "Cymraeg", "xh": "isiXhosa", "yi": "ייִדיש", "yo": "Yorùbá", "zu": "isiZulu"};
  const name = c => { let en = c; try { en = new Intl.DisplayNames(["en"], {type:"language"}).of(BCP[c] || c) || c; } catch(e) {}
    if (c === "zh-CN") en = "Chinese, Simplified"; if (c === "zh-TW") en = "Chinese, Traditional";
    const own = OWN[c]; return own && own.toLowerCase() !== en.toLowerCase() ? `${own} (${en})` : (own || en); };
  const store = { get(k){ try { return localStorage.getItem(k) } catch(e){ return null } }, set(k,v){ try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k,v) } catch(e){} } };
  const current = () => { const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/); return m ? decodeURIComponent(m[1]) : ""; };
  const setCookie = v => { const d = location.hostname, exp = v ? "" : ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
    [`googtrans=${v};path=/${exp}`, `googtrans=${v};path=/;domain=${d}${exp}`, `googtrans=${v};path=/;domain=.${d}${exp}`].forEach(c => document.cookie = c); };

  /* keep Latin names as written */
  function guardNames(){
    document.querySelectorAll("i, em").forEach(e => { if (/^[A-Z][a-z]+(\s[a-z]+){0,2}\.?$/.test(e.textContent.trim())) e.classList.add("notranslate"); });
  }

  let loading = null;
  function loadGoogle(){
    if (loading) return loading;
    loading = new Promise((res, rej) => {
      const host = document.createElement("div"); host.id = "gt-host"; host.style.display = "none"; document.body.appendChild(host);
      window.__gtInit = () => { try { new google.translate.TranslateElement({pageLanguage: "en", autoDisplay: false}, "gt-host"); res(); } catch(e) { rej(e); } };
      const s = document.createElement("script"); s.src = "https://translate.google.com/translate_a/element.js?cb=__gtInit"; s.async = true;
      s.onerror = rej; document.head.appendChild(s); setTimeout(() => rej(new Error("timeout")), 8000);
    });
    return loading;
  }
  function proxyURL(lang){
    const h = location.hostname.replace(/-/g, "--").replace(/\./g, "-");
    return `https://${h}.translate.goog${location.pathname}?_x_tr_sl=en&_x_tr_tl=${encodeURIComponent(lang)}&_x_tr_hl=${encodeURIComponent(lang)}${location.hash}`;
  }
  async function translateTo(lang){
    store.set("sc-lang", lang || null);
    if (!lang) { setCookie(""); location.reload(); return; }
    if (/^(localhost|127\.|\[::1\])/.test(location.hostname) === false && location.protocol === "https:") setCookie(`/en/${lang}`);
    try {
      await loadGoogle();
      const pick = () => { const c = document.querySelector("#gt-host select.goog-te-combo"); if (!c) return false;
        c.value = lang; c.dispatchEvent(new Event("change")); return true; };
      if (!pick()) { let n = 0; const t = setInterval(() => { if (pick() || ++n > 40) clearInterval(t); }, 100); }
    } catch(e) { location.href = proxyURL(lang); }
  }

  function build(){
    guardNames();
    const wrap = document.createElement("div"); wrap.className = "lang notranslate"; wrap.translate = false;
    const label = document.createElement("label"); label.htmlFor = "langPick"; label.textContent = "🌐 Language"; label.className = "lang-label";
    const sel = document.createElement("select"); sel.id = "langPick"; sel.setAttribute("aria-label", "Read this site in another language");
    const opts = LANGS.map(c => [c, name(c)]).sort((a, b) => a[1].localeCompare(b[1]));
    sel.innerHTML = `<option value="">English (original)</option>` + opts.map(([c, n]) => `<option value="${c}">${n}</option>`).join("");
    sel.value = current() || "";
    sel.addEventListener("change", () => translateTo(sel.value));
    wrap.append(label, sel);
    const note = document.createElement("p"); note.className = "lang-note"; note.textContent = "Machine translation by Google. Scientific names stay as written.";
    wrap.append(note);
    document.body.appendChild(wrap);

    /* offer the visitor's own language once, if their browser asks for one other than English */
    const want = (navigator.languages || [navigator.language || "en"]).map(l => l.toLowerCase());
    const first = want[0] || "en", base = first.split("-")[0];
    const code = LANGS.find(c => c.toLowerCase() === first) || LANGS.find(c => (BCP[c] || c).toLowerCase() === base) || (base === "zh" ? (/(tw|hk|hant)/.test(first) ? "zh-TW" : "zh-CN") : null);
    if (base !== "en" && code && !current() && !store.get("sc-lang-offer")) {
      const offer = document.createElement("div"); offer.className = "lang-offer notranslate"; offer.translate = false; offer.setAttribute("role", "region"); offer.setAttribute("aria-label", "Language");
      offer.innerHTML = `<span>${name(code)}?</span> <button type="button" data-yes>Translate this page</button> <button type="button" data-no aria-label="No thanks">✕</button>`;
      offer.querySelector("[data-yes]").onclick = () => { offer.remove(); store.set("sc-lang-offer", "1"); sel.value = code; translateTo(code); };
      offer.querySelector("[data-no]").onclick = () => { offer.remove(); store.set("sc-lang-offer", "1"); };
      document.body.appendChild(offer);
    }
    /* a page that was translated before stays translated */
    const was = current() || store.get("sc-lang");
    if (was) { sel.value = was; translateTo(was); }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", build) : build();

  const css = document.createElement("style");
  css.textContent = `
.lang{position:fixed; right:max(12px, env(safe-area-inset-right, 0px)); justify-content:flex-end; bottom:max(64px, env(safe-area-inset-bottom, 0px)); z-index:9998;
  display:flex; flex-wrap:wrap; align-items:center; gap:6px; max-width:280px; font:13px/1.3 system-ui, sans-serif}
.lang .lang-label{background:#fff; color:#1d2b22; border:1px solid #c9cfc6; border-radius:999px; padding:6px 10px; box-shadow:0 1px 4px rgba(0,0,0,.14)}
.lang select{position:absolute; inset:0 auto auto 0; width:100%; height:32px; opacity:0; cursor:pointer}
.lang select:focus-visible + *, .lang:focus-within .lang-label{outline:2px solid #2f6b4f; outline-offset:2px}
.lang .lang-note{display:none; margin:0; font-size:11px; color:#5b6459; background:#fff; border-radius:6px; padding:3px 6px}
.lang:hover .lang-note, .lang:focus-within .lang-note{display:block}
.lang-offer{position:fixed; left:50%; transform:translateX(-50%); top:12px; z-index:9999; display:flex; gap:8px; align-items:center;
  background:#fff; color:#1d2b22; border:1px solid #c9cfc6; border-radius:12px; padding:8px 12px; box-shadow:0 4px 16px rgba(0,0,0,.18); font:14px/1.3 system-ui, sans-serif}
.lang-offer button{font:inherit; border:1px solid #2f6b4f; background:#2f6b4f; color:#fff; border-radius:999px; padding:4px 10px; cursor:pointer}
.lang-offer button[data-no]{background:none; color:#5b6459; border-color:transparent}
/* Google's own toolbar and hover tooltips are hidden; the page stays where it is */
.goog-te-banner-frame, iframe.skiptranslate, #goog-gt-tt, .goog-te-balloon-frame{display:none !important}
body{top:0 !important} .goog-text-highlight{background:none !important; box-shadow:none !important}
@media print{.lang, .lang-offer{display:none}}`;
  document.head.appendChild(css);
})();
