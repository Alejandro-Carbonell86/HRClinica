const formulario = document.querySelector('#formularioConductor');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const conductor = new FormData();
    conductor.append('documento', formulario.documento.value);
    conductor.append('nombreC', formulario.nombreC.value);
    conductor.append('licencia', formulario.licencia.value);
    conductor.append('telefono', formulario.telefono.value);
    conductor.append('email', formulario.email.value);
    conductor.append('fechaContratacion', formulario.fechaContratacion.value);

    try {
        const respuesta = await fetch('../php/registrarConductor.php', {
            method: 'POST',
            body: conductor
        });
        const registro = (await respuesta.text()).trim();

        if (registro === "ok") {
            alert('Conductor registrado');
            formulario.reset();
        } else if (registro === "documento existe") {
            alert('Ese documento ya está registrado');
        } else {
            alert('Error al registrar');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
});