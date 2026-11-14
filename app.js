/* Portfolio do Pedro Munareto · versao 2
   Monta celulares, posts, stories, carrosseis e a campanha a partir de dados.js e cuida do visualizador. */
(function () {
  var OBRAS = window.OBRAS || [], PANOS = window.PANORAMAS || [], PERFIS = window.PERFIS || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var porId = {};
  OBRAS.forEach(function (o) { porId[o.id] = o; });
  var doGrupo = function (g) { return OBRAS.filter(function (o) { return o.grupo === g; }); };

  var IC = {
    voltar: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sino: '<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15L6 17Zm4 3.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    mais: '<svg viewBox="0 0 24 24"><g fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></g></svg>',
    seta: '<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    corrente: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    grade: '<svg viewBox="0 0 24 24"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    reels: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8.5h18M8 3l3 5.5M14 3l3 5.5"/><path d="M10 12v5l4.5-2.5L10 12Z"/></g></svg>',
    repost: '<svg viewBox="0 0 24 24"><path d="M5 10V8a3 3 0 0 1 3-3h10l-3-3M19 14v2a3 3 0 0 1-3 3H6l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    marcado: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19c1.2-2.6 3.1-4 5.5-4s4.3 1.4 5.5 4"/></g></svg>',
    carrossel: '<svg viewBox="0 0 24 24"><path d="M7 4h11a2 2 0 0 1 2 2v11" fill="none" stroke="#fff" stroke-width="2"/><rect x="3.5" y="7.5" width="13" height="13" rx="2" fill="#fff"/></svg>',
    casa: '<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    enviar: '<svg viewBox="0 0 24 24"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Zm-11 10 5-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    busca: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    coracao: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    balao: '<svg viewBox="0 0 24 24"><path d="M20.5 12a8.5 8.5 0 1 1-4.1-7.3A8.5 8.5 0 0 1 20.5 12Zm0 0 .5 8.5-4.6-2.3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    salvar: '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-5-6 5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    status: '<svg viewBox="0 0 64 20"><g fill="currentColor"><rect x="0" y="12" width="3.4" height="6" rx="1"/><rect x="5" y="9" width="3.4" height="9" rx="1"/><rect x="10" y="6" width="3.4" height="12" rx="1"/><rect x="15" y="3" width="3.4" height="15" rx="1" opacity=".35"/><path d="M29 7.5a10 10 0 0 1 13 0l-1.6 1.7a7.6 7.6 0 0 0-9.8 0L29 7.5Zm3.2 3.4a5.4 5.4 0 0 1 6.6 0l-3.3 3.6-3.3-3.6Z"/><rect x="47" y="4" width="15" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="49" y="6" width="9" height="7" rx="1.6"/></g></svg>'
  };

  /* perfil de quem postou: os 3 clientes com Instagram copiado; os outros so com o nome */
  function perfil(chave, cliente) {
    var p = PERFIS[chave];
    if (p) return { user: p.user, foto: p.foto };
    return { user: cliente || "", foto: "" };
  }
  function avatar(p) {
    return p.foto ? '<img src="' + p.foto + '" alt="">' : "<i>" + esc((p.user || "?").charAt(0)) + "</i>";
  }

  /* ---------- 1. capa: "portfolio" ocupa a largura toda ---------- */
  var tit = $(".capa-tit");
  if (tit) {
    tit.innerHTML = "<span>" + tit.textContent + "</span>";
    var palavra = tit.firstChild;
    var ajusta = function () {
      tit.style.fontSize = "";
      var largura = tit.parentNode.clientWidth, atual = palavra.getBoundingClientRect().width;
      if (!atual) return;
      var fs = parseFloat(getComputedStyle(tit).fontSize) * (largura / atual) * 0.995;
      tit.style.fontSize = Math.min(fs, 520) + "px";
    };
    ajusta();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusta);
    var tAj;
    window.addEventListener("resize", function () { clearTimeout(tAj); tAj = setTimeout(ajusta, 120); });
  }

  /* ---------- 2. leque de artes no cartao ---------- */
  var leque = $("#leque");
  if (leque) {
    ["fasa-formandos", "pousada-casal", "tabua-personalize"].forEach(function (id, i) {
      var o = porId[id];
      if (!o) return;
      var im = document.createElement("img");
      im.src = "img/t/" + id + ".jpg";
      im.alt = "";
      im.className = "l" + (i + 1);
      leque.appendChild(im);
    });
  }

  /* ---------- 3. visualizador (lupa) ---------- */
  var lupa = $("#lupa"), lImg = $("#lupa-img"), lLeg = $("#lupa-leg"), atual = { lista: [], i: 0 }, foco = null;
  function mostrar(i) {
    var n = atual.lista.length;
    atual.i = (i + n) % n;
    var o = atual.lista[atual.i];
    lImg.src = o.src || ("img/obras/" + o.id + ".jpg");
    lImg.alt = o.titulo;
    lLeg.innerHTML = esc(o.titulo) + "<span>" + esc(o.cliente) + " · " + o.ano + " · " + esc(o.tipo) +
      (n > 1 ? " · " + (atual.i + 1) + " de " + n : "") + "</span>";
    $("#lupa-ant").hidden = n < 2;
    $("#lupa-prox").hidden = n < 2;
    if (n > 1) { var p = atual.lista[(atual.i + 1) % n], pre = new Image(); pre.src = p.src || ("img/obras/" + p.id + ".jpg"); }
  }
  function abrir(lista, i) {
    foco = document.activeElement;
    atual.lista = lista;
    mostrar(i < 0 ? 0 : i);
    lupa.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lupa-x").focus();
  }
  function fechar() {
    lupa.hidden = true;
    document.body.style.overflow = "";
    lImg.src = "";
    if (foco) foco.focus();
  }
  $("#lupa-x").addEventListener("click", fechar);
  $("#lupa-ant").addEventListener("click", function () { mostrar(atual.i - 1); });
  $("#lupa-prox").addEventListener("click", function () { mostrar(atual.i + 1); });
  lupa.addEventListener("click", function (e) { if (e.target === lupa) fechar(); });
  document.addEventListener("keydown", function (e) {
    if (lupa.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(atual.i - 1);
    if (e.key === "ArrowRight") mostrar(atual.i + 1);
  });
  var x0 = null;
  lupa.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lupa.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45 && atual.lista.length > 1) mostrar(atual.i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- 4. celular com o perfil do Instagram ---------- */
  $$(".cel").forEach(function (cel) {
    var p = PERFIS[cel.dataset.perfil] || {};
    var lista = doGrupo(cel.dataset.grupo).slice(0, 9);
    if (!lista.length) return;
    var nums = (p.nums || []).map(function (n) { return "<div><b>" + esc(n[0]) + "</b><span>" + esc(n[1]) + "</span></div>"; }).join("");
    var bio = (p.cat ? '<p class="ig-cat">' + esc(p.cat) + "</p>" : "") +
      (p.bio || []).map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") +
      (p.link ? '<p class="ig-link">' + IC.corrente + esc(p.link) + "</p>" : "");
    var dest = (p.destaques || []).map(function (d) {
      var dentro = d.img ? '<img src="' + d.img + '" alt="" loading="lazy">' :
        '<i style="background:' + (p.corDestaque || "#555") + '">' + (d.txt ? "<em>" + esc(d.txt) + "</em>" : "") + "</i>";
      return '<div class="ig-dest"><span>' + dentro + "</span><small>" + esc(d.t) + "</small></div>";
    }).join("");
    var grade = lista.map(function (o) {
      return '<span><img src="img/t/' + o.id + '.jpg" loading="lazy" decoding="async" alt="">' + IC.carrossel + "</span>";
    }).join("");
    cel.setAttribute("role", "img");
    cel.setAttribute("aria-label", "Perfil " + (p.nome || "") + " no Instagram, com as artes do feed");
    cel.innerHTML =
      '<div class="cel-tela"><span class="cel-ilha"></span>' +
      '<div class="ig-status"><b>9:41</b>' + IC.status + "</div>" +
      '<div class="ig-barra">' + IC.voltar + "<b>" + esc(p.user || "") + "</b>" + IC.sino + IC.mais + "</div>" +
      '<div class="ig-cab"><img class="ig-foto" src="' + (p.foto || "") + '" alt=""><div class="ig-info"><b class="ig-nome">' + esc(p.nome || "") + "</b>" +
      (nums ? '<div class="ig-nums">' + nums + "</div>" : "") + "</div></div>" +
      '<div class="ig-bio">' + bio + "</div>" +
      '<div class="ig-bts"><span>Seguindo' + IC.seta + "</span><span>Mensagem</span><span>Contato</span></div>" +
      (dest ? '<div class="ig-dests">' + dest + "</div>" : "") +
      '<div class="ig-abas"><span class="on">' + IC.grade + "</span><span>" + IC.reels + "</span><span>" + IC.repost + "</span><span>" + IC.marcado + "</span></div>" +
      '<div class="ig-grade">' + grade + "</div>" +
      '<div class="ig-nav">' + IC.casa + IC.reels + IC.enviar + IC.busca + '<img src="' + (p.foto || "") + '" alt=""></div>' +
      "</div>";
  });

  /* ---------- 5. posts e stories com a moldura do Instagram ---------- */
  function post(o, p, lista, i) {
    var f = document.createElement("figure");
    f.className = "igp";
    f.innerHTML = '<div class="igp-cab">' + avatar(p) + "<b>" + esc(p.user) + "</b>" + IC.mais + "</div>" +
      '<button class="igp-img" type="button" aria-label="Ampliar: ' + esc(o.titulo + ", " + o.cliente) + '" style="--r:' + (o.w / o.h).toFixed(4) + '">' +
      '<img src="img/t/' + o.id + '.jpg" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '"></button>' +
      '<div class="igp-acoes" aria-hidden="true">' + IC.coracao + IC.balao + IC.enviar + IC.salvar + "</div>";
    $("button", f).addEventListener("click", function () { abrir(lista, i); });
    return f;
  }
  function story(o, p, lista, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "igst";
    b.setAttribute("aria-label", "Ampliar: " + o.titulo + ", " + o.cliente);
    b.innerHTML = '<img src="img/t/' + o.id + '.jpg" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '">' +
      '<span class="igst-topo" aria-hidden="true"><span class="igst-barras"><i></i><i></i><i></i></span>' +
      '<span class="igst-cab">' + (p.foto ? '<img src="' + p.foto + '" alt="">' : "") + esc(p.user) + " <small>2 h</small></span></span>" +
      '<span class="igst-pe" aria-hidden="true"><span>Enviar mensagem</span>' + IC.coracao + IC.enviar + "</span>";
    b.addEventListener("click", function () { abrir(lista, i); });
    return b;
  }
  $$(".igs").forEach(function (caixa) {
    var tirar = (caixa.dataset.tirar || "").split(",");
    var lista = doGrupo(caixa.dataset.grupo).filter(function (o) { return tirar.indexOf(o.id) < 0; });
    var p = perfil(caixa.dataset.perfil, lista[0] && lista[0].cliente);
    var posts = lista.filter(function (o) { return o.w / o.h >= .7; });
    var stories = lista.filter(function (o) { return o.w / o.h < .7; });
    var ordem = posts.concat(stories);
    [[posts, post, ""], [stories, story, " so-stories"]].forEach(function (par) {
      if (!par[0].length) return;
      var g = document.createElement("div");
      g.className = "igs-grade" + par[2];
      g.style.setProperty("--cols", par[1] === story ? 5 : Math.min(5, par[0].length));
      par[0].forEach(function (o) { g.appendChild(par[1](o, p, ordem, ordem.indexOf(o))); });
      caixa.appendChild(g);
    });
  });

  /* artes soltas (Eco e Escopo) tambem com a moldura */
  $$(".duo-artes").forEach(function (caixa) {
    var lista = doGrupo(caixa.dataset.grupo);
    var p = perfil(caixa.dataset.grupo, lista[0] && lista[0].cliente);
    caixa.style.setProperty("--n", Math.max(lista.length, 1));
    lista.forEach(function (o, i) { caixa.appendChild(post(o, p, lista, i)); });
  });

  /* ---------- 6. carrossel completo: celular com o 1o slide + a faixa ---------- */
  var porPano = {};
  PANOS.forEach(function (p) { porPano[p.id] = p; });
  $$(".carr").forEach(function (caixa) {
    var pa = porPano[caixa.dataset.pano];
    if (!pa) return;
    var p = perfil(caixa.dataset.perfil, pa.cliente);
    var n = Math.max(2, Math.round(pa.w / (pa.h * 0.8)));
    var src = "img/obras/" + pa.id + ".jpg";
    var pontos = "";
    for (var k = 0; k < Math.min(n, 8); k++) pontos += "<i></i>";
    var item = { src: src, titulo: pa.titulo, cliente: pa.cliente, ano: pa.ano, tipo: "Carrossel completo, " + n + " slides" };
    caixa.innerHTML =
      '<div class="carr-fone" aria-hidden="true"><div class="carr-tela">' +
      '<div class="carr-status"><span>9:41</span><span>●●●</span></div>' +
      '<div class="igp-cab">' + avatar(p) + "<b>" + esc(p.user) + "</b>" + IC.mais + "</div>" +
      '<div class="carr-slide" style="background-image:url(\'' + src + '\')"></div>' +
      '<div class="carr-pontos">' + pontos + "</div>" +
      '<div class="igp-acoes">' + IC.coracao + IC.balao + IC.enviar + IC.salvar + "</div>" +
      '<p class="carr-leg"><b>' + esc(p.user) + "</b> " + esc(pa.titulo.replace(/^Carrossel\s*/, "")) + "</p>" +
      "</div></div>" +
      '<div class="carr-faixa"><button type="button" aria-label="Ampliar o ' + esc(pa.titulo) + '">' +
      '<img src="' + src + '" width="' + pa.w + '" height="' + pa.h + '" loading="lazy" decoding="async" alt="' + esc(pa.titulo) + ', todos os slides lado a lado"></button>' +
      '<p class="carr-dica">' + esc(pa.cliente) + " · " + pa.ano + " · " + n + " slides · arraste para o lado</p></div>";
    $("button", caixa).addEventListener("click", function () { abrir([item], 0); });
  });

  /* ---------- 7. campanha da FASA: feed, quadrado e stories na mesma altura ---------- */
  var caixaCamp = $("#campanha");
  if (caixaCamp && window.CAMPANHA) {
    var todasC = [];
    window.CAMPANHA.forEach(function (linha) { linha.forEach(function (id) { if (porId[id]) todasC.push(porId[id]); }); });
    window.CAMPANHA.forEach(function (linha) {
      var div = document.createElement("div");
      div.className = "camp-linha";
      linha.forEach(function (id) {
        var o = porId[id];
        if (!o) return;
        var r = o.w / o.h, fmt = r > .95 ? "quadrado" : (r < .7 ? "stories" : "feed");
        var b = document.createElement("button");
        b.type = "button";
        b.className = "camp-item";
        b.style.setProperty("--r", r.toFixed(4));
        b.setAttribute("aria-label", "Ampliar: " + o.titulo + " (" + fmt + ")");
        b.innerHTML = '<img src="img/t/' + o.id + '.jpg" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async" alt="' + esc(o.titulo) + '"><span>' + fmt + "</span>";
        var idx = todasC.indexOf(o);
        b.addEventListener("click", function () { abrir(todasC, idx); });
        div.appendChild(b);
      });
      caixaCamp.appendChild(div);
    });
  }

  /* ---------- 8. prints de resultado ---------- */
  $$("[data-zoom]").forEach(function (b) {
    b.addEventListener("click", function () {
      abrir([{ src: b.dataset.zoom, titulo: b.dataset.leg, cliente: b.dataset.cli || "Pousada das Missões",
        ano: b.dataset.ano || 2026, tipo: b.dataset.tipo || "Print de resultado" }], 0);
    });
  });

  /* ---------- 9. numero de pagina, como numa apresentacao ---------- */
  var pags = $$("[data-pag]"), total = pags.length;
  pags.forEach(function (s, i) {
    var n = document.createElement("span");
    n.className = "pag-num";
    n.setAttribute("aria-hidden", "true");
    n.textContent = (i + 1 < 10 ? "0" : "") + (i + 1) + "/" + total;
    s.appendChild(n);
  });

  /* ---------- 10. sempre abre no topo ---------- */
  var mexeu = false;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) {
    window.addEventListener(ev, function () { mexeu = true; }, { once: true, passive: true });
  });
  function topo0() { if (!mexeu) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
  topo0();
  window.addEventListener("load", topo0);
  window.addEventListener("pageshow", function (e) { if (e.persisted) { mexeu = false; topo0(); } });

  /* ---------- 11. barra fixa e aviso de disponibilidade ---------- */
  var barra = $("#barra"), capa = $("#inicio"), aviso = $("#aviso"), contato = $("#contato"), avisoFechado = false;
  try { avisoFechado = sessionStorage.getItem("aviso-fechado") === "1"; } catch (e) {}
  if (aviso && !avisoFechado) aviso.hidden = false;
  var noContato = false;
  function aoRolar() {
    var passou = window.scrollY > capa.offsetHeight * 0.7;
    barra.classList.toggle("on", passou);
    if (aviso && !aviso.hidden) aviso.classList.toggle("on", passou && !noContato);
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();
  $("#aviso-x").addEventListener("click", function () {
    aviso.classList.remove("on");
    setTimeout(function () { aviso.hidden = true; }, 400);
    try { sessionStorage.setItem("aviso-fechado", "1"); } catch (e) {}
  });

  /* ---------- 12. efeitos ao rolar e menu ativo ---------- */
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visto"); obs.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
    $$(".revela").forEach(function (el) { obs.observe(el); });

    new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { noContato = en.isIntersecting; aoRolar(); });
    }, { threshold: .2 }).observe(contato);

    var links = {};
    $$("#menu a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var mapa = { social: "social", pousada: "social", fasa: "social", tabua: "social", trafego: "trafego", resultados: "trafego", numeros: "trafego",
      posts: "posts", eco: "posts", escopo: "posts", anima: "posts", sites: "sites", "site-roteiros": "sites", "outros-sites": "sites",
      "sobre-div": "sobre", sobre: "sobre", processo: "sobre", contato: "sobre", sumario: "", oi: "" };
    var obsSec = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var alvo = mapa[en.target.id];
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("ativo", k === alvo); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(mapa).forEach(function (id) { var s = document.getElementById(id); if (s) obsSec.observe(s); });
  } else {
    $$(".revela").forEach(function (el) { el.classList.add("visto"); });
  }
})();
