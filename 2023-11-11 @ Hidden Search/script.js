const iconoBuscar = document.getElementsByTagName("svg")[0]
const barraBuscar = document.getElementById("buscar")

iconoBuscar.addEventListener("click", update)

let culo = true

function update() {
    if(culo) {
        barraBuscar.style.width = "0px"
        barraBuscar.style.paddingLeft = "0px"
        culo = false;
    } else {
        barraBuscar.style.width = "200px"
        barraBuscar.style.paddingLeft = "10px"
        culo = true;
    }
    
}