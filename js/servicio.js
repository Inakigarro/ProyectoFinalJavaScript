const idArrayUsuarios = "ARRAY_USUARIOS";
const idArrayCanchas = "ARRAY_CANCHAS";
const idArrayHorarios = "ARRAY_HORARIOS";
const idArrayTurnos = "ARRAY_TURNOS";
const idCurrentUser = "CURRENT_USER";
let idTurno = 1;

// Funciones relacionadas con los usuarios.

/**
 * Obtiene los usuarios de la 'base de datos' y los carga en el localStorage.
 */
async function obtenerTodosUsuarios() {
	let array = [];
	let resp = await fetch("../data/usuarios.json");
	let data = await resp.json();
	data.forEach((u) => {
		let usuario = new Usuario(
			u.nombreDeUsuario,
			u.contraseña,
			u.nombre,
			u.apellido,
			u.dni
		);

		array.push(usuario);
	});

	localStorage.setItem(idArrayUsuarios, JSON.stringify(array));
}

/**
 * Obtiene un usuario por su nombre de usuario.
 *
 * @param {string} nombreUsuario
 *
 * @returns {Usuario | undefined} El usuario correspondiente con el nombre de usuario ingresado.
 * En caso de no existir, devuelve `undefined`.
 */
async function obtenerUsuarioPorNombreUsuario(nombreUsuario) {
	// Verifico que los usuarios esten cargados.
	let usuarios = JSON.parse(localStorage.getItem(idArrayUsuarios));

	// Si no estan cargados, los vuelvo a pedir.
	if (!usuarios) {
		await obtenerTodosUsuarios();
		usuarios = JSON.parse(localStorage.getItem(idArrayUsuarios));
	}
	let usuario;
	usuarios.forEach((u) => {
		if (u.nombreDeUsuario === nombreUsuario) {
			usuario = u;
		}
	});

	return usuario;
}

/**
 * Obtiene el usuario actual de la sesion.
 *
 * @returns {Usuario}
 */
async function obtenerUsuarioActual() {
	let u = JSON.parse(localStorage.getItem(idCurrentUser));

	if (!u) {
		Swal.fire({
			title: "Error inesperado.",
			text: "Ha ocurrido un error al obtener el usuario actual.",
			icon: "error",
			confirmationButonText: "Ok",
		});
		return;
	}

	let usuario = new Usuario(
		u.nombreDeUsuario,
		u.contraseña,
		u.nombre,
		u.apellido,
		u.dni
	);

	return usuario;
}

// Funciones relacioandas con las canchas.

/**
 * Obtiene todas las canchas de la 'base de datos' y las carga en el localStorage.
 */
async function obtenerTodasCanchas() {
	let array = [];
	let resp = await fetch("../data/canchas.json");
	let data = await resp.json();

	data.forEach((c) => {
		let cancha = new Cancha(c.id, c.material);

		array.push(cancha);
	});

	localStorage.setItem(idArrayCanchas, JSON.stringify(array));
}

/**
 * Obtiene una cancha por su id.
 * @param {number} canchaId Id de la cancha.
 * @returns {Cancha | undefined} La cancha correspondiente con el id ingresado.
 */
async function obtenerCanchaPorId(canchaId) {
	// Verifico que las canchas esten cargados.
	let canchas = JSON.parse(localStorage.getItem(idArrayCanchas));

	if (!canchas) {
		await obtenerTodasCanchas();
		canchas = JSON.parse(localStorage.getItem(idArrayCanchas));
	}

	let cancha;
	canchas.forEach((c) => {
		if (c.id === canchaId) {
			cancha = c;
		}
	});

	return cancha;
}

// Funciones relacioandas con los horarios.

/**
 * Obtiene los horarios de la 'base de datos' y los carga en el localStorage.
 */
async function recuperarHorariosDesdeDb() {
	let array = [];
	let resp = await fetch("../data/horarios.json");
	let data = await resp.json();

	data.forEach((h) => {
		let horario = new Horario(
			h.id,
			h.dia,
			h.horaInicio,
			h.horaFin,
			h.disponible
		);

		array.push(horario);
	});

	localStorage.setItem(idArrayHorarios, JSON.stringify(array));
}

/**
 * Obtiene los horarios cargados en el localStorage.
 * @returns {Horario[]}
 */
function recuperarHorariosDesdeLocalStorage() {
	let data = JSON.parse(localStorage.getItem(idArrayHorarios));
	let array = [];

	// Si los horarios no han sido cargados localmente, devolver lista vacia.
	if (!data) {
		return array;
	}

	data.forEach((h) => {
		array.push(new Horario(h.id, h.dia, h.horaInicio, h.horaFin, h.disponible));
	});

	return array;
}

/**
 * Obtiene un horario por id.
 *
 * @param {number} horarioId
 *
 * @returns {Horario | undefined} El horario correspondiente con el id ingresado.
 */
async function obtenerHorarioPorId(horarioId) {
	let horarios = JSON.parse(localStorage.getItem(idArrayHorarios));

	if (!horarios) {
		recuperarHorarios();
		horarios = JSON.parse(localStorage.getItem(idArrayHorarios));
	}

	let horario;
	horarios.forEach((h) => {
		if (h.id === horarioId) {
			horario = new Horario(h.id, h.dia, h.horaInicio, h.horaFin, h.disponible);
		}
	});

	return horario;
}

/**
 * Actualiza la lista de horarios en el localStorage.
 * @param {Horario} horario
 */
async function actualizarHorario(horario) {
	// Obtengo la lita de horarios.
	let horarios = await recuperarHorariosDesdeLocalStorage();
	// Recorro la lista de horarios y actualizo el horario deseado.
	horarios.forEach((h) => {
		if (h.id === horario.id) {
			(h.dia = horario.dia),
				(h.horaInicio = horario.horaInicio),
				(h.horaFin = horario.horaFin),
				(h.disponible = horario.disponible);
			h.idCancha = horario.idCancha;
		}
	});

	// Actualizo la lista de horarios en el LocalStorage.
	localStorage.setItem(idArrayHorarios, JSON.stringify(horarios));
}

// Funciones relacionadas con los Turnos.

/**
 * Genera y guarda un turno para el usuario actual y
 * la cancha seleccionada en el rango horario solicitado.
 *
 * @param {number} idCancha id de la cancha a reservar.
 * @param {number} idHorario id del rango horario a reservar.
 *
 * @returns {Turno} El turno generado para el usuario actual.
 */
async function registrarTurno(idCancha, idHorario) {
	// Busco la cancha a reservar.
	let cancha = await obtenerCanchaPorId(idCancha);
	// Busco el horario a reservar.
	let horario = await obtenerHorarioPorId(idHorario);
	// Lo marco como no disponible.
	horario.cambiarDisponibilidad();
	horario.idCancha = idCancha;
	// Actualizo la lista de horarios.
	actualizarHorario(horario);
	// Busco el usuario loggeado actualmente.
	let usuarioActual = await obtenerUsuarioActual();
	// Genero el turno.
	let turno = new Turno(idTurno, cancha, horario, usuarioActual);
	console.log(turno);
	// Lo guardo en el localstorage.
	let turnos = JSON.parse(localStorage.getItem(idArrayTurnos));
	turnos.push(turno);
	console.info(turnos);
	localStorage.setItem(idArrayTurnos, JSON.stringify(turnos));
	//Incremento el id de turnos.
	idTurno++;
}

/**
 * Obtiene una lista de turnos activos para el usuario actual.
 *
 * @return {Turno[]} La lista de turnos reservados por el usuario actual.
 */
async function obtnerTurnosParaUsuarioActual() {
	let usuarioActual = await obtenerUsuarioActual();

	let arrayTurnos = JSON.parse(localStorage.getItem(idArrayTurnos));
	let turnos = [];
	arrayTurnos.forEach((t) => {
		if (t.usuario.dni === usuarioActual.dni) {
			let turno = new Turno(t.id, t.cancha, t.horario, t.usuairo);
			turnos.push(turno);
		}
	});

	return turnos;
}

/**
 *
 * @returns {Turno[]}
 */
function obtenerTodosTurnos() {
	let data = JSON.parse(localStorage.getItem(idArrayTurnos));
	let array = [];

	if (!data) {
		return array;
	}

	data.forEach((t) => {
		let cancha = new Cancha(t.cancha.id, t.cancha.material);
		let horario = new Horario(
			t.horario.id,
			t.horario.dia,
			t.horario.horaInicio,
			t.horario.horaFin,
			t.horario.disponible
		);
		let usuario = new Usuario(
			t.usuario.nombreDeUsuario,
			t.usuario.contraseña,
			t.usuario.nombre,
			t.usuario.apellido,
			t.usuario.dni
		);
		array.push(new Turno(t.id, cancha, horario, usuario));
	});

	return array;
}
