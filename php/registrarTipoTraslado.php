<?php
require_once 'conexion.php';

$nombre      = $_POST['nombre']      ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$equipo      = $_POST['equipo']      ?? 0;

if ($nombre === '') {
    echo "error";
    exit;
}

$chequeo = $con->prepare("SELECT nombre_tipo FROM tipos_traslado WHERE nombre_tipo = ?");
$chequeo->bind_param('s', $nombre);
$chequeo->execute();
$resultado = $chequeo->get_result();

if ($resultado->num_rows > 0) {
    echo "nombre existe";
    exit;
}

$stmt = $con->prepare("INSERT INTO tipos_traslado 
    (nombre_tipo, descripcion, requiere_equipo_especial) 
    VALUES (?,?,?)");
$stmt->bind_param('ssi', $nombre, $descripcion, $equipo);

echo $stmt->execute() ? "ok" : "error";

$stmt->close();
$con->close();
?>