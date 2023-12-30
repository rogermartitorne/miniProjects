// Obtención referencias a los elementos HTML
const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// Establecer el foco en el área de texto al cargar la página.
textarea.focus()

// Evento de tecla para el área de texto
textarea.addEventListener('keyup', (e) => {
    // Ejecutar la función createTags a partir del valor del textarea
    createTags(e.target.value)

    // Si se da click a enter...
    if(e.key === 'Enter') {
        // Creamos un timeout de 10ms
        setTimeout(() => {
            // Vaciamos el textarea
            e.target.value = ''
        }, 10)

        // Ejecutamos la función randomSelect
        randomSelect()
    }
})

function createTags(input) {
    /**
     * Creamos una variable const donde tags:
     * 
     * input.split(','): Divide el string en un array usando la coma como delimitador.
     * .filter(tag => tag.trim() !== ''): Filtra las etiquetas eliminando aquellas que están vacías o que consisten solo en espacios en blanco
     * .map(tag => tag.trim()): Elimina los espacios en blanco al principio y al final de cada etiqueta restante
     */
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    // Limpiamos el contenido de tagsEl
    tagsEl.innerHTML = ''

    // Por cada etiqueta tag... 
    tags.forEach(tag => {
        // creamos un elemento span y lo guardamos en la variable tagEl
        const tagEl = document.createElement('span')
        // a tagEl le añadimos la clase tag para darle estilo
        tagEl.classList.add('tag')
        // a tagEl le establecemos el texto interno con el valor de la etiqueta actual
        tagEl.innerText = tag
        // Añadimos el elemento span con clase tag al div "tags" (tagsEl)
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    // Establecemos un intervalo para simular la selección aleatoria de etiquetas
    const interval = setInterval(() => {
        // Seleccionamos una etiqueta aleatoria
        const randomTag = pickRandomTag()

        // Si se selecciona una etiqueta...
        if (randomTag !== undefined) {
            // Resaltamos la etiqueta temporalmente
            highlightTag(randomTag)

            // Después de un breve tiempo, eliminamos el resaltado
            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100);

    // Después de cierto número de iteraciones, detenemos el intervalo
    setTimeout(() => {
        clearInterval(interval)

        // Seleccionamos una última etiqueta aleatoria
        setTimeout(() => {
            const randomTag = pickRandomTag()

            // Resaltamos la etiqueta seleccionada
            highlightTag(randomTag)
        }, 100)
    }, times * 100)
}

// Función para escoger un tag aleatorio
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

// Función para añadir la clase highlight, que le añade un estilo diferenciador indicando que es el tag seleccionado
function highlightTag(tag) {
    tag.classList.add('highlight')
}

// Función para eliminar la clase highlight, que le quita el estilo diferenciador indicando que es el tag NO seleccionado
function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}