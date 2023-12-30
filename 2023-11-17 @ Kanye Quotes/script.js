const quoteText = document.getElementById("quote")

async function logQuotes() {
    const response = await fetch("https://api.kanye.rest");
    const quotes = await response.json();
    quoteText.innerHTML = ' ';
    quoteText.innerText = quotes.quote
}

logQuotes()

const refresh = document.getElementsByTagName("button")[0]
refresh.addEventListener("click", logQuotes)