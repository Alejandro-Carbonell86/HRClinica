<?php
require_once 'conexion.php';
date_default_timezone_set('America/Montevideo');

$usuario = $_POST['nombreU'];
$contrasenia = $_POST['contrasenia'];
$nombre = $_POST['nombreC'];
$email = $_POST['email'];
$rol = $_POST['rol'];
$id_empleado = $_POST['numeroId'];
$estado = "activo";
$fecha_hora = date('Y-m-d H:i:s');

$stmt = $con->prepare("INSERT INTO usuarios_sistema (nombre_usuario, password_hash, nombre_completo, 
email, rol, id_empleado, activo, ultimo_acceso) VALUES (?,?,?,?,?,?,?,?)");

$stmt->bind_param('sssssiss', $usuario, $contrasenia, $nombre, $email, $rol, 
$id_empleado, $estado, $fecha_hora);

if($stmt->execute()){
    echo "ok";
}else{
    echo "error" . $stmt->error;
}

$stmt->close();
$con->close();
?>