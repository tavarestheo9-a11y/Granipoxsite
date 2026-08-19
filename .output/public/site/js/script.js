/* =====================================================================
   GRANIPOX CONSTRUÇÃO CIVIL — script principal (JavaScript puro ES6+)
   Sumário:
   01. CONFIG (edite aqui: WhatsApp, contatos, preços)
   02. Dados de conteúdo (diferenciais, produtos, serviços, etc.)
   03. Utilitários
   04. Render de conteúdo
   05. Header, menu e scroll
   06. Animações (reveal, parallax, contadores, ripple)
   07. Calculadora de orçamento
   08. Galeria + Lightbox
   09. Carrossel de depoimentos
   10. FAQ (accordion)
   11. Formulário de contato
   12. Init
   ===================================================================== */

/* ---------- 01. CONFIG ---------- */
const CONFIG = {
  empresa: "Granipox Pisos e Revestimentos",
  // Número do WhatsApp no formato internacional, apenas dígitos (55 + DDD + número)
  whatsapp: "5511958383267",
  telefone: "(11) 95838-3267",
  email: "granipoxpisofulget@gmail.com",
  endereco: "Av. das Pedras, 1200 - Distrito Industrial, São Paulo - SP",
  horario: "Seg a Sex 08h - 18h · Sáb 08h - 13h",

  // Preço base por m² de cada material (R$)
  materiais: [
    { id: "granito", nome: "Granito", preco: 480 },
    { id: "marmore", nome: "Mármore", preco: 720 },
    { id: "quartzo", nome: "Quartzo", preco: 950 },
    { id: "quartzito", nome: "Quartzito", preco: 1180 },
    { id: "porcelanato", nome: "Porcelanato", preco: 620 },
  ],
  // Multiplicadores
  espessuras: [
    { id: "2cm", nome: "2 cm", fator: 1 },
    { id: "3cm", nome: "3 cm", fator: 1.28 },
    { id: "4cm", nome: "4 cm (bisotado)", fator: 1.5 },
  ],
  acabamentos: [
    { id: "polido", nome: "Polido", fator: 1 },
    { id: "levigado", nome: "Levigado", fator: 1.12 },
    { id: "flameado", nome: "Flameado", fator: 1.2 },
    { id: "escovado", nome: "Escovado / Acetinado", fator: 1.25 },
  ],
  // Produtividade para o prazo estimado
  m2PorDia: 6,
  prazoMinimoDias: 5,

  // Desconto por volume (NÃO aparece para o cliente — aplicado automaticamente).
  // Quanto maior a área total da obra, menor o preço por m².
  // "ate" = área total em m²; "fator" = multiplicador aplicado ao valor.
  descontosPorArea: [
    { ate: 10, fator: 1 },        // até 10 m²  — sem desconto
    { ate: 25, fator: 0.95 },     // 10 a 25 m² — 5% menor
    { ate: 50, fator: 0.9 },      // 25 a 50 m² — 10% menor
    { ate: 100, fator: 0.85 },    // 50 a 100 m² — 15% menor
    { ate: 250, fator: 0.8 },     // 100 a 250 m² — 20% menor
    { ate: Infinity, fator: 0.74 } // acima de 250 m² — 26% menor
  ],

  // Senha do painel de administração da vitrine
  adminSenha: "granipox2024",
};


/* ---------- 02. DADOS DE CONTEÚDO ---------- */
const ICONS = {
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5"/>',
  gem: '<path d="m6 3 12 0 4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6-4 12"/>',
  team: '<path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>',
  truck: '<path d="M1 3h13v13H1z"/><path d="M14 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.1-2.1z"/>',
  ruler: '<path d="M3 15 15 3l6 6L9 21z"/><path d="m7 11 2 2M11 7l2 2M11 15l2 2"/>',
  brush: '<path d="M4 20c3 0 4-2 4-4l8-8 4 4-8 8c-2 0-4 1-4 4z"/>',
  home: '<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  build: '<path d="M2 20h20M5 20V9l5-4 5 4v11M9 20v-5h2v5"/><path d="M17 20v-7h4v7"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  pin: '<path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const DIFERENCIAIS = [
  { icon: "user", titulo: "Atendimento personalizado", texto: "Um consultor acompanha o seu projeto do primeiro contato à instalação final." },
  { icon: "award", titulo: "Alta qualidade", texto: "Corte CNC com precisão milimétrica e conferência de acabamento peça por peça." },
  { icon: "gem", titulo: "Materiais premium", texto: "Chapas selecionadas nas melhores jazidas, com veios escolhidos junto com você." },
  { icon: "team", titulo: "Equipe especializada", texto: "Instaladores próprios, treinados e uniformizados — sem terceirização." },
  { icon: "truck", titulo: "Entrega rápida", texto: "Logística própria e prazos cumpridos, com acompanhamento por WhatsApp." },
  { icon: "file", titulo: "Orçamento sem compromisso", texto: "Medição técnica gratuita e proposta detalhada em até 24 horas." },
];

const PRODUTOS_PADRAO = [
  { nome: "Granitos", tag: "Pedra natural", img: "assets/granito.jpg", desc: "Resistência e beleza atemporal para bancadas, pisos e fachadas.", alt: "Chapa de granito preto polido" },
  { nome: "Mármores", tag: "Pedra natural", img: "assets/marmore.jpg", desc: "Veios exclusivos e sofisticação para ambientes de alto padrão.", alt: "Mármore branco com veios cinza" },
  { nome: "Quartzo", tag: "Engenharia", img: "assets/quartzo.jpg", desc: "Superfície não porosa, uniforme e altamente resistente a manchas.", alt: "Cozinha moderna com bancada de quartzo branco" },
  { nome: "Bancadas", tag: "Sob medida", img: "assets/bancada.jpg", desc: "Cozinhas, lavabos e áreas gourmet com cubas e frisos sob medida.", alt: "Bancada de granito preto em cozinha" },
  { nome: "Escadas", tag: "Sob medida", img: "assets/escada.jpg", desc: "Degraus, espelhos e rodapés com encaixe perfeito e antiderrapante.", alt: "Escada revestida em mármore branco" },
  { nome: "Soleiras e Nichos", tag: "Acabamento", img: "assets/pia.jpg", desc: "Peças de acabamento que valorizam portas, box e áreas molhadas.", alt: "Banheiro com nicho e pia de mármore" },
  { nome: "Pias e Cubas", tag: "Sob medida", img: "assets/pia.jpg", desc: "Cubas esculpidas na própria pedra ou em inox de alta durabilidade.", alt: "Pia esculpida em mármore branco" },
  { nome: "Revestimentos", tag: "Fachadas", img: "assets/revestimento.jpg", desc: "Paredes e fachadas em pedra natural com fixação estrutural segura.", alt: "Fachada revestida em pedra natural escura" },
  { nome: "Pisos em pedra", tag: "Ambientes", img: "assets/escada.jpg", desc: "Grandes áreas com paginação planejada e rejunte milimétrico.", alt: "Piso de mármore polido em hall de entrada" },
];

/* Vitrine editável pelo administrador (salva no navegador via localStorage) */
const STORE_PRODUTOS = "granipox_produtos_v1";
let PRODUTOS = carregarProdutos();

function carregarProdutos() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORE_PRODUTOS));
    if (Array.isArray(salvo) && salvo.length) return salvo;
  } catch (e) { /* ignora dados inválidos */ }
  return PRODUTOS_PADRAO.map((p) => ({ ...p }));
}

function salvarProdutos() {
  try { localStorage.setItem(STORE_PRODUTOS, JSON.stringify(PRODUTOS)); } catch (e) { /* cota cheia */ }
}


const SERVICOS = [
  { icon: "tool", titulo: "Instalação", texto: "Equipe própria, ferramental profissional e obra entregue limpa." },
  { icon: "ruler", titulo: "Projetos personalizados", texto: "Desenho técnico 3D antes do corte, aprovado por você." },
  { icon: "brush", titulo: "Acabamentos", texto: "Polimento, levigamento, bisotê, frisos e impermeabilização." },
  { icon: "home", titulo: "Reformas", texto: "Substituição de bancadas e revestimentos com o mínimo de transtorno." },
  { icon: "build", titulo: "Construção civil", texto: "Execução de obras completas com engenheiro responsável." },
  { icon: "chat", titulo: "Consultoria", texto: "Escolha do material ideal para uso, clima e orçamento do projeto." },
];

const PROCESSO = [
  { titulo: "Recebemos seu contato", texto: "Você fala com um consultor pelo WhatsApp ou formulário e conta o que precisa." },
  { titulo: "Fazemos o orçamento", texto: "Medição técnica no local e proposta detalhada em até 24 horas." },
  { titulo: "Produção", texto: "Escolha da chapa, corte CNC e acabamento conferido peça por peça." },
  { titulo: "Instalação", texto: "Equipe própria instala com precisão, no dia combinado e sem sujeira." },
  { titulo: "Cliente satisfeito", texto: "Vistoria final, garantia por escrito e suporte de manutenção." },
];

const GALERIA = [
  { img: "assets/bancada.jpg", alt: "Bancada de granito preto instalada em cozinha" },
  { img: "assets/marmore.jpg", alt: "Detalhe de chapa de mármore branco" },
  { img: "assets/escada.jpg", alt: "Escada em mármore branco" },
  { img: "assets/quartzo.jpg", alt: "Cozinha com bancada de quartzo" },
  { img: "assets/granito.jpg", alt: "Granito preto polido" },
  { img: "assets/pia.jpg", alt: "Banheiro com pia de mármore" },
  { img: "assets/revestimento.jpg", alt: "Fachada em pedra natural" },
  { img: "assets/hero.jpg", alt: "Showroom de chapas de granito e mármore" },
];

const DEPOIMENTOS = [
  { nome: "Ana Carvalho", papel: "Arquiteta · São Paulo", texto: "Trabalho com marmorarias há 12 anos e a Granipox é a única que entrega o acabamento exatamente como está no projeto. Prazo cumprido à risca." },
  { nome: "Ricardo Menezes", papel: "Cliente residencial", texto: "Refizeram toda a cozinha e as escadas da casa. Equipe educadíssima, obra limpa e o resultado ficou melhor do que eu imaginava." },
  { nome: "Construtora Vértice", papel: "Obra corporativa", texto: "Fornecimento e instalação de mais de 900 m² de revestimento sem uma única falha de cronograma. Parceria já em quatro empreendimentos." },
  { nome: "Juliana Prado", papel: "Designer de interiores", texto: "O atendimento consultivo faz toda a diferença: me ajudaram a escolher o material certo para cada ambiente e ainda economizei no total." },
];

const FAQ = [
  { q: "Vocês fazem medição no local?", a: "Sim. A medição técnica é gratuita dentro da região metropolitana e agendada em até 48 horas após o contato." },
  { q: "Qual o prazo médio de entrega?", a: "Projetos residenciais ficam prontos entre 5 e 12 dias úteis após a aprovação do orçamento e da chapa escolhida." },
  { q: "Como solicito um orçamento?", a: "Envie sua mensagem pelo formulário de contato. Nossa equipe retornará para entender o projeto e agendar a medição técnica." },
  { q: "Vocês oferecem garantia?", a: "Sim, garantia por escrito de 12 meses sobre a instalação, além da garantia própria do material." },
  { q: "Trabalham com obras fora da capital?", a: "Sim, atendemos todo o estado. Para outras regiões, o frete é calculado no orçamento." },
  { q: "Quais as formas de pagamento?", a: "Pix, transferência, cartão em até 12x e condições especiais para construtoras e arquitetos." },
];

/* ---------- 03. UTILITÁRIOS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const svgIcon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Monta a URL do WhatsApp com mensagem pré-preenchida. */
const whatsUrl = (mensagem) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

const abrirWhats = (mensagem) => window.open(whatsUrl(mensagem), "_blank", "noopener");

/* ---------- 04. RENDER DE CONTEÚDO ---------- */
/** Escapa texto vindo do painel do administrador antes de inserir no HTML. */
const esc = (t = "") => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Renderiza a vitrine de produtos (no load e após editar no painel admin). */
function renderProdutos(visivel = false) {
  const grid = $("#productGrid");
  if (!grid) return;
  grid.innerHTML = PRODUTOS.map((p, i) => `
    <article class="card product reveal${visivel ? " is-visible" : ""}" data-delay="${(i % 3) * 80}">
      <div class="product__media">
        <img src="${esc(p.img)}" alt="${esc(p.alt || p.nome)}" loading="lazy" decoding="async" width="1000" height="750" />
        ${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ""}
      </div>
      <div class="product__body">
        <h3>${esc(p.nome)}</h3><p>${esc(p.desc)}</p>
        <a class="btn btn--primary btn--sm ripple" href="#contato">Solicitar orçamento</a>
      </div>
    </article>`).join("");
}

function renderConteudo() {

  // Diferenciais
  $("#diffGrid").innerHTML = DIFERENCIAIS.map((d, i) => `
    <article class="card reveal" data-delay="${i * 70}">
      <div class="icon" aria-hidden="true">${svgIcon(d.icon)}</div>
      <h3>${d.titulo}</h3><p>${d.texto}</p>
    </article>`).join("");

  // Produtos (vitrine)
  renderProdutos();


  // Serviços
  $("#serviceGrid").innerHTML = SERVICOS.map((s, i) => `
    <article class="card service reveal" data-delay="${(i % 3) * 80}">
      <div class="icon" aria-hidden="true">${svgIcon(s.icon)}</div>
      <h3>${s.titulo}</h3><p>${s.texto}</p>
    </article>`).join("");

  // Processo
  $("#timeline").innerHTML = PROCESSO.map((p, i) => `
    <li class="timeline__item reveal" data-delay="${i * 70}">
      <span class="timeline__num">${i + 1}</span>
      <div><h3>${p.titulo}</h3><p>${p.texto}</p></div>
    </li>`).join("");

  // Galeria
  $("#gallery").innerHTML = GALERIA.map((g, i) => `
    <button class="masonry__item reveal" data-index="${i}" data-delay="${(i % 3) * 70}" aria-label="Ampliar imagem: ${g.alt}">
      <img src="${g.img}" alt="${g.alt}" loading="lazy" decoding="async" />
    </button>`).join("");

  // Depoimentos
  $("#carouselTrack").innerHTML = DEPOIMENTOS.map((d) => `
    <div class="slide" role="group" aria-label="Depoimento de ${d.nome}">
      <div class="slide__card">
        <p class="slide__stars" aria-label="Avaliação 5 de 5 estrelas">★★★★★</p>
        <p class="slide__text">“${d.texto}”</p>
        <div class="slide__author">
          <span class="slide__avatar" aria-hidden="true">${d.nome.charAt(0)}</span>
          <div><strong>${d.nome}</strong><span>${d.papel}</span></div>
        </div>
      </div>
    </div>`).join("");

  // FAQ
  $("#accordion").innerHTML = FAQ.map((f, i) => `
    <div class="acc reveal" data-delay="${i * 50}">
      <h3><button class="acc__btn" type="button" aria-expanded="false" aria-controls="faq-${i}">${f.q}</button></h3>
      <div class="acc__panel" id="faq-${i}" role="region"><p>${f.a}</p></div>
    </div>`).join("");

  // Contato
  const contatos = [
    { icon: "phone", label: "Telefone", value: CONFIG.telefone },
    { icon: "chat", label: "WhatsApp", value: `+${CONFIG.whatsapp.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, "$1 ($2) $3-$4")}` },
    { icon: "mail", label: "E-mail", value: CONFIG.email },
    { icon: "pin", label: "Endereço", value: CONFIG.endereco },
    { icon: "clock", label: "Horário", value: CONFIG.horario },
  ];
  $("#contactList").innerHTML = contatos.map((c) => `
    <li><span class="icon" aria-hidden="true">${svgIcon(c.icon)}</span>
    <div><strong>${c.label}</strong><span>${c.value}</span></div></li>`).join("");

  $("#footerContact").innerHTML = contatos.slice(0, 4)
    .map((c) => `<li>${c.value}</li>`).join("");

  // WhatsApp flutuante e ano
  $("#whatsFloat").href = whatsUrl(`Olá! Vim pelo site da ${CONFIG.empresa} e gostaria de um orçamento.`);
  $("#year").textContent = new Date().getFullYear();
}

/* ---------- 05. HEADER, MENU E SCROLL ---------- */
function initHeader() {
  const header = $("#header");
  const nav = $("#nav");
  const burger = $("#burger");
  const progress = $("#scrollProgress");
  const links = $$(".nav__link");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const toggleMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  burger.addEventListener("click", () => toggleMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  // Link ativo conforme a seção visível (scroll spy)
  const secoes = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secoes.forEach((s) => spy.observe(s));
}

/* ---------- 06. ANIMAÇÕES ---------- */
/** Revela elementos ao entrar na viewport (fade + slide). */
function initReveal() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
}

/** Parallax suave em elementos com [data-parallax]. */
function initParallax() {
  const items = $$("[data-parallax]");
  if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    items.forEach((el) => { el.style.transform = `translate3d(0, ${y * Number(el.dataset.parallax)}px, 0)`; });
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/** Contadores animados das estatísticas. */
function initCounters() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const alvo = Number(el.dataset.count);
      const prefixo = el.dataset.prefix || "";
      const sufixo = el.dataset.suffix || "";
      const duracao = 1600;
      const inicio = performance.now();
      const step = (t) => {
        const p = Math.min((t - inicio) / duracao, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = prefixo + Math.round(alvo * eased).toLocaleString("pt-BR") + sufixo;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach((el) => io.observe(el));
}

/** Efeito ripple nos botões com a classe .ripple. */
function initRipple() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".ripple");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement("span");
    wave.className = "ripple-wave";
    wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 620);
  });
}

/* ---------- 07. CALCULADORA DE ORÇAMENTO ---------- */
function initCalculadora() {
  const form = $("#calcForm");
  const erro = $("#calcError");
  const resultado = $("#calcResult");
  let ultimo = null; // guarda o último cálculo para o botão do WhatsApp

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form).entries());
    const area = parseFloat(dados.area);
    const qtd = parseInt(dados.quantidade, 10);

    // Validação
    if (!area || area <= 0 || !qtd || qtd <= 0 || !dados.cidade.trim()) {
      erro.hidden = false;
      return;
    }
    erro.hidden = true;

    const material = CONFIG.materiais.find((m) => m.id === dados.material);
    const espessura = CONFIG.espessuras.find((x) => x.id === dados.espessura);
    const acabamento = CONFIG.acabamentos.find((a) => a.id === dados.acabamento);

    const areaTotal = area * qtd;
    // Desconto automático por volume (oculto para o cliente):
    // quanto maior a área total da obra, menor o valor por m².
    const faixa = CONFIG.descontosPorArea.find((f) => areaTotal <= f.ate) || { fator: 1 };
    const valor = material.preco * espessura.fator * acabamento.fator * areaTotal * faixa.fator;

    const dias = Math.max(CONFIG.prazoMinimoDias, Math.ceil(areaTotal / CONFIG.m2PorDia));

    // Exibe o resultado
    $("#calcValue").textContent = brl(valor);
    $("#calcTime").textContent = `${dias} a ${dias + 4} dias úteis`;
    $("#calcArea").textContent = `${areaTotal.toLocaleString("pt-BR")} m²`;
    $("#calcMaterial").textContent = `${material.nome} · ${espessura.nome} · ${acabamento.nome}`;
    resultado.hidden = false;
    resultado.scrollIntoView({ behavior: "smooth", block: "center" });

    ultimo = { material, espessura, acabamento, areaTotal, qtd, valor, cidade: dados.cidade.trim() };
  });

  // Envia o orçamento estimado para o WhatsApp
  $("#calcWhats").addEventListener("click", () => {
    if (!ultimo) return;
    abrirWhats(
      `*Orçamento estimado — ${CONFIG.empresa}*\n\n` +
      `• Material: ${ultimo.material.nome}\n` +
      `• Espessura: ${ultimo.espessura.nome}\n` +
      `• Acabamento: ${ultimo.acabamento.nome}\n` +
      `• Área total: ${ultimo.areaTotal} m²\n` +
      `• Quantidade: ${ultimo.qtd} peça(s)\n` +
      `• Valor estimado: ${brl(ultimo.valor)}\n` +
      `• Cidade: ${ultimo.cidade}\n\n` +
      `Gostaria de confirmar esse orçamento e agendar a medição.`
    );
  });

  // Botões "Solicitar orçamento" dos produtos
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-produto]");
    if (!btn) return;
    abrirWhats(`Olá! Tenho interesse em *${btn.dataset.produto}* da ${CONFIG.empresa}. Pode me enviar um orçamento?`);
  });
}

/* ---------- 08. GALERIA + LIGHTBOX ---------- */
function initLightbox() {
  const lb = $("#lightbox");
  const img = $("#lbImage");
  let atual = 0;

  const mostrar = (i) => {
    atual = (i + GALERIA.length) % GALERIA.length;
    img.src = GALERIA[atual].img;
    img.alt = GALERIA[atual].alt;
  };
  const abrir = (i) => { mostrar(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); };
  const fechar = () => { lb.hidden = true; document.body.style.overflow = ""; };

  $("#gallery").addEventListener("click", (e) => {
    const item = e.target.closest(".masonry__item");
    if (item) abrir(Number(item.dataset.index));
  });
  $("#lbClose").addEventListener("click", fechar);
  $("#lbPrev").addEventListener("click", () => mostrar(atual - 1));
  $("#lbNext").addEventListener("click", () => mostrar(atual + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) fechar(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "ArrowRight") mostrar(atual + 1);
  });
}

/* ---------- 09. CARROSSEL DE DEPOIMENTOS ---------- */
function initCarousel() {
  const track = $("#carouselTrack");
  const dots = $("#carouselDots");
  const total = DEPOIMENTOS.length;
  let index = 0;
  let timer = null;

  dots.innerHTML = DEPOIMENTOS.map((_, i) => `<button type="button" role="tab" aria-label="Depoimento ${i + 1}"></button>`).join("");
  const botoes = $$("button", dots);

  const ir = (i) => {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    botoes.forEach((b, k) => b.classList.toggle("is-active", k === index));
  };
  const autoplay = () => { clearInterval(timer); timer = setInterval(() => ir(index + 1), 6000); };

  botoes.forEach((b, i) => b.addEventListener("click", () => { ir(i); autoplay(); }));
  $("#prevSlide").addEventListener("click", () => { ir(index - 1); autoplay(); });
  $("#nextSlide").addEventListener("click", () => { ir(index + 1); autoplay(); });

  // Pausa o autoplay ao passar o mouse
  const car = $("#carousel");
  car.addEventListener("mouseenter", () => clearInterval(timer));
  car.addEventListener("mouseleave", autoplay);

  // Swipe em telas de toque
  let x0 = null;
  car.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  car.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) ir(index + (dx < 0 ? 1 : -1));
    x0 = null; autoplay();
  });

  ir(0); autoplay();
}

/* ---------- 10. FAQ (ACCORDION) ---------- */
function initAccordion() {
  $("#accordion").addEventListener("click", (e) => {
    const btn = e.target.closest(".acc__btn");
    if (!btn) return;
    const item = btn.closest(".acc");
    const painel = $(`#${btn.getAttribute("aria-controls")}`);
    const aberto = item.classList.contains("is-open");

    // Fecha os demais (comportamento de accordion único)
    $$(".acc.is-open").forEach((el) => {
      el.classList.remove("is-open");
      $(".acc__btn", el).setAttribute("aria-expanded", "false");
      $(".acc__panel", el).style.maxHeight = null;
    });

    if (!aberto) {
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      painel.style.maxHeight = `${painel.scrollHeight}px`;
    }
  });
}

/* ---------- 11. FORMULÁRIO DE CONTATO ---------- */
function initContato() {
  const form = $("#contactForm");
  const erro = $("#contactError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email);
    if (!d.nome.trim() || d.telefone.trim().length < 8 || !emailOk || !d.mensagem.trim()) {
      erro.hidden = false;
      return;
    }
    erro.hidden = true;
    abrirWhats(
      `*Contato pelo site — ${CONFIG.empresa}*\n\n` +
      `• Nome: ${d.nome}\n• Telefone: ${d.telefone}\n• E-mail: ${d.email}\n\n` +
      `Mensagem: ${d.mensagem}`
    );
    form.reset();
  });
}

/* ---------- 12. PAINEL DO ADMINISTRADOR (VITRINE) ---------- */
function initAdmin() {
  const painel = $("#adminPanel");
  const login = $("#adminLogin");
  const conteudo = $("#adminContent");
  const lista = $("#adminList");
  const erro = $("#adminError");
  if (!painel) return;

  const abrir = () => { painel.hidden = false; document.body.style.overflow = "hidden"; $("#adminPass").focus(); };
  const fechar = () => { painel.hidden = true; document.body.style.overflow = ""; };

  const desenhar = () => {
    lista.innerHTML = PRODUTOS.map((p, i) => `
      <div class="admin__item" data-i="${i}">
        <img class="admin__thumb" src="${esc(p.img)}" alt="" />
        <div class="admin__fields">
          <input type="text" data-campo="nome" value="${esc(p.nome)}" placeholder="Nome do produto" />
          <input type="text" data-campo="tag" value="${esc(p.tag || "")}" placeholder="Categoria (ex: Sob medida)" />
          <textarea data-campo="desc" placeholder="Descrição">${esc(p.desc || "")}</textarea>
          <input type="text" data-campo="alt" value="${esc(p.alt || "")}" placeholder="Descrição da imagem (alt / SEO)" />
          <input class="admin__file" type="file" accept="image/*" data-campo="arquivo" />
        </div>
        <button type="button" class="admin__del" data-remover="${i}">Excluir</button>
      </div>`).join("");
  };

  const aplicar = () => { salvarProdutos(); renderProdutos(true); desenhar(); };

  // Abertura: botão do rodapé, atalho Ctrl+Shift+A ou #admin na URL
  $("#adminOpen")?.addEventListener("click", abrir);
  $("#adminClose").addEventListener("click", fechar);
  painel.addEventListener("click", (e) => { if (e.target === painel) fechar(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !painel.hidden) fechar();
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") { e.preventDefault(); abrir(); }
  });
  if (location.hash === "#admin") abrir();

  const entrar = () => {
    if ($("#adminPass").value !== CONFIG.adminSenha) { erro.hidden = false; return; }
    erro.hidden = true;
    login.hidden = true;
    conteudo.hidden = false;
    desenhar();
  };
  $("#adminEnter").addEventListener("click", entrar);
  $("#adminPass").addEventListener("keydown", (e) => { if (e.key === "Enter") entrar(); });

  // Edição de textos
  lista.addEventListener("input", (e) => {
    const campo = e.target.dataset.campo;
    if (!campo || campo === "arquivo") return;
    const i = Number(e.target.closest(".admin__item").dataset.i);
    PRODUTOS[i][campo] = e.target.value;
    salvarProdutos();
    renderProdutos(true);
  });

  // Troca de foto (converte para base64 e salva no navegador)
  lista.addEventListener("change", (e) => {
    if (e.target.dataset.campo !== "arquivo") return;
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const i = Number(e.target.closest(".admin__item").dataset.i);
    const leitor = new FileReader();
    leitor.onload = () => { PRODUTOS[i].img = leitor.result; aplicar(); };
    leitor.readAsDataURL(arquivo);
  });

  // Excluir produto
  lista.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remover]");
    if (!btn) return;
    if (!confirm("Excluir este produto da vitrine?")) return;
    PRODUTOS.splice(Number(btn.dataset.remover), 1);
    aplicar();
  });

  // Adicionar produto
  $("#adminAdd").addEventListener("click", () => {
    PRODUTOS.push({ nome: "Novo produto", tag: "Sob medida", img: "assets/granito.jpg", desc: "Descreva este produto.", alt: "Novo produto" });
    aplicar();
    lista.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Restaurar vitrine padrão
  $("#adminReset").addEventListener("click", () => {
    if (!confirm("Restaurar a vitrine original? As suas alterações serão perdidas.")) return;
    PRODUTOS = PRODUTOS_PADRAO.map((p) => ({ ...p }));
    aplicar();
  });
}

/* ---------- 13. INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderConteudo();   // precisa vir primeiro: cria os elementos animados

  initHeader();
  initReveal();
  initParallax();
  initCounters();
  initRipple();
  initLightbox();
  initCarousel();
  initAccordion();
  initContato();
  initAdmin();
});
