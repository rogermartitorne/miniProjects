// Array of cards
const cards = [];

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
  .addEventListener("click", addCard);

function addCard() {
  // Display the cardForm
  cardFormContainer.style.display = "flex";

  // cardForm
  const cardForm = document.getElementById("cardForm");
  cardForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();

  // Get the form data
  const data = new FormData(event.target);

  // Get form data values
  const question = data.get("question");
  const answer = data.get("answer");

  // Create the card
  const card = document.createElement("div");
  card.className = "card";

  // Add content to the card
  card.textContent = question + answer;

  // Add onclick to card
  card.onclick = flipCard;

  // Add the card to the container
  cardsContainer.appendChild(card);

  // Modify the current card information
  const cardNumber = cards.length + 1; // The number of the card
  currentCard.textContent = cardNumber; // Set the current card number
  totalCards.textContent = cards.length + 1; // Set the total cards number

  // Add the card to the array
  cards.push(card);

  // Close the cardForm
  closeForm();
}

function flipCard() {
  
}

function clearCards() {
  const container = document.getElementById("cardsContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Reset the current card information
  currentCard.textContent = 0;
  totalCards.textContent = 0;

  // Empty the cards array
  cards.length = 0;
}

function closeForm() {
  // Stop displaying the cardForm
  cardFormContainer.style.display = "none";

  // Empty the form
  cardForm.reset();
}
