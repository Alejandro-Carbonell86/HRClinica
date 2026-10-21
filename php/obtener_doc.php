<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autentificado']);
    exit;
}

$sql = "SELECT id_documento AS id, titulo AS nombre, archivo_nombre AS archivo,
        archivo_ruta AS ruta, fecha_publicacion AS fecha
    FROM documentos WHERE activo = 1 ORDER BY fecha_publicacion DESC";

$resultado = $con->query($sql);
$documentos = [];

while ($fila = $resultado->fetch_assoc()) {
    $nombreArchivoReal = basename($fila['ruta']);
    if ($fila['nombre'] === $nombreArchivoReal) {
        $fila['nombre'] = $fila['archivo'];
    }
    $fila['archivo'] = $nombreArchivoReal;
    $documentos[] = $fila;
}

echo json_encode($documentos);
$con->close();
?>