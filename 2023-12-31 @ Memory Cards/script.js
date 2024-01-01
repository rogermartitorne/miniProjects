// Array of cards
let cards = [];
let storageCards = JSON.parse(localStorage.getItem("cards")) || [];

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

function createCard(question, answer) {
  // Check if the card already exists in the cards array
  const existingCard = cards.find(
    (card) => card.innerText === `${question}\n${answer}`
  );
  if (existingCard) {
    alert("This card already exists");
  } else {
    if (question === "" || answer === "") {
      alert("Please fill in both fields");
    } else {
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

      // Add the card to the array
      cards.push(card);
      console.log("Card created", cards);

      // Save the card content to localStorage if it doesn't already exist
      const existingStorageCard = storageCards.find(
        (card) => card.question === question && card.answer === answer
      );
      if (!existingStorageCard) {
        storageCards.push({ question, answer });
        localStorage.setItem("cards", JSON.stringify(storageCards));
        console.log("Card added to storageCards array", storageCards);
      }

      // Add the card to the container
      cardsContainer.appendChild(card);

      // Variable to know the card status (rotation)
      let cardStatus = true;

      // Card flip animation + logic
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

      // Update the navigation information
      updateNavigation();
    }
  }
}

// Function to update the navigation information
function updateNavigation() {
  for (let i = 0; i < cards.length; i++) {
    if (cards.length === 0) {
      currentCard.textContent = cards.length;
    } else {
      if (cards[i].classList && cards[i].classList.contains("active")) {
        currentCard.textContent = i + 1;
        break;
      }
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

  // Remove cards from localStorage
  storageCards.length = 0;
  localStorage.clear();

  // Show arrays
  console.log("Cleared cards array", cards);
  console.log("Cleared storageCards array", storageCards);

  // Update the navigation information
  updateNavigation();
}

// Modify the nextCard and prevCard functions to update localStorage
function nextCard() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("active")) {
      if (i < cards.length - 1) {
        // Check if it's not the last card
        cards[i].className = "card fade-out";
        cards[i + 1].className = "card fade-in active";
      }
      break;
    }
  }

  // Update navigation information
  updateNavigation();
}

function prevCard() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("active")) {
      if (i > 0) {
        // Check if it's not the first card
        cards[i].className = "card fade-out";
        cards[i - 1].className = "card fade-in active";
      }
      break;
    }
  }
  // Update navigation information
  updateNavigation();
}

function closeForm() {
  // Stop displaying the cardForm
  cardFormContainer.style.display = "none";

  // Empty the form
  cardForm.reset();
}

function deleteCurrentCard() {
  const activeCard = document.querySelector(".card.active");

  if (activeCard) {
    // Get the index of the active card
    const index = Array.from(cards).indexOf(activeCard);

    // Remove the card from the cards array
    cards.splice(index, 1);
    storageCards.splice(index, 1);

    // Remove the card
    activeCard.remove();

    // Assign the active class to the next or previous card
    if (cards.length > 0) {
      if (index === cards.length) {
        cards[index - 1].className = "card active";
      } else {
        cards[index].className = "card active";
      }
    }

    // Update the localStorage
    localStorage.setItem("cards", JSON.stringify(storageCards));
  }

  // Update the navigation information
  if (cards.length === 0) {
    currentCard.textContent = 0;
    updateNavigation();
  } else {
    updateNavigation();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if there are cards in localStorage
  if (!localStorage.getItem("cards")) {
    localStorage.setItem("cards", JSON.stringify([]));
  }

  // Retrieve the card content from localStorage
  storageCards = JSON.parse(localStorage.getItem("cards")) || [];

  // Recreate the cards from the stored content
  storageCards.forEach(({ question, answer }) => {
    createCard(question, answer);
  });

  // Update the navigation information
  updateNavigation();
});
