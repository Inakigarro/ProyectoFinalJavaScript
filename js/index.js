/**
 * Verifica que el nombre de usuario y la contraseña correspondan a
 * un usuario registrado.
 * @param { string } nombreUsuario 
 * @param { string } contraseña 
 * @returns {boolean} `True` si se encuentra el usuario correspondiente. `False` en caso contrario.
 */
async function verificarUsuario(nombreUsuario, contraseña){
    // Obtengo el usuario por nombreUsuario.
    let usuario = await obtenerUsuarioPorNombreUsuario(nombreUsuario);

    // Si el usuario no existe, devuelvo false.
    if (!usuario) {
        return false;
    }

    // Si el usuario existe, pero la contraseña no coincide, devuelvo false;
    if (usuario.contraseña !== contraseña) {
            return false;
    }

    localStorage.setItem(idCurrentUser, JSON.stringify(usuario));
    return true;
}

obtenerTodosUsuarios();

const nombreUsuarioInput = document.getElementById('nombreUsuario');
const contrasñaUsuarioInput = document.getElementById('contraseñaUsuario');
const btnAceptar = document.getElementById('btnAceptar');
const btnCancelar = document.getElementById('btnCancelar');

btnAceptar.onclick = async () => {
    let nombreUsuarioValue = nombreUsuarioInput.value
    let contraseñaUsuarioValue = contrasñaUsuarioInput.value
    let verificado = await verificarUsuario(nombreUsuarioValue, contraseñaUsuarioValue)

    if (verificado) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Redireccionando...',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        setTimeout(() => window.location.href = '/pages/main.html', 3000);
        
    } else {
        Swal.fire({
            title: 'Usuario incorrecto',
            text: 'El usuario o la contraseña ingresada no son corretos.',
            icon: 'error',
            confirmationButonText: 'Ok'
        });
        nombreUsuarioInput.value = '';
        contrasñaUsuarioInput.value = '';
    }
}

btnCancelar.onclick = () => {
    nombreUsuarioInput.value = '';
    contrasñaUsuarioInput.value = '';
}