const formulario = document.querySelector('#formularioTipoTraslado');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipo = new FormData();
    tipo.append('nombre', formulario.nombre.value);
    tipo.append('descripcion', formulario.descripcion.value);
    tipo.append('equipo', formulario.equipo.value);

    try {
        const respuesta = await fetch('../php/registrarTipoTraslado.php', {
            method: 'POST',
            body: tipo
        });
        const registro = (await respuesta.text()).trim();

        if (registro === "ok") {
            alert('Tipo de traslado registrado');
            formulario.reset();
        } else if (registro === "nombre existe") {
            alert('Ese tipo ya está registrado');
        } else {
            alert('Error al registrar');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
});