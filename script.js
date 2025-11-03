// === Loader ===
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 800);
  }
});

// === Carrossel Automático ===
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  if (slides.length) {
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
  }
}
setInterval(showSlide, 6000);

// === Menu Responsivo ===
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const visible = navLinks.style.display === "flex";
    navLinks.style.display = visible ? "none" : "flex";
  });
}

// === Helpers ===
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function getLang() {
  const nav = (navigator.language || "pt").slice(0, 2);
  return (
    localStorage.getItem("lang") ||
    (["pt", "en", "es"].includes(nav) ? nav : "pt")
  );
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
}

function applyI18n() {
  const lang = getLang();
  const dict = (typeof translations !== "undefined" && translations[lang]) ? translations[lang] : (translations?.pt || {});
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict && dict[key]) el.innerText = dict[key];
  });
  highlightActiveFlag(lang);
}

function highlightActiveFlag(lang) {
  $$(".lang-switch .flag").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

// === Inicialização ===
document.addEventListener("DOMContentLoaded", () => {
  // idioma inicial
  setLang(getLang());
  applyI18n();

  // clique nas bandeiras
  $$(".lang-switch .flag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLang(lang);
      applyI18n();
    });
  });

  // esconder loader ao carregar tudo
  window.addEventListener("load", () => {
    const loader = $("#loader");
    if (loader) loader.style.display = "none";
  });
});

// Opcional para debug: remova se quiser
window.__i18nDebug = { getLang, setLang, applyI18n };