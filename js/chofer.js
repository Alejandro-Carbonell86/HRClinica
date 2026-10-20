const resultado = document.getElementById('resultado');
const listaTraslados = document.getElementById('listaTraslados');
let trasladoActivo = null;
let seguimientoActivo = null;
let ultimaActualizacion = 0;

function mostrarMensaje(texto) {
    resultado.textContent = texto;
}

async function enviarUbicacion(idSolicitud, accion, posicion) {
    const datos = new FormData();
    datos.append('idSolicitud', idSolicitud);
    datos.append('accion', accion);
    datos.append('latitud', posicion.coords.latitude);
    datos.append('longitud', posicion.coords.longitude);

    const respuesta = await fetch('../php/actualizarSeguimiento.php', {
        method: 'POST',
        body: datos,
        credentials: 'same-origin'
    });
    const respuestaJson = await respuesta.json();
    if (!respuesta.ok || !respuestaJson.exito) {
        throw new Error(respuestaJson.mensaje || 'No se pudo actualizar la ubicación.');
    }
}

function mostrarTraslados(traslados) {
    listaTraslados.replaceChildren();
    if (traslados.length === 0) {
        listaTraslados.textContent = 'No tenés traslados pendientes.';
        return;
    }

    traslados.forEach(traslado => {
        const articulo = document.createElement('article');
        articulo.className = 'traslado-item';
        const titulo = document.createElement('h2');
        titulo.textContent = `Traslado ${traslado.id_solicitud} · ${traslado.estado}`;
        articulo.append(titulo);
        [
            `Salida: ${traslado.hora_salida}`,
            `Ambulancia: ${traslado.matricula || 'Sin asignar'}`,
            `Origen: ${traslado.origen || 'Sin datos'}`,
            `Destino: ${traslado.destino || 'Sin datos'}`,
            `Observaciones: ${traslado.observaciones || 'Sin observaciones'}`
        ].forEach(texto => {
            const parrafo = document.createElement('p');
            parrafo.textContent = texto;
            articulo.appendChild(parrafo);
        });

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.dataset.id = traslado.id_solicitud;
        if (traslado.estado === 'en_curso') {
            boton.dataset.accion = 'finalizar';
            boton.textContent = 'Finalizar recorrido';
        } else {
            boton.dataset.accion = 'iniciar';
            boton.textContent = 'Empezar recorrido';
        }
        articulo.appendChild(boton);
        listaTraslados.appendChild(articulo);
    });
}

async function cargarTraslados() {
    try {
        const respuesta = await fetch('../php/trasladosChofer.php', { credentials: 'same-origin' });
        const traslados = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(traslados.error || 'No se pudieron cargar tus traslados.');
        }
        mostrarTraslados(traslados);
        const trasladoEnCurso = traslados.find(traslado => traslado.estado === 'en_curso');
        if (trasladoEnCurso) {
            if (seguimientoActivo === null || trasladoActivo !== trasladoEnCurso.id_solicitud) {
                comenzarSeguimiento(trasladoEnCurso.id_solicitud);
            }
            mostrarMensaje('Recorrido en curso. Compartiendo ubicación.');
        } else {
            if (seguimientoActivo !== null && navigator.geolocation) {
                navigator.geolocation.clearWatch(seguimientoActivo);
            }
            trasladoActivo = null;
            seguimientoActivo = null;
            mostrarMensaje('Seleccioná un traslado asignado para comenzar.');
        }
    } catch (error) {
        mostrarMensaje(error.message);
    }
}

function errorUbicacion(error) {
    mostrarMensaje(error.message || 'No se pudo obtener la ubicación. Revisá el permiso del navegador.');
}

function comenzarSeguimiento(idSolicitud) {
    if (!navigator.geolocation) {
        mostrarMensaje('Este navegador no permite geolocalización.');
        return;
    }
    if (seguimientoActivo !== null) navigator.geolocation.clearWatch(seguimientoActivo);
    trasladoActivo = idSolicitud;
    seguimientoActivo = navigator.geolocation.watchPosition(async posicion => {
        const ahora = Date.now();
        if (ahora - ultimaActualizacion < 10000) return;
        ultimaActualizacion = ahora;
        try {
            await enviarUbicacion(idSolicitud, 'ubicacion', posicion);
            mostrarMensaje(`Recorrido en curso. Última posición: ${posicion.coords.latitude.toFixed(5)}, ${posicion.coords.longitude.toFixed(5)}`);
        } catch (error) {
            mostrarMensaje(error.message);
        }
    }, errorUbicacion, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
}

listaTraslados.addEventListener('click', evento => {
    const boton = evento.target.closest('button[data-accion]');
    if (!boton || !navigator.geolocation) {
        if (!navigator.geolocation) mostrarMensaje('Este navegador no permite geolocalización.');
        return;
    }

    const idSolicitud = boton.dataset.id;
    const accion = boton.dataset.accion;
    mostrarMensaje('Obteniendo ubicación...');
    navigator.geolocation.getCurrentPosition(async posicion => {
        try {
            await enviarUbicacion(idSolicitud, accion, posicion);
            if (accion === 'iniciar') {
                comenzarSeguimiento(idSolicitud);
                mostrarMensaje('Recorrido iniciado. Compartiendo ubicación.');
            } else {
                if (seguimientoActivo !== null) navigator.geolocation.clearWatch(seguimientoActivo);
                trasladoActivo = null;
                seguimientoActivo = null;
                ultimaActualizacion = 0;
                mostrarMensaje('Recorrido finalizado.');
            }
            await cargarTraslados();
        } catch (error) {
            mostrarMensaje(error.message);
        }
    }, errorUbicacion, { enableHighAccuracy: true, timeout: 15000 });
});

cargarTraslados();
setInterval(cargarTraslados, 15000);