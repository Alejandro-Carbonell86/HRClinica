<?php
require_once 'conexion.php';

$archivo = $_FILES['archivo'];
$nombre = $_POST['nombre'];

if ($archivo['error']===0){

    $ruta = "documentos/" . $archivo['name'];

    move_uploaded_file($archivo['tmp_name'], $ruta);

    $sql = "INSERT INTO documento (ruta, nombre) VALUES (?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $ruta, $nombre);

    if ($stmt->execute()) {
        echo "OK";
    } else {
        echo "ERROR";
    }

$con-> close();
?>