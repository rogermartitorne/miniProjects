const eventKey = document.getElementById("eventKey")
const eventKeyCode = document.getElementById("eventKeyCode")
const eventCode = document.getElementById("eventCode")

const resultsContainer = document.getElementsByClassName("results")[0]
const startContainer = document.getElementsByClassName("start")[0]

document.addEventListener("keydown", (event) => {
    if(resultsContainer.classList.contains("nondisplay")) {
        resultsContainer.classList.remove("nondisplay")
        startContainer.classList.add("nondisplay")
    }
    let keyValue = event.key
    let codeValue = event.code
    let keyCodeValue = event.keyCode

    eventKey.innerHTML = keyValue
    eventCode.innerHTML = codeValue
    eventKeyCode.innerHTML = keyCodeValue
})