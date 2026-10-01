
const mapa = L.map('visualizar').setView([-34.9011, -56.1645], 19);
const ingresarO = document.getElementById('ingresarO');
const ubicar = document.getElementById('ubicar');
const departamento = document.getElementById('departamento');
const direccion = document.getElementById('dir');


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

const ImagenMarcador = L.icon({
    iconUrl: '../img/ambulancia.png',
    iconSize: [38, 45]
})

const marcador = L.marker([-34.9011, -56.1645], 
    { draggable: true, 
      icon: ImagenMarcador }).addTo(mapa);
      
const insertlat = document.getElementById('lat');
const insertlng = document.getElementById('lng');

ingresarO.addEventListener('click', ()=>{
    let lugarO = marcador.getLatLng();
    insertlat.value = lugarO.lat;
    insertlng.value = lugarO.lng;
    const marcadorDestino = L.marker([-34.900362955713476, -56.163353436677056], {draggable:true, icon: ImagenMarcador}).addTo(mapa);
})

ubicar.addEventListener('click', async()=>{

    const texto = `${direccion.value}, ${departamento.value}, Uruguay`;

    const url = `https://api.geoapify.com/v1/geocode/search?` +
    `text=${encodeURIComponent(texto)}` +
    `&filter=countrycode:uy` +
    `&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;

  const respuesta = await fetch(url);
  const dato = await respuesta.json();

  const resultado = dato.results[0];
  if(resultado){
    alert(`${resultado.lat}, ${resultado.lon}`);
  }
})

