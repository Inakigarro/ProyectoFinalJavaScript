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
    
    let usuarioActual;
    let index = 0;
    let verificationNombreUsuario = false;
    let verificationContraseñaUsuario = false;
    do {
        usuarioActual = JSON.parse(localStorage.getItem(localStorage.key(index)));
        if (usuarioActual.nombreDeUsuario === nombreUsuario){
            console.log('Nombre de Usuario Correcto');
            verificationNombreUsuario = true;
        }
    
        if (usuarioActual.contraseña === contraseña){
            console.log('Contraseña Correcta');
            verificationContraseñaUsuario = true;
        }
        index++;
    } while ((!verificationNombreUsuario || !verificationContraseñaUsuario) && index < localStorage.length);

    return verificationNombreUsuario && verificationContraseñaUsuario
}

for (let index = 0; index < 10; index++) {
    let user = new Usuario(`user${index}`, '123', `user${index}`,'sarasa', index);
    localStorage.setItem(`user${index}`, JSON.stringify(user));
}
const user1 = new Usuario('kaky', '123', 'Iñaki', 'Garro', '1')
localStorage.setItem('admin', JSON.stringify(user1));

const nombreUsuarioInput = document.getElementById('nombreUsuario');
const contrasñaUsuarioInput = document.getElementById('contraseñaUsuario');
const btnAceptar = document.getElementById('btnAceptar');
const btnCancelar = document.getElementById('btnCancelar');

btnAceptar.onclick = () => {
    let nombreUsuarioValue = nombreUsuarioInput.value
    let contraseñaUsuarioValue = contrasñaUsuarioInput.value
    let verificado = verificarUsuario(nombreUsuarioValue, contraseñaUsuarioValue)

    if (verificado) {
        window.location.href = '/pages/main.html'
    } else {
        nombreUsuarioInput.value = '';
        contrasñaUsuarioInput.value = '';
    }
}

btnCancelar.onclick = () => {
    nombreUsuarioInput.value = '';
    contrasñaUsuarioInput.value = '';
}