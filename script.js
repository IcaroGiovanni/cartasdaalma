"use strict";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const submitBtn = document.getElementById("submit-btn");
const submitLabel = submitBtn.querySelector(".btn__label");
const feedback = document.getElementById("feedback");
const cardSubtitle = document.querySelector("#view-login .card__subtitle");
const roleInputs = document.querySelectorAll("input[name='role']");

const viewLogin = document.getElementById("view-login");
const viewSchool = document.getElementById("view-school");
const viewContent = document.getElementById("view-content");
const viewCongrats = document.getElementById("view-congrats");
const viewDashboard = document.getElementById("view-dashboard");

const schoolForm = document.getElementById("school-form");
const schoolCode = document.getElementById("school-code");
const schoolFeedback = document.getElementById("school-feedback");
const unlockBtn = document.getElementById("unlock-btn");
const unlockLabel = unlockBtn.querySelector(".btn__label");

const logoutBtn = document.getElementById("logout-btn");
const dashboardTitle = document.getElementById("dashboard-title");
const dashboardSubtitle = document.getElementById("dashboard-subtitle");
const tileRole = document.getElementById("tile-role");
const tileSchool = document.getElementById("tile-school");
const tileSeal = document.getElementById("tile-seal");

const congratsContinue = document.getElementById("congrats-continue");
const sealDate = document.getElementById("seal-date");

const certificateEmpty = document.getElementById("certificate-empty");
const certificateReady = document.getElementById("certificate-ready");
const certificatePreview = document.getElementById("certificate-preview");
const certificateDownload = document.getElementById("certificate-download");
const certificateFeedback = document.getElementById("certificate-feedback");

const navItems = Array.from(document.querySelectorAll(".nav__item"));
const appSections = Array.from(document.querySelectorAll(".app__section"));
const sectionTitle = document.getElementById("section-title");
const sectionSubtitle = document.getElementById("section-subtitle");
const sectionKicker = document.getElementById("section-kicker");
const topbarPill = document.getElementById("topbar-pill");
const topbarDate = document.getElementById("topbar-date");

const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");

const schoolStatusText = document.getElementById("school-status-text");
const schoolProgressLabel = document.getElementById("school-progress-label");
const schoolProgressFill = document.getElementById("school-progress-fill");
const schoolSealChip = document.getElementById("school-seal-chip");
const schoolSteps = document.getElementById("school-steps");

const chatList = document.getElementById("chat-list");
const chatName = document.getElementById("chat-name");
const chatBody = document.getElementById("chat-body");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const settingsForm = document.getElementById("settings-form");
const settingsFeedback = document.getElementById("settings-feedback");
const settingName = document.getElementById("setting-name");
const settingEmail = document.getElementById("setting-email");
const settingsAvatar = document.getElementById("settings-avatar");
const settingsAsideName = document.getElementById("settings-aside-name");
const settingsAsideRole = document.getElementById("settings-aside-role");
const settingsAsideSpecialty = document.getElementById(
  "settings-aside-specialty"
);
const settingsAsideSchool = document.getElementById("settings-aside-school");

const settingSpecialty = document.getElementById("setting-specialty");
const settingPhoto = document.getElementById("setting-photo");
const settingPhotoRemove = document.getElementById("setting-photo-remove");
const settingsPhotoPreview = document.getElementById(
  "settings-photo-preview"
);

const ACCENT_THEMES = {
  cinza: {
    accent: "#778899",
    hover: "#67798b",
    ring: "rgba(119, 136, 153, 0.28)",
  },
  terracota: {
    accent: "#b4674d",
    hover: "#a05a42",
    ring: "rgba(180, 103, 77, 0.28)",
  },
  salvia: {
    accent: "#7d8f74",
    hover: "#6e8066",
    ring: "rgba(125, 143, 116, 0.28)",
  },
  dourado: {
    accent: "#b08a4f",
    hover: "#9c7944",
    ring: "rgba(176, 138, 79, 0.28)",
  },
  rose: {
    accent: "#b0728a",
    hover: "#9c6478",
    ring: "rgba(176, 114, 138, 0.28)",
  },
  noite: {
    accent: "#4d5f82",
    hover: "#435372",
    ring: "rgba(77, 95, 130, 0.28)",
  },
};

let pendingPhoto = null;
let pendingAccent = "cinza";

function applyAccent(key) {
  const theme = ACCENT_THEMES[key] || ACCENT_THEMES.cinza;
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-hover", theme.hover);
  root.style.setProperty("--accent-ring", theme.ring);
}

function applyAvatar(element, photo, name) {
  if (!element) return;

  if (photo) {
    element.classList.add("has-photo");
    element.style.backgroundImage = `url("${photo}")`;
    element.textContent = "";
  } else {
    element.classList.remove("has-photo");
    element.style.backgroundImage = "";
    element.textContent = name ? name.charAt(0) : "";
  }
}

function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Falha ao ler o arquivo."));
    reader.onload = () => {
      const image = new Image();

      image.onerror = () => reject(new Error("Imagem inválida."));
      image.onload = () => {
        const size = 320;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext("2d");
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;

        context.drawImage(
          image,
          (size - width) / 2,
          (size - height) / 2,
          width,
          height
        );
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

const adminNav = document.querySelector(".nav__item--admin");
const addTherapistForm = document.getElementById("add-therapist-form");
const addAdminForm = document.getElementById("add-admin-form");
const userList = document.getElementById("user-list");
const userListEmpty = document.getElementById("user-list-empty");
const statTherapists = document.getElementById("stat-therapists");
const statAdmins = document.getElementById("stat-admins");
const statSupportChats = document.getElementById("stat-support-chats");
const adminSummaryText = document.getElementById("admin-summary-text");
const adminTitle = document.getElementById("admin-title");
const adminSubtitle = document.getElementById("admin-subtitle");
const adminAddTherapistBtn = document.getElementById("admin-add-therapist");
const chatNav = document.querySelector('.nav__item[data-section="chat"]');
const chatNavLabel = chatNav ? chatNav.querySelector("span") : null;
const chatNotificationsHint = document.getElementById(
  "chat-notifications-hint"
);

const THERAPIST_ONLY_SECTIONS = ["sessao", "cartas", "escola", "certificado"];

const resetDemoBtn = document.getElementById("reset-demo");

const newSessionBtn = document.getElementById("new-session");
const sessionModal = document.getElementById("session-modal");
const sessionTitle = document.getElementById("session-modal-title");
const sessionOptions = Array.from(sessionModal.querySelectorAll(".option"));
const sessionCreate = document.getElementById("session-create");

const sessionStage = document.getElementById("session-stage");
const sessionStageMode = document.getElementById("session-stage-mode");
const sessionStageClose = document.getElementById("session-stage-close");
const sessionSpread = document.getElementById("session-spread");
const sessionDeck = document.getElementById("session-deck");
const sessionStack = document.getElementById("session-stack");
const sessionDraw = document.getElementById("session-draw");
const sessionResult = document.getElementById("session-result");
const sessionResultImg = document.getElementById("session-result-img");
const sessionResultEyebrow = document.getElementById("session-result-eyebrow");
const sessionResultName = document.getElementById("session-result-name");
const sessionQuestion = document.getElementById("session-question");
const sessionAgain = document.getElementById("session-again");
const sessionEnd = document.getElementById("session-end");
const sessionStatus = document.getElementById("session-status");
const sessionStatusFormat = document.getElementById("session-status-format");
const sessionStatusTitle = document.getElementById("session-status-title");
const sessionStatusQuestion = document.getElementById(
  "session-status-question"
);
const sessionReopen = document.getElementById("session-reopen");
const sessionFeedback = document.getElementById("session-feedback");

const cartaGrid = document.getElementById("carta-grid");
const cartaModal = document.getElementById("carta-modal");
const cartaTitle = document.getElementById("carta-modal-title");
const cartaImg = document.getElementById("carta-modal-img");
const cartaEyebrow = document.getElementById("carta-modal-eyebrow");
const cartaChips = document.getElementById("carta-modal-chips");
const cartaMeaning = document.getElementById("carta-meaning");
const cartaMeaning2 = document.getElementById("carta-meaning-2");
const cartaFindings = document.getElementById("carta-findings");
const cartaQuestions = document.getElementById("carta-questions");
const cartaMovement = document.getElementById("carta-movement");

const cinematicEl = document.getElementById("cinematic");
const cinematicLine = document.getElementById("cinematic-line");
const cinematicCard = document.getElementById("cinematic-card");
const cinematicImg = document.getElementById("cinematic-img");
const cinematicName = document.getElementById("cinematic-name");
const cinematicSkip = document.getElementById("cinematic-skip");

const cinematicExplain = document.getElementById("cinematic-explain");
const cinematicExplainImg = document.getElementById("cinematic-explain-img");
const cinematicExplainEyebrow = document.getElementById(
  "cinematic-explain-eyebrow"
);
const cinematicExplainName = document.getElementById("cinematic-explain-name");
const cinematicExplainChips = document.getElementById(
  "cinematic-explain-chips"
);
const cinematicExplainText = document.getElementById("cinematic-explain-text");
const cinematicExplainNext = document.getElementById(
  "cinematic-explain-next"
);
const cinematicExplainNextLabel = document.getElementById(
  "cinematic-explain-next-label"
);

let sessionFormat = null;
let sessionCardIndex = null;
let sessionQuestionText = "";
let sessionShuffling = false;

const moduleEls = Array.from(document.querySelectorAll("#modules .module"));
const contentTitle = document.getElementById("content-title");
const contentFeedback = document.getElementById("content-feedback");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCHOOL_CODE = "ALMA";
const SCHOOL_STORAGE_KEY = "cartasdaalma.school.unlocked";
const PROGRESS_STORAGE_KEY = "cartasdaalma.school.progress";
const CINEMATIC_SEEN_KEY = "cartasdaalma.cinematic.seen";
const SEAL_DATE_KEY = "cartasdaalma.seal.date";
const PROFILE_KEY = "cartasdaalma.profile";
const USERS_KEY = "cartasdaalma.users";
const CHATS_KEY = "cartasdaalma.chats";
const MODULE_COUNT = 4;
const MODULE_TITLES = [
  "O que são as Cartas da Alma",
  "A essência das Cartas da Alma",
  "Por que o paciente não deve saber o significado dos baralhos?",
  "O papel do terapeuta",
];

const SESSION_SPREAD_COLS = 5;

const DECK_IMAGES = [
  { theme: "carta1.jpeg", prefix: "origem", ext: "png" },
  { theme: "infancia.jpg", prefix: "infancia", ext: "jpg" },
  { theme: "familia.jpg", prefix: "familia", ext: "png" },
  { theme: "pai.jpg", prefix: "pai", ext: "png" },
  { theme: "mae.jpg", prefix: "mae", ext: "png" },
  { theme: "relacoes.jpg", prefix: "relacoes", ext: "png" },
  { theme: "Sexualidade.jpg", prefix: "sexualidade", ext: "png" },
  { theme: "proposito.jpg", prefix: "proposito", ext: "png" },
  { theme: "sombras.jpg", prefix: "sombras", ext: "png" },
];

const QUESTIONS_PER_DECK = 5;

function themeSrc(deck) {
  return deck.theme;
}

function questionSrc(deck, index) {
  return `${deck.prefix}${index + 1}.${deck.ext}`;
}

const CARDS = [
  {
    number: "01",
    name: "Origem",
    image: "carta1.jpeg",
    chips: ["Espiritualidade", "Cinza"],
    meaning: [
      "Experiências e vivências relacionadas à espiritualidade. Aqui, espiritualidade não significa necessariamente religião. Refere-se à maneira como cada pessoa compreende sua própria existência para além do que é material e visível.",
      "Pode envolver crenças, valores, sentidos, experiências subjetivas e a percepção de quem a pessoa acredita ser para além daquilo que é possível observar.",
    ],
    findings: [
      "Crenças profundas",
      "Valores",
      "Visão de mundo",
      "Sentido de existência",
      "Relação com o invisível",
      "Experiências espirituais",
      "Ideias sobre vida e morte",
      "Aquilo que dá significado à existência",
    ],
    questions: [
      "O que faz você lembrar que é mais do que é agora?",
      "Que sensação te visita quando você se entrega ao silêncio?",
      "Que força dentro de você te manteve de pé, mesmo quando tudo desabou?",
      "Como você cuida da sua paz interior?",
    ],
    movement:
      "As cartas desse baralho trazem a oportunidade do terapeuta entender os valores profundos pelos quais o paciente realiza suas escolhas de vida.",
  },
  {
    number: "02",
    name: "No início",
    image: "infancia.jpg",
    chips: ["Infância", "Verde-petróleo"],
    meaning: [
      "Experiências e vivências ligadas aos primeiros anos de vida — o tempo em que o mundo foi descoberto, nomeado e sentido pela primeira vez.",
      "Pode envolver memórias, brincadeiras, pessoas que cuidaram, medos antigos e a maneira como cada pessoa aprendeu, ainda criança, a se situar no mundo.",
    ],
    findings: [
      "Memórias da primeira infância",
      "Brincadeiras e afetos",
      "Medos antigos",
      "Onde você se sentia seguro",
      "Pessoas que cuidaram de você",
      "Primeiras descobertas",
      "Solidão e acolhimento",
      "O jeito que você aprendeu a ser quem é",
    ],
    questions: [
      "Que lembrança da infância faz você sorrir até hoje?",
      "Onde você se sentia completamente em casa?",
      "Que criança você era e o que ela precisava ouvir?",
      "O que da infância você ainda carrega com você?",
    ],
    movement:
      "As cartas desse baralho oferecem ao terapeuta um acesso delicado às raízes afetivas do paciente — memórias que explicam escolhas, medos e jeitos de se relacionar de hoje.",
  },
  {
    number: "03",
    name: "Instrumentos",
    image: "familia.jpg",
    chips: ["Família", "Laranja"],
    meaning: [
      "Experiências e vivências ligadas à história familiar — os papéis que cada um ocupa, os laços que unem e as marcas que atravessam gerações.",
      "Pode envolver pertencimento, tradições, conflitos, ausências e a maneira como a família participa, mesmo à distância, das decisões de cada pessoa.",
    ],
    findings: [
      "Vínculos familiares",
      "Papel que você ocupa",
      "Heranças das gerações",
      "Pertencimento",
      "Conflitos e reconciliações",
      "Raízes",
      "Tradições",
      "Fronteiras entre gerações",
    ],
    questions: [
      "Que história da sua família ainda ressoa em você?",
      "Que lugar você ocupa na sua família?",
      "O que você carrega da sua família e deseja cuidar?",
      "Que tradição você quer manter viva?",
    ],
    movement:
      "As cartas desse baralho ajudam o terapeuta a compreender como a origem familiar participa das escolhas, dos medos e dos vínculos do paciente hoje.",
  },
  {
    number: "04",
    name: "Direção",
    image: "pai.jpg",
    chips: ["Pai", "Roxo"],
    meaning: [
      "Experiências e vivências relacionadas à figura paterna e a tudo o que ela representa: proteção, limite, exemplo, presença ou ausência.",
      "Pode envolver autoridade, reconhecimento, distância, o que foi aprendido com o pai e o que cada pessoa gostaria de ter recebido dele.",
    ],
    findings: [
      "Autoridade",
      "Proteção",
      "Exemplos recebidos",
      "Presenças e ausências",
      "Reconhecimento",
      "Confronto e respeito",
      "O que ficou por dizer",
      "O pai que você tem e o que você desejava",
    ],
    questions: [
      "O que seu pai te ensinou sem falar?",
      "O que você gostaria de ter ouvido dele?",
      "Que lugar ele ocupa em você hoje?",
      "O que você quer construir de diferente?",
    ],
    movement:
      "As cartas desse baralho convidam o terapeuta a acompanhar o paciente na elaboração da relação com o pai — sem julgar o passado, apenas compreendendo o que dele ainda atua.",
  },
  {
    number: "05",
    name: "Portal",
    image: "mãe.jpg",
    chips: ["Mãe", "Amarelo"],
    meaning: [
      "Experiências e vivências ligadas à figura materna e ao cuidado que ela representa — acolhimento, origem do cuidado e também aquilo que faltou.",
      "Pode envolver dependência, autonomia, gestos herdados, maternidade, gratidão e o jeito como cada pessoa aprendeu a cuidar de si e dos outros.",
    ],
    findings: [
      "Cuidado",
      "Acolhimento",
      "Dependência e autonomia",
      "Maternidade",
      "Perdão",
      "Gratidão",
      "Gestos herdados",
      "O que você aprendeu com ela",
    ],
    questions: [
      "Como você cuida das pessoas hoje — e de onde aprendeu isso?",
      "O que sua mãe representou para você?",
      "Que gesto seu você reconhece nela?",
      "O que você ainda precisa colocar no lugar?",
    ],
    movement:
      "As cartas desse baralho permitem ao terapeuta acessar, com delicadeza, as origens do cuidado e do afeto do paciente — e o que ali ainda pede elaboração.",
  },
  {
    number: "06",
    name: "Movimento",
    image: "relaçoes.jpg",
    chips: ["Relações", "Verde"],
    meaning: [
      "Experiências e vivências relacionadas aos vínculos: amizades, romances, parcerias e o jeito como cada pessoa se posiciona perto dos outros.",
      "Pode envolver confiança, conflitos, apego, distanciamento e os padrões que se repetem nas relações — muitas vezes sem que a pessoa perceba.",
    ],
    findings: [
      "Padrões de vínculo",
      "Confiança",
      "Conflitos",
      "Fronteiras",
      "Amor e apego",
      "Solidão e companhia",
      "O que se repete",
      "O que você busca nos outros",
    ],
    questions: [
      "O que você costuma procurar nas pessoas?",
      "Que papel você ocupa nas relações?",
      "O que te aproxima e o que te afasta?",
      "Que relação merece mais cuidado agora?",
    ],
    movement:
      "As cartas desse baralho mostram ao terapeuta os modos como o paciente se vincula — e abrem espaço para transformar padrões que já não servem.",
  },
  {
    number: "07",
    name: "Libertação",
    image: "Sexualidade.jpg",
    chips: ["Sexualidade", "Cereja"],
    meaning: [
      "Experiências e vivências relacionadas à sexualidade, ao corpo e ao desejo — de onde vêm o prazer, a vergonha, a entrega e a intimidade.",
      "Pode envolver identidade, fronteiras do corpo, tabus, aceitação e a maneira como cada pessoa habita a própria sensualidade e os próprios limites.",
    ],
    findings: [
      "Desejo",
      "Intimidade",
      "Prazer",
      "Vergonhas",
      "Identidade",
      "Fronteiras do corpo",
      "Aceitação",
      "O que foi silenciado",
    ],
    questions: [
      "O que o seu desejo diz sobre você?",
      "Como você se relaciona com o próprio corpo?",
      "O que te faz sentir inteiro(a)?",
      "Que vergonha você gostaria de olhar com carinho?",
    ],
    movement:
      "As cartas desse baralho oferecem ao terapeuta um território seguro para acompanhar o paciente na relação com o corpo e o desejo, sem pressa e sem julgamento.",
  },
  {
    number: "08",
    name: "Interior",
    image: "proposito.jpg",
    chips: ["Propósito", "Vinho"],
    meaning: [
      "Experiências e vivências relacionadas ao sentido da vida — o que move as escolhas para além do cotidiano e do que é visível.",
      "Pode envolver desejos profundos, vocação, valores, metas, legado e a percepção de cada pessoa sobre o que torna a existência digna de ser vivida.",
    ],
    findings: [
      "Sentido de vida",
      "Desejos profundos",
      "Vocação",
      "Valores",
      "Metas",
      "Legado",
      "O que te move",
      "O que você quer deixar",
    ],
    questions: [
      "O que faz seus dias valerem a pena?",
      "Se nada desse medo, o que você faria?",
      "O que você quer ter construído ao final da vida?",
      "O que te tira do lugar?",
    ],
    movement:
      "As cartas desse baralho ajudam o terapeuta a acompanhar o paciente na busca por direção — traduzindo desejo em escolhas e escolhas em sentido.",
  },
  {
    number: "09",
    name: "O outro lado",
    image: "sombras.jpg",
    chips: ["Sombras", "Azul-marinho"],
    meaning: [
      "Experiências e vivências relacionadas àquilo que foi escondido, negado ou guardado — os lados da pessoa que raramente ganham luz.",
      "Pode envolver medos, raiva, inveja, autocríticas e o que incomoda nos outros, muitas vezes porque ainda não foi reconhecido como parte de si.",
    ],
    findings: [
      "Lados negados",
      "Medos",
      "Raiva",
      "Inveja",
      "Autocríticas",
      "O que você evita olhar",
      "O que incomoda nos outros",
      "O que pede acolhimento",
    ],
    questions: [
      "O que você evita sentir?",
      "Que lado seu quase ninguém vê?",
      "O que te incomoda nos outros e talvez também te pertença?",
      "O que você faria se não precisasse agradar?",
    ],
    movement:
      "As cartas desse baralho convidam o terapeuta a iluminar, com cuidado, o que ficou de lado — porque aquilo que é reconhecido perde o poder de conduzir as escolhas nas sombras.",
  },
];
const defaultSubtitle = cardSubtitle.textContent;

const DEMO_THERAPISTS = [
  { name: "Ana Ribeiro", email: "ana.ribeiro@email.com" },
  { name: "Carlos Lima", email: "carlos.lima@email.com" },
  { name: "Marina Prado", email: "marina.prado@email.com" },
];

/* ---------- supabase ---------- */
const SUPABASE_CONFIG = window.SUPABASE_CONFIG || {};

const supabaseClient = (() => {
  const lib = window.supabase;

  if (
    !SUPABASE_CONFIG.url ||
    !SUPABASE_CONFIG.anonKey ||
    !lib ||
    typeof lib.createClient !== "function"
  ) {
    return null;
  }

  try {
    return lib.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  } catch (error) {
    console.warn("Supabase não inicializado:", error);
    return null;
  }
})();

const USE_SUPABASE = Boolean(supabaseClient);

let sessionRole = null;
let sessionEmail = null;
let sessionName = null;

const VIEW_ROLE_KEY = "cartasdaalma.viewRole";

function readViewRole() {
  try {
    return window.localStorage.getItem(VIEW_ROLE_KEY);
  } catch {
    return null;
  }
}

function writeViewRole(role) {
  try {
    if (role === "therapist") {
      window.localStorage.setItem(VIEW_ROLE_KEY, "therapist");
    } else {
      window.localStorage.removeItem(VIEW_ROLE_KEY);
    }
  } catch {
    /* armazenamento indisponível */
  }
}

const ROLE_LABELS = {
  admin: "administrador",
  therapist: "terapeuta",
};

const ROLE_SUBTITLES = {
  admin: "Acesse a gestão e os dados da plataforma.",
  therapist: "Entre para acompanhar seus pacientes e cartas.",
};

const VIEW_TITLES = {
  "view-login": "Entrar · Cartas da Alma",
  "view-school": "Desbloqueio · Cartas da Alma",
  "view-content": "Escola · Cartas da Alma",
  "view-congrats": "Parabéns · Cartas da Alma",
  "view-dashboard": "Painel · Cartas da Alma",
};

const SECTION_META = {
  admin: {
    title: "Administrador",
    sub: "Terapeutas, administradores e o suporte por chat.",
  },
  sessao: {
    title: "Sessão",
    sub: "Acompanhe sua agenda e retome de onde parou.",
  },
  cartas: {
    title: "Cartas",
    sub: "Material da Escola · 9 baralhos temáticos com 30 perguntas cada.",
  },
  chat: {
    title: "Chat",
    sub: "Fale direto com a criadora do app.",
  },
  escola: {
    title: "Escola",
    sub: "Sua formação e o selo de qualificado.",
  },
  config: {
    title: "Configurações",
    sub: "Ajuste seu perfil e as preferências da conta.",
  },
  certificado: {
    title: "Certificado",
    sub: "Baixe o selo de qualificado da Escola.",
  },
  termos: {
    title: "Termos",
    sub: "Políticas de uso e termos de licença do app.",
  },
};

const CHAT_EMPTY_HTML =
  '<p class="chat__empty">Selecione a conversa com a criadora do app para começar.</p>';

const CHAT_EMPTY_ADMIN_HTML =
  '<p class="chat__empty">Selecione um terapeuta para abrir a conversa de suporte.</p>';

const CHAT_THREAD_EMPTY_TEXT =
  "Esta conversa ainda não tem mensagens. Envie uma mensagem para começar o atendimento.";

const CHAT_WELCOME_HTML =
  "Olá! Aqui é a criadora do Cartas da Alma. Se tiver dúvidas sobre baralhos, sessões ou configurações, escreva por aqui.";

let activeChat = null;
let threadRows = [];
let pendingOutgoing = [];
let unreadChatIds = new Set();
let chatLiveUnsub = null;
let chatPollTimer = null;

let expandedModule = 0;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function currentRole() {
  if (USE_SUPABASE && sessionRole) return sessionRole;

  const checked = form.querySelector("input[name='role']:checked");
  return checked ? checked.value : "therapist";
}

function activeEmail() {
  if (USE_SUPABASE && sessionEmail) return sessionEmail;
  return emailInput.value.trim().toLowerCase();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function isSchoolUnlocked() {
  try {
    return window.localStorage.getItem(SCHOOL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function setSchoolUnlocked() {
  try {
    window.localStorage.setItem(SCHOOL_STORAGE_KEY, "1");
  } catch {
    /* armazenamento indisponível */
  }
}

function progressCount() {
  try {
    const value = Number(window.localStorage.getItem(PROGRESS_STORAGE_KEY) || 0);
    return Math.min(Math.max(value, 0), MODULE_COUNT);
  } catch {
    return 0;
  }
}

function setProgress(value) {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, String(value));
  } catch {
    /* armazenamento indisponível */
  }
}

function getCinematicSeen() {
  try {
    return window.localStorage.getItem(CINEMATIC_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function setCinematicSeen() {
  try {
    window.localStorage.setItem(CINEMATIC_SEEN_KEY, "1");
  } catch {
    /* armazenamento indisponível */
  }
}

function getSealDate() {
  try {
    return window.localStorage.getItem(SEAL_DATE_KEY) || "";
  } catch {
    return "";
  }
}

function ensureSealDate() {
  let value = getSealDate();
  if (!value) {
    value = new Date().toISOString();
    try {
      window.localStorage.setItem(SEAL_DATE_KEY, value);
    } catch {
      /* armazenamento indisponível */
    }
  }
  return value;
}

function sealDateLabel() {
  const value = ensureSealDate();
  return `Selo emitido em ${new Date(value).toLocaleDateString("pt-BR")}`;
}

function loadProfile() {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

async function restorePreferences(email) {
  const stored = await store.getProfile(email);

  const emailToggle = settingsForm.elements["email-notifications"];
  const chatToggle = settingsForm.elements["chat-notifications"];

  if (emailToggle) {
    emailToggle.checked =
      stored && typeof stored.emailNotifications === "boolean"
        ? stored.emailNotifications
        : true;
  }
  if (chatToggle) {
    chatToggle.checked =
      stored && typeof stored.chatNotifications === "boolean"
        ? stored.chatNotifications
        : true;
  }

  pendingPhoto = (stored && stored.photo) || null;
  pendingAccent =
    stored && typeof stored.accent === "string" && ACCENT_THEMES[stored.accent]
      ? stored.accent
      : "cinza";

  const accentRadio = settingsForm.querySelector(
    `input[name="accent"][value="${pendingAccent}"]`
  );
  if (accentRadio) accentRadio.checked = true;
  applyAccent(pendingAccent);

  if (settingSpecialty) {
    settingSpecialty.value =
      stored && typeof stored.specialty === "string" ? stored.specialty : "";
  }

  applyAvatar(
    settingsPhotoPreview,
    pendingPhoto,
    settingName.value || profileName.textContent || "T"
  );
  applyAvatar(
    profileAvatar,
    pendingPhoto,
    profileName.textContent || "T"
  );
  applyAvatar(
    settingsAvatar,
    pendingPhoto,
    settingsAsideName.textContent || "T"
  );
}

function greetingText() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function loadUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    const list = raw ? JSON.parse(raw) : null;
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}

function saveUsers(list) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

function ensureUsers() {
  let users = loadUsers();

  if (!users) {
    users = DEMO_THERAPISTS.map((person, index) => ({
      id: `seed-${index + 1}`,
      name: person.name,
      email: person.email,
      role: "therapist",
      createdAt: new Date(
        Date.now() - (DEMO_THERAPISTS.length - index) * 86400000
      ).toISOString(),
    }));
    saveUsers(users);
  }

  return users;
}

async function findUser(email) {
  const target = String(email || "").trim().toLowerCase();
  const users = await store.listUsers();
  return users.find((user) => user.email === target) || null;
}

function loadChats() {
  try {
    const raw = window.localStorage.getItem(CHATS_KEY);
    const chats = raw ? JSON.parse(raw) : null;
    return chats && typeof chats === "object" ? chats : {};
  } catch {
    return {};
  }
}

function saveChats(chats) {
  try {
    window.localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch {
    /* armazenamento indisponível */
  }
}

function chatMessages(chatId) {
  const chats = loadChats();
  return Array.isArray(chats[chatId]) ? chats[chatId] : [];
}

function storeChatMessage(chatId, message) {
  const chats = loadChats();
  const list = Array.isArray(chats[chatId]) ? chats[chatId] : [];
  list.push(message);
  chats[chatId] = list;
  saveChats(chats);
}

function supportChatCount() {
  const chats = loadChats();
  return Object.keys(chats).filter(
    (key) =>
      (key.startsWith("support:") || key.startsWith("creator:")) &&
      Array.isArray(chats[key]) &&
      chats[key].length > 0
  ).length;
}

function formatDate(iso) {
  const date = iso ? new Date(iso) : null;
  if (!date || Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-BR");
}

/* ---------- camada de dados (local ou supabase) ---------- */
const localStore = {
  async getProfile(email) {
    const stored = loadProfile();
    return stored && stored.email === email ? stored : null;
  },

  async saveProfile(profile) {
    return saveProfile(profile);
  },

  async listUsers() {
    return ensureUsers();
  },

  async addUser({ name, email, role }) {
    const users = ensureUsers();
    if (users.some((user) => user.email === email)) {
      return { ok: false, error: "Este e-mail já está no sistema." };
    }

    users.push({
      id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
    return { ok: true };
  },

  async getProgress() {
    return progressCount();
  },

  async setProgress(value) {
    setProgress(value);
  },

  async getUnlocked() {
    return isSchoolUnlocked();
  },

  async setUnlocked() {
    setSchoolUnlocked();
  },

  async listMessages(chatId) {
    return chatMessages(chatId);
  },

  async addMessage(chatId, message) {
    storeChatMessage(chatId, message);
    return { ok: true };
  },

  subscribeMessages() {
    return () => {};
  },

  async supportChatCount() {
    return supportChatCount();
  },

  async signIn(email, password, chosenRole = "therapist") {
    await wait(900);

    const user = ensureUsers().find((entry) => entry.email === email);

    if (user && user.role !== "admin" && chosenRole === "admin") {
      return {
        ok: false,
        error: "Esta conta não tem acesso como administrador.",
      };
    }

    return { ok: true, role: chosenRole };
  },

  async signOut() {
    sessionRole = null;
    sessionEmail = null;
    sessionName = null;
  },

  async ensureAdmin() {
    const email = activeEmail();
    const name = await deriveName();
    const users = ensureUsers();
    const index = users.findIndex((user) => user.email === email);

    if (index >= 0) {
      users[index] = { ...users[index], name, role: "admin" };
    } else {
      users.push({
        id: `user-${Date.now()}`,
        name,
        email,
        role: "admin",
        createdAt: new Date().toISOString(),
      });
    }
    saveUsers(users);
  },

  async clearData() {
    try {
      window.localStorage.removeItem(USERS_KEY);
      window.localStorage.removeItem(CHATS_KEY);
    } catch {
      /* armazenamento indisponível */
    }
  },
};

const supabaseStore = {
  async getProfile(email) {
    if (!email) return null;

    const { data, error } = await supabaseClient
      .from("profiles")
      .select("name, email, prefs")
      .eq("email", email)
      .maybeSingle();

    if (error || !data) return null;

    const prefs = data.prefs || {};
    return {
      name: data.name || "",
      email: data.email,
      emailNotifications: prefs.emailNotifications !== false,
      chatNotifications: prefs.chatNotifications !== false,
      photo: typeof prefs.photo === "string" ? prefs.photo : null,
      accent: typeof prefs.accent === "string" ? prefs.accent : "cinza",
      specialty: typeof prefs.specialty === "string" ? prefs.specialty : "",
    };
  },

  async saveProfile(profile) {
    const { error } = await supabaseClient
      .from("profiles")
      .update({
        name: profile.name,
        prefs: {
          emailNotifications: profile.emailNotifications,
          chatNotifications: profile.chatNotifications,
          photo: profile.photo || null,
          accent: profile.accent || "cinza",
          specialty: profile.specialty || "",
        },
      })
      .eq("email", profile.email);

    if (error) {
      console.warn("Perfil não salvo:", error.message);
      return false;
    }

    if (sessionEmail === profile.email) sessionName = profile.name;
    return true;
  },

  async listUsers() {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("email, name, role, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Pessoas não carregadas:", error.message);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.email,
      name: row.name || row.email.split("@")[0],
      email: row.email,
      role: row.role === "admin" ? "admin" : "therapist",
      createdAt: row.created_at,
    }));
  },

  async addUser({ name, email, role, password }) {
    const { data: sessionData } = await supabaseClient.auth.getSession();
    const previousSession = sessionData?.session || null;

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    // o cadastro devolve uma sessão nova: restaura a do administrador
    if (previousSession) {
      await supabaseClient.auth.setSession(previousSession);
    }

    if (error) {
      const message = String(error.message || "");
      if (/already registered|already exists/i.test(message)) {
        return { ok: false, error: "Este e-mail já está no sistema." };
      }
      return { ok: false, error: message || "Não foi possível criar a conta." };
    }

    if (role === "admin") {
      const { error: roleError } = await supabaseClient.rpc(
        "admin_set_role",
        { p_email: email, p_role: "admin", p_name: name }
      );
      if (roleError) {
        return { ok: false, error: roleError.message };
      }
    }

    return { ok: true, password };
  },

  async getProgress() {
    const { data } = await supabaseClient
      .from("profiles")
      .select("school_progress")
      .eq("email", activeEmail())
      .maybeSingle();

    return Math.min(
      Math.max(Number(data?.school_progress || 0), 0),
      MODULE_COUNT
    );
  },

  async setProgress(value) {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ school_progress: value })
      .eq("email", activeEmail());
    if (error) console.warn("Progresso não salvo:", error.message);
  },

  async getUnlocked() {
    const { data } = await supabaseClient
      .from("profiles")
      .select("school_unlocked")
      .eq("email", activeEmail())
      .maybeSingle();

    return Boolean(data?.school_unlocked);
  },

  async setUnlocked() {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ school_unlocked: true })
      .eq("email", activeEmail());
    if (error) console.warn("Desbloqueio não salvo:", error.message);
  },

  async listMessages(chatId) {
    const { data, error } = await supabaseClient
      .from("messages")
      .select("id, side, body, created_at")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Mensagens não carregadas:", error.message);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      side: row.side,
      text: row.body,
      time: new Date(row.created_at).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  },

  async addMessage(chatId, message) {
    const separator = chatId.indexOf(":");
    const peer = separator >= 0 ? chatId.slice(separator + 1) : chatId;

    const { data, error } = await supabaseClient
      .from("messages")
      .insert({
        chat_id: chatId,
        peer,
        side: message.storedSide || message.side,
        body: message.text,
      })
      .select("id")
      .maybeSingle();

    if (error) {
      console.warn("Mensagem não enviada:", error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data ? data.id : null };
  },

  subscribeMessages(onRow) {
    if (!supabaseClient) return () => {};

    const channel = supabaseClient
      .channel(`messages-live-${Date.now()}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload && payload.new) onRow(payload.new);
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.warn(
            "Realtime indisponível — chat segue com atualizações periódicas."
          );
        }
      });

    return () => {
      try {
        supabaseClient.removeChannel(channel);
      } catch {
        /* canal já removido */
      }
    };
  },

  async supportChatCount() {
    const [support, creator] = await Promise.all([
      supabaseClient.from("messages").select("chat_id").like("chat_id", "support:%"),
      supabaseClient.from("messages").select("chat_id").like("chat_id", "creator:%"),
    ]);

    const ids = new Set();
    [...(support.data || []), ...(creator.data || [])].forEach((row) => {
      if (row && row.chat_id) ids.add(row.chat_id);
    });
    return ids.size;
  },

  async signIn(email, password, chosenRole = "therapist") {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, error: "E-mail ou senha incorretos." };

    const { data, error: profileError } = await supabaseClient
      .from("profiles")
      .select("name, email, role")
      .eq("email", email)
      .maybeSingle();

    if (profileError || !data) {
      return {
        ok: false,
        error: "Este acesso não tem um perfil cadastrado.",
      };
    }

    const accountRole = data.role === "admin" ? "admin" : "therapist";

    if (chosenRole === "admin" && accountRole !== "admin") {
      await supabaseClient.auth.signOut();
      return {
        ok: false,
        error: "Esta conta não tem acesso como administrador.",
      };
    }

    sessionEmail = data.email;
    sessionName = data.name || "";
    sessionRole = chosenRole === "admin" ? "admin" : "therapist";

    return { ok: true, role: sessionRole };
  },

  async signOut() {
    sessionRole = null;
    sessionEmail = null;
    sessionName = null;
    try {
      await supabaseClient.auth.signOut();
    } catch {
      /* sessão já encerrada */
    }
  },

  async ensureAdmin() {
    const email = activeEmail();

    const { data } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("email", email)
      .maybeSingle();

    if (data && data.role !== "admin") {
      const { error } = await supabaseClient.rpc("admin_set_role", {
        p_email: email,
        p_role: "admin",
        p_name: sessionName || null,
      });
      if (error) {
        console.warn("Perfil de administrador:", error.message);
      } else {
        sessionRole = "admin";
      }
    }
  },

  async clearData() {
    /* no supabase os dados ficam no servidor */
  },
};

const store = USE_SUPABASE ? supabaseStore : localStore;

async function renderModules() {
  const progress = await store.getProgress();

  moduleEls.forEach((element, index) => {
    const done = index < progress;
    const current = index === progress;
    const locked = index > progress;
    const expanded = index === expandedModule && !locked;

    element.classList.toggle("is-done", done);
    element.classList.toggle("is-current", current);
    element.classList.toggle("is-locked", locked);

    const head = element.querySelector(".module__head");
    head.setAttribute("aria-expanded", String(expanded));
    head.setAttribute("aria-disabled", String(locked));
    element.querySelector(".module__body").hidden = !expanded;
    element.querySelector(".module__cta").hidden = !current;
  });

  progressFill.style.width = `${(progress / MODULE_COUNT) * 100}%`;
  progressLabel.textContent =
    progress >= MODULE_COUNT
      ? "Formação concluída"
      : `Etapa ${progress + 1} de ${MODULE_COUNT}`;
}

async function openSchoolContent() {
  expandedModule = Math.min(await store.getProgress(), MODULE_COUNT - 1);
  await renderModules();
  showView("view-content");
}

function setSection(name) {
  const meta = SECTION_META[name] ?? SECTION_META.sessao;

  navItems.forEach((item) => {
    const section = item.dataset.section;
    const active =
      section === name || (section === "escola" && name === "cartas");
    item.classList.toggle("is-active", active);
  });
  appSections.forEach((section) => {
    const active = section.dataset.section === name;
    section.hidden = !active;

    if (active) {
      section.classList.remove("is-enter");
      void section.offsetWidth;
      section.classList.add("is-enter");
    }
  });

  sectionTitle.textContent = meta.title;
  sectionSubtitle.textContent = meta.sub;
  document.title = `${meta.title} · Cartas da Alma`;

  if (name === "chat" && !activeChat) {
    const first = chatList.querySelector(".chat__item");
    if (first) void openChat(first);
  }

  if (name === "certificado") {
    void renderCertificate();
  }
}

async function deriveName() {
  const email = activeEmail();
  const stored = await store.getProfile(email);

  if (stored && stored.name) return stored.name;

  const local = email.split("@")[0] || "terapeuta";
  return capitalize(local);
}

function sealSvgMarkup() {
  return `
    <svg viewBox="0 0 120 120" width="132" height="132" role="img" aria-label="Selo de qualificado">
      <path fill="#778899" opacity="0.9" d="M42 84 L30 118 L54 108 L60 118 L66 108 L90 118 L78 84 Z" />
      <circle cx="60" cy="54" r="47" fill="none" stroke="#778899" stroke-width="3" stroke-dasharray="1.5 7" stroke-linecap="round" />
      <circle cx="60" cy="54" r="41" fill="rgba(119,136,153,0.14)" stroke="#778899" stroke-width="2" />
      <circle cx="60" cy="54" r="36" fill="none" stroke="#778899" stroke-width="1" opacity="0.5" />
      <circle cx="60" cy="42" r="13" fill="#778899" />
      <path d="m54.5 42 4 4 7-7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <text x="60" y="67" text-anchor="middle" fill="#778899" font-family="Georgia, serif" font-size="11" font-weight="700" letter-spacing="1.4">QUALIFICADO</text>
      <text x="60" y="79" text-anchor="middle" fill="#71717a" font-family="Georgia, serif" font-size="7.5" letter-spacing="1.6">CARTAS DA ALMA</text>
    </svg>
  `;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function certificateSvg(name, label) {
  const safeName = escapeXml(name);
  const safeLabel = escapeXml(label);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1414" viewBox="0 0 1000 1414">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fbfaf8" />
          <stop offset="1" stop-color="#f3f1ec" />
        </linearGradient>
      </defs>
      <rect width="1000" height="1414" fill="url(#paper)" />
      <rect x="40" y="40" width="920" height="1334" fill="none" stroke="#d8d3c8" stroke-width="1.5" />
      <rect x="58" y="58" width="884" height="1298" fill="none" stroke="#778899" stroke-width="1" opacity="0.4" />

      <text x="500" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" letter-spacing="6" fill="#1c1917">CARTAS DA ALMA</text>
      <line x1="410" y1="175" x2="590" y2="175" stroke="#778899" stroke-width="1.5" />

      <text x="500" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="#1c1917">Certificado de Qualificação</text>
      <text x="500" y="360" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#71717a">Certificamos que</text>
      <text x="500" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#1c1917">${safeName}</text>
      <line x1="330" y1="470" x2="670" y2="470" stroke="#778899" stroke-width="1" />
      <text x="500" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="21" fill="#44403c">concluiu as quatro etapas da Escola Cartas da Alma</text>
      <text x="500" y="565" text-anchor="middle" font-family="Georgia, serif" font-size="21" fill="#44403c">e recebeu o selo de qualificado.</text>

      <g transform="translate(434 650)">
        <path fill="#778899" opacity="0.9" d="M42 84 L30 118 L54 108 L60 118 L66 108 L90 118 L78 84 Z" />
        <circle cx="60" cy="54" r="47" fill="none" stroke="#778899" stroke-width="3" stroke-dasharray="1.5 7" stroke-linecap="round" />
        <circle cx="60" cy="54" r="41" fill="rgba(119,136,153,0.14)" stroke="#778899" stroke-width="2" />
        <circle cx="60" cy="54" r="36" fill="none" stroke="#778899" stroke-width="1" opacity="0.5" />
        <circle cx="60" cy="42" r="13" fill="#778899" />
        <path d="m54.5 42 4 4 7-7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <text x="60" y="67" text-anchor="middle" fill="#778899" font-family="Georgia, serif" font-size="11" font-weight="700" letter-spacing="1.4">QUALIFICADO</text>
        <text x="60" y="79" text-anchor="middle" fill="#71717a" font-family="Georgia, serif" font-size="7.5" letter-spacing="1.6">CARTAS DA ALMA</text>
      </g>

      <text x="500" y="1240" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#71717a">${safeLabel}</text>
      <text x="500" y="1290" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#a1a1aa">Cartas da Alma · Ferramenta de apoio à prática terapêutica</text>
    </svg>
  `;
}

async function renderCertificate() {
  const progress = await store.getProgress();
  const unlocked = await store.getUnlocked();
  const qualified = unlocked && progress >= MODULE_COUNT;

  certificateEmpty.hidden = qualified;
  certificateReady.hidden = !qualified;
  showFeedback(null, null, certificateFeedback);

  if (!qualified) return;

  ensureSealDate();
  const name = await deriveName();
  const label = sealDateLabel();
  certificatePreview.innerHTML = `
    <div class="certificate__paper">
      <p class="certificate__brand">CARTAS DA ALMA</p>
      <h3 class="certificate__title">Certificado de Qualificação</h3>
      <p class="certificate__certifies">Certificamos que</p>
      <p class="certificate__name">${escapeXml(name)}</p>
      <p class="certificate__body">
        concluiu as quatro etapas da Escola Cartas da Alma e recebeu o selo
        de qualificado.
      </p>
      ${sealSvgMarkup()}
      <p class="certificate__date">${escapeXml(label)}</p>
      <p class="certificate__foot">Cartas da Alma · Ferramenta de apoio à prática terapêutica</p>
    </div>
  `;

  certificateDownload.onclick = async () => {
    showFeedback(null, null, certificateFeedback);
    try {
      const svg = certificateSvg(name, label);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error("Falha ao gerar a imagem."));
        image.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 2000;
      canvas.height = 2828;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#f3f1ec";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const png = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const link = document.createElement("a");
      link.href = URL.createObjectURL(png);
      link.download = `certificado-cartas-da-alma.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      showFeedback("Certificado baixado com sucesso.", "success", certificateFeedback);
    } catch {
      showFeedback("Não foi possível gerar o certificado neste dispositivo.", "error", certificateFeedback);
    }
  };
}

async function renderProfile(role, label) {
  const name = await deriveName();
  const unlocked = await store.getUnlocked();

  profileAvatar.textContent = name.charAt(0);
  profileName.textContent = name;
  profileRole.textContent = label;
  topbarPill.textContent = label;
  sectionKicker.textContent =
    role === "admin" ? "Painel do administrador" : "Painel do terapeuta";

  topbarDate.textContent = capitalize(
    new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );

  settingName.value = name;
  settingEmail.value = activeEmail();
  settingEmail.readOnly = USE_SUPABASE;

  settingsAvatar.textContent = name.charAt(0);
  settingsAsideName.textContent = name;
  settingsAsideRole.textContent = label;
  settingsAsideSchool.textContent =
    role === "admin"
      ? "Gestão da plataforma"
      : unlocked
        ? "Escola liberada"
        : "Escola bloqueada";

  setFieldError(settingName, null);
  setFieldError(settingEmail, null);
  await restorePreferences(activeEmail());

  const specialty = settingSpecialty ? settingSpecialty.value.trim() : "";
  if (settingsAsideSpecialty) {
    settingsAsideSpecialty.textContent = specialty;
    settingsAsideSpecialty.hidden = !specialty;
  }
}

function renderSchoolSteps(progress) {
  const labels = ["Concluída", "Em andamento", "Bloqueada"];

  schoolSteps.replaceChildren();

  MODULE_TITLES.forEach((title, index) => {
    const state =
      index < progress ? 0 : index === progress ? 1 : 2;

    const item = document.createElement("li");
    item.className = `step step--${state === 0 ? "done" : state === 1 ? "current" : "locked"}`;

    const badge = document.createElement("span");
    badge.className = "step__badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = state === 0 ? "✓" : String(index + 1);

    const body = document.createElement("span");
    body.className = "step__body";

    const strong = document.createElement("strong");
    strong.textContent = title;

    const span = document.createElement("span");
    span.textContent = labels[state];

    body.append(strong, span);
    item.append(badge, body);
    schoolSteps.append(item);
  });
}

async function renderSchoolPanel() {
  const progress = await store.getProgress();
  const done = progress >= MODULE_COUNT;

  schoolStatusText.textContent = done
    ? "Formação concluída. Seu selo de qualificado está emitido."
    : `Você está na etapa ${progress + 1} de ${MODULE_COUNT}. Conclua a formação para receber o selo.`;
  schoolProgressLabel.textContent = done
    ? "Formação concluída"
    : `Etapa ${progress + 1} de ${MODULE_COUNT}`;
  schoolProgressFill.style.width = `${(progress / MODULE_COUNT) * 100}%`;
  schoolSealChip.textContent = done ? "Selo: Qualificado" : "Selo não emitido";
  schoolSealChip.classList.toggle("chip--ok", done);
  renderSchoolSteps(progress);
}

function applyRoleUI(role) {
  const isAdmin = role === "admin";

  adminNav.hidden = !isAdmin;

  if (resetDemoBtn) resetDemoBtn.hidden = USE_SUPABASE;

  navItems.forEach((item) => {
    if (item === adminNav) return;
    const therapistOnly = THERAPIST_ONLY_SECTIONS.includes(
      item.dataset.section
    );
    item.hidden = isAdmin && therapistOnly;
  });

  if (chatNavLabel) chatNavLabel.textContent = isAdmin ? "Suporte" : "Chat";
  SECTION_META.chat.title = isAdmin ? "Suporte" : "Chat";
  SECTION_META.chat.sub = isAdmin
    ? "Atendimento direto com os terapeutas da plataforma."
    : "Fale direto com a criadora do app.";

  if (chatNotificationsHint) {
    chatNotificationsHint.textContent = isAdmin
      ? "Avise quando um terapeuta responder no suporte."
      : "Avise quando a criadora do app responder no chat.";
  }
}

function renderUserList(users) {
  userList.replaceChildren();
  userListEmpty.hidden = users.length > 0;

  users.forEach((user) => {
    const item = document.createElement("li");
    item.className = "user-row";

    const avatar = document.createElement("span");
    avatar.className = "user-row__avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = user.name.charAt(0).toUpperCase();

    const text = document.createElement("span");
    text.className = "user-row__text";

    const strong = document.createElement("strong");
    strong.textContent = user.name;

    const email = document.createElement("span");
    email.textContent = user.email;

    text.append(strong, email);

    const meta = document.createElement("span");
    meta.className = "user-row__meta";

    const chip = document.createElement("span");
    chip.className = user.role === "admin" ? "chip chip--ok" : "chip";
    chip.textContent = capitalize(user.role === "admin" ? "admin" : "terapeuta");

    const date = document.createElement("span");
    date.className = "user-row__date";
    date.textContent = `desde ${formatDate(user.createdAt)}`;

    meta.append(chip, date);
    item.append(avatar, text, meta);
    userList.append(item);
  });
}

async function renderAdminPanel() {
  const users = await store.listUsers();
  const therapists = users.filter((user) => user.role === "therapist");
  const admins = users.filter((user) => user.role === "admin");

  statTherapists.textContent = String(therapists.length);
  statAdmins.textContent = String(admins.length);
  statSupportChats.textContent = String(await store.supportChatCount());

  adminSummaryText.textContent =
    `${therapists.length} ${therapists.length === 1 ? "terapeuta" : "terapeutas"} e ` +
    `${admins.length} ${admins.length === 1 ? "administrador" : "administradores"} ` +
    "cadastrados. Adicione pessoas nos formulários e acompanhe o suporte no chat.";

  renderUserList(users);
}

async function validateMemberForm(nameInput, emailInput) {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  let valid = true;

  if (name.length < 2) {
    setFieldError(nameInput, "Informe o nome completo.");
    valid = false;
  } else {
    setFieldError(nameInput, null);
  }

  if (!EMAIL_PATTERN.test(email)) {
    setFieldError(emailInput, "Informe um e-mail válido.");
    valid = false;
  } else if (await findUser(email)) {
    setFieldError(emailInput, "Este e-mail já está no sistema.");
    valid = false;
  } else {
    setFieldError(emailInput, null);
  }

  if (!valid) {
    if (name.length < 2) {
      nameInput.focus();
    } else {
      emailInput.focus();
    }
    return null;
  }

  return { name, email };
}

function handleAddMember(form, role, nameInput, emailInput, label) {
  const feedbackContainer = form.querySelector(".feedback");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showFeedback(null, null, feedbackContainer);

    const data = await validateMemberForm(nameInput, emailInput);
    if (!data) return;

    const password = `alma${Math.floor(1000 + Math.random() * 9000)}`;
    const result = await store.addUser({
      name: data.name,
      email: data.email,
      role,
      password,
    });

    if (!result.ok) {
      showFeedback(
        result.error || "Não foi possível adicionar esta pessoa.",
        "error",
        feedbackContainer
      );
      return;
    }

    nameInput.value = "";
    emailInput.value = "";

    await renderAdminPanel();
    await buildChatList();

    showFeedback(
      USE_SUPABASE
        ? `${capitalize(label)} adicionado. Senha provisória: ${result.password}`
        : `${capitalize(label)} adicionado ao sistema.`,
      "success",
      feedbackContainer
    );
  });

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("field--invalid")) {
        setFieldError(input, null);
      }
      if (feedbackContainer.firstChild) {
        showFeedback(null, null, feedbackContainer);
      }
    });
  });
}

function chatTimeNow() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function invertSide(side) {
  return side === "me" ? "them" : "me";
}

function toStoredSide(side) {
  return currentRole() === "admin" ? invertSide(side) : side;
}

function toViewerSide(side) {
  return currentRole() === "admin" ? invertSide(side) : side;
}

function renderChatBubble(side, text, time, messageId = null) {
  const placeholder = chatBody.querySelector(".chat__empty");
  if (placeholder) placeholder.remove();

  const message = document.createElement("p");
  message.className = `chat__msg chat__msg--${side}`;
  if (messageId != null) message.dataset.id = String(messageId);

  const bubble = document.createElement("span");
  bubble.className = "chat__bubble";
  bubble.textContent = text;

  const timeEl = document.createElement("span");
  timeEl.className = "chat__time";
  timeEl.textContent = time;

  message.append(bubble, timeEl);
  chatBody.append(message);
  chatBody.scrollTop = chatBody.scrollHeight;
  return message;
}

function appendChatMessage(side, text, options = {}) {
  const { time = chatTimeNow(), persist = true, chatId = null } = options;

  const message = renderChatBubble(side, text, time);

  const targetId = chatId || (activeChat ? activeChat.id : null);
  if (!persist || !targetId) return message;

  const storedSide = toStoredSide(side);
  pendingOutgoing.push({ chatId: targetId, text });

  Promise.resolve(
    store.addMessage(targetId, { side, text, time, storedSide })
  )
    .then((result) => {
      const index = pendingOutgoing.findIndex(
        (entry) => entry.chatId === targetId && entry.text === text
      );
      if (index >= 0) pendingOutgoing.splice(index, 1);

      if (result && result.ok === false) {
        throw new Error(result.error || "Não foi possível enviar a mensagem.");
      }

      if (result && result.id != null) {
        message.dataset.id = String(result.id);
        if (
          activeChat &&
          activeChat.id === targetId &&
          !threadRows.some((row) => row.id === result.id)
        ) {
          threadRows.push({
            id: result.id,
            chatId: targetId,
            side: storedSide,
            text,
            time,
          });
        }
      }
    })
    .catch((error) => {
      console.warn("Mensagem não salva:", error);
      const index = pendingOutgoing.findIndex(
        (entry) => entry.chatId === targetId && entry.text === text
      );
      if (index >= 0) pendingOutgoing.splice(index, 1);

      if (message.isConnected) message.remove();
      if (!chatInput.value) {
        chatInput.value = text;
syncChatInput();

applyAccent(loadProfile()?.accent || "cinza");
      }
    });

  return message;
}

function resetChat() {
  stopChatLive();
  activeChat = null;
  threadRows = [];
  pendingOutgoing = [];
  unreadChatIds.clear();
  chatName.textContent = "Selecione a conversa";
  chatBody.innerHTML =
    currentRole() === "admin" ? CHAT_EMPTY_ADMIN_HTML : CHAT_EMPTY_HTML;
  chatList.querySelectorAll(".chat__item").forEach((item) => {
    item.classList.remove("is-active");
  });
  chatInput.value = "";
  syncChatInput();
}

function chatItemButton({ id, name, subtitle, avatar, time }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chat__item";
  button.setAttribute("role", "tab");
  button.dataset.id = id;
  button.dataset.name = name;

  const avatarEl = document.createElement("span");
  avatarEl.className = "chat__avatar";
  avatarEl.setAttribute("aria-hidden", "true");
  avatarEl.textContent = avatar;

  const text = document.createElement("span");
  text.className = "chat__item-text";

  const strong = document.createElement("strong");
  strong.textContent = name;

  const span = document.createElement("span");
  span.textContent = subtitle;

  text.append(strong, span);

  const timeEl = document.createElement("span");
  timeEl.className = "chat__item-time";
  timeEl.textContent = time;

  button.append(avatarEl, text, timeEl);
  return button;
}

async function buildChatList() {
  const previousId = activeChat ? activeChat.id : null;
  const role = currentRole();
  const entries = [];

  if (role === "admin") {
    const therapists = (await store.listUsers()).filter(
      (user) => user.role === "therapist"
    );

    for (const user of therapists) {
      const creatorId = `creator:${user.email}`;
      const creatorMessages = await store.listMessages(creatorId);
      entries.push({
        id: creatorId,
        name: user.name,
        subtitle: `Criadora · ${user.email}`,
        avatar: user.name.charAt(0).toUpperCase(),
        time: creatorMessages.length
          ? creatorMessages[creatorMessages.length - 1].time
          : "—",
      });

      const supportId = `support:${user.email}`;
      const supportMessages = await store.listMessages(supportId);
      entries.push({
        id: supportId,
        name: user.name,
        subtitle: `Suporte · ${user.email}`,
        avatar: user.name.charAt(0).toUpperCase(),
        time: supportMessages.length
          ? supportMessages[supportMessages.length - 1].time
          : "—",
      });
    }
  } else {
    const email = activeEmail();
    const supportId = `support:${email}`;
    const supportMessages = await store.listMessages(supportId);

    if (supportMessages.length) {
      entries.push({
        id: supportId,
        name: "Suporte da plataforma",
        subtitle: "Atendimento com a equipe",
        avatar: "S",
        time: supportMessages[supportMessages.length - 1].time,
      });
    }

    const creatorId = `creator:${email}`;
    const creatorMessages = await store.listMessages(creatorId);
    entries.push({
      id: creatorId,
      name: "Criadora do app",
      subtitle: "Dúvidas, ajustes e suporte",
      avatar: "C",
      time: creatorMessages.length
        ? creatorMessages[creatorMessages.length - 1].time
        : "agora",
    });
  }

  chatList.replaceChildren();

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "chat__empty chat__list-empty";
    empty.textContent = "Nenhum terapeuta cadastrado ainda.";
    chatList.append(empty);
    activeChat = null;
    return;
  }

  entries.forEach((entry) => {
    const item = chatItemButton(entry);
    if (unreadChatIds.has(entry.id)) item.classList.add("is-unread");
    chatList.append(item);
  });

  if (previousId) {
    const active = chatList.querySelector(
      `.chat__item[data-id="${previousId}"]`
    );
    if (active) {
      active.classList.add("is-active");
    } else {
      activeChat = null;
    }
  }
}

async function renderChatThread() {
  const chatId = activeChat ? activeChat.id : null;
  if (!chatId) return;

  chatBody.replaceChildren();
  threadRows = [];

  const day = document.createElement("span");
  day.className = "chat__day";
  day.textContent = "Hoje";
  chatBody.append(day);

  let messages = await store.listMessages(chatId);

  if (activeChat?.id !== chatId) return;

  if (
    !messages.length &&
    chatId.startsWith("creator") &&
    currentRole() !== "admin"
  ) {
    const welcome = {
      side: "them",
      text: CHAT_WELCOME_HTML,
      time: chatTimeNow(),
    };
    pendingOutgoing.push({ chatId, text: welcome.text });
    const result = await store.addMessage(chatId, {
      ...welcome,
      storedSide: "them",
    });
    const pendingIndex = pendingOutgoing.findIndex(
      (entry) => entry.chatId === chatId && entry.text === welcome.text
    );
    if (pendingIndex >= 0) pendingOutgoing.splice(pendingIndex, 1);
    if (result && result.ok === false) {
      console.warn("Mensagem de boas-vindas não salva:", result.error);
    }

    messages = await store.listMessages(chatId);
    if (activeChat?.id !== chatId) return;
    if (messages.length) {
      updateChatItemTime(chatId, messages[messages.length - 1].time);
    }
  }

  if (activeChat?.id !== chatId) return;

  if (!messages.length) {
    const empty = document.createElement("p");
    empty.className = "chat__empty";
    empty.textContent = CHAT_THREAD_EMPTY_TEXT;
    chatBody.append(empty);
    return;
  }

  const priorRows = threadRows;

  threadRows = messages
    .filter((message) => message.id != null)
    .map((message) => ({
      id: message.id,
      chatId,
      side: message.side,
      text: message.text,
      time: message.time,
    }));

  priorRows.forEach((row) => {
    if (!threadRows.some((entry) => entry.id === row.id)) {
      threadRows.push(row);
    }
  });

  messages.forEach((message) => {
    if (
      message.id != null &&
      chatBody.querySelector(`.chat__msg[data-id="${message.id}"]`)
    ) {
      return;
    }
    renderChatBubble(
      toViewerSide(message.side),
      message.text,
      message.time,
      message.id
    );
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

async function openChat(item) {
  chatList.querySelectorAll(".chat__item").forEach((other) => {
    other.classList.toggle("is-active", other === item);
    other.classList.remove("is-unread");
  });
  unreadChatIds.delete(item.dataset.id);

  activeChat = { id: item.dataset.id, name: item.dataset.name };
  chatName.textContent = activeChat.name;
  syncChatInput();
  await renderChatThread();
  chatInput.focus();
}

function syncChatInput() {
  chatSend.disabled = chatInput.value.trim() === "";

  chatInput.style.height = "auto";
  if (chatInput.scrollHeight) {
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 120)}px`;
  }
}

function updateChatItemTime(chatId, time) {
  const item = chatList.querySelector(`.chat__item[data-id="${chatId}"]`);
  if (!item) return false;

  const timeEl = item.querySelector(".chat__item-time");
  if (timeEl && time) timeEl.textContent = time;
  return true;
}

function markChatActivity(chatId, time, fromSelf) {
  if (!updateChatItemTime(chatId, time)) {
    void buildChatList();
  }

  if (fromSelf) return;
  if (activeChat && activeChat.id === chatId) return;

  unreadChatIds.add(chatId);
  const item = chatList.querySelector(`.chat__item[data-id="${chatId}"]`);
  if (item) item.classList.add("is-unread");
}

function ingestRow(row) {
  if (!row || row.id == null) return;
  if (threadRows.some((entry) => entry.id === row.id)) return;

  const pendingIndex = pendingOutgoing.findIndex(
    (entry) => entry.chatId === row.chatId && entry.text === row.text
  );
  const fromSelf = pendingIndex >= 0;
  if (fromSelf) pendingOutgoing.splice(pendingIndex, 1);

  const alreadyShown = Boolean(
    chatBody.querySelector(`.chat__msg[data-id="${row.id}"]`)
  );

  threadRows.push(row);
  if (fromSelf || alreadyShown) return;

  renderChatBubble(toViewerSide(row.side), row.text, row.time, row.id);
}

function handleServerRow(row) {
  if (!row || !row.chat_id || row.id == null) return;

  const normalized = {
    id: row.id,
    chatId: row.chat_id,
    side: row.side,
    text: row.body,
    time: new Date(row.created_at).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const fromSelf = pendingOutgoing.some(
    (entry) => entry.chatId === normalized.chatId && entry.text === normalized.text
  );

  if (activeChat && activeChat.id === normalized.chatId) {
    ingestRow(normalized);
  }

  markChatActivity(normalized.chatId, normalized.time, fromSelf);
}

async function pollActiveThread() {
  if (!USE_SUPABASE || !activeChat) return;

  const chatId = activeChat.id;
  const messages = await store.listMessages(chatId);
  if (!activeChat || activeChat.id !== chatId) return;

  messages
    .filter(
      (message) =>
        message.id != null &&
        !threadRows.some((row) => row.id === message.id)
    )
    .forEach((message) =>
      ingestRow({
        id: message.id,
        chatId,
        side: message.side,
        text: message.text,
        time: message.time,
      })
    );
}

function stopChatLive() {
  if (chatLiveUnsub) {
    try {
      chatLiveUnsub();
    } catch {
      /* canal já encerrado */
    }
    chatLiveUnsub = null;
  }

  if (chatPollTimer) {
    clearInterval(chatPollTimer);
    chatPollTimer = null;
  }
}

function startChatLive() {
  stopChatLive();
  if (!USE_SUPABASE) return;

  chatLiveUnsub = store.subscribeMessages(handleServerRow);
  chatPollTimer = setInterval(() => {
    void pollActiveThread();
  }, 9000);
}

function openSessionModal() {
  sessionFormat = null;
  sessionOptions.forEach((option) => {
    option.classList.remove("is-selected");
    option.setAttribute("aria-checked", "false");
  });
  sessionCreate.disabled = true;
  sessionCreate.textContent = "Criar sessão";
  showFeedback(null, null, sessionFeedback);

  sessionModal.hidden = false;
  sessionTitle.focus();
}

function closeSessionModal() {
  sessionModal.hidden = true;
  newSessionBtn.focus();
}

function updateSessionStatus() {
  if (!sessionFormat) return;

  sessionStatus.hidden = false;
  sessionStatusFormat.textContent =
    sessionFormat === "online" ? "Online" : "Presencial";

  if (sessionCardIndex !== null && sessionQuestionText) {
    const card = CARDS[sessionCardIndex];
    sessionStatusTitle.textContent = `Carta ${card.name}`;
    sessionStatusQuestion.textContent = sessionQuestionText;
  } else {
    sessionStatusTitle.textContent = "Sessão em andamento";
    sessionStatusQuestion.textContent =
      "Escolha ou sorteie uma carta para ver a pergunta da sessão.";
  }
}

function buildSessionSpread() {
  sessionSpread.replaceChildren();

  CARDS.forEach((card, index) => {
    const row = index < SESSION_SPREAD_COLS ? 0 : 1;
    const inRow = row === 0 ? index : index - SESSION_SPREAD_COLS;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "session-card";
    button.dataset.row = String(row);
    button.style.setProperty("--row", row);
    button.style.setProperty("--origin", row === 0 ? 2 : 1.5);
    button.style.setProperty("--i", inRow);
    button.setAttribute("aria-label", `Escolher a carta ${index + 1}`);
    button.addEventListener("click", () => pickSessionCard(index, button));
    sessionSpread.append(button);
  });
}

function buildSessionStack() {
  sessionStack.replaceChildren();

  CARDS.forEach((card, index) => {
    const face = document.createElement("div");
    face.className = "session-card";
    face.style.setProperty("--i", index);
    face.setAttribute("aria-hidden", "true");
    sessionStack.append(face);
  });
}

function openSessionStage(format) {
  sessionFormat = format;
  sessionStage.hidden = false;
  sessionStageMode.textContent =
    format === "online" ? "Sessão online · sorteio" : "Sessão presencial · escolha";

  sessionResult.hidden = true;
  sessionResult.classList.remove("is-visible");
  updateSessionStatus();

  const againLabel = sessionAgain.querySelector(".btn__label");
  if (againLabel) {
    againLabel.textContent =
      format === "online" ? "Sortear outra carta" : "Escolher outra carta";
  }

  if (format === "presencial") {
    sessionSpread.hidden = false;
    sessionDeck.hidden = true;
    buildSessionSpread();
    const firstCard = sessionSpread.querySelector(".session-card");
    if (firstCard) firstCard.focus();
    return;
  }

  sessionSpread.hidden = true;
  sessionDeck.hidden = false;
  buildSessionStack();
  sessionDraw.focus();
}

function closeSessionStage() {
  sessionStage.hidden = true;
  sessionShuffling = false;
}

const REVEAL_STAGE_MS = 1400;
let revealToken = 0;

async function revealSessionCard(index) {
  if (sessionShuffling) return;
  sessionShuffling = true;

  const token = (revealToken += 1);
  const card = CARDS[index];
  const deck = DECK_IMAGES[index];
  sessionCardIndex = index;

  sessionResultImg.classList.remove("is-flip");
  sessionQuestion.classList.remove("is-shown");

  const qi = Math.floor(Math.random() * QUESTIONS_PER_DECK);
  const questionImage = questionSrc(deck, qi);
  const preload = new Image();
  preload.src = questionImage;

  const themeImage = new Image();
  themeImage.src = themeSrc(deck);

  sessionResultImg.src = themeSrc(deck);
  sessionResultImg.alt = `Baralho ${card.name}`;
  sessionResultEyebrow.textContent = `Carta ${card.number} · ${card.chips[0]}`;
  sessionResultName.textContent = card.name;
  sessionQuestion.removeAttribute("src");

  sessionSpread.hidden = true;
  sessionDeck.hidden = true;
  sessionResult.hidden = false;
  sessionResult.classList.remove("is-visible");
  void sessionResult.offsetWidth;
  sessionResult.classList.add("is-visible");

  updateSessionStatus();
  sessionAgain.focus();

  await Promise.all([
    themeImage.decode().catch(() => {}),
    preload.decode().catch(() => {}),
    wait(REVEAL_STAGE_MS),
  ]);

  if (revealToken !== token) return;
  sessionQuestionText = `${card.name} · ${qi + 1}/${QUESTIONS_PER_DECK}`;
  sessionQuestion.src = questionImage;
  sessionQuestion.alt = `Pergunta do baralho ${card.name}`;
  sessionQuestion.classList.add("is-shown");
  sessionResultImg.classList.add("is-flip");
  updateSessionStatus();
  sessionShuffling = false;
}

async function pickSessionCard(index, button) {
  Array.from(sessionSpread.children).forEach((element) => {
    if (element !== button) element.classList.add("is-dim");
  });
  button.classList.add("is-picked");

  await wait(550);
  await revealSessionCard(index);
}

async function drawOnlineCard() {
  sessionDraw.disabled = true;

  const topCard = sessionStack.lastElementChild;
  const flickers = 13;

  sessionStack.classList.add("is-shuffling");

  for (let i = 0; i < flickers; i += 1) {
    const preview = DECK_IMAGES[Math.floor(Math.random() * DECK_IMAGES.length)];
    topCard.style.backgroundImage = `url("${themeSrc(preview)}")`;
    await wait(85 + i * 10);
  }

  sessionStack.classList.remove("is-shuffling");

  const target = Math.floor(Math.random() * CARDS.length);
  topCard.style.backgroundImage = `url("${themeSrc(DECK_IMAGES[target])}")`;
  await wait(420);

  await revealSessionCard(target);
  sessionDraw.disabled = false;
}

let lastCartaTrigger = null;

function cartaListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function renderCartaGrid() {
  if (!cartaGrid) return;

  cartaGrid.replaceChildren();

  CARDS.forEach((card) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "carta-tile";
    tile.setAttribute("aria-label", `Carta ${card.number} — ${card.name}`);

    const frame = document.createElement("span");
    frame.className = "carta-tile__frame";

    const img = document.createElement("img");
    img.src = card.image;
    img.alt = `Carta ${card.name}`;
    img.loading = "lazy";
    frame.append(img);

    const meta = document.createElement("span");
    meta.className = "carta-tile__meta";

    const name = document.createElement("strong");
    name.textContent = card.name;

    const hint = document.createElement("span");
    hint.textContent = `Carta ${card.number} · toque para ver o significado`;

    meta.append(name, hint);
    tile.append(frame, meta);
    tile.addEventListener("click", () => openCartaModal(card, tile));
    cartaGrid.append(tile);
  });
}

function openCartaModal(card, trigger) {
  lastCartaTrigger = trigger || null;

  cartaImg.src = card.image;
  cartaImg.alt = `Carta ${card.name}`;
  cartaEyebrow.textContent = `Carta ${card.number}`;
  cartaTitle.textContent = card.name;

  cartaChips.replaceChildren(
    ...card.chips.map((label) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = label;
      return chip;
    })
  );

  cartaMeaning.textContent = card.meaning[0];
  cartaMeaning2.textContent = card.meaning[1];
  cartaFindings.replaceChildren(...card.findings.map(cartaListItem));
  cartaQuestions.replaceChildren(...card.questions.map(cartaListItem));
  cartaMovement.textContent = card.movement;

  cartaModal.hidden = false;
  cartaTitle.focus();
}

function closeCartaModal() {
  cartaModal.hidden = true;
  if (lastCartaTrigger) lastCartaTrigger.focus();
}

function showView(viewId) {
  [viewLogin, viewSchool, viewContent, viewCongrats, viewDashboard].forEach(
    (view) => {
      view.hidden = view.id !== viewId;
    }
  );

  document.title = VIEW_TITLES[viewId] ?? VIEW_TITLES["view-login"];

  const heading = document.getElementById(viewId).querySelector("[tabindex='-1']");
  if (heading) heading.focus({ preventScroll: true });
}

async function openDashboard() {
  const role = currentRole();
  const label = capitalize(ROLE_LABELS[role]);
  const name = await deriveName();
  const unlocked = await store.getUnlocked();
  const progress = await store.getProgress();

  dashboardTitle.textContent = `${greetingText()}, ${name}!`;
  dashboardSubtitle.textContent =
    role === "admin"
      ? "Acompanhe o desempenho da plataforma."
      : "Que bom ter você por aqui. Este é o essencial do seu dia.";
  tileRole.textContent = label;
  tileSchool.textContent =
    role === "admin" ? "Liberada" : unlocked ? "Desbloqueada" : "Bloqueada";
  tileSeal.textContent =
    role === "admin"
      ? "—"
      : unlocked && progress >= MODULE_COUNT
        ? "Qualificado"
        : "Não emitido";

  const sealTile = tileSeal.closest(".tile");
  if (sealTile) {
    sealTile.classList.toggle("tile--accent", tileSeal.textContent === "Qualificado");
  }

  await renderProfile(role, label);
  await renderSchoolPanel();

  applyRoleUI(role);
  if (role === "admin") {
    adminTitle.textContent = `${greetingText()}, ${name}!`;
    adminSubtitle.textContent = "Gerencie a equipe e o suporte da plataforma.";
    await store.ensureAdmin();
    await renderAdminPanel();
  }

  await buildChatList();
  resetChat();
  startChatLive();

  const cinematicPending =
    role !== "admin" &&
    unlocked &&
    progress >= MODULE_COUNT &&
    !getCinematicSeen();

  if (cinematicPending) {
    await playCinematicToCertificate();
  }

  showView("view-dashboard");
  setSection(role === "admin" ? "admin" : "sessao");
}

let congratsTimer = null;

function openCongrats() {
  ensureSealDate();
  sealDate.textContent = sealDateLabel();
  showView("view-congrats");
}

const CINEMATIC_INTRO = "As cartas que guiaram sua formação";

function showCongratsBeat() {
  return new Promise((resolve) => {
    openCongrats();

    const finish = () => {
      clearTimeout(congratsTimer);
      showFeedback(null, null, contentFeedback);
      resolve();
    };

    clearTimeout(congratsTimer);
    congratsTimer = setTimeout(finish, 3600);
    congratsContinue.addEventListener("click", finish, { once: true });
  });
}

async function playCinematicToCertificate() {
  await playCinematic("full");
  setCinematicSeen();
  await showCongratsBeat();
}

let cinematicExplainIndex = 0;
let cinematicExplainMode = "replay";
let cinematicExplainDone = null;
let cinematicSkipped = false;

function skipCinematic() {
  if (cinematicEl.hidden) return;
  cinematicSkipped = true;
  if (cinematicExplainDone) {
    const done = cinematicExplainDone;
    cinematicExplainDone = null;
    done();
    return;
  }
}

async function cinematicHold(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (cinematicSkipped) return;
    await wait(Math.min(200, end - Date.now()));
  }
}

function showCinematicExplain(index) {
  const card = CARDS[index];

  cinematicExplainImg.src = card.image;
  cinematicExplainImg.alt = `Carta ${card.name}`;
  cinematicExplainEyebrow.textContent = `Carta ${card.number}`;
  cinematicExplainName.textContent = card.name;

  cinematicExplainChips.replaceChildren(
    ...card.chips.map((label) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = label;
      return chip;
    })
  );

  cinematicExplainText.replaceChildren(
    ...card.meaning.map((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      return element;
    })
  );

  const isLast = index === CARDS.length - 1;
  cinematicExplainNextLabel.textContent = isLast
    ? cinematicExplainMode === "full"
      ? "Receber certificado"
      : "Concluir"
    : "Próxima carta";
}

async function playCinematic(mode = "replay") {
  if (!cinematicEl.hidden) return;

  cinematicSkipped = false;
  cinematicEl.hidden = false;
  cinematicEl.setAttribute("aria-hidden", "false");
  cinematicExplain.hidden = true;
  cinematicExplain.classList.remove("is-visible");
  cinematicSkip.hidden = false;
  cinematicLine.textContent = CINEMATIC_INTRO;
  cinematicLine.classList.remove("is-visible");
  cinematicCard.classList.remove("is-visible");
  cinematicName.classList.remove("is-visible");
  cinematicSkip.focus();

  await wait(150);
  cinematicLine.classList.add("is-visible");
  await cinematicHold(1800);
  cinematicLine.classList.remove("is-visible");
  await cinematicHold(500);

  for (const card of CARDS) {
    if (cinematicSkipped) break;

    cinematicImg.src = card.image;
    cinematicImg.alt = `Carta ${card.name}`;
    cinematicName.textContent = card.name;

    await wait(120);
    cinematicCard.classList.add("is-visible");
    cinematicName.classList.add("is-visible");
    await cinematicHold(1200);
    cinematicCard.classList.remove("is-visible");
    cinematicName.classList.remove("is-visible");
    await cinematicHold(400);
  }

  if (!cinematicSkipped) {
    cinematicLine.classList.remove("is-visible");
    cinematicCard.classList.remove("is-visible");
    cinematicName.classList.remove("is-visible");
    cinematicImg.alt = "";

    cinematicExplainMode = mode;
    cinematicExplainIndex = 0;
    cinematicExplain.hidden = false;
    showCinematicExplain(0);
    cinematicExplain.classList.add("is-visible");
    cinematicExplainNext.focus();

    await new Promise((resolve) => {
      cinematicExplainDone = resolve;
    });
  }

  cinematicExplainDone = null;
  cinematicExplain.hidden = true;
  cinematicExplain.classList.remove("is-visible");
  cinematicEl.hidden = true;
  cinematicEl.setAttribute("aria-hidden", "true");
  cinematicLine.classList.remove("is-visible");
  cinematicCard.classList.remove("is-visible");
  cinematicName.classList.remove("is-visible");
}

function setFieldError(input, message) {
  const field = input.closest(".field");
  const errorEl = document.getElementById(`${input.id}-error`);

  if (message) {
    field.classList.add("field--invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  } else {
    field.classList.remove("field--invalid");
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function validate() {
  let isValid = true;
  const email = emailInput.value.trim();

  if (!email) {
    setFieldError(emailInput, "Informe seu e-mail.");
    isValid = false;
  } else if (!EMAIL_PATTERN.test(email)) {
    setFieldError(emailInput, "Digite um e-mail válido.");
    isValid = false;
  } else {
    setFieldError(emailInput, null);
  }

  if (!passwordInput.value) {
    setFieldError(passwordInput, "Informe sua senha.");
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    setFieldError(passwordInput, "A senha precisa ter ao menos 6 caracteres.");
    isValid = false;
  } else {
    setFieldError(passwordInput, null);
  }

  return isValid;
}

function showFeedback(message, type, container = feedback) {
  container.replaceChildren();
  if (!message) return;

  const element = document.createElement("p");
  element.className = `feedback__msg feedback__msg--${type}`;

  if (type === "success") {
    element.insertAdjacentHTML(
      "afterbegin",
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>'
    );
  }

  element.append(document.createTextNode(message));
  container.append(element);
}

function setLoading(isLoading) {
  submitBtn.classList.toggle("is-loading", isLoading);
  submitBtn.disabled = isLoading;
  submitLabel.textContent = isLoading ? "Entrando…" : "Entrar";
}

function setUnlockLoading(isLoading) {
  unlockBtn.classList.toggle("is-loading", isLoading);
  unlockBtn.disabled = isLoading;
  unlockLabel.textContent = isLoading ? "Desbloqueando…" : "Desbloquear escola";
}

togglePassword.addEventListener("click", () => {
  const isVisible = togglePassword.getAttribute("aria-pressed") === "true";
  const next = !isVisible;

  togglePassword.setAttribute("aria-pressed", String(next));
  togglePassword.setAttribute("aria-label", next ? "Ocultar senha" : "Mostrar senha");
  passwordInput.type = next ? "text" : "password";
});

roleInputs.forEach((input) => {
  input.addEventListener("change", () => {
    cardSubtitle.textContent = ROLE_SUBTITLES[input.value] ?? defaultSubtitle;
  });
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("field--invalid")) {
      setFieldError(input, null);
    }
    if (feedback.firstChild) showFeedback(null);
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showFeedback(null);

  if (!validate()) {
    const firstInvalid = form.querySelector("[aria-invalid='true']");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  setLoading(true);
  const chosenRole = currentRole();
  const result = await store.signIn(
    emailInput.value.trim().toLowerCase(),
    passwordInput.value,
    chosenRole
  );
  setLoading(false);

  if (!result.ok) {
    showFeedback(result.error || "E-mail ou senha incorretos.", "error");
    return;
  }

  const role = currentRole();
  writeViewRole(role);
  showFeedback(`Tudo certo. Bem-vindo, ${ROLE_LABELS[role]}!`, "success");
  await wait(650);

  if (role !== "therapist") {
    await openDashboard();
  } else if (!(await store.getUnlocked())) {
    showView("view-school");
  } else if ((await store.getProgress()) < MODULE_COUNT) {
    await openSchoolContent();
  } else {
    await openDashboard();
  }
});

schoolCode.addEventListener("input", () => {
  if (schoolCode.closest(".field").classList.contains("field--invalid")) {
    setFieldError(schoolCode, null);
  }
  if (schoolFeedback.firstChild) showFeedback(null, null, schoolFeedback);
});

schoolForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showFeedback(null, null, schoolFeedback);

  const code = schoolCode.value.trim();

  if (!code) {
    setFieldError(schoolCode, "Informe o código de desbloqueio.");
    schoolCode.focus();
    return;
  }

  if (code.toUpperCase() !== SCHOOL_CODE) {
    setFieldError(schoolCode, "Código inválido. Confira e tente novamente.");
    schoolCode.focus();
    return;
  }

  setFieldError(schoolCode, null);
  setUnlockLoading(true);
  await wait(800);
  setUnlockLoading(false);

  await store.setUnlocked();
  showFeedback("Escola desbloqueada!", "success", schoolFeedback);
  await wait(700);
  await openSchoolContent();
});

moduleEls.forEach((element, index) => {
  const head = element.querySelector(".module__head");
  const cta = element.querySelector(".module__cta");

  head.addEventListener("click", () => {
    if (element.classList.contains("is-locked")) return;
    expandedModule = index;
    void renderModules();
  });

  cta.addEventListener("click", async () => {
    const progress = await store.getProgress();
    if (index !== progress) return;

    const next = progress + 1;
    await store.setProgress(next);

    if (next >= MODULE_COUNT) {
      await renderModules();
      await wait(350);
      await playCinematicToCertificate();
      await openDashboard();
      return;
    }

    expandedModule = next;
    await renderModules();
    moduleEls[next].querySelector(".module__head").focus();
  });
});

cinematicExplainNext.addEventListener("click", async () => {
  if (cinematicExplainIndex >= CARDS.length - 1) {
    const done = cinematicExplainDone;
    cinematicExplainDone = null;
    if (done) done();
    return;
  }

  cinematicExplain.classList.remove("is-visible");
  await wait(320);
  cinematicExplainIndex += 1;
  showCinematicExplain(cinematicExplainIndex);
  cinematicExplain.classList.add("is-visible");
  cinematicExplainNext.focus();
});

document
  .getElementById("replay-cinematic")
  .addEventListener("click", async () => {
    await playCinematic("replay");
    document.getElementById("replay-cinematic").focus();
  });

cinematicSkip.addEventListener("click", skipCinematic);

navItems.forEach((item) => {
  item.addEventListener("click", () => setSection(item.dataset.section));
});

document.querySelectorAll("[data-goto]").forEach((button) => {
  button.addEventListener("click", () => setSection(button.dataset.goto));
});

document.getElementById("review-school").addEventListener("click", () => {
  void openSchoolContent();
});

chatList.addEventListener("click", (event) => {
  const item = event.target.closest(".chat__item");
  if (!item) return;
  void openChat(item);
});

function scheduleCreatorReply(chatId) {
  const replies = [
    "Obrigada por escrever! Já já te respondo com calma.",
    "Perfeito, recebi sua mensagem. Em breve dou um retorno completo.",
    "Certo! Vou olhar isso com atenção e respondo por aqui em breve.",
    "Combinado. Qualquer coisa, pode mandar outra mensagem por este chat.",
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    if (!viewDashboard.hidden && activeChat && activeChat.id === chatId) {
      appendChatMessage("them", reply);
      markChatActivity(chatId, chatTimeNow(), false);
      return;
    }

    store.addMessage(chatId, {
      side: "them",
      text: reply,
      time: chatTimeNow(),
      storedSide: "them",
    });
    markChatActivity(chatId, chatTimeNow(), false);
  }, 1400 + Math.floor(Math.random() * 1200));
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  if (!activeChat) {
    chatBody.innerHTML =
      '<p class="chat__empty">Selecione a conversa antes de enviar.</p>';
    return;
  }

  const chatId = activeChat.id;
  appendChatMessage("me", text);
  updateChatItemTime(chatId, chatTimeNow());
  chatInput.value = "";
  syncChatInput();
  chatInput.focus();

  if (!USE_SUPABASE && currentRole() !== "admin" && chatId.startsWith("creator")) {
    scheduleCreatorReply(chatId);
  }
});

chatInput.addEventListener("input", syncChatInput);

chatInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.shiftKey) return;

  event.preventDefault();
  if (chatInput.value.trim()) {
    chatForm.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  }
});

syncChatInput();

handleAddMember(
  addTherapistForm,
  "therapist",
  document.getElementById("add-therapist-name"),
  document.getElementById("add-therapist-email"),
  "terapeuta"
);

handleAddMember(
  addAdminForm,
  "admin",
  document.getElementById("add-admin-name"),
  document.getElementById("add-admin-email"),
  "administrador"
);

adminAddTherapistBtn.addEventListener("click", () => {
  const input = document.getElementById("add-therapist-name");
  if (typeof input.scrollIntoView === "function") {
    input.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  input.focus();
});

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = settingName.value.trim();
  const email = settingEmail.value.trim();
  let valid = true;

  if (name.length < 2) {
    setFieldError(settingName, "Informe seu nome.");
    valid = false;
  } else {
    setFieldError(settingName, null);
  }

  if (!EMAIL_PATTERN.test(email)) {
    setFieldError(settingEmail, "Informe um e-mail válido.");
    valid = false;
  } else {
    setFieldError(settingEmail, null);
  }

  if (!valid) {
    showFeedback(null, null, settingsFeedback);
    if (name.length < 2) {
      settingName.focus();
    } else {
      settingEmail.focus();
    }
    return;
  }

  const saved = await store.saveProfile({
    name,
    email: email.toLowerCase(),
    emailNotifications: Boolean(
      settingsForm.elements["email-notifications"]?.checked
    ),
    chatNotifications: Boolean(
      settingsForm.elements["chat-notifications"]?.checked
    ),
    photo: pendingPhoto,
    accent: pendingAccent,
    specialty: settingSpecialty ? settingSpecialty.value.trim() : "",
  });

  if (saved === false) {
    showFeedback(
      "Não foi possível salvar as configurações.",
      "error",
      settingsFeedback
    );
    return;
  }

  profileName.textContent = name;
  applyAvatar(profileAvatar, pendingPhoto, name);
  settingsAsideName.textContent = name;
  applyAvatar(settingsAvatar, pendingPhoto, name);
  applyAvatar(settingsPhotoPreview, pendingPhoto, name);
  dashboardTitle.textContent = `${greetingText()}, ${name}!`;
  adminTitle.textContent = `${greetingText()}, ${name}!`;

  const specialty = settingSpecialty ? settingSpecialty.value.trim() : "";
  if (settingsAsideSpecialty) {
    settingsAsideSpecialty.textContent = specialty;
    settingsAsideSpecialty.hidden = !specialty;
  }

  showFeedback("Configurações salvas!", "success", settingsFeedback);
});

settingPhoto.addEventListener("change", async () => {
  const file = settingPhoto.files && settingPhoto.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showFeedback("Escolha um arquivo de imagem.", "error", settingsFeedback);
    settingPhoto.value = "";
    return;
  }

  try {
    pendingPhoto = await resizePhoto(file);
    const name = settingName.value.trim() || profileName.textContent;
    applyAvatar(settingsPhotoPreview, pendingPhoto, name);
    applyAvatar(profileAvatar, pendingPhoto, name);
    applyAvatar(settingsAvatar, pendingPhoto, name);
    showFeedback(null, null, settingsFeedback);
  } catch {
    showFeedback(
      "Não foi possível carregar esta imagem.",
      "error",
      settingsFeedback
    );
  }

  settingPhoto.value = "";
});

settingPhotoRemove.addEventListener("click", () => {
  pendingPhoto = null;
  const name = settingName.value.trim() || profileName.textContent;
  applyAvatar(settingsPhotoPreview, null, name);
  applyAvatar(profileAvatar, null, name);
  applyAvatar(settingsAvatar, null, name);
});

settingsForm.querySelectorAll('input[name="accent"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    pendingAccent = radio.value;
    applyAccent(pendingAccent);
  });
});

newSessionBtn.addEventListener("click", openSessionModal);

renderCartaGrid();

cartaModal.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", closeCartaModal);
});

sessionModal.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", closeSessionModal);
});

sessionOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sessionFormat = option.dataset.format;
    sessionOptions.forEach((other) => {
      const selected = other === option;
      other.classList.toggle("is-selected", selected);
      other.setAttribute("aria-checked", String(selected));
    });
    sessionCreate.disabled = false;
  });
});

sessionCreate.addEventListener("click", () => {
  if (!sessionFormat) return;

  closeSessionModal();
  revealToken += 1;
  sessionCardIndex = null;
  sessionQuestionText = "";
  openSessionStage(sessionFormat);
});

sessionStageClose.addEventListener("click", closeSessionStage);
sessionEnd.addEventListener("click", closeSessionStage);
sessionDraw.addEventListener("click", () => {
  void drawOnlineCard();
});

sessionAgain.addEventListener("click", () => {
  if (!sessionFormat) return;
  revealToken += 1;
  sessionCardIndex = null;
  sessionQuestionText = "";
  openSessionStage(sessionFormat);
});

sessionReopen.addEventListener("click", () => {
  if (!sessionFormat) return;
  openSessionStage(sessionFormat);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!cinematicEl.hidden) {
    skipCinematic();
  } else if (!sessionStage.hidden) {
    closeSessionStage();
  } else if (!sessionModal.hidden) {
    closeSessionModal();
  } else if (!cartaModal.hidden) {
    closeCartaModal();
  }
});

logoutBtn.addEventListener("click", async () => {
  const signingOut = store.signOut();

  emailInput.value = "";
  passwordInput.value = "";
  schoolCode.value = "";

  setFieldError(emailInput, null);
  setFieldError(passwordInput, null);
  setFieldError(schoolCode, null);
  showFeedback(null);
  showFeedback(null, null, schoolFeedback);
  showFeedback(null, null, contentFeedback);
  showFeedback(null, null, settingsFeedback);
  resetChat();
  sessionModal.hidden = true;
  cartaModal.hidden = true;

  showView("view-login");
  await signingOut;
});

document.getElementById("reset-demo").addEventListener("click", () => {
  void store.clearData();

  try {
    window.localStorage.removeItem(SCHOOL_STORAGE_KEY);
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.localStorage.removeItem(CINEMATIC_SEEN_KEY);
    window.localStorage.removeItem(USERS_KEY);
    window.localStorage.removeItem(CHATS_KEY);
  } catch {
    /* armazenamento indisponível */
  }

  emailInput.value = "";
  passwordInput.value = "";
  setFieldError(emailInput, null);
  setFieldError(passwordInput, null);
  showFeedback(
    "Demonstração reiniciada. Entre novamente para rever a Escola.",
    "info"
  );
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

async function restoreSession() {
  if (!USE_SUPABASE) return false;

  try {
    const { data, error } = await supabaseClient.auth.getSession();
    const session = data?.session;
    if (error || !session?.user?.email) return false;

    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("name, email, role")
      .eq("email", session.user.email)
      .maybeSingle();

    if (profileError || !profile) return false;

    sessionEmail = profile.email;
    sessionName = profile.name || "";
    sessionRole =
      profile.role === "admin"
        ? readViewRole() === "therapist"
          ? "therapist"
          : "admin"
        : "therapist";
    return true;
  } catch (error) {
    console.warn("Sessão não restaurada:", error);
    return false;
  }
}

if (resetDemoBtn) resetDemoBtn.hidden = USE_SUPABASE;

restoreSession().then((restored) => {
  if (restored) return openDashboard();
  return null;
});
