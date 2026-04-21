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
   📄 NOTE TOGGLE (PDF FIXED)
========================= */
function closeAllNotes(){
  document.querySelectorAll(".note-content").forEach(n => {
    n.style.display = "none";
  });
}

window.toggleNote = function(id){
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
};

/* =========================
   📷 IMAGE POPUP
========================= */
window.openImage = function(src){
  document.getElementById("imgPopup").style.display = "flex";
  document.getElementById("popupImg").src = src;
};

window.closeImage = function(){
  document.getElementById("imgPopup").style.display = "none";
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

    // collect data
    document.querySelectorAll(".card, .subjects p").forEach(el => {
      let text = el.innerText;

      if(text.toLowerCase().includes(value)){
        results.push(text);
      }
    });

    // remove duplicates
    results = [...new Set(results)];

    // filter cards
    document.querySelectorAll(".card").forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });

    // suggestions show
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
    suggestions.style.display = "none";
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