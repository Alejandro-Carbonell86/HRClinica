<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario']) || !in_array($_SESSION['rol'], ['administrador', 'supervisor'], true)) {
    http_response_code(403);
    echo json_encode(['error' => 'No tenés permiso para ver los traslados.']);
    exit;
}

$sql = "SELECT s.id_solicitud, s.hora_salida, s.estado, s.observaciones,
        c.nombre_completo AS conductor, a.matricula,
        r.origen, r.destino, r.distancia_km,
        seguimiento.latitud, seguimiento.longitud, seguimiento.fecha_hora
    FROM solicitudes_traslado s
    LEFT JOIN conductores c ON c.id_conductor = s.id_conductor
    LEFT JOIN ambulancias a ON a.id_ambulancia = s.id_ambulancia
    LEFT JOIN rutas r ON r.id_ruta = s.id_ruta
    LEFT JOIN seguimiento_traslados seguimiento ON seguimiento.id_seguimiento = (
        SELECT MAX(ultimo.id_seguimiento)
        FROM seguimiento_traslados ultimo
        WHERE ultimo.id_solicitud = s.id_solicitud
    )
    ORDER BY s.hora_salida DESC";

$resultado = $con->query($sql);
$traslados = [];
while ($fila = $resultado->fetch_assoc()) {
    $traslados[] = $fila;
}

echo json_encode($traslados);
$con->close();
?>