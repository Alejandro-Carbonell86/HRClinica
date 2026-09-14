document.addEventListener('DOMContentLoaded', async()=>{
    const respuesta = await fetch('/HR_Clinica/php/verifica.php', {
        credentials: 'same-origin'
    })

    if(respuesta.status === 401){
        window.location.href = '/HR_Clinica/index.html';
    }else{
        const usuario = await respuesta.json();
        document.getElementById('usuarioId').textContent = usuario.usuario;
    }
})
