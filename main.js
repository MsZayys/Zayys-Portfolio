/* ===== EDIT YOUR CONTENT HERE ===== */
const CONTENT = {
  email: "mszayys@gmail.com",

  projects: [
    {
      title: "Charms by Zayys",
      category: "Handmade Products & Online Shop",
      featured: true,
      desc: "A cute handmade brand featuring custom bracelets, jewelry, charms, and other creative products.",
      image: "images/charms.jpg",
      url: "https://mszayys.github.io/charmsbyzayys/"
    },
    {
      title: "A Quiet Shelf",
      category: "Novel Publishing & Writing",
      featured: true,
      desc: "A personal reading and writing space where I publish and share my novels and stories.",
      image: "images/quiet-shelf.jpg",
      url: "https://mszayys.github.io/The-Quiet-Shelf/"
    }
  ],

  skills: [
    "Script writing",
    "Web design",
    "Web development",
    "Painting & art",
    "Creative design",
    "Custom website building"
  ],

  businesses: [
    {
      title: "Custom Website Creation",
      desc: "Building professional, creative, and unique websites for clients and brands.",
      logo: "",
      url: ""
    }
  ],

  journey: [
    { when: "2023", what: "Began my creative journey, exploring design, art, and coding." },
    { when: "2026", what: "Launched my two live web projects: Charms by Zayys and A Quiet Shelf." },
    { when: "Future", what: "Expanding my web design work and building my own independent business." }
  ]
};

/* ===== HELPERS ===== */
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function ph(label, i) { // generated placeholder image
  const h = 255 + (i * 18) % 60;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},70%,45%)'/><stop offset='1' stop-color='hsl(${h + 50},80%,70%)'/></linearGradient></defs><rect width='400' height='${i % 2 ? 300 : 380}' fill='url(#g)'/><text x='200' y='160' text-anchor='middle' fill='white' opacity='.8' font-family='serif' font-style='italic' font-size='22'>${esc(label)}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
const img = (src, alt, label, i) => `<img src="${esc(src || ph(label, i))}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.src='${ph("Image not found", i)}'">`;

/* ===== RENDER ===== */
$("#projectGrid").innerHTML = CONTENT.projects.map((p, i) =>
  `<article class="glass card project rv${p.featured ? " featured" : ""}">${p.featured ? `<span class="badge">Featured project</span>` : ""}${img(p.image, p.title + " screenshot", "Screenshot coming soon", i)}<div class="txt"><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="actions"><button class="btn ghost" data-p="${i}">View details</button>${p.url ? `<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">Visit website</a>` : ""}</div></div></article>`).join("");
$("#skillList").innerHTML = CONTENT.skills.map(s => `<li>${esc(s)}</li>`).join("");
$("#bizGrid").innerHTML = CONTENT.businesses.map((b, i) =>
  `<article class="glass card rv" style="cursor:default">${b.logo ? img(b.logo, b.title + " logo", "Logo", i) : ""}<div class="txt"><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p>${b.url ? `<a class="btn ghost" href="${esc(b.url)}" target="_blank" rel="noopener">Visit website</a>` : `<small>Website link coming soon</small>`}</div></article>`).join("");
$("#timeline").innerHTML = CONTENT.journey.map(j => `<li class="rv"><b>${esc(j.when)}</b>${esc(j.what)}</li>`).join("");
$("#mailBtn").href = "mailto:" + CONTENT.email + "?subject=" + encodeURIComponent("Work enquiry");
$("#mailLink").href = "mailto:" + CONTENT.email;
$("#mailLink").textContent = CONTENT.email;
$("#yr").textContent = new Date().getFullYear();

/* ===== DIALOG (project details) ===== */
const dlg = $("#dlg");
function open(html) { $("#dlgBody").innerHTML = html; dlg.showModal(); }
document.addEventListener("click", e => {
  const p = e.target.closest("[data-p]");
  if (p) { const i = +p.dataset.p, x = CONTENT.projects[i];
    open(`${img(x.image, x.title + " screenshot", "Screenshot coming soon", i)}<div class="txt"><span class="tag">${esc(x.category)}</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p>${x.url ? `<a class="btn primary" href="${esc(x.url)}" target="_blank" rel="noopener">Visit website</a>` : "<small>Website link not added yet.</small>"}</div>`); }
  if (e.target.closest(".close") || e.target === dlg) dlg.close();
});

/* ===== NAV ===== */
const burger = $(".burger"), menu = $("#menu");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.onclick = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); };

/* ===== HERO NAME LETTERS ===== */
const nm = $("#name");
nm.innerHTML = [...nm.textContent].map((c, i) => `<span style="--i:${i}" aria-hidden="true">${c}</span>`).join("");

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ===== MAGNETIC BUTTONS + AURA PARALLAX (desktop only) ===== */
let mx = 0, my = 0;
if (fine && !reduce) {
  document.querySelectorAll(".magnetic").forEach(b => {
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
    b.addEventListener("pointerleave", () => b.style.transform = "");
  });
  addEventListener("pointermove", e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    $(".a1").style.transform = `translate(${mx * 60}px,${my * 60}px)`;
    $(".a2").style.transform = `translate(${mx * -80}px,${my * -80}px)`;
  });
}

/* ===== STARFIELD ===== */
(function () {
  const c = $("#stars"), x = c.getContext("2d"); let s = [];
  const size = () => { c.width = innerWidth; c.height = innerHeight; s = Array.from({ length: innerWidth < 700 ? 40 : 90 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.4 + .3, t: Math.random() * 6 })); draw(0); };
  function draw(t) {
    x.clearRect(0, 0, c.width, c.height);
    s.forEach(o => { x.globalAlpha = reduce ? .6 : .35 + .35 * Math.sin(t / 900 + o.t); x.fillStyle = "#e6dcff"; x.beginPath(); x.arc(o.x, o.y, o.r, 0, 6.3); x.fill(); });
    if (!reduce) requestAnimationFrame(draw);
  }
  addEventListener("resize", size); size();
})();

/* ===== 3D HERO SCENE: glowing lotus (Three.js) ===== */
(function () {
  const cv = $("#scene");
  if (!window.THREE) { cv.remove(); return; } // graceful fallback: aurora + stars remain
  try {
    const mobile = innerWidth < 700;
    const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: !mobile });
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.set(0, 0, 8);
    const glow = (() => { // soft round light used for sparkles and glows
      const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d");
      const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.3, "rgba(255,255,255,.45)"); r.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = r; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
    })();
    const add = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false };

    // One curved, pointed petal: pink-white at the base fading to blue-violet at the tip
    function petalGeo(len, wid, curl, c1, c2) {
      const U = 10, V = 6, pos = [], col = [], idx = [];
      const a = new THREE.Color(c1), b = new THREE.Color(c2), t = new THREE.Color();
      for (let i = 0; i <= U; i++) for (let j = 0; j <= V; j++) {
        const u = i / U, v = j / V * 2 - 1, w = wid * Math.sin(Math.PI * Math.pow(u, .7));
        pos.push(v * w, u * len, -curl * u * u * len - v * v * w * .35);
        t.copy(a).lerp(b, u).multiplyScalar(.7 + .6 * Math.abs(v)); col.push(t.r, t.g, t.b);
      }
      for (let i = 0; i < U; i++) for (let j = 0; j < V; j++) {
        const p = i * (V + 1) + j, q = p + V + 1; idx.push(p, q, p + 1, q, q + 1, p + 1);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      g.setIndex(idx); return g;
    }

    const lotus = new THREE.Group(), petals = [];
    [ { n: 8, tilt: 1.25, len: 2.5, wid: .62, curl: .25, c1: 0xff9bd8, c2: 0x6f7dff, rot: 0 },
      { n: 8, tilt: .95, len: 2.2, wid: .58, curl: .3, c1: 0xffc2ee, c2: 0x9a7bff, rot: Math.PI / 8 },
      { n: 7, tilt: .65, len: 1.8, wid: .5, curl: .35, c1: 0xffe0f6, c2: 0xb48cff, rot: .2 },
      { n: 6, tilt: .38, len: 1.35, wid: .42, curl: .4, c1: 0xfff0c8, c2: 0xe6a8ff, rot: .5 }
    ].forEach((r, ri) => {
      const geo = petalGeo(r.len, r.wid, r.curl, r.c1, r.c2);
      for (let k = 0; k < r.n; k++) {
        const pivot = new THREE.Group(); pivot.rotation.y = r.rot + k * Math.PI * 2 / r.n;
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, opacity: .42, ...add }));
        m.rotation.x = r.tilt; pivot.add(m); lotus.add(pivot); petals.push({ m, base: r.tilt, ph: k * .7 + ri });
      }
    });

    // Glowing yellow stamens in the centre
    const sp = [], tips = [];
    for (let i = 0; i < (mobile ? 24 : 40); i++) {
      const a = Math.random() * 6.283, r = .1 + Math.random() * .5, h = .5 + Math.random() * .55;
      sp.push(0, .05, 0, Math.cos(a) * r, h, Math.sin(a) * r); tips.push(Math.cos(a) * r, h, Math.sin(a) * r);
    }
    const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    lotus.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xffe28a, opacity: .8, ...add })));
    const tg = new THREE.BufferGeometry(); tg.setAttribute("position", new THREE.Float32BufferAttribute(tips, 3));
    lotus.add(new THREE.Points(tg, new THREE.PointsMaterial({ map: glow, color: 0xfff1a8, size: .22, ...add })));
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffd36b, opacity: .8, ...add }));
    core.scale.setScalar(1.8); core.position.y = .45; lotus.add(core);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0x7c6bff, opacity: .45, ...add }));
    halo.scale.setScalar(9); halo.position.set(0, .3, -1);

    // Floating sparkles
    const sk = [], N = mobile ? 40 : 80;
    for (let i = 0; i < N; i++) { const a = Math.random() * 6.283, d = 2.5 + Math.random() * 2.8; sk.push(Math.cos(a) * d, Math.random() * 5 - 2.5, Math.sin(a) * d); }
    const skg = new THREE.BufferGeometry(); skg.setAttribute("position", new THREE.Float32BufferAttribute(sk, 3));
    const skm = new THREE.PointsMaterial({ map: glow, color: 0xbfd4ff, size: .16, ...add });
    const sparkles = new THREE.Points(skg, skm);

    lotus.position.y = -.5;
    const group = new THREE.Group(); group.add(halo, lotus, sparkles); scene.add(group);

    function fit() {
      const w = cv.clientWidth, h = cv.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
      group.position.x = w > 800 ? 3 : 0; group.position.y = w > 800 ? 0 : 1.3; group.scale.setScalar(w > 800 ? 1 : w < 420 ? .62 : .75);
    }
    addEventListener("resize", fit); fit();
    let vis = true; new IntersectionObserver(e => vis = e[0].isIntersecting).observe(cv);
    function loop(t) {
      if (vis) {
        const s = t / 1000;
        group.rotation.y += (mx * .8 - group.rotation.y) * .04;
        group.rotation.x += (.55 + my * .5 - group.rotation.x) * .04;
        lotus.rotation.y = s * .15; lotus.position.y = -.5 + Math.sin(s * .9) * .12;
        petals.forEach(p => p.m.rotation.x = p.base + Math.sin(s * 1.1 + p.ph) * .07 + Math.sin(s * .6) * .08); // petals gently breathe
        core.material.opacity = .7 + .25 * Math.sin(s * 1.6);
        sparkles.rotation.y = s * .05; skm.opacity = .65 + .35 * Math.sin(s * 2);
        renderer.render(scene, cam);
      }
      if (!reduce) requestAnimationFrame(loop);
    }
    reduce ? loop(0) : requestAnimationFrame(loop);
  } catch (err) { console.warn("3D disabled:", err); cv.remove(); }
})();

/* ===== INTRO LOADER ===== */
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), reduce ? 0 : 900));
setTimeout(() => $("#loader").classList.add("done"), 3500); // safety net
/* ===== MOUSE SPARKLE TRAIL (desktop only) ===== */
(function () {
  if (!fine || reduce) return; // skip on touch devices and for reduced-motion users

  const c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60";
  document.body.appendChild(c);

  const g = c.getContext("2d");
  const dpr = Math.min(devicePixelRatio, 2);
  const size = () => {
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size(); addEventListener("resize", size);

  const colors = ["#ffffff", "#e6dcff", "#b9a4ff", "#f0abfc"];
  let parts = [], lastX = null, lastY = null, running = false;

  // 4-point twinkle star shape
  function star(x, y, r) {
    g.beginPath();
    g.moveTo(x, y - r);
    g.quadraticCurveTo(x, y, x + r, y);
    g.quadraticCurveTo(x, y, x, y + r);
    g.quadraticCurveTo(x, y, x - r, y);
    g.quadraticCurveTo(x, y, x, y - r);
    g.fill();
  }

  function spawn(x, y, n, burst) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, sp = burst ? 1 + Math.random() * 3 : Math.random() * .6;
      parts.push({
        x: x + (Math.random() - .5) * 8, y: y + (Math.random() - .5) * 8,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp + (burst ? 0 : .3),
        life: 1, decay: .014 + Math.random() * .02,
        r: 2 + Math.random() * (burst ? 6 : 4),
        c: colors[(Math.random() * colors.length) | 0]
      });
    }
    if (parts.length > 160) parts.splice(0, parts.length - 160); // cap for performance
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  function tick() {
    g.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy += .015; p.life -= p.decay;
      g.globalAlpha = Math.max(p.life, 0);
      g.fillStyle = p.c; g.shadowColor = "#f0abfc"; g.shadowBlur = 12;
      star(p.x, p.y, p.r * (.4 + p.life * .6));
    }
    g.globalAlpha = 1; g.shadowBlur = 0;
    if (parts.length) requestAnimationFrame(tick); else running = false;
  }

  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    if (lastX !== null && Math.hypot(e.clientX - lastX, e.clientY - lastY) < 14) return; // spacing between sparkles
    lastX = e.clientX; lastY = e.clientY;
    spawn(e.clientX, e.clientY, 2, false);
  });

  addEventListener("pointerdown", e => { if (e.pointerType === "mouse") spawn(e.clientX, e.clientY, 16, true); }); // click burst
})();