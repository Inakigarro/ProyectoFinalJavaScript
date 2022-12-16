// Definicion de variables globales.
let canchas = [];
let horarios = [];
let usuario;

let nodosCanchas = [];
// Definicion de clases a utilizar.

/**
 * Clase utilizada para representar una cancha de tenis.
 */
class Cancha {
    constructor(id, horariosDisponibles){
        this.id = id;
        this.horariosDisponibles = horariosDisponibles;
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
    constructor(id, cancha, horario){
        this.id = id;
        this.cancha = cancha;
        this.horario = horario;
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
function renderizarDatosUsuario(usuario){
    // Capturo el elemento contenedor.
    let contenedor = document.getElementById('usuarioContenedor');
    contenedor.innerHTML = `
        <h2>BIENVENIDO</h2>
        <h3>${usuario.getNombreCompleto()}</h3>`

}

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
 * Genera una lista de horarios, de Lunes a Domingo, de 8 a 22
 * 
 * @returns {Horario[]} Una lista con los horarios base disponibles.
 */
function cargarHorarios() {
    let idHorario = 1;
    let horarios = [];
    // Primer for para referencia al dia.
    for( let i = 1; i < 8; i++){
        // Segundo for para referenciar la hora.
        for (let j = 1; j < 7; j++){
            horas = clacularHorario(j);
            horarios.push(new Horario(
                    idHorario,
                    calcularDia(i),
                    horas.horaInicio,
                    horas.horaFin
                    )
                );
            idHorario++;
        }
    }

    return horarios;
}

// Funciones relacionadas con las canchas.
function cargarCanchas(horariosDisponibles){
    let idCancha = 1;
    let c = [];

    // Genero las canchas a renderizar.
    for(let i = 1; i <= 10; i++){
        c.push(new Cancha(
            idCancha,
            horariosDisponibles
        ));

        idCancha++;
    }

    return c;
}

function renderizarListaInterna(idCancha, horarios){
    let listaHorarios = document.createElement('ul');
    listaHorarios.id = 'listHorTemp';

    horarios.forEach(horario => {
        // Busco la lista correspondiente al dia.
        let listaHoras = document.getElementById(`cancha${idCancha}${horario.dia}`)
        
        // Si existe, Agrego el horario a la lista.
        if (listaHoras){
            let nodoHora = document.createElement('li');
            nodoHora.innerText = `${horario.horaInicio} - ${horario.horaFin}`
            listaHoras.appendChild(nodoHora);
        } else {
            // Si no existe, significa que el nodo del dia no fue creado aun.
            // Por lo tanto, creo el nodo dia, creo la lista de horarios del dia.
            // y agrego el primer horario.
            let nodoDia = document.createElement('li');
            nodoDia.innerHTML = `<h5>${horario.dia}</h5>`;
            listaHoras = document.createElement('ul');
            listaHoras.id = `cancha${idCancha}${horario.dia}`;
            let nodoHora = document.createElement('li');
            nodoHora.innerText = `${horario.horaInicio} - ${horario.horaFin}`
            listaHoras.appendChild(nodoHora);
            nodoDia.appendChild(listaHoras);
            listaHorarios.appendChild(nodoDia);
            document.body.appendChild(listaHorarios);
        }
    })

    // Despues de armar la lista a renderizar, la borro del DOM
    // Y elimino el id temporal.
    document.body.removeChild(listaHorarios);
    listaHorarios.id = '';
    console.log(listaHorarios);
    return listaHorarios;
}

function renderizarCanchas(canchas){
    // Obtengo la lista de canchas.
    let listaCanchas = document.getElementById('listaCanchas');

    // Armo la lista de canchas.
    canchas.forEach(cancha => {
        let nodo = document.createElement('li');
        nodo.id = `cancha${cancha.id}`
        nodo.innerHTML = `
        <h4>${cancha.getNombreCancha()}</h4>
        `;
        let listaHorariosCancha = renderizarListaInterna(cancha.id, cancha.horariosDisponibles);
        nodo.appendChild(listaHorariosCancha);
        listaCanchas.appendChild(nodo);
        nodosCanchas.push(nodo);
    });
}

// // Capturo los datos del usuario.
// usuario = capturarDatosUsuarios();

// // Renderizo los datos del usuario capturados.
// renderizarDatosUsuario(usuario);

// // Genero los horarios.
// horarios = cargarHorarios();

// // Cargo las canchas.
// canchas = cargarCanchas(horarios);
// renderizarCanchas(canchas);
const btnSalirPagina = document.getElementById('btnSalirPagina');

btnSalirPagina.onclick = () => window.location.href = 'http://127.0.0.1:5500/index.html'
