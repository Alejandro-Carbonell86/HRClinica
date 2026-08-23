<?php
require_once 'conexion.php';

$usuario = $_POST['usuario'];
$contrasenia = $_POST['contrasenia'];

$stmt = $con->prepare("SELECT nombre_usuario, password_hash FROM usuarios_sistema WHERE nombre_usuario = ?, password_hash = ?");
$stmt->bind_param('ss', $usuario, $contrasenia);
$stmt->execute();

$resultado = $stmt->get_result();

if($resultado->num_rows > 0){
    echo "ok"
}else{
    echo "error";
}

$stmt->close();
$con->close();
?>