<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'chofer' || empty($_SESSION['id_conductor'])) {
    http_response_code(403);
    echo json_encode(['error' => 'La cuenta no está vinculada a un chofer.']);
    exit;
}

$idConductor = (int)$_SESSION['id_conductor'];
$sql = "SELECT s.id_solicitud, s.hora_salida, s.estado, s.observaciones,
        a.matricula, r.origen, r.destino
    FROM solicitudes_traslado s
    LEFT JOIN ambulancias a ON a.id_ambulancia = s.id_ambulancia
    LEFT JOIN rutas r ON r.id_ruta = s.id_ruta
    WHERE s.id_conductor = ? AND s.estado IN ('programado', 'en_curso')
    ORDER BY s.hora_salida ASC";
$stmt = $con->prepare($sql);
$stmt->bind_param('i', $idConductor);
$stmt->execute();
$resultado = $stmt->get_result();
$traslados = [];
while ($fila = $resultado->fetch_assoc()) {
    $traslados[] = $fila;
}

echo json_encode($traslados);
$stmt->close();
$con->close();
?>