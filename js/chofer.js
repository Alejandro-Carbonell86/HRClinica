const btn = document.getElementById('btn');
        const resultado = document.getElementById('resultado');

        btn.addEventListener('click', () => {

            resultado.textContent = 'Obteniendo ubicación...';

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resultado.innerHTML = `
                        <strong>Latitud:</strong> ${lat}<br>
                        <strong>Longitud:</strong> ${lon}<br>
                    `;
                },
            );
        });