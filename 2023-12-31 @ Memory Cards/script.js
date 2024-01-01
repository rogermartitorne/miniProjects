// Array of cards
let cards = JSON.parse(localStorage.getItem("cards")) || [];

// Card information
const currentCard = document.getElementById("currentCard");
const totalCards = document.getElementById("totalCards");

// Cards container
const cardsContainer = document.getElementById("cardsContainer");

// Container of the card form
const cardFormContainer = document.getElementById("cardFormContainer");

// newCard button of index.html
const addCardButton = document
  .getElementById("newCard")
  .addEventListener("click", function () {
    // Display the cardForm
    cardFormContainer.style.display = "flex";

    // cardForm
    const cardForm = document.getElementById("cardForm");
    cardForm.addEventListener("submit", handleSubmit);
  });

// Save cards to localStorage
function saveToLocalStorage() {
  const savedCards = cards.map(card => {
    return {
      className: card.className,
      content: {
        question: card.querySelector('.front').textContent,
        answer: card.querySelector('.back').textContent
      }
    };
  });

  localStorage.setItem('cards', JSON.stringify(savedCards));
}

// Function to load cards from localStorage
function loadFromLocalStorage() {
  const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
  storedCards.forEach(savedCard => {
    createCard(savedCard.content.question, savedCard.content.answer, savedCard.className);
  });
}

// Initial load from localStorage
loadFromLocalStorage();

function handleSubmit(event) {
  event.preventDefault();

  // Get the form data
  const data = new FormData(event.target);

  // Get form data values
  const question = data.get("question");
  const answer = data.get("answer");

  // Create the card
  createCard(question, answer);

  // Close the cardForm
  closeForm();
}

// Modify the createCard function to add cards to the array and update localStorage
function createCard(question, answer) {
  // Create the card
  const card = document.createElement("div");
  if (cards.length === 0) {
    card.className = "card active";
  } else {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].classList && cards[i].classList.contains("active")) {
        card.className = "card";
      }
    }
  }

  // Create the card content (question and answer)
  const cardQuestion = document.createElement("div");
  cardQuestion.className = "front";
  cardQuestion.textContent = question;

  const cardAnswer = document.createElement("div");
  cardAnswer.className = "back";
  cardAnswer.textContent = answer;

  // Add the card content to the card
  card.appendChild(cardQuestion);
  card.appendChild(cardAnswer);

  // Add the card to the container
  cardsContainer.appendChild(card);

  // Variable to know the card status (rotation)
  let cardStatus = true;

  card.addEventListener("click", function () {
    card.classList.toggle("show-answer");

    if (cardStatus) {
      // Hide the question
      cardQuestion.style.display = "none";

      // Set delay of 0.2s to show the answer
      setTimeout(() => {
        cardAnswer.style.backfaceVisibility = "visible";
      }, 200);

      // Change cardStatus
      cardStatus = false;
    } else {
      // Hide the answer
      cardAnswer.style.backfaceVisibility = "hidden";

      // Set delay of 0.2s to show the question
      setTimeout(() => {
        cardQuestion.style.display = "flex";
      }, 200);

      // Change cardStatus
      cardStatus = true;
    }
  });

  // Add the card to the array
  cards.push(card);

  // Update the navigation information
  updateNavigation();

  // Save to localStorage
  saveToLocalStorage();
}

// Function to update the navigation information
function updateNavigation() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList && cards[i].classList.contains("active")) {
      currentCard.textContent = i + 1;
      break;
    }
  }
  totalCards.textContent = cards.length;
}

// Modify the clearCards function to remove cards from the array and update localStorage
function clearCards() {
  const container = document.getElementById("cardsContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Empty the cards array
  cards.length = 0;

  // Reset the current card information
  currentCard.textContent = 0;
  totalCards.textContent = 0;

  // Update the navigation information
  updateNavigation();

  // Save to localStorage
  saveToLocalStorage();
}

// Modify the nextCard and prevCard functions to update localStorage
function nextCard() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("active")) {
      if (i < cards.length - 1) { // Check if it's not the last card
        cards[i].className = "card fade-out";
        cards[i + 1].className = "card fade-in active";
      }
      break;
    }
  }

  // Update the navigation information if the operation is valid
  if (i < cards.length - 1) {
    updateNavigation();

    // Save to localStorage
    saveToLocalStorage();
  }
}

function prevCard() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("active")) {
      if (i > 0) { // Check if it's not the first card
        cards[i].className = "card fade-out";
        cards[i - 1].className = "card fade-in active";
      }
      break;
    }
  }

  // Update the navigation information if the operation is valid
  if (i > 0) {
    updateNavigation();

    // Save to localStorage
    saveToLocalStorage();
  }
}

function closeForm() {
  // Stop displaying the cardForm
  cardFormContainer.style.display = "none";

  // Empty the form
  cardForm.reset();
}