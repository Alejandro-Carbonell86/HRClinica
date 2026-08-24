<?php
require_once 'conexion.php';
session_start();

$usuario = $_POST['usuario'];
$contrasenia = $_POST['contrasenia'];

$stmt = $con->prepare("SELECT nombre_usuario, password_hash FROM 
usuarios_sistema WHERE nombre_usuario = ?");
$stmt->bind_param('s', $usuario);
$stmt->execute();

$resultado = $stmt->get_result();

if($resultado->num_rows === 0){
    echo "error";
    exit;
}

$fila = $resultado->fetch_assoc();

if (password_verify($contrasenia, $fila['password_hash'])){
    $_SESSION['ID_Empleado'] = $fila['id_empleado'];
    $_SESSION['usuario'] = $fila['nombre_usuario'];
    $_SESSION['rol'] = $fila['rol'];
    echo "ok";
} else {
    echo "incorrecta";
}

$stmt->close();
$con->close();
?>