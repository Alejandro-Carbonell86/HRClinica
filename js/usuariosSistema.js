const formulario = document.querySelector('#formularioRegistro');

formulario.addEventListener('sumbit', async (e) => {
    e.preventDefault();

    const usuario = {
        usuario: formulario.nombreU.value,
        contrasenia: formulario.contrasenia.value,
        nombre: formulario.nombreC.value,
        email: formulario.email.value,
        rol: formulario.rol.value,
        numeroId: formulario.numeroId.value
    };

    try{

        const respuesta = await fetch ('/php/registrarUsuario.php', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(usuario)
        });
        const registro = await respuesta.json();
        console.log('Registro exitoso: ', registro);
    } catch (error){
        console.error('Error: ', error);
    }
});