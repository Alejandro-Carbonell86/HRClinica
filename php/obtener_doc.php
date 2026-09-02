<?php
require_once 'conexion.php';


$sql = "SELECT * FROM documento";

$resultado = $con->query($sql);

$nombre = [];

while($fila=$resultado->fetch_assoc()){
    $nombre[] = [
        'id' => $fila['id'],
        'nombre' => $fila['nombre'],
        'ruta' => $fila['ruta']
    ];
}

header('Content-Type: application/json');
echo json_encode($nombre);
$con->close();

?>