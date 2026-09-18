// 1. Crear el mapa dentro del div con id="mapa"
const mapa = L.map('visualizar').setView([-34.9011, -56.1645], 19);
const ingresarO = document.getElementById('ingresarO');

// 2. Agregar la capa de "tiles" (las imágenes del mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

// 3. Colocamos marcado de origen
const marcador = L.marker([-34.9011, -56.1645], { draggable: true }).addTo(mapa);
const insertlat = document.getElementById('lat');
const insertlng = document.getElementById('lng');

ingresarO.addEventListener('click', ()=>{
    let lugarO = marcador.getLatLng();
    alert(lugarO.lat);

    insertlat.value = lugarO.lat;
    insertlng.value = lugarO.lng;

})