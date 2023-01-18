async function actualizarBadge() {
    const notificaciones = document.getElementById('perfil-notificaciones');

    let arrayTurnos = await obtnerTurnosParaUsuarioActual();
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
    console.log(arrayTurnos.length);
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