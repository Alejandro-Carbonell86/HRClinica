<?php
require_once 'conexion.php';


$matricula = $_POST['matricula'];
$marca =  $_POST['marca'];
$modelo = $_POST['modelo'];
$ano = $_POST['ano'];
$tipo = $_POST['tipo'];
$capacidad = $_POST['capacidad'];
$fecha = $_POST['fecha'];
$activo = 1;


$stmt = $con->prepare("INSERT INTO ambulancias (matricula, marca, modelo, ano, tipo, capacidad, 
fecha_ultimo_mantenimiento, activo) VALUES (?,?,?,?,?,?,?,?)");
$stmt->bind_param('sssssisi', $matricula, $marca, $modelo, $ano, $tipo, $capacidad, $fecha, $activo);

header('Content-Type: application/json');

if($stmt->execute()){
    echo json_encode(['estado'=> true]);
}else{
    echo json_encode(['estado'=> false]);
}

$stmt->close();
$con->close();
?>