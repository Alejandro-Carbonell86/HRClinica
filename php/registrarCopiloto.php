<?php
require_once 'conexion.php';

$documento = $_POST['documento']         ?? '';
$nombre    = $_POST['nombreC']           ?? '';
$telefono  = $_POST['telefono']          ?? '';
$email     = $_POST['email']             ?? '';
$fecha     = $_POST['fechaContratacion'] ?? '';
$activo    = 1;

if ($documento === '' || $nombre === '') {
    echo "error";
    exit;
}

if ($fecha === '') {
    $fecha = null;
}

$chequeo = $con->prepare("SELECT documento FROM copilotos WHERE documento = ?");
$chequeo->bind_param('s', $documento);
$chequeo->execute();
$resultado = $chequeo->get_result();

if ($resultado->num_rows > 0) {
    echo "documento existe";
    exit;
}

$stmt = $con->prepare("INSERT INTO copilotos 
    (documento, nombre_completo, telefono, email, fecha_contratacion, activo) 
    VALUES (?,?,?,?,?,?)");
$stmt->bind_param('sssssi', $documento, $nombre, $telefono, $email, $fecha, $activo);

echo $stmt->execute() ? "ok" : "error";

$stmt->close();
$con->close();
?>