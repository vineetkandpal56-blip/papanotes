document.addEventListener("DOMContentLoaded", function(){

/* =========================
   🏠 HOME BUTTON
========================= */
window.goHome = function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

/* =========================
   📂 CLASS TOGGLE
========================= */
window.toggleClass = function(id){
  let el = document.getElementById(id);

  document.querySelectorAll(".subjects").forEach(s => {
    if(s !== el){
      s.style.display = "none";
    }
  });

  el.style.display = (el.style.display === "block") ? "none" : "block";
};

/* =========================
   📄 NOTE TOGGLE (FIXED)
========================= */
window.toggleNote = function(id){
  let el = document.getElementById(id);

  if(!el) return;

  let parent = el.parentElement;

  // only close siblings (important fix)
  parent.querySelectorAll(":scope > .note-content").forEach(n => {
    if(n !== el){
      n.style.display = "none";
    }
  });

  // toggle current
  el.style.display = (el.style.display === "block") ? "none" : "block";

  // scroll
  if(el.style.display === "block"){
    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
};

/* =========================
   📷 IMAGE POPUP
========================= */
window.openImage = function(src){
  let popup = document.getElementById("imgPopup");
  let img = document.getElementById("popupImg");

  if(popup && img){
    popup.style.display = "flex";
    img.src = src;
  }
};

window.closeImage = function(){
  let popup = document.getElementById("imgPopup");
  if(popup){
    popup.style.display = "none";
  }
};

/* =========================
   🔍 SEARCH + SUGGESTIONS
========================= */
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

if(search){

  search.addEventListener("input", function(){

    let value = search.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    let results = [];

    document.querySelectorAll(".card, .subjects p").forEach(el => {
      let text = el.innerText;

      if(text.toLowerCase().includes(value)){
        results.push(text);
      }
    });

    results = [...new Set(results)];

    document.querySelectorAll(".card").forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });

    if(value !== ""){
      results.slice(0,5).forEach(item => {
        let div = document.createElement("div");
        div.innerText = item;

        div.onclick = function(){
          search.value = item;
          suggestions.style.display = "none";

          document.getElementById("notes").scrollIntoView({
            behavior:"smooth"
          });
        };

        suggestions.appendChild(div);
      });

      suggestions.style.display = "block";
    } else {
      suggestions.style.display = "none";
    }

  });

}

/* =========================
   ❌ CLICK OUTSIDE CLOSE
========================= */
document.addEventListener("click", function(e){
  if(!e.target.closest(".search-box")){
    if(suggestions) suggestions.style.display = "none";
  }
});

/* =========================
   ✨ HERO TYPING EFFECT
========================= */
const text = "Unleash The Topper In You 🚀";
let i = 0;

function typing(){
  let hero = document.getElementById("heroText");

  if(hero && i < text.length){
    hero.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 40);
  }
}

typing();

});
window.toggleClass = function(id, btn){

  let el = document.getElementById(id);

  document.querySelectorAll(".subjects").forEach(s=>{
    if(s !== el) s.style.display = "none";
  });

  el.style.display = (el.style.display === "block") ? "none" : "block";

  document.querySelectorAll(".cat").forEach(c=>{
    c.classList.remove("active");
  });

  if(btn) btn.classList.add("active");
};
function autoScroll(){
  let i = 0;
  let scroll = setInterval(()=>{
    window.scrollBy(0,1);
    i++;

    if(i > 500) clearInterval(scroll);
  },10);
}
const quotes = [
  "Study now, shine later 💯",
  "No pain no gain 🔥",
  "Topper बनने का time आ गया 🚀"
];

function randomQuote(){
  let q = quotes[Math.floor(Math.random()*quotes.length)];
  document.getElementById("quote").innerText = q;
}

setInterval(randomQuote,3000);
function speak(text){
  let msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}
let time = 0;
let timer;

function startTimer(){
  timer = setInterval(()=>{
    time++;
    document.getElementById("timer").innerText = time + " sec";
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}
function unlock(){
  let pass = prompt("Enter code");
  if(pass === "1234"){
    alert("Unlocked 🔓");
    localStorage.setItem("unlock", true);
  } else {
    alert("Wrong ❌");
  }
}