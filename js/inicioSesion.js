const formulario = document.querySelector('#inicio');

formulario.addEventListener('submit', async (e)=> {

    e.preventDefault();

    const datosI = new FormData();
    datosI.append('usuario', formulario.usuario.value);
    datosI.append('contrasenia', formulario.contrasenia.value);

    const respuesta = await fetch ('../php/inicioSesion.php', {
        method: 'POST',
        body: datosI
    });

    const mensaje = await respuesta.text();
    console.log('Error:', mensaje);
    if (mensaje.trim() === "error"){
        alert('Usuario incorrecto');
    }else if(mensaje.trim() === "incorrecta"){
        alert('Contraseña Incorrecta');
    }else if (mensaje.trim() === "ok") {
        window.location.href = './paginas/dashboard.html';
    }
})