const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#year");
const form = document.querySelector("#contact-form");
const status = document.querySelector(".form-status");

year.textContent = new Date().getFullYear();

function closeMenu() {
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach(link => link.addEventListener("click", closeMenu));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".placeholder-link").forEach(link => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      alert("Substitua este link pelo endereço real do projeto ou perfil.");
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Mensagem preparada! Conecte este formulário a um serviço de envio para recebê-la.";
  form.reset();
});
