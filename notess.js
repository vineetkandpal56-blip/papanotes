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


document.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
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

  // card.addEventListener("mouseleave", ()=>{
  //   card.style.transform = "rotateX(0) rotateY(0)";
  // });
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
glow.remove();
/* 🔥 FORCE CLEANUP */
document.querySelectorAll(".note-content").forEach(el=>{
  el.style.position = "static";
  el.style.left = "auto";
  el.style.top = "auto";
  el.style.transform = "none";
});
function openImage(src){
  const popup = document.getElementById("imgPopup");
  const img = document.getElementById("popupImg");

  popup.style.display = "flex";
  img.src = src;

  document.body.style.overflow = "hidden";
}

function closeImage(){
  document.getElementById("imgPopup").style.display = "none";
  document.body.style.overflow = "auto";
}
function toggleClass(id){
  const target = document.getElementById(id);
  if(!target) return;

  document.querySelectorAll(".subjects").forEach(el=>{
    if(el !== target) el.classList.remove("active");
  });

  target.classList.toggle("active");
}
window.addEventListener("load", ()=>{
  document.getElementById("loader").style.display = "none";
});
document.addEventListener("DOMContentLoaded", function(){

  const search = document.getElementById("search");

  search.addEventListener("input", function(){

    const value = search.value.toLowerCase().trim();

    if(value.length < 3) return; // छोटा text ignore

    document.querySelectorAll(".card").forEach(card=>{

      const text = card.innerText.toLowerCase();

      if(text.includes(value)){

        const pdf = card.querySelector(".pdf-btn");

        if(pdf){
          // 🔥 direct open PDF
          window.open(pdf.href, "_blank");
        }

      }

    });

  });

});
document.addEventListener("DOMContentLoaded", function(){

  // 🔥 card click = PDF open
  document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("click", function(e){

      // अगर button पे click नहीं है
      if(e.target.closest(".btn")) return;

      const pdf = card.querySelector(".pdf-btn");

      if(pdf){
        window.open(pdf.href, "_blank");
      }

    });

  });

});
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("click", e => e.stopPropagation());
});
document.addEventListener("DOMContentLoaded", function(){

  document.querySelectorAll(".card").forEach(card=>{

    card.onclick = function(){

      const pdf = this.querySelector(".pdf-btn");

      if(pdf && pdf.href){
        window.open(pdf.href, "_blank");
      }

    };

  });

});
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("click", e => e.stopPropagation());
});
