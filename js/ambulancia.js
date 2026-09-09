const formulario = document.querySelector('#ambulancia');

formulario.addEventListener('submit', async(e)=> {
    e.preventDefault();

    const ambulancia = new FormData();
    ambulancia.append('matricula', formulario.matricula.value);
    ambulancia.append('modelo', formulario.modelo.value);
    ambulancia.append('marca', formulario.marca.value);
    ambulancia.append('ano', formulario.ano.value);
    ambulancia.append('tipo', formulario.tipo.value);
    ambulancia.append('capacidad', formulario.capacidad.value);
    ambulancia.append('fecha', formulario.fecha.value);

    const respuesta = await fetch('../php/ambulancias.php', {
        method: 'POST',
        body: ambulancia
    })

    let mensaje = await respuesta.json();
    console.log('Respuesta: ', mensaje)

    if(mensaje.estado){
        alert('Ambulancia Guardada Correctamente');
        formulario.reset();
    }else{
        alert('Error al guardar ambulancia');
    }
})