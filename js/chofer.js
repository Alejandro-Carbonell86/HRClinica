const btn = document.getElementById('btn');
const resultado = document.getElementById('resultado');

btn.addEventListener('click', () => {

    resultado.textContent = 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(
        (posicion) => {
            const lat = posicion.coords.latitude;
            const lon = posicion.coords.longitude;
            resultado.innerHTML = `
                        <strong>Latitud:</strong> ${lat}<br>
                        <strong>Longitud:</strong> ${lon}<br>
                    `;
        },
    );
});