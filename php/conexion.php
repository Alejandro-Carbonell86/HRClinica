<?php
require_once 'config.php';

$con = new mysqli(BD_host,BD_usuario,BD_contrasena,BD_nombre);

if ($con->connec_error){
    die("Error de conexión: " . $con->connect_error);
}

?>