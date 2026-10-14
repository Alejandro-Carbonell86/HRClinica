<?php

require_once 'conexion.php';
header('Content-Type: application/json');

$conductor = $con->query("SELECT * FROM conductores");

$datos = [];
while ($fila = $conductor->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);

?>