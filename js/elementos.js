const formulario = document.querySelector('#formularioElemento');
const selectTipo = document.querySelector('#tipo');

// Cargar tipos de traslado al abrir la página
async function cargarTipos() {
    try {
        const respuesta = await fetch('../php/obtenerTiposTraslado.php');
        const tipos = await respuesta.json();

        selectTipo.innerHTML = '';
        tipos.forEach(t => {
            const option = document.createElement('option');
            option.value = t.id_tipo_traslado;
            option.textContent = t.nombre_tipo;
            selectTipo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar tipos: ', error);
    }
}

cargarTipos();

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const elemento = new FormData();
    elemento.append('tipo', formulario.tipo.value);
    elemento.append('nombre', formulario.nombre.value);
    elemento.append('descripcion', formulario.descripcion.value);
    elemento.append('condicion', formulario.condicion.value);

    try {
        const respuesta = await fetch('../php/registrarElemento.php', {
            method: 'POST',
            body: elemento
        });
        const registro = (await respuesta.text()).trim();

        if (registro === "ok") {
            alert('Elemento registrado');
            formulario.reset();
        } else if (registro === "nombre existe") {
            alert('Ese elemento ya existe para ese tipo');
        } else {
            alert('Error al registrar');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
});