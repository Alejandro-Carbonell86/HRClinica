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


header('Content-Type: application/json');

if (password_verify($contrasenia, $fila['password_hash'])){
    $_SESSION['id_empleado'] = $fila['id_empleado'];
    $_SESSION['usuario'] = $fila['nombre_usuario'];
    $_SESSION['nombre'] = $fila['nombre_completo'];
    $_SESSION['email'] = $fila['email'];
    $_SESSION['rol'] = $fila['rol'];
    $_SESSION['id_usuario'] = $fila['id_usuario'];
    
    echo json_encode($fila);
} else {

    echo json_encode(['error' => 'Contraseña incorrecta']);
}

$stmt->close();
$con->close();
?>