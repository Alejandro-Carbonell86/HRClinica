
const mapa = L.map('visualizar').setView([-34.9011, -56.1645], 15);
const ingresarO = document.getElementById('ingresarO');
const ubicar = document.getElementById('ubicar');
const departamento = document.getElementById('departamento');
const direccion = document.getElementById('dir');
const formulario = document.getElementById('formularioTraslado');
const mensaje = document.getElementById('mensajeTraslado');
const insertlat = document.getElementById('lat');
const insertlng = document.getElementById('lng');
const marcadorDestinoIcono = L.icon({ iconUrl: '../img/des.png', iconSize: [38, 45] });
const marcadorOrigen = L.marker([-34.9011, -56.1645], { draggable: true }).addTo(mapa);
let marcadorDestino = null;
let lineaRuta = null;
let datosRuta = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

function llenarSelect(id, filas, textoInicial) {
    const select = document.getElementById(id);
    select.innerHTML = '';

    const opcionInicial = document.createElement('option');
    opcionInicial.value = '';
    opcionInicial.textContent = textoInicial;
    select.appendChild(opcionInicial);

    filas.forEach(fila => {
        const opcion = document.createElement('option');
        opcion.value = fila.id;
        opcion.textContent = fila.nombre;
        select.appendChild(opcion);
    });
}

async function cargarOpciones() {
    try {
        const respuesta = await fetch('../php/opcionesTraslado.php', { credentials: 'same-origin' });
        const opciones = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(opciones.error || 'No se pudieron cargar las opciones.');
        }

        llenarSelect('ambulancia', opciones.ambulancias, '-- Seleccioná una ambulancia --');
        llenarSelect('conductor', opciones.conductores, '-- Seleccioná un conductor --');
        llenarSelect('copiloto', opciones.copilotos, '-- Sin copiloto --');
        llenarSelect('elemento', opciones.elementos, '-- Sin elemento --');
    } catch (error) {
        mensaje.textContent = error.message;
    }
}

cargarOpciones();

ingresarO.addEventListener('click', () => {
    const lugar = marcadorOrigen.getLatLng();
    insertlat.value = lugar.lat.toFixed(7);
    insertlng.value = lugar.lng.toFixed(7);
    datosRuta = null;
    mensaje.textContent = 'Origen seleccionado.';
});

ubicar.addEventListener('click', async () => {
    if (!insertlat.value || !insertlng.value) {
        mensaje.textContent = 'Primero seleccioná el origen en el mapa.';
        return;
    }

    if (!direccion.value.trim() || !departamento.value) {
        mensaje.textContent = 'Ingresá la dirección y el departamento de destino.';
        return;
    }

    try {
        const texto = `${direccion.value}, ${departamento.value}, Uruguay`;
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        const resultado = dato.results && dato.results[0];

        if (!resultado) {
            throw new Error('No se encontró esa dirección.');
        }

        if (marcadorDestino) {
            mapa.removeLayer(marcadorDestino);
        }
        marcadorDestino = L.marker([resultado.lat, resultado.lon], { draggable: true, icon: marcadorDestinoIcono }).addTo(mapa);

        const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${insertlat.value},${insertlng.value}|${resultado.lat},${resultado.lon}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
        const respuestaRuta = await fetch(urlRuta);
        const ruta = await respuestaRuta.json();

        if (!ruta.features || !ruta.features[0]) {
            throw new Error('No se pudo calcular la ruta.');
        }

        datosRuta = ruta.features[0];
        const dibujo = datosRuta.geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);

        if (lineaRuta) {
            mapa.removeLayer(lineaRuta);
        }
        lineaRuta = L.polyline(dibujo, { color: 'blue', weight: 5 }).addTo(mapa);
        mapa.fitBounds(lineaRuta.getBounds());
        mensaje.textContent = 'Ruta calculada. Ya podés guardar el traslado.';
    } catch (error) {
        datosRuta = null;
        mensaje.textContent = error.message;
    }
});

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    if (!datosRuta || !marcadorDestino || !insertlat.value || !insertlng.value) {
        mensaje.textContent = 'Seleccioná el origen y calculá la ruta antes de guardar.';
        return;
    }

    const destino = marcadorDestino.getLatLng();
    const propiedades = datosRuta.properties;
    const datos = new FormData();
    datos.append('ambulancia', document.getElementById('ambulancia').value);
    datos.append('conductor', document.getElementById('conductor').value);
    datos.append('copiloto', document.getElementById('copiloto').value);
    datos.append('elemento', document.getElementById('elemento').value);
    datos.append('origenLatitud', insertlat.value);
    datos.append('origenLongitud', insertlng.value);
    datos.append('destinoLatitud', destino.lat);
    datos.append('destinoLongitud', destino.lng);
    datos.append('departamento', departamento.value);
    datos.append('direccion', direccion.value.trim());
    datos.append('horaSalida', document.getElementById('fechaSalida').value);
    datos.append('observaciones', document.getElementById('observaciones').value.trim());
    datos.append('distancia', (propiedades.distance / 1000).toFixed(2));
    datos.append('tiempo', Math.ceil(propiedades.time / 60));

    try {
        const respuesta = await fetch('../php/registrarTraslado.php', {
            method: 'POST',
            body: datos,
            credentials: 'same-origin'
        });
        const resultado = await respuesta.json();

        if (!respuesta.ok || !resultado.exito) {
            throw new Error(resultado.mensaje || 'No se pudo guardar el traslado.');
        }

        mensaje.textContent = `${resultado.mensaje} Número: ${resultado.id_solicitud}`;
        formulario.reset();
        insertlat.value = '';
        insertlng.value = '';
        datosRuta = null;
    } catch (error) {
        mensaje.textContent = error.message;
    }
});
