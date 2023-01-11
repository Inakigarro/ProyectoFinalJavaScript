// Definicion de variables globales.
let canchas = [];
let horarios = [];
let usuario;
let idTurno = 1;
const idArrayCanchas = 'ARRAY_CANCHAS';
const idArrayHorarios = 'ARRAY_HORARIOS';
const idArrayTurnos = 'ARRAY_TURNOS';
let arrayTurnos = localStorage.getItem(idArrayTurnos);
if (!arrayTurnos){
    localStorage.setItem(idArrayTurnos, JSON.stringify([]));
}
const DateTime = luxon.DateTime;

// Definicion de clases a utilizar.

/**
 * Clase utilizada para representar una cancha de tenis.
 */
class Cancha {
    constructor(id, material){
        this.id = id;
        this.material = material;
    }

    getNombreCancha(){
        return `Cancha ${this.id}`;
    }
}

/**
 * Clase utilizada para representar un horario de una cancha de tenis.
 */
class Horario {
    constructor(id, dia, horaInicio, horaFin){
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.disponible = true;
    }

    cambiarDisponibilidad(){
        this.disponible = !this.disponible;
    }
}

/**
 * Clase utilizada para representar un turno en una cancha y en un horario especifico.
 */
class Turno {
    constructor(id, cancha, horario, usuario){
        this.id = id;
        this.cancha = cancha;
        this.horario = horario;
        this.usuario = usuario;
    }

    getTurno(){
        return `
            Turno: ${this.id}
            Dia: ${this.horario.dia}
            Horario: Desde ${this.horario.horaInicio} hasta ${this.horario.horaFin}
            Cancha: ${this.cancha.id}`
    }
}

/**
 * Clase utilizada para representar a un usuario de la aplicacion.
 */
class Usuario {
    constructor(nombreDeUsuario, contraseña, nombre, apellido, dni){
        this.nombreDeUsuario = nombreDeUsuario;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }

    getNombreCompleto(){
        return `${this.nombre} ${this.apellido}`
    }
}

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
    
    if (html){
        elemento.innerHTML = html;
    }

    if ( contenido ) {
        elemento.innerText = contenido;
    }

    if (clases) {
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

// Funciones relacionadas con el usuario.
/**
 * Solicita al usuario el ingreso de datos basicos para la utilizacion
 * de la pagina. 
 * 
 * @returns Un objeto de clase Usuario con los datos ingresados.
 */
function capturarDatosUsuarios(){
    alert(`
    Para continuar deberia ingresar los siguientes datos:
        - nombre
        - apellido
        - dni`);
    let nombreUsuario = prompt('Ingrese su nombre: ');
    let apellidoUsuario = prompt('ingrese su apellido: ');
    let dniUsuario = prompt('Ingrese su dni: ');

    return new Usuario(nombreUsuario, apellidoUsuario, dniUsuario)
}

/**
 * Renderiza los datos basicos del usuario en la pagina.
 * 
 * @param {Usuario} usuario 
 */
function renderizarDatosUsuario(){
    // Capturo el elemento contenedor.
    let contenedor = document.getElementById('usuarioContenedor');
    let usuarioParseado = JSON.parse(localStorage.getItem('currentUser'), );
    let usuario = new Usuario(
        usuarioParseado.nombreDeUsuario,
        usuarioParseado.contraseña,
        usuarioParseado.nombre,
        usuarioParseado.apellido,
        usuarioParseado.dni);

    contenedor.innerHTML = `<h5 class="nombreUsuario">${usuario.getNombreCompleto()}</h5>`

}

/**
 * Obtiene el usuario actualmente loggeado.
 * @returns {Usuario}
 */
function obtenerUsuarioActual(){
    let u = JSON.parse(localStorage.getItem('currentUser'));
    let usuario = new Usuario(
        u.nombreDeUsuario,
        u.contraseña,
        u.nombre,
        u.apellido,
        u.dni
    );
    return usuario;
}

// Funciones para cargar data inicial.

/**
 * 
 * @param {number} diaId numero del dia, siendo los siguientes:
 * 1: Lunes, 2: Martes, 3: Miercoles, 4: Jueves, 5: Viernes, 6: Sabado, 7: Domingo
 * @returns Devuelve el dia correspondiente al numero ingresado.
 */
function calcularDia(diaId){
    switch (diaId) {
        case 1:
            return 'Lunes';
            break;
        case 2:
            return 'Martes';
            break;
        case 3:
            return 'Miercoles';
            break;
        case 4:
            return 'Jueves';
            break;
        case 5:
            return 'Viernes';
            break;
        case 6:
            return 'Sabado';
            break;
        case 7:
            return 'Domingo';
            break;
        default:
            break;
    }
}

/**
 * 
 * @param {number} horarioId numero del rango horario requerido.
 * @returns Un objeto con las propiedades `horaInicio` y `horaFin` 
 * con el rango horario requerido.
 */
function clacularHorario(horarioId){
    switch (horarioId) {
        case 1:
            return {
                horaInicio: 9,
                horaFin: 10
            };
            break;
        case 2:
            return {
                horaInicio: 10,
                horaFin: 11
            };
            break;
        case 3:
            return {
                horaInicio: 15,
                horaFin: 16
            };
            break;
        case 4:
            return {
                horaInicio: 16,
                horaFin: 17
            };
            break;
        case 5:
            return {
                horaInicio: 20,
                horaFin: 21
            };
            break;
        case 6:
            return {
                horaInicio: 21,
                horaFin: 22
            };
            break;
        default:
            break;
    }
}

/**
 * Genera data inicial de las canchas y las guarda en el localStorage.
 */
function cargarCanchasIniciales() {
    let c = [];
    for (let i = 0; i < 5; i++) {
        let cancha = new Cancha(i, 'Polvo de Ladrillo');
        c.push(cancha);
    }

    localStorage.setItem(idArrayCanchas ,JSON.stringify(c))
}

/**
 * Obtiene las canchas del localStorage y genera un array de `Canchas`
 * para ser utilizadas.
 */
function obtenerCanchasIniciales() {
    let c = JSON.parse(localStorage.getItem(idArrayCanchas));

    c.forEach(cancha => {
        let nuevaCancha = new Cancha(cancha.id, cancha.material);
        canchas.push(nuevaCancha);
    })
}

/**
 * Obtiene la cancha con el id indicado.
 * 
 * @param {number} idCancha 
 * 
 * @returns {Cancha} Devuelve una `Cancha` con el id seleccionado.
 */
function obtenerCanchaPorId(idCancha){
    let canchas = JSON.parse(localStorage.getItem(idArrayCanchas));
    let cancha;
    canchas.forEach(c => {
        if (c.id === idCancha){
            cancha = new Cancha(
                c.id,
                c.material
            );
        }
    })

    return cancha;
}

/**
 * Genera un array de horarios standard y los guarda en el localStorage.
 */
function cargarHorariosIniciales() {
    let idHorario = 1;
    let h = [];
    // Primer for para referencia al dia.
    for( let i = 1; i < 8; i++){
        // Segundo for para referenciar la hora.
        for (let j = 1; j < 7; j++){
            horas = clacularHorario(j);
            h.push(new Horario(
                    idHorario,
                    calcularDia(i),
                    horas.horaInicio,
                    horas.horaFin
                    )
                );
            idHorario++;
        }
    }

    localStorage.setItem(idArrayHorarios, JSON.stringify(h));
}

/**
 * Obtiene los horarios del localStorage y genera un arrah de `Horarios`
 * para ser utilizados.
 */
function obtenerHorariosDelDiaActual() {
    let h = JSON.parse(localStorage.getItem(idArrayHorarios));
    const diaActual = calcularDia(DateTime.now().weekday);
    h.forEach(horario => {
        if (horario.dia == diaActual){
            let nuevoHorario = new Horario(
                horario.id,
                horario.dia,
                horario.horaInicio,
                horario.horaFin);
            horarios.push(nuevoHorario);
        }
    });
}

/**
 * Obtiene un horario con el id seleccionado.
 * 
 * @param {number} idHorario 
 * 
 * @returns {Horario}
 */
function obtenerHorarioPorId(idHorario){
    let horarios = JSON.parse(localStorage.getItem(idArrayHorarios));
    let horario;
    horarios.forEach(h => {
        if (h.id === idHorario){
            horario = new Horario(
                h.id,
                h.dia,
                h.horaInicio,
                h.horaFin);
            }
        }
    );
    return horario;
}

/**
 * Genera y guarda un turno para el usuario actual y 
 * la cancha seleccionada en el rango horario solicitado.
 * 
 * @param {number} idCancha id de la cancha a reservar.
 * @param {number} idHorario id del rango horario a reservar.
 * 
 * @returns {Turno} El turno generado para el usuario actual.
 */
function registrarTurno(idCancha, idHorario) {
    // Busco la cancha a reservar.
    let cancha = obtenerCanchaPorId(idCancha);
    // Busco el horario a reservar.
    let horario = obtenerHorarioPorId(idHorario);
    // Busco el usuario loggeado actualmente.
    let usuarioActual = obtenerUsuarioActual();
    // Genero el turno.
    let turno = new Turno(idTurno, cancha, horario, usuarioActual);
    console.log(turno);
    // Lo guardo en el localstorage.
    let turnos = JSON.parse(localStorage.getItem(idArrayTurnos));
    turnos.push(turno);
    console.info(turnos)
    localStorage.setItem(idArrayTurnos, JSON.stringify(turnos));
    //Incremento el id de turnos.
    idTurno++;
}

function generarListaHorarios(idCancha){
    let listaHorarios = crearNodo('ul', 'listaHorTemp', null, null, ['list-group', 'list-group-flush']);

    horarios.forEach(horario => {
        // Busco la lista correspondiente al dia.
        let listaHoras = document.getElementById(`cancha${idCancha}${horario.dia}`)
        
        // Si existe, Agrego el horario a la lista.
        if (listaHoras){
            let nodoHora = crearNodoHijo('li',null, null, `${horario.horaInicio} - ${horario.horaFin}`, ['list-group-item', 'botonHora'], listaHoras);
            nodoHora.onclick = () => {
                if (!nodoHora.classList.contains('deshabilitado')){
                    nodoHora.classList.add('deshabilitado');
                    let turno = registrarTurno(idCancha, horario.id);
                }
            }
        } else {
            // Si no existe, significa que el nodo del dia no fue creado aun.
            // Por lo tanto, creo el nodo dia, creo la lista de horarios del dia.
            // y agrego el primer horario.
            let nodoDia = crearNodo('li', null, `<h5 class="card-header">${horario.dia}</h5>`, null, null)
            let listaHoras = crearNodoHijo('ul', `cancha${idCancha}${horario.dia}`, null, null, ['list-group', 'list-group-flush'], nodoDia);
            let nodoHora = crearNodoHijo('li', null, null, `${horario.horaInicio} - ${horario.horaFin}`, ['list-group-item', 'botonHora'], listaHoras);
            nodoHora.onclick = () => {
                if (!nodoHora.classList.contains('deshabilitado')){
                    nodoHora.classList.add('deshabilitado');
                    let turno = registrarTurno(idCancha, horario.id);
                }
            }
            listaHorarios.appendChild(nodoDia);
        }
        document.body.appendChild(listaHorarios);
    })

    // Despues de armar la lista a renderizar, la borro del DOM
    // Y elimino el id temporal.
    document.body.removeChild(listaHorarios);
    listaHorarios.id = '';
    return listaHorarios;
}

function renderizarCanchas(){
    // Obtengo la lista de canchas.
    obtenerCanchasIniciales();
    obtenerHorariosDelDiaActual();
    let listaCanchas = document.getElementById('listaCanchas');
    const diaActual = DateTime.now().weekday;
    console.log(diaActual);

    // Armo la lista de canchas.
    canchas.forEach(cancha => {
        let listaHorariosCancha = generarListaHorarios(cancha.id);
        const html = `
        <div id="body-cancha${cancha.id}" class="card-body">
            <h4 class="card-title">${cancha.getNombreCancha()}</h4>
        </div>
    `;
        let nodo = crearNodo('li', `cancha${cancha.id}`, html, null, ['card']);
        nodo.appendChild(listaHorariosCancha);
        listaCanchas.appendChild(nodo);
    });
}

// Renderizo los datos del usuario capturados.
renderizarDatosUsuario(usuario);

cargarCanchasIniciales();
cargarHorariosIniciales();
// cargarTurnosIniciales();
renderizarCanchas();
const btnSalirPagina = document.getElementById('btnSalirPagina');

btnSalirPagina.onclick = () => window.location.href = '../index.html'