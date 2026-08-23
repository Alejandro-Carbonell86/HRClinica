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
    if (mensaje.trim() === "error"){
        alert('Usuario o contraseña incorrecta');
    }else{
        window.location.href = '../paginas/dashboard.html';
    }
})