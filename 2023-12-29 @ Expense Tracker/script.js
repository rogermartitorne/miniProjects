const totalBalance = document.getElementById("yourBalanceNumber");

let numeroIngresoPorDefecto = 0;
let numeroGastoPorDefecto = 0;

let cardsArray = [];
let removeButtonArray = [];

// Get the income / expense balances
const incomeBalance = document.querySelector("span#income");
const expenseBalance = document.querySelector("span#expense");

const text = document.getElementById("text");
const amount = document.getElementById("amount");

function createNewCard(x) {
  // Create a new card element
  var newCard = document.createElement("div");
  newCard.className = "card";

  // Create spans for text and amount
  var textSpan = document.createElement("span");
  textSpan.id = "textCard";
  textSpan.textContent = text.value;

  var amountSpan = document.createElement("span");
  amountSpan.id = "amountCard";
  amountSpan.textContent = amount.value;

  // Create a button for removing the card
  var removeButton = document.createElement("button");
  removeButton.classList.add("cardRemover");
  removeButton.textContent = "X";

  removeButton.addEventListener("click", function () {
    // Find the index of the clicked remove button
    const index = removeButtonArray.indexOf(removeButton);

    // Update the income / expense balances
    if (cardsArray[index].className == "card income") {
      numeroIngresoPorDefecto =
        numeroIngresoPorDefecto -
        Number(cardsArray[index].querySelector("#amountCard").textContent);
      incomeBalance.textContent = numeroIngresoPorDefecto + "€";
      totalBalance.textContent =
        numeroIngresoPorDefecto - numeroGastoPorDefecto + "€";
      validateBalance();
    } else if (cardsArray[index].className === "card expense") {
      numeroGastoPorDefecto =
        numeroGastoPorDefecto -
        Number(cardsArray[index].querySelector("#amountCard").textContent);
      expenseBalance.textContent = numeroGastoPorDefecto + "€";
      totalBalance.textContent =
        numeroIngresoPorDefecto - numeroGastoPorDefecto + "€";
      validateBalance();
    }

    // Remove the corresponding card and remove button
    cardsArray[index].remove();
    removeButtonArray[index].remove();

    // Remove the card and remove button from the arrays
    cardsArray.splice(index, 1);
    removeButtonArray.splice(index, 1);
  });

  // Append spans to the card element
  newCard.appendChild(textSpan);
  newCard.appendChild(amountSpan);

  // Get the historyContainer and append the new card
  var historyContainer = document.getElementById("historyContainer");
  historyContainer.appendChild(removeButton);
  historyContainer.appendChild(newCard);

  // Assign the class to the new card
  newCard.classList.add(`${x}`);

  cardsArray.push(newCard);
  removeButtonArray.push(removeButton);
}

function addTransaction(event) {
  event.preventDefault();

  if (amount.value > 0) {
    createNewCard("income");

    incomeBalance.textContent =
      numeroIngresoPorDefecto + Number(amount.value) + "€";
    numeroIngresoPorDefecto = numeroIngresoPorDefecto + Number(amount.value);
  } else if (amount.value < 0) {
    createNewCard("expense");

    expenseBalance.textContent =
      numeroGastoPorDefecto + Number(amount.value) + "€";
    numeroGastoPorDefecto = numeroGastoPorDefecto + Number(amount.value);
  } else if (amount.value === "") {
    alert("Introduce a valid amount");
  }

  let currentHeight = getComputedStyle(document.body).height.replace("px", "");
  console.log("currentHeight: " + currentHeight);

  let newHeight = Number(currentHeight) + 20;
  console.log("newHeight: " + newHeight)

  document.body.style.height = newHeight + "px";
  console.log(document.body.style.height)

  totalBalance.textContent =
    numeroIngresoPorDefecto - -numeroGastoPorDefecto + "€";

  validateBalance();

  // Clear the input fields
  text.value = "";
  amount.value = "";
}

function validateBalance() {
  let totalBalanceNew = totalBalance.textContent.replace("€", "");
  if (totalBalanceNew >= 0) {
    totalBalance.style.color = "green";
  } else if (totalBalanceNew < 0) {
    totalBalance.style.color = "red";
  }
}
