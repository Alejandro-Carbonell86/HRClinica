// 1. Crear el mapa dentro del div con id="mapa"
const mapa = L.map('visualizar').setView([-34.9011, -56.1645], 19);

// 2. Agregar la capa de "tiles" (las imágenes del mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);