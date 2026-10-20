<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autentificado']);
    exit;
}

$datos = [
    'ambulancias' => [],
    'conductores' => [],
    'copilotos' => [],
    'elementos' => []
];

$consultas = [
    'ambulancias' => "SELECT id_ambulancia AS id, matricula AS nombre FROM ambulancias WHERE activo = 1 ORDER BY matricula",
    'conductores' => "SELECT id_conductor AS id, nombre_completo AS nombre FROM conductores WHERE activo = 1 ORDER BY nombre_completo",
    'copilotos' => "SELECT id_copiloto AS id, nombre_completo AS nombre FROM copilotos WHERE activo = 1 ORDER BY nombre_completo",
    'elementos' => "SELECT id_elemento AS id, nombre FROM elementos_traslado ORDER BY nombre"
];

foreach ($consultas as $tipo => $sql) {
    $resultado = $con->query($sql);
    while ($fila = $resultado->fetch_assoc()) {
        $datos[$tipo][] = $fila;
    }
}

echo json_encode($datos);
$con->close();
?>