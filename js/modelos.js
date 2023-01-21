/**
 * Clase utilizada para representar a un usuario de la aplicacion.
 */
class Usuario {
	constructor(nombreDeUsuario, contraseña, nombre, apellido, dni) {
		this.nombreDeUsuario = nombreDeUsuario;
		this.contraseña = contraseña;
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
	}

	getNombreCompleto() {
		return `${this.nombre} ${this.apellido}`;
	}
}

/**
 * Clase utilizada para representar una cancha de tenis.
 */
class Cancha {
	constructor(id, material) {
		this.id = id;
		this.material = material;
	}

	getNombreCancha() {
		return `Cancha ${this.id}`;
	}
}

/**
 * Clase utilizada para representar un horario de una cancha de tenis.
 */
class Horario {
	/**
	 *
	 * @param {number} id
	 * @param {string} dia
	 * @param {string} horaInicio
	 * @param {string} horaFin
	 * @param {boolean} disponible
	 */
	constructor(id, dia, horaInicio, horaFin, disponible) {
		this.id = id;
		this.dia = dia;
		this.horaInicio = horaInicio;
		this.horaFin = horaFin;
		this.disponible = disponible;
	}

	cambiarDisponibilidad() {
		this.disponible = !this.disponible;
	}
}

/**
 * Clase utilizada para representar un turno en una cancha y en un horario especifico.
 */
class Turno {
	/**
	 *
	 * @param {number} id
	 * @param {Cancha} cancha
	 * @param {Horario} horario
	 * @param {Usuario} usuario
	 */
	constructor(id, cancha, horario, usuario) {
		this.id = id;
		this.cancha = cancha;
		this.horario = horario;
		this.usuario = usuario;
	}

	getTurno() {
		return `
            Turno: ${this.id}
            Dia: ${this.horario.dia}
            Horario: Desde ${this.horario.horaInicio} hasta ${this.horario.horaFin}
            Cancha: ${this.cancha.id}`;
	}
}
