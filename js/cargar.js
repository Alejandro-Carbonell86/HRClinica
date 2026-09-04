const nombre = document.getElementById('nombre_archivo');
const documento = document.getElementById('documento');
const subir = document.getElementById('carga_documento');
const mensaje_carga = document.getElementById('mensaje');
const boton = document.getElementById('boton');

subir.addEventListener('click', async (e) => {
    e.preventDefault();

    let doc = new FormData();
    doc.append('nombre', nombre.value);
    doc.append('archivo', documento.files[0]);

    let respuesta = await fetch('/HR_Clinica/php/cargar_doc.php', {
        method: 'POST',
        body: doc
    });

    let mensaje = await respuesta.json();
    console.log('Datos recibidos:', mensaje);

    if (mensaje.exito){
        alert('Archivo guardado correctamente');
        document.getElementById('formularioCarga').reset();
    }else{
        alert(mensaje.mensaje);
    }
})


boton.addEventListener('click', async () => {

    let dato = await fetch('/HR_Clinica/php/obtener_doc.php');
    let documentos = await dato.json();


    const listaDoc = document.getElementById('listaDoc');
    listaDoc.name = "nombreDoc";

    listaDoc.innerHTML = '';

    console.log('Documentos:', documentos);
    console.log('Primer elemento:', documentos[0]);
    console.log('Tipo de nombre:', typeof documentos[0].nombre);

    documentos.forEach(archivo => {
        let option = document.createElement('option');
        option.textContent = archivo.nombre;
        option.value = archivo.id;

        listaDoc.appendChild(option);
    });

    const prev = document.getElementById('previsualizacion');

    listaDoc.addEventListener('change', function () {
        let id = this.value;
        let docEncontrado = documentos.find(doc => doc.id == id);

        if (docEncontrado) {
            prev.src = docEncontrado.ruta;
        }
    })


})