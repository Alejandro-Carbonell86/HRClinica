
const mapa = L.map('visualizar').setView([-34.9011, -56.1645], 19);
const ingresarO = document.getElementById('ingresarO');


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

const ImagenMarcador = L.icon({
    iconUrl: '../img/ambulancia.png',
    iconSize: [38, 45]
})

const marcador = L.marker([-34.9011, -56.1645], { draggable: true, icon: ImagenMarcador }).addTo(mapa);
const insertlat = document.getElementById('lat');
const insertlng = document.getElementById('lng');
const marcadorDestino = L.marker([-34.9011, -56.1645], {draggable:true, icon: ImagenMarcador}).addTo(mapa);

ingresarO.addEventListener('click', ()=>{
    let lugarO = marcador.getLatLng();
    alert(lugarO.lat);

    insertlat.value = lugarO.lat;
    insertlng.value = lugarO.lng;

})