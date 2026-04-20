// 🔥 TOGGLE NOTE (smooth open/close)
function toggleNote(id){
  let el = document.getElementById(id);

  if(el.style.display === "block"){
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}

// 🔍 SEARCH SYSTEM (live filter)
function searchNotes(){
  let input = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    let text = card.innerText.toLowerCase();

    if(text.includes(input)){
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// 🔥 SCROLL ANIMATION (fade-up)
const faders = document.querySelectorAll(".fade-up");

window.addEventListener("scroll", () => {
  faders.forEach(el => {
    let top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 60){
      el.classList.add("show");
    }
  });
});

// 🔥 SMOOTH SCROLL (navbar links)
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

// 🔥 HERO TYPING EFFECT (extra premium)
const text = "Unleash The Topper In You 🚀";
let i = 0;

function typing(){
  let hero = document.querySelector(".hero h1");

  if(i < text.length){
    hero.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 40);
  }
}

// start typing after load
window.onload = () => {
  let hero = document.querySelector(".hero h1");
  hero.innerHTML = ""; 
  typing();
};