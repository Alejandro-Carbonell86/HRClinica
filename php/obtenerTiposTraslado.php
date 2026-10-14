<?php
require_once 'conexion.php';
header('Content-Type: application/json; charset=utf-8');

$resultado = $con->query("SELECT id_tipo_traslado, nombre_tipo FROM tipos_traslado");
$tipos = [];

while ($fila = $resultado->fetch_assoc()) {
    $tipos[] = $fila;
}

echo json_encode($tipos);
$con->close();
?>