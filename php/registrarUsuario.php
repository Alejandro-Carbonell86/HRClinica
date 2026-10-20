<?php


require_once 'conexion.php';
date_default_timezone_set('America/Montevideo');

$usuario = $_POST['usuario'];
$contrasenia = $_POST['contrasenia'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$rol = $_POST['rol'];
$id_empleado = $_POST['numeroId'];
$idConductor = $rol === 'chofer' ? (int)($_POST['idConductor'] ?? 0) : null;
$estado = 1;
$fecha_hora = date('Y-m-d H:i:s');

if ($rol === 'chofer' && $idConductor < 1) {
    echo 'Seleccioná el conductor asociado a la cuenta.';
    exit;
}

if ($rol === 'chofer') {
    $conductor = $con->prepare("SELECT id_conductor FROM conductores WHERE id_conductor = ? AND activo = 1");
    $conductor->bind_param('i', $idConductor);
    $conductor->execute();
    if ($conductor->get_result()->num_rows === 0) {
        echo 'El conductor seleccionado no está disponible.';
        exit;
    }
    $conductor->close();
} else {
    $idConductor = null;
}


$hash = password_hash($contrasenia, PASSWORD_BCRYPT);

$chequeo = $con->prepare("SELECT nombre_usuario, email FROM usuarios_sistema 
WHERE nombre_usuario = ? OR email = ?");
$chequeo->bind_param('ss', $usuario, $email);
$chequeo->execute();

$resultado = $chequeo->get_result();

if($resultado->num_rows > 0){
    $fila = $resultado->fetch_assoc();

    if($fila['nombre_usuario'] == $usuario){
        echo "usuario existe";
    }elseif($fila['email'] == $email){
        echo "email existe";
    }
    exit;
}

$stmt = $con->prepare("INSERT INTO usuarios_sistema (nombre_usuario, password_hash, nombre_completo,
email, rol, id_empleado, id_conductor, activo, ultimo_acceso) VALUES (?,?,?,?,?,?,?,?,?)");

$stmt->bind_param('ssssssiis', $usuario, $hash, $nombre, $email, $rol,
$id_empleado, $idConductor, $estado, $fecha_hora);

if($stmt->execute()){
    echo "ok";
}else{
    echo "error" . $stmt->error;
}

$stmt->close();
$con->close();
?>