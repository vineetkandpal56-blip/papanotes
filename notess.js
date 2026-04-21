document.addEventListener("DOMContentLoaded", function(){

  // 🔒 sab band (IMPORTANT FIX)
  document.querySelectorAll(".subjects, .note-content").forEach(el=>{
    el.style.display = "none";
  });

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
     📂 CLASS TOGGLE (FIXED)
  ========================= */
  window.toggleClass = function(id, btn){

    let el = document.getElementById(id);

    document.querySelectorAll(".subjects").forEach(s=>{
      if(s !== el){
        s.style.display = "none";
      }
    });

    el.style.display = (el.style.display === "block") ? "none" : "block";

    // active button
    document.querySelectorAll(".cat").forEach(c=>{
      c.classList.remove("active");
    });

    if(btn) btn.classList.add("active");
  };

  /* =========================
     📄 NOTE TOGGLE
  ========================= */
  window.toggleNote = function(id){
    let el = document.getElementById(id);
    if(!el) return;

    let parent = el.parentElement;

    parent.querySelectorAll(":scope > .note-content").forEach(n=>{
      if(n !== el){
        n.style.display = "none";
      }
    });

    el.style.display = (el.style.display === "block") ? "none" : "block";

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
     🔍 SEARCH
  ========================= */
  const search = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  if(search){
    search.addEventListener("input", function(){

      let value = search.value.toLowerCase().trim();
      suggestions.innerHTML = "";

      let results = [];

      document.querySelectorAll(".card, .subjects p").forEach(el=>{
        let text = el.innerText;

        if(text.toLowerCase().includes(value)){
          results.push(text);
        }
      });

      results = [...new Set(results)];

      document.querySelectorAll(".card").forEach(card=>{
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
      });

      if(value !== ""){
        results.slice(0,5).forEach(item=>{
          let div = document.createElement("div");
          div.innerText = item;

          div.onclick = function(){
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
  }

});
/* 🔥 AUTO CLOSE ON SCROLL TOP */
window.addEventListener("scroll", function(){
  if(window.scrollY < 50){
    document.querySelectorAll(".note-content").forEach(el=>{
      el.style.display = "none";
    });
  }
});

/* 🔥 CLICK SOUND (optional cool effect) */
function clickSound(){
  let audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
  audio.play();
}

/* 🔥 BUTTON SOUND APPLY */
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("click", clickSound);
});

/* 🔥 LOADING EFFECT */
window.onload = function(){
  document.body.style.opacity = "1";
};