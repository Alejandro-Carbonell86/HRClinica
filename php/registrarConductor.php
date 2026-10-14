<?php
require_once 'conexion.php';

$documento    = $_POST['documento']         ?? '';
$nombre       = $_POST['nombreC']           ?? '';
$licencia     = $_POST['licencia']          ?? '';
$telefono     = $_POST['telefono']          ?? '';
$email        = $_POST['email']             ?? '';
$fecha        = $_POST['fechaContratacion'] ?? '';
$activo       = 1;

if ($documento === '' || $nombre === '' || $licencia === '') {
    echo "error";
    exit;
}

// Convertir fecha vacía a NULL
if ($fecha === '') {
    $fecha = null;
}

$chequeo = $con->prepare("SELECT documento FROM conductores WHERE documento = ?");
$chequeo->bind_param('s', $documento);
$chequeo->execute();
$resultado = $chequeo->get_result();

if ($resultado->num_rows > 0) {
    echo "documento existe";
    exit;
}

$stmt = $con->prepare("INSERT INTO conductores 
    (documento, nombre_completo, licencia, telefono, email, fecha_contratacion, activo) 
    VALUES (?,?,?,?,?,?,?)");
$stmt->bind_param('ssssssi', $documento, $nombre, $licencia, $telefono, $email, $fecha, $activo);

echo $stmt->execute() ? "ok" : "error";

$stmt->close();
$con->close();
?>