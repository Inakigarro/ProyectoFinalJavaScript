// Declaracion de variables globales.
let nombre;
let apellido;
let dni;

let valorVerificacionDatosUsuario;

let canchasDisponiblesArray = [1, 3, 5, 6, 7, 9, 10];
let canchas = '';
let canchaSeleccionada;

let turnosDisponiblesArray = [9, 10, 16, 20, 22];
let turnos = '';
let turnoSeleccionado;

let montoFinal

const valorPorTurnoDiario = 2500;
const valorPorTurnoNocturno = 3000;

// Funciones de ingreso de datos.
/**
 * Solicita al usuario el ingreso de los siguientes datos:
 * - nombre: `string`
 * - apellido: `string`
 * - dni: `stirng`
 */
function InputDatosUsuario(){
    nombre = prompt("Ingrese su nombre:");
    console.log(`nombre: ${nombre}`)

    apellido = prompt("Ingrese su apelido:");
    console.log(`apellido: ${apellido}`)
    
    dni = prompt("Ingrese su DNI:");
    console.log(`dni: ${dni}`)
}

/**
 * Solicita al usuario la verificacion de los datos ingresados
 * En el caso de ser correctos, devuelve `true`. Caso contrario, `false`.
 * 
 * @return {boolean}
 */
function verificacionDatosUsuario(){
    let inputVerificacion;

    inputVerificacion = prompt(`
        Compruebe los datos ingresados:
            - nombre: ${nombre}
            - apellido: ${apellido}
            - dni: ${dni}
        Si los datos ingresados son correctos, ingrese 'Si'`).toLowerCase();
    console.log(`Los datos son correctos? ${inputVerificacion === 'si'}`);

    if (inputVerificacion !== 'si'){
        return false;
    }

    return true;
}

/**
 * Recorre la lista de canchas disponibles y arma una cadena
 * para mostrar por pantalla.
 * 
 * @returns una cadena que contiene todas las canchas disponibles.
 */
function canchasDisponibles(){
    let disponibles = '';

    canchasDisponiblesArray.forEach(cancha => {
        disponibles = disponibles + `- cancha ${cancha} \n`
    });
    console.log(`Las canchas disponibles son:
${disponibles}`);

    return disponibles;
}

/**
 * Recorre la lista de turnos disponibles y arma una cadena
 * para mostrar por pantalla.
 * 
 * @returns una cadena que contiene todas los turnos disponibles.
 */
function turnosDisponibles(){
    let disponibles = '';

    turnosDisponiblesArray.forEach(turno => {
        disponibles = disponibles + `- turno ${turno} \n`
    });
    console.log(`Los turnos disponibles son:
${disponibles}`);

    return disponibles;
}

/**
 * Solicita la seleccion de una cancha disponible para jugar.
 * 
 * @param {string} canchasDisponibles Lista de canchas disponibles para jugar. 
 */
function seleccionDeCancha(canchasDisponibles){
    canchaSeleccionada = prompt(`Seleccione una de las siguientes canchas disponibles para jugar:
${canchasDisponibles}`);
}

/**
 * Solicita la seleccion de un turno disponible para jugar.
 * 
 * @param {string} turnosDisponibles 
 */
function seleccionDeturno(turnosDisponibles){
    turnoSeleccionado = parseInt(prompt(`Seleccione una de las siguientes canchas disponibles para jugar:
${turnosDisponibles}`));
}

// Ejecucion del codigo.

// Solicito el ingreso de datos basicos del usuario.
do {
    InputDatosUsuario();
    valorVerificacionDatosUsuario = verificacionDatosUsuario();
} while (!valorVerificacionDatosUsuario);

alert(`Bienvenido ${nombre}!`);

// Solicito la seleccion de una cancha disponible para jugar.
canchas = canchasDisponibles();
seleccionDeCancha(canchas);

// Solicito la seleccion de un turno disponible para jugar.

/* Nota: Para evitar complejidad innecesaria, se asumira que
   todas las canchas tienen los mismos horarios disponibles.
*/
turnos = turnosDisponibles();
seleccionDeturno(turnos);

if(turnoSeleccionado <= 19){
    montoFinal = valorPorTurnoDiario;
} else {
    montoFinal = valorPorTurnoNocturno;
}

alert(`El monto a pagar para el turno ${turnoSeleccionado} en la cancha ${canchaSeleccionada} es:
- ${montoFinal}`)