const currencySelector = document.getElementById("currencies");
const leftField = document.getElementsByTagName("input")[0];
const rightField = document.getElementsByTagName("input")[1];
const leftLabel = document.getElementsByTagName("label")[0];
const rightLabel = document.getElementsByTagName("label")[1];

const url =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=EUR&to=USD%2C%20ALL%2C%20AMD%2C%20BAM%2C%20BGN%2C%20BYN%2C%20CHF%2C%20CZK%2C%20DKK%2C%20GBP%2C%20GEL%2C%20HUF%2C%20ISK%2C%20MDL%2C%20MKD%2C%20NOK%2C%20PLN%2C%20RON%2C%20RSD%2C%20SEK%2C%20RUB%2C%20TRY%2C%20UAH";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "API-Key",
    "X-RapidAPI-Host": "API-Host",
  },
};

// Function to fetch exchange rates from the provided API
let rates;
async function fetchExchangeRates() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Update rates variable
    rates = data.rates;

    // Return rates object
    return rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}

// Fetch initial exchange rates when the page loads
window.addEventListener("load", async function () {
  await fetchExchangeRates();
});

currencySelector.addEventListener("input", async function () {
  await fetchExchangeRates();

  switch (currencySelector.value) {
    case "USD":
      rightField.id = "USD";
      rightField.placeholder = "$";
      rightLabel.textContent = "USD ($)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "ALL":
      rightField.id = "ALL";
      rightField.placeholder = "Lek";
      rightLabel.textContent = "ALL";
      leftField.value = "";
      rightField.value = "";
      break;
    case "AMD":
      rightField.id = "AMD";
      rightField.placeholder = "֏";
      rightLabel.textContent = "AMD (֏)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "BAM":
      rightField.id = "BAM";
      rightField.placeholder = "KM";
      rightLabel.textContent = "BAM (KM)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "BGN":
      rightField.id = "BGN";
      rightField.placeholder = "лв";
      rightLabel.textContent = "BGN (лв)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "BYN":
      rightField.id = "BYN";
      rightField.placeholder = "Rbl";
      rightLabel.textContent = "BYN (Rbl)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "CHF":
      rightField.id = "CHF";
      rightField.placeholder = "SFr";
      rightLabel.textContent = "CHF (SFr)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "CZK":
      rightField.id = "CZK";
      rightField.placeholder = "Kč";
      rightLabel.textContent = "CZK (Kč)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "DKK":
      rightField.id = "DKK";
      rightField.placeholder = "DKr";
      rightLabel.textContent = "DKK (DKr)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "GBP":
      rightField.id = "GBP";
      rightField.placeholder = "£";
      rightLabel.textContent = "GBP (£)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "GEL":
      rightField.id = "GEL";
      rightField.placeholder = "₾";
      rightLabel.textContent = "GEL (₾)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "HUF":
      rightField.id = "HUF";
      rightField.placeholder = "Ft";
      rightLabel.textContent = "HUF (Ft)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "ISK":
      rightField.id = "ISK";
      rightField.placeholder = "Kr";
      rightLabel.textContent = "ISK (Kr)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "MDL":
      rightField.id = "MDL";
      rightField.placeholder = "Leu";
      rightLabel.textContent = "MDL";
      leftField.value = "";
      rightField.value = "";
      break;
    case "MKD":
      rightField.id = "MKD";
      rightField.placeholder = "DEN";
      rightLabel.textContent = "MKD (DEN)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "NOK":
      rightField.id = "NOK";
      rightField.placeholder = "NKr";
      rightLabel.textContent = "NOK (NKr)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "PLN":
      rightField.id = "PLN";
      rightField.placeholder = "zl";
      rightLabel.textContent = "PLN (zl)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "RON":
      rightField.id = "RON";
      rightField.placeholder = "Leu";
      rightLabel.textContent = "RON";
      leftField.value = "";
      rightField.value = "";
      break;
    case "RSD":
      rightField.id = "RSD";
      rightField.placeholder = "DIN";
      rightLabel.textContent = "RSD (DIN)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "SEK":
      rightField.id = "CZK";
      rightField.placeholder = "Kč";
      rightLabel.textContent = "CZK (Kč)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "RUB":
      rightField.id = "RUB";
      rightField.placeholder = "₽";
      rightLabel.textContent = "RUB (₽)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "TRY":
      rightField.id = "TRY";
      rightField.placeholder = "₺";
      rightLabel.textContent = "TRY (₺)";
      leftField.value = "";
      rightField.value = "";
      break;
    case "UAH":
      rightField.id = "UAH";
      rightField.placeholder = "₴";
      rightLabel.textContent = "UAH (₴)";
      leftField.value = "";
      rightField.value = "";
      break;
  }
});

// Exchange RATES
leftField.addEventListener("input", function () {
  let leftValue = this.value;

  // Ensure rates are available before using them
  if (!rates) {
    console.error("Exchange rates not available yet.");
    return;
  }

  switch (currencySelector.value) {
    case "USD":
      rightField.value = (leftValue * parseFloat(rates.USD)).toFixed(3);
      break;
    case "ALL":
      rightField.value = (leftValue * parseFloat(rates.ALL)).toFixed(3);
      break;
    case "AMD":
      rightField.value = (leftValue * parseFloat(rates.AMD)).toFixed(3);
      break;
    case "BAM":
      rightField.value = (leftValue * parseFloat(rates.BAM)).toFixed(3);
      break;
    case "BGN":
      rightField.value = (leftValue * parseFloat(rates.BGN)).toFixed(3);
      break;
    case "BYN":
      rightField.value = (leftValue * parseFloat(rates.BYN)).toFixed(3);
      break;
    case "CHF":
      rightField.value = (leftValue * parseFloat(rates.CHF)).toFixed(3);
      break;
    case "CZK":
      rightField.value = (leftValue * parseFloat(rates.CZK)).toFixed(3);
      break;
    case "DKK":
      rightField.value = (leftValue * parseFloat(rates.DKK)).toFixed(3);
      break;
    case "GBP":
      rightField.value = (leftValue * parseFloat(rates.GBP)).toFixed(3);
      break;
    case "GEL":
      rightField.value = (leftValue * parseFloat(rates.GEL)).toFixed(3);
      break;
    case "HUF":
      rightField.value = (leftValue * parseFloat(rates.HUF)).toFixed(3);
      break;
    case "ISK":
      rightField.value = (leftValue * parseFloat(rates.ISK)).toFixed(3);
      break;
    case "MDL":
      rightField.value = (leftValue * parseFloat(rates.MDL)).toFixed(3);
      break;
    case "MKD":
      rightField.value = (leftValue * parseFloat(rates.MKD)).toFixed(3);
      break;
    case "NOK":
      rightField.value = (leftValue * parseFloat(rates.NOK)).toFixed(3);
      break;
    case "PLN":
      rightField.value = (leftValue * parseFloat(rates.PLN)).toFixed(3);
      break;
    case "RON":
      rightField.value = (leftValue * parseFloat(rates.RON)).toFixed(3);
      break;
    case "RSD":
      rightField.value = (leftValue * parseFloat(rates.RSD)).toFixed(3);
      break;
    case "SEK":
      rightField.value = (leftValue * parseFloat(rates.SEK)).toFixed(3);
      break;
    case "RUB":
      rightField.value = (leftValue * parseFloat(rates.RUB)).toFixed(3);
      break;
    case "TRY":
      rightField.value = (leftValue * parseFloat(rates.TRY)).toFixed(3);
      break;
    case "UAH":
      rightField.value = (leftValue * parseFloat(rates.UAH)).toFixed(3);
      break;
  }

  switch(leftField.id) {
    case "USD":
      rightField.value = leftValue * rates.EUR
      break;
  }
});

setInterval(function () {
  if (leftField.value <= 0) {
    rightField.value = "";
  }
}, 10);

function swap() {
  // Swap Values
  tempValue = leftField.value;
  leftField.value = rightField.value;
  rightField.value = tempValue;

  // Swap IDs
  tempId = leftField.id
  leftField.id = rightField.id
  rightField.id = tempId

  // Swap Placeholders
  tempPlaceholder = leftField.placeholder
  leftField.placeholder = rightField.placeholder
  rightField.placeholder = tempPlaceholder

  // Swap Labels
  tempLabel = leftLabel.textContent
  leftLabel.textContent = rightLabel.textContent
  rightLabel.textContent = tempLabel

  // Animation for the SVG
  const swapIcon = document.getElementsByTagName("svg")[0];
  swapIcon.classList.remove("rotar180");
  setTimeout(() => {
    swapIcon.classList.add("rotar180");
  }, 10);
}