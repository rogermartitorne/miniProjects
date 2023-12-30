const vasitos = document.getElementsByClassName("vasito")
const cantidadAgua = document.getElementById("cantidad-bebida")
const vaso = document.getElementById("vaso")

let aguaRestante = 2

for (let i = 0; i < vasitos.length; i++) {
    vasitos[i].addEventListener("click", function () {
        if (vasitos[i].classList.contains("selected")) {
            vasitos[i].classList.remove("selected");
            aguaRestante = aguaRestante + 0.25;
        } else {
            vasitos[i].classList.add("selected");
            aguaRestante = aguaRestante - 0.25;
        }

        cantidadAgua.textContent = aguaRestante + "L";
        updateVaso();
    });
}

function updateVaso() {
    const percentage = ((2 - aguaRestante) / 2) * 100;
    vaso.style.background = `linear-gradient(to top, #6ab3f8 ${percentage}%, white ${percentage}%)`;
}