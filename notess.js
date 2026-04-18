// Search system
function searchNotes() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}

// Toggle notes
function toggleNote(id) {
  let note = document.getElementById(id);
  note.style.display = note.style.display === "block" ? "none" : "block";
}
function toggleNote(id) {
  let note = document.getElementById(id);

  if (note.style.display === "block") {
    note.style.display = "none";
  } else {
    note.style.display = "block";
  }
}