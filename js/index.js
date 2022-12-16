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

/**
 * Verifica que el nombre de usuario y la contraseña correspondan a
 * un usuario registrado.
 * @param { string } nombreUsuario 
 * @param { string } contraseña 
 * @returns `True` si se encuentra el usuario correspondiente. `False` en caso contrario.
 */
function verificarUsuario(nombreUsuario, contraseña){
    let usuarioActual = JSON.parse(localStorage.getItem('user1'));
    let verificationNombreUsuario = false;
    let verificationContraseñaUsuario = false;

    if (usuarioActual.nombreDeUsuario === nombreUsuario){
        console.log('Nombre de Usuario Correcto');
        verificationNombreUsuario = true;
    }

    if (usuarioActual.contraseña === contraseña){
        console.log('Contraseña Correcta');
        verificationContraseñaUsuario = true;
    }

    return verificationNombreUsuario && verificationContraseñaUsuario
}

const user1 = new Usuario('kaky', '123', 'Iñaki', 'Garro', '1')
localStorage.setItem('user1', JSON.stringify(user1));

const nombreUsuarioInput = document.getElementById('nombreUsuario');
const contrasñaUsuarioInput = document.getElementById('contraseñaUsuario');
const btnAceptar = document.getElementById('btnAceptar');

btnAceptar.onclick = () => {
    let nombreUsuarioValue = nombreUsuarioInput.value
    let contraseñaUsuarioValue = contrasñaUsuarioInput.value
    let verificado = verificarUsuario(nombreUsuarioValue, contraseñaUsuarioValue)

    if (verificado) {
        window.location.href = '/pages/main.html'
    }
}