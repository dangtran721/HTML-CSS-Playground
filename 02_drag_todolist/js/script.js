const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

let draggedCard = null;

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
});

lists.forEach((list) => {
  list.addEventListener("dragover", dragOver);

  list.addEventListener("drop", drop);

  list.addEventListener("dragleave", dragLeave);
});

function dragStart(e) {
  draggedCard = e.target;

  // To hide a card that being dragged
  setTimeout(() => {
    draggedCard.style.display = "none";
  }, 0);
}

function dragOver(e) {
  e.preventDefault();

  e.currentTarget.classList.add("over");
}

function drop(e) {
  e.currentTarget.appendChild(draggedCard);

  lists.forEach((list) => {
    list.classList.remove("over");
  });

  // To hide a card that being dragged
  draggedCard.style.display = "flex";
}

function dragLeave(e) {
  e.currentTarget.classList.remove("over");
}
