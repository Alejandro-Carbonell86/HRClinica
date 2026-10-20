<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'administrador') {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso no permitido']);
    exit;
}

$resultado = $con->query("SELECT id_conductor AS id, nombre_completo AS nombre
    FROM conductores WHERE activo = 1 ORDER BY nombre_completo");
$conductores = [];
while ($fila = $resultado->fetch_assoc()) {
    $conductores[] = $fila;
}

echo json_encode($conductores);
$con->close();
?>