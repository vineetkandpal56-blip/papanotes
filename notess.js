/* 🔒 FORCE ALL CLOSED ON LOAD */
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".subjects").forEach(el=>{
    el.classList.remove("active");
  });

  document.querySelectorAll(".note-content").forEach(el=>{
    el.classList.remove("active");
  });

});
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     🏠 HOME SCROLL
  ========================= */
  window.goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =========================
     📂 CLASS TOGGLE + CENTER
  ========================= */
  window.toggleClass = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    document.querySelectorAll(".subjects").forEach(el => {
      if (el !== target) el.classList.remove("active");
    });

    target.classList.toggle("active");

    // center scroll
    if (target.classList.contains("active")) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  /* =========================
     📄 NOTE TOGGLE (ACCORDION)
  ========================= */
  window.toggleNote = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const parent = el.parentElement;

    parent.querySelectorAll(".note-content").forEach(n => {
      if (n !== el) n.classList.remove("active");
    });

    el.classList.toggle("active");

    if (el.classList.contains("active")) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  /* =========================
     🔍 SEARCH + SUGGESTIONS
  ========================= */
  const search = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  if (search) {

    search.addEventListener("input", () => {
      const value = search.value.toLowerCase().trim();
      suggestions.innerHTML = "";

      let results = [];

      document.querySelectorAll(".card, .subjects p").forEach(el => {
        const text = el.innerText;

        if (text.toLowerCase().includes(value)) {
          results.push(text);
        }
      });

      results = [...new Set(results)];

      /* FILTER */
      document.querySelectorAll(".card").forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
      });

      /* SUGGESTIONS */
      if (value !== "") {
        results.slice(0, 6).forEach(item => {
          const div = document.createElement("div");
          div.className = "suggest-item";
          div.innerText = item;

          div.onclick = () => {
            search.value = item;
            suggestions.style.display = "none";
          };

          suggestions.appendChild(div);
        });

        suggestions.style.display = "block";
      } else {
        suggestions.style.display = "none";
      }
    });

    /* CLOSE SUGGESTIONS */
    document.addEventListener("click", (e) => {
      if (!search.contains(e.target)) {
        suggestions.style.display = "none";
      }
    });
  }

  /* =========================
     📷 IMAGE POPUP
  ========================= */
  window.openImage = (src) => {
    const popup = document.getElementById("imgPopup");
    const img = document.getElementById("popupImg");

    popup.style.display = "flex";
    img.src = src;

    document.body.style.overflow = "hidden";
  };

  window.closeImage = () => {
    document.getElementById("imgPopup").style.display = "none";
    document.body.style.overflow = "auto";
  };

  /* =========================
     ✨ SCROLL ANIMATION
  ========================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });

  /* =========================
     🧠 HERO TYPE EFFECT
  ========================= */
  const text = "PapaNotes 🚀";
  let i = 0;

  function typeEffect() {
    const el = document.getElementById("heroText");
    if (!el) return;

    if (i < text.length) {
      el.innerHTML += text[i];
      i++;
      setTimeout(typeEffect, 60);
    }
  }
  typeEffect();

  /* =========================
     🔊 CLICK SOUND (optional)
  ========================= */
  function clickSound(){
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    audio.volume = 0.1;
    audio.play();
  }

  document.querySelectorAll(".btn, .cat").forEach(el=>{
    el.addEventListener("click", clickSound);
  });

});
const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "200px";
glow.style.height = "200px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background = "radial-gradient(circle, rgba(99,102,241,0.25), transparent)";
glow.style.transform = "translate(-50%,-50%)";
glow.style.zIndex = "0";

document.body.appendChild(glow);

document.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
document.addEventListener("click", e=>{
  const ripple = document.createElement("span");
  ripple.style.position = "fixed";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.background = "rgba(99,102,241,0.5)";
  ripple.style.borderRadius = "50%";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.transform = "translate(-50%,-50%)";
  ripple.style.pointerEvents = "none";
  ripple.style.animation = "ripple 0.6s linear";

  document.body.appendChild(ripple);

  setTimeout(()=> ripple.remove(), 600);
});
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});
const darkBtn = document.createElement("button");
darkBtn.innerText = "🌙";
darkBtn.style.position = "fixed";
darkBtn.style.bottom = "20px";
darkBtn.style.left = "20px";
darkBtn.style.padding = "10px";
darkBtn.style.borderRadius = "50%";
darkBtn.style.border = "none";
darkBtn.style.cursor = "pointer";

document.body.appendChild(darkBtn);

darkBtn.onclick = ()=>{
  document.body.classList.toggle("dark-mode");
};
const quotes = [
  "🔥 Study now, shine later",
  "🚀 Topper mindset = consistency",
  "💀 No excuses, only results",
  "📚 One more chapter = one step ahead"
];

const quoteBox = document.createElement("div");
quoteBox.style.textAlign = "center";
quoteBox.style.margin = "10px";

document.body.prepend(quoteBox);

setInterval(()=>{
  let q = quotes[Math.floor(Math.random()*quotes.length)];
  quoteBox.innerText = q;
},4000);
window.addEventListener("scroll", ()=>{

  let sections = document.querySelectorAll("section");

  sections.forEach(sec=>{
    let top = sec.offsetTop - 100;
    let height = sec.offsetHeight;

    if(window.scrollY >= top && window.scrollY < top + height){
      sec.style.background = "#f9fafb";
    } else {
      sec.style.background = "";
    }
  });

});
/* 👀 TAB CHANGE */
document.addEventListener("visibilitychange", ()=>{
  if(document.hidden){
    document.title = "💀 वापस आ... toppers wait नहीं करते";
  } else {
    document.title = "PapaNotes 🚀";
  }
});
/* 🔥 STREAK */
let streak = parseInt(localStorage.getItem("streak") || "0");
const today = new Date().toDateString();
const last = localStorage.getItem("lastDay");

if(last !== today){
  streak++;
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDay", today);
}

const streakEl = document.createElement("div");
streakEl.innerText = `🔥 ${streak} day streak`;
streakEl.style.position = "fixed";
streakEl.style.top = "140px";
streakEl.style.left = "20px";
streakEl.style.background = "#f97316";
streakEl.style.color = "white";
streakEl.style.padding = "8px 10px";
streakEl.style.borderRadius = "10px";
streakEl.style.fontSize = "13px";

document.body.appendChild(streakEl);
/* 🎯 DAILY GOAL */
let goal = parseInt(localStorage.getItem("goal") || "0");

const goalBox = document.createElement("div");
goalBox.style.position = "fixed";
goalBox.style.top = "100px";
goalBox.style.left = "20px";
goalBox.style.background = "#22c55e";
goalBox.style.color = "white";
goalBox.style.padding = "8px 10px";
goalBox.style.borderRadius = "10px";
goalBox.style.fontSize = "13px";

function renderGoal(){
  goalBox.innerText = `🎯 Today: ${goal}/10 topics`;
}
renderGoal();
document.body.appendChild(goalBox);

/* increase on card click */
document.querySelectorAll(".card").forEach(c=>{
  c.addEventListener("click", ()=>{
    if(goal < 10){
      goal++;
      localStorage.setItem("goal", goal);
      renderGoal();
    }
  });
});
