const listaTraslados = document.getElementById('listaTraslados');
const mensajeTraslados = document.getElementById('mensajeLista');
let idSolicitudSeguimiento = null;
let marcadorSeguimiento = null;
let trasladosActuales = [];

function actualizarMarcador(traslado, centrar = false) {
    const latitud = Number(traslado.latitud);
    const longitud = Number(traslado.longitud);
    if (!Number.isFinite(latitud) || !Number.isFinite(longitud)) return;

    const punto = [latitud, longitud];
    if (!marcadorSeguimiento) {
        marcadorSeguimiento = L.marker(punto).addTo(mapa);
    } else {
        marcadorSeguimiento.setLatLng(punto);
    }
    marcadorSeguimiento.bindPopup(`Chofer: ${traslado.conductor || 'Sin nombre'} · Traslado ${traslado.id_solicitud}`);
    if (centrar) {
        mapa.setView(punto, 16);
        marcadorSeguimiento.openPopup();
    }
}

function crearDato(etiqueta, valor) {
    const parrafo = document.createElement('p');
    parrafo.textContent = `${etiqueta}: ${valor || 'Sin datos'}`;
    return parrafo;
}

async function cargarTraslados() {
    try {
        const respuesta = await fetch('../php/listarTraslados.php', { credentials: 'same-origin' });
        const traslados = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(traslados.error || 'No se pudieron cargar los traslados.');
        }

        trasladosActuales = traslados;
        listaTraslados.replaceChildren();
        if (traslados.length === 0) {
            mensajeTraslados.textContent = 'Todavía no hay traslados guardados.';
            return;
        }

        
        traslados.forEach(traslado => {
            const articulo = document.createElement('article');
            articulo.className = 'traslado-item';
            const titulo = document.createElement('h3');
            titulo.textContent = `Traslado ${traslado.id_solicitud} · ${traslado.estado}`;
            articulo.append(titulo);
            articulo.append(crearDato('Salida', traslado.hora_salida));
            articulo.append(crearDato('Chofer', traslado.conductor));
            articulo.append(crearDato('Ambulancia', traslado.matricula));
            articulo.append(crearDato('Origen', traslado.origen));
            articulo.append(crearDato('Destino', traslado.destino));
            articulo.append(crearDato('Distancia (km)', traslado.distancia_km));

            if (traslado.latitud && traslado.longitud) {
                const verUbicacion = document.createElement('button');
                verUbicacion.type = 'button';
                verUbicacion.dataset.verUbicacion = traslado.id_solicitud;
                verUbicacion.textContent = 'Ver ubicación en el mapa';
                articulo.appendChild(verUbicacion);
                const ubicacion = document.createElement('a');
                ubicacion.href = `https://www.google.com/maps?q=${encodeURIComponent(traslado.latitud)},${encodeURIComponent(traslado.longitud)}`;
                ubicacion.target = '_blank';
                ubicacion.rel = 'noopener';
                ubicacion.textContent = `Última ubicación: ${traslado.latitud}, ${traslado.longitud}`;
                articulo.append(ubicacion, crearDato('Actualizado', traslado.fecha_hora));
            } else {
                articulo.append(crearDato('Seguimiento', 'Aún no iniciado'));
            }
            listaTraslados.appendChild(articulo);
        });

        if (idSolicitudSeguimiento !== null) {
            const seguimiento = traslados.find(traslado => Number(traslado.id_solicitud) === idSolicitudSeguimiento);
            if (seguimiento) actualizarMarcador(seguimiento);
        }
    } catch (error) {
        mensajeTraslados.textContent = error.message;
    }
}

listaTraslados.addEventListener('click', evento => {
    const boton = evento.target.closest('button[data-ver-ubicacion]');
    if (!boton) return;

    idSolicitudSeguimiento = Number(boton.dataset.verUbicacion);
    const seleccionado = trasladosActuales.find(traslado => Number(traslado.id_solicitud) === idSolicitudSeguimiento);
    if (seleccionado) actualizarMarcador(seleccionado, true);
});

cargarTraslados();
setInterval(cargarTraslados, 10000);