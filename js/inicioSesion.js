const formulario = document.querySelector('#inicio');

formulario.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datosI = new FormData();
    datosI.append('usuario', formulario.usuario.value);
    datosI.append('contrasenia', formulario.contrasenia.value);

    const respuesta = await fetch('/HR_Clinica/php/inicioSesion.php', {
        method: 'POST',
        body: datosI
    });

    const objetoJSON = await respuesta.json();

    if (objetoJSON.error) {
        alert(objetoJSON.error);
    } else if (objetoJSON.exito) {
        window.location.href = './paginas/dashboard.html';
    }
})