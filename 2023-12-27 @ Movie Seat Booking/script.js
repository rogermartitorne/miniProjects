const movie = document.getElementsByTagName("select")[0]
let moviePrice = 10;

const seats = document.getElementsByClassName("seat")
const numberOfSeats = document.getElementById("seats")
const price = document.getElementById("price")

let selectedSeats = 0;

movie.addEventListener("change", function() {
    switch(movie.value) {
        case "two":
            moviePrice = 8;
            price.textContent = selectedSeats * moviePrice
            break;
        case "three":
            moviePrice = 9;
            price.textContent = selectedSeats * moviePrice
            break;
        case "four":
            moviePrice = 11;
            price.textContent = selectedSeats * moviePrice
            break;
        default:
            moviePrice = 10;
            price.textContent = selectedSeats * moviePrice
            break;
    }
})

for (let i = 3; i < seats.length; i++) {
    seats[i].addEventListener("click", function() {
        switch(seats[i].className) {
            case "seat":
                seats[i].classList.add("selected")
                selectedSeats++;
                numberOfSeats.textContent = selectedSeats
                price.textContent = selectedSeats * moviePrice
                break;
            case "seat selected":
                seats[i].classList.remove("selected")
                selectedSeats--;
                numberOfSeats.textContent = selectedSeats
                price.textContent = selectedSeats * moviePrice
                break;
            case "seat occupied":
                alert(`This seat is already occupied. Choose another one.`)
        }
    })
}

function reset() {
    selectedSeats = 0;
    for (let i = 3; i < seats.length; i++) {
        seats[i].classList.remove("selected")
        numberOfSeats.textContent = selectedSeats
        price.textContent = selectedSeats * moviePrice
    }
}