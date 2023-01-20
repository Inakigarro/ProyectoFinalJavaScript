// Funciones base para crear nodos html.
/**
 * Crea un elemento html.
 * 
 * @param {string} tipo tipo de elemeno a crear.
 * @param {string?} id identificador del elemento.
 * @param {string?} html contenido html simple a renderizar dentro del nodo.
 * @param {string?} contenido contenido que tendra el elemento html.
 * @param {string[]?} clases array de clases a asignar al elemento html.
 * @returns {HTMLElement} Devuelve un elemento HTML del tipo ingresado.
 */
function crearNodo(tipo, id, html, contenido, clases) {
    let elemento = document.createElement(tipo);
    if ( id ) {
        elemento.id = id;
    }
    
    if ( html ){
        elemento.innerHTML = html;
    }

    if ( contenido ) {
        elemento.innerText = contenido;
    }

    if ( clases ) {
        clases.forEach(clase => elemento.classList.add(clase));
    }

    return elemento;
}

/**
 * Crea un elemento html y lo anida a un elemento padre.
 * 
 * @param {string} tipo tipo de elemeno a crear.
 * @param {string} id identificador del elemento.
 * @param {string?} html contenido html simple a renderizar dentro del nodo.
 * @param {string?} contenido contenido que tendra el elemento html.
 * @param {string[]?} clases array de clases a asignar al elemento html. 
 * @param {HTMLElement} nodoPadre 
 * 
 * @return {HTMLElement} Devuelve el elemento creado.
 */
function crearNodoHijo(tipo, id, html, contenido, clases, nodoPadre){
    let elemento = crearNodo(tipo, id, html, contenido, clases);
    nodoPadre.appendChild(elemento);

    return elemento;
}

/**
 * 
 * @param {string} tipo tipo del elemento carta a crear.
 * @param {string | null} id id del nodo carta
 * @param {string | null} html elemento html a insertar en el nodo.
 * @param {string | null} contenidoTitulo contenido del titulo de la carta.
 * @param {string | null} contenidoCuerpo contenido del cuerpo de la carta.
 */
function crearNodoCarta(tipo, id, html, contenidoTitulo, contenidoCuerpo) {
    let carta = crearNodo(
        tipo,
        id,
        `<div class="card-body"><div>`, null, ['card']);
    let tituloCarta = crearNodoHijo('div', null, null, contenidoTitulo, ['card-title'], carta)
}