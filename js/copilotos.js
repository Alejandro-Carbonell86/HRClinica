const formulario = document.querySelector('#formularioCopiloto');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const copiloto = new FormData();
    copiloto.append('documento', formulario.documento.value);
    copiloto.append('nombreC', formulario.nombreC.value);
    copiloto.append('telefono', formulario.telefono.value);
    copiloto.append('email', formulario.email.value);
    copiloto.append('fechaContratacion', formulario.fechaContratacion.value);

    try {
        const respuesta = await fetch('../php/registrarCopiloto.php', {
            method: 'POST',
            body: copiloto
        });
        const registro = (await respuesta.text()).trim();

        if (registro === "ok") {
            alert('Copiloto registrado');
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