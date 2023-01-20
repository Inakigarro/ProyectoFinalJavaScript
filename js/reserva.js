async function listaReservas() {
    let turnos = await obtnerTurnosParaUsuarioActual();
    let listaReservas = document.getElementById('listaReservas');
    turnos.forEach(t => {
        let nodoCarta = crearNodo('li', null, null, null, ['card']);
        let cartaBody = crearNodoHijo('div', null, null, null, ['card-body'], nodoCarta);
        let cartaTitle = crearNodoHijo('h6', null, null, `Turno ${t.id}`, ['card-title'], cartaBody);
        let cartaConenido = crearNodoHijo(
            'p',
            null,
            null,
            `Turno reservado para la cancha ${t.cancha.id}
            entre las ${t.horario.horaInicio} hs y las ${t.horario.horaFin} hs.`,
            ['card-text', 'contenidoCarta'],
            cartaBody);
        
        listaReservas.appendChild(nodoCarta)
    });
}

async function actualizarBadge() {
    const notificaciones = document.getElementById('perfil-notificaciones');

    let arrayTurnos = await obtnerTurnosParaUsuarioActual();
    if (arrayTurnos.length) {
        const badgeElement = crearNodoHijo(
            'span',
            null,
            `<span class="visually-hidden">unread messages</span>`,
            `${arrayTurnos.length}`,
            [
                'position-absolute',
                'top-0',
                'start-100',
                'translate-middle',
                'badge',
                'rounded-pill',
                'bg-danger',
                'w-auto',
                'p-0',
                'badge-size'
            ],
            notificaciones);
    }
    await listaReservas();
}

/**
 * Dispara una notificacion informando la generacion de la reserva
 * correctamente.
 * @param {number} idCancha 
 * @param {string} horaInicio
 * @param {string} horaFin 
 * @param {number} idUsuario 
 */
async function notificarReserva(idCancha, horaInicio, horaFin) {
    let usuario = obtenerUsuarioActual();

    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Reserva realizada con exito.',
        text: `Turno reservado para la cancha ${idCancha}
        entre las ${horaInicio} hs y las ${horaFin} hs.`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    });

    await actualizarBadge();
}