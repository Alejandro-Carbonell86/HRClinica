<?php
require_once 'conexion.php';

$id_tipo     = $_POST['tipo']        ?? 0;
$nombre      = $_POST['nombre']      ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$condicion   = $_POST['condicion']   ?? 0;

if ($id_tipo == 0 || $nombre === '') {
    echo "error";
    exit;
}

$chequeo = $con->prepare("SELECT nombre FROM elementos_traslado 
    WHERE nombre = ? AND id_tipo_traslado = ?");
$chequeo->bind_param('si', $nombre, $id_tipo);
$chequeo->execute();
$resultado = $chequeo->get_result();

if ($resultado->num_rows > 0) {
    echo "nombre existe";
    exit;
}

$stmt = $con->prepare("INSERT INTO elementos_traslado 
    (id_tipo_traslado, nombre, descripcion, requiere_condicion_especial) 
    VALUES (?,?,?,?)");
$stmt->bind_param('issi', $id_tipo, $nombre, $descripcion, $condicion);

echo $stmt->execute() ? "ok" : "error";

$stmt->close();
$con->close();
?>