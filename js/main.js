// Definicion de variables globales.
let canchas = [];
let horarios = [];
let usuario;

let arrayTurnos = localStorage.getItem(idArrayTurnos);
if (!arrayTurnos){
    localStorage.setItem(idArrayTurnos, JSON.stringify([]));
}
const DateTime = luxon.DateTime;

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
async function renderizarDatosUsuario(){
    // Capturo el elemento contenedor.
    let contenedor = document.getElementById('usuarioContenedor');
    let usuario = await obtenerUsuarioActual();

    contenedor.innerHTML = `<h5 class="nombreUsuario mx-1">${usuario.getNombreCompleto()}</h5>`

}

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
 * Obtiene las canchas del localStorage y genera un array de `Canchas`
 * para ser utilizadas.
 */
async function obtenerCanchasIniciales() {
    let c = JSON.parse(localStorage.getItem(idArrayCanchas));

    if ( !c ) {
        await obtenerTodasCanchas();
        c = JSON.parse(localStorage.getItem(idArrayCanchas));
    }

    c.forEach(cancha => {
        let nuevaCancha = new Cancha(cancha.id, cancha.material);
        canchas.push(nuevaCancha);
    })
}

/**
 * Obtiene los horarios del localStorage y genera un arrah de `Horarios`
 * para ser utilizados.
 */
async function obtenerHorariosDelDiaActual() {
    let h = JSON.parse(localStorage.getItem(idArrayHorarios));
    if ( !h ) {
        await obtenerTodosHorarios();
        h = JSON.parse(localStorage.getItem(idArrayHorarios));
    }

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

function generarListaHorarios(idCancha){
    let listaHorarios = crearNodo('ul', 'listaHorTemp', null, null, ['list-group', 'list-group-flush']);

    horarios.forEach(horario => {
        // Busco la lista correspondiente al dia.
        let listaHoras = document.getElementById(`cancha${idCancha}${horario.dia}`)
        
        // Si existe, Agrego el horario a la lista.
        if (listaHoras){
            let nodoHora = crearNodoHijo('li',null, null, `${horario.horaInicio} - ${horario.horaFin}`, ['list-group-item', 'botonHora'], listaHoras);
            nodoHora.onclick = async () => {
                if (!nodoHora.classList.contains('deshabilitado')){
                    nodoHora.classList.add('deshabilitado');
                    let turno = await registrarTurno(idCancha, horario.id);
                    await notificarReserva(idCancha, horario.horaInicio, horario.horaFin);
                }
            }
        } else {
            // Si no existe, significa que el nodo del dia no fue creado aun.
            // Por lo tanto, creo el nodo dia, creo la lista de horarios del dia.
            // y agrego el primer horario.
            let nodoDia = crearNodo('li', null, `<h5 class="card-header">${horario.dia}</h5>`, null, null)
            let listaHoras = crearNodoHijo('ul', `cancha${idCancha}${horario.dia}`, null, null, ['list-group', 'list-group-flush'], nodoDia);
            let nodoHora = crearNodoHijo('li', null, null, `${horario.horaInicio} - ${horario.horaFin}`, ['list-group-item', 'botonHora'], listaHoras);
            nodoHora.onclick = async () => {
                if (!nodoHora.classList.contains('deshabilitado')){
                    nodoHora.classList.add('deshabilitado');
                    let turno = await registrarTurno(idCancha, horario.id);
                    await notificarReserva(idCancha, horario.horaInicio, horario.horaFin);
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
renderizarDatosUsuario();
renderizarCanchas();
actualizarBadge();
const btnSalirPagina = document.getElementById('btnSalirPagina');

btnSalirPagina.onclick = () => window.location.href = '../index.html'