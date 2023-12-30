const botonDesplegable = document.getElementsByClassName("icon-tabler-square-rounded-chevron-down")
const botonCruz = document.getElementsByClassName("icon-tabler-square-rounded-x")
const boxBody = document.getElementsByClassName("faq-body")
const faqContainer = document.getElementsByClassName("faq-container")

let boxOpen

for (let btn = 0; btn < botonDesplegable.length; btn++) {
    botonDesplegable[btn].addEventListener("click", () => {
        faqContainer[btn].style.backgroundColor = "white"
        faqContainer[btn].style.paddingBottom = "60px"
        boxBody[btn].style.display = "flex"
        botonCruz[btn].style.display = "flex"
        botonDesplegable[btn].style.display = "none"
    })
}

for (let btn = 0; btn < botonCruz.length; btn++) {
    botonCruz[btn].addEventListener("click", () => {
        faqContainer[btn].style.backgroundColor = "#f0f0f0"
        faqContainer[btn].style.paddingBottom = "20px"
        boxBody[btn].style.display = "none"
        botonCruz[btn].style.display = "none"
        botonDesplegable[btn].style.display = "flex"
    })
}