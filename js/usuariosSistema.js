const formulario = document.querySelector('#formularioRegistro');
const rol = document.getElementById('rol');
const conductorElegido = document.getElementById('conductorElegido');
const idConductor = document.getElementById('idConductor');

async function cargarConductores() {
    const respuesta = await fetch('../php/opcionesConductores.php', { credentials: 'same-origin' });
    const conductores = await respuesta.json();

    idConductor.innerHTML = '<option value="">Seleccioná un conductor</option>';
    conductores.forEach(conductor => {
        const opcion = document.createElement('option');
        opcion.value = conductor.id;
        opcion.textContent = conductor.nombre;
        idConductor.appendChild(opcion);
    });
}

rol.addEventListener('change', async () => {
    conductorElegido.hidden = rol.value !== 'chofer';
    idConductor.required = rol.value === 'chofer';
    if (rol.value === 'chofer') {
        await cargarConductores();
    }
});

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = new FormData();
    usuario.append('usuario', formulario.nombreU.value);
    usuario.append('contrasenia', formulario.contrasenia.value);
    usuario.append('nombre', formulario.nombreC.value);
    usuario.append('email', formulario.email.value);
    usuario.append('rol', formulario.rol.value);
    usuario.append('numeroId', formulario.numeroId.value);
    usuario.append('idConductor', idConductor.value);


    try {
        const respuesta = await fetch('../php/registrarUsuario.php', {
            method: 'POST',
            body: usuario
        });
        const registro = await respuesta.text();
        if (registro.trim() === "ok") {
            alert('Registro Exitoso');
            formulario.reset();
            conductorElegido.hidden = true;
            idConductor.required = false;
        } else {
            alert(registro);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
});