const formulario = document.querySelector('#formularioRegistro');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = new FormData();
    usuario.append('usuario', formulario.nombreU.value);
    usuario.append('contrasenia', formulario.contrasenia.value);
    usuario.append('nombre', formulario.nombreC.value);
    usuario.append('email', formulario.email.value);
    usuario.append('rol', formulario.rol.value);
    usuario.append('numeroId', formulario.numeroId.value);


    try {
        const respuesta = await fetch('../php/registrarUsuario.php', {
            method: 'POST',
            body: usuario
        });
        const registro = await respuesta.text();
        if (registro === "ok") {
            alert('Registro Exitoso');
            formulario.reset();
        }
    } catch (error) {
        console.error('Error: ', error);
    }
});