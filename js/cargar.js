const formularioCarga = document.getElementById('formularioCarga');
const nombreArchivo = document.getElementById('nombre_archivo');
const archivoSeleccionado = document.getElementById('documento');
const mensajeCarga = document.getElementById('mensaje');
const mensajeLista = document.getElementById('mensajeLista');
const listaDocumentos = document.getElementById('listaDoc');
const zonaImpresion = document.getElementById('zonaImpresion');
const tituloImpresion = document.getElementById('tituloImpresion');
const qrImpresion = document.getElementById('qrImpresion');
const urlImpresion = document.getElementById('urlImpresion');

function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = tipo || '';
}

function obtenerUrlDocumento(ruta) {
    const url = new URL(ruta, window.location.href);
    if (url.origin !== window.location.origin) {
        throw new Error('La dirección del documento no pertenece a este sitio.');
    }
    return url.href;
}

function crearVistaPrevia(documento, url) {
    const extension = documento.archivo.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(extension)) {
        const imagen = document.createElement('img');
        imagen.src = url;
        imagen.alt = `Vista previa de ${documento.nombre}`;
        imagen.className = 'vista-previa';
        return imagen;
    }

    if (extension === 'pdf') {
        const pdf = document.createElement('iframe');
        pdf.src = url;
        pdf.title = `Vista previa de ${documento.nombre}`;
        pdf.className = 'vista-previa vista-pdf';
        return pdf;
    }

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.textContent = 'Abrir documento';
    return enlace;
}

function imprimirQr(documento, url) {
    if (typeof QRCode === 'undefined') {
        mostrarMensaje(mensajeLista, 'No se pudo cargar la librería para generar el QR.', 'error');
        return;
    }

    tituloImpresion.textContent = documento.nombre;
    urlImpresion.textContent = url;
    qrImpresion.replaceChildren();
    new QRCode(qrImpresion, {
        text: url,
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.M
    });
    zonaImpresion.setAttribute('aria-hidden', 'false');
    window.print();
    zonaImpresion.setAttribute('aria-hidden', 'true');
}

function crearTarjeta(documento) {
    const url = obtenerUrlDocumento(documento.ruta);
    const tarjeta = document.createElement('article');
    tarjeta.className = 'documento-card';

    const titulo = document.createElement('h3');
    titulo.textContent = documento.nombre;

    const fecha = document.createElement('p');
    fecha.className = 'documento-fecha';
    fecha.textContent = `Cargado: ${documento.fecha}`;

    const vista = crearVistaPrevia(documento, url);
    const qr = document.createElement('div');
    qr.className = 'qr-documento';
    qr.setAttribute('aria-label', `Código QR de ${documento.nombre}`);

    if (typeof QRCode !== 'undefined') {
        new QRCode(qr, {
            text: url,
            width: 144,
            height: 144,
            correctLevel: QRCode.CorrectLevel.M
        });
    } else {
        qr.textContent = 'QR no disponible';
    }

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.textContent = 'Abrir documento';

    const imprimir = document.createElement('button');
    imprimir.type = 'button';
    imprimir.className = 'boton-imprimir';
    imprimir.textContent = 'Imprimir QR';
    imprimir.addEventListener('click', () => imprimirQr(documento, url));

    const acciones = document.createElement('div');
    acciones.className = 'acciones-documento';
    acciones.append(enlace, imprimir);
    tarjeta.append(titulo, fecha, vista, qr, acciones);
    return tarjeta;
}

async function cargarDocumentos() {
    try {
        const respuesta = await fetch('../php/obtener_doc.php', { credentials: 'same-origin' });
        const documentos = await respuesta.json();
        if (!respuesta.ok || !Array.isArray(documentos)) {
            throw new Error(documentos.error || 'No se pudieron cargar los documentos.');
        }

        listaDocumentos.replaceChildren();
        if (documentos.length === 0) {
            mostrarMensaje(mensajeLista, 'Todavía no hay documentos cargados.');
            return;
        }

        mostrarMensaje(mensajeLista, `${documentos.length} documento(s) disponibles.`);
        documentos.forEach(documento => listaDocumentos.appendChild(crearTarjeta(documento)));
    } catch (error) {
        mostrarMensaje(mensajeLista, error.message, 'error');
    }
}

formularioCarga.addEventListener('submit', async evento => {
    evento.preventDefault();
    if (!archivoSeleccionado.files.length) {
        mostrarMensaje(mensajeCarga, 'Seleccioná un archivo para subir.', 'error');
        return;
    }

    const datos = new FormData(formularioCarga);
    const boton = document.getElementById('carga_documento');
    boton.disabled = true;
    mostrarMensaje(mensajeCarga, 'Subiendo documento...');

    try {
        const respuesta = await fetch('../php/cargar_doc.php', {
            method: 'POST',
            body: datos,
            credentials: 'same-origin'
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.exito) {
            throw new Error(resultado.mensaje || 'No se pudo subir el documento.');
        }

        mostrarMensaje(mensajeCarga, 'Documento subido. Su QR ya está disponible en la lista.', 'exito');
        formularioCarga.reset();
        await cargarDocumentos();
    } catch (error) {
        mostrarMensaje(mensajeCarga, error.message, 'error');
    } finally {
        boton.disabled = false;
    }
});

window.addEventListener('afterprint', () => {
    zonaImpresion.setAttribute('aria-hidden', 'true');
});

cargarDocumentos();