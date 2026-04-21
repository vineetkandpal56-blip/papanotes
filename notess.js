document.addEventListener("DOMContentLoaded", function(){

/* =========================
   🏠 HOME BUTTON
========================= */
function goHome(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
window.goHome = goHome;


/* =========================
   📂 CLASS TOGGLE
========================= */
function toggleClass(id){
  let el = document.getElementById(id);

  document.querySelectorAll(".subjects").forEach(s => {
    if(s !== el){
      s.style.display = "none";
    }
  });

  el.style.display = (el.style.display === "block") ? "none" : "block";
}
window.toggleClass = toggleClass;


/* =========================
   📄 NOTE TOGGLE
========================= */
function closeAllNotes(){
  document.querySelectorAll(".note-content").forEach(el => {
    el.style.display = "none";
  });
}

function toggleNote(id){
  let el = document.getElementById(id);

  if(el.style.display === "block"){
    el.style.display = "none";
  } else {
    closeAllNotes();
    el.style.display = "block";

    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}
window.toggleNote = toggleNote;


/* =========================
   🔍 SEARCH SYSTEM (FINAL)
========================= */
const input = document.getElementById("search");

if(input){
  input.addEventListener("input", function(){

    let value = input.value.toLowerCase();

    // NOTES FILTER
    document.querySelectorAll(".card").forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });

    // SUBJECT FILTER
    document.querySelectorAll(".subjects p").forEach(sub => {
      let text = sub.innerText.toLowerCase();

      if(text.includes(value)){
        sub.style.display = "block";
        sub.parentElement.style.display = "block";
      } else {
        sub.style.display = "none";
      }
    });

    // RESET
    if(value === ""){
      document.querySelectorAll(".card").forEach(c => c.style.display = "block");
      document.querySelectorAll(".subjects p").forEach(p => p.style.display = "block");
      document.querySelectorAll(".subjects").forEach(s => s.style.display = "none");
    }

  });
}


/* =========================
   🔥 SCROLL ANIMATION
========================= */
const faders = document.querySelectorAll(".fade-up");

function reveal(){
  faders.forEach(el => {
    let top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 60){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();


/* =========================
   🔗 SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    e.preventDefault();

    let target = document.querySelector(this.getAttribute("href"));

    if(target){
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* =========================
   ✨ HERO TYPING EFFECT
========================= */
const text = "Unleash The Topper In You 🚀";
let i = 0;

function typing(){
  let hero = document.querySelector(".hero h1");

  if(hero && i < text.length){
    hero.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 35);
  }
}

let hero = document.querySelector(".hero h1");
if(hero){
  hero.innerHTML = "";
  typing();
}


/* =========================
   🎯 SUBJECT CLICK → NOTES
========================= */
document.querySelectorAll(".subjects p").forEach(sub => {
  sub.addEventListener("click", () => {

    let notesSection = document.getElementById("notes");

    if(notesSection){
      notesSection.scrollIntoView({
        behavior: "smooth"
      });
    }

  });
});

});
document.addEventListener("DOMContentLoaded", function(){

  const input = document.getElementById("search");
  const suggestionsBox = document.getElementById("suggestions");

  if(!input) return;

  input.addEventListener("input", function(){

    let value = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if(value === ""){
      suggestionsBox.style.display = "none";
      return;
    }

    let data = [];

    // collect all text
    document.querySelectorAll(".card, .subjects p").forEach(el => {
      let text = el.innerText.trim();

      if(text.toLowerCase().includes(value)){
        data.push(text);
      }
    });

    // remove duplicates
    data = [...new Set(data)];

    // show suggestions
    data.slice(0,5).forEach(item => {
      let div = document.createElement("div");
      div.innerText = item;

      div.onclick = () => {
        input.value = item;
        suggestionsBox.style.display = "none";

        // scroll to notes
        document.getElementById("notes").scrollIntoView({
          behavior:"smooth"
        });
      };

      suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";

  });

  // click outside close
  document.addEventListener("click", (e)=>{
    if(!e.target.closest(".search-box")){
      suggestionsBox.style.display = "none";
    }
  });

});