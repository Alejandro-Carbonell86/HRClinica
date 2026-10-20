<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode(['exito' => false, 'mensaje' => 'No autentificado']);
    exit;
}

$idAmbulancia = (int)($_POST['ambulancia'] ?? 0);
$idConductor = (int)($_POST['conductor'] ?? 0);
$idCopiloto = (int)($_POST['copiloto'] ?? 0);
$idElemento = (int)($_POST['elemento'] ?? 0);
$origenLatitud = trim($_POST['origenLatitud'] ?? '');
$origenLongitud = trim($_POST['origenLongitud'] ?? '');
$destinoLatitud = trim($_POST['destinoLatitud'] ?? '');
$destinoLongitud = trim($_POST['destinoLongitud'] ?? '');
$departamento = trim($_POST['departamento'] ?? '');
$direccion = trim($_POST['direccion'] ?? '');
$salida = trim($_POST['horaSalida'] ?? '');
$observaciones = trim($_POST['observaciones'] ?? '');
$distancia = (float)($_POST['distancia'] ?? 0);
$tiempo = (int)($_POST['tiempo'] ?? 0);

if ($idAmbulancia < 1 || $idConductor < 1 || $origenLatitud === '' || $origenLongitud === '' ||
    $destinoLatitud === '' || $destinoLongitud === '' || $departamento === '' || $direccion === '' || $salida === '') {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Completá origen, destino, fecha, ambulancia y conductor.']);
    exit;
}

$salida = str_replace('T', ' ', $salida);
if (strlen($salida) === 16) {
    $salida .= ':00';
}

$idCopiloto = $idCopiloto > 0 ? $idCopiloto : null;
$idElemento = $idElemento > 0 ? $idElemento : null;
$origen = $origenLatitud . ', ' . $origenLongitud;
$destino = substr($direccion . ', ' . $departamento . ' (' . $destinoLatitud . ', ' . $destinoLongitud . ')', 0, 200);
$nombreRuta = substr('Traslado ' . $salida, 0, 100);

$con->begin_transaction();

try {
    $ruta = $con->prepare("INSERT INTO rutas (nombre_ruta, origen, destino, distancia_km, tiempo_estimado_min) VALUES (?, ?, ?, ?, ?)");
    $ruta->bind_param('sssdi', $nombreRuta, $origen, $destino, $distancia, $tiempo);

    if (!$ruta->execute()) {
        throw new Exception('No se pudo guardar la ruta.');
    }

    $idRuta = $ruta->insert_id;
    $ruta->close();

    $solicitud = $con->prepare("INSERT INTO solicitudes_traslado
        (id_conductor, id_copiloto, id_ambulancia, id_ruta, id_elemento, hora_salida, observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?)");
    $solicitud->bind_param('iiiiiss', $idConductor, $idCopiloto, $idAmbulancia, $idRuta, $idElemento, $salida, $observaciones);

    if (!$solicitud->execute()) {
        throw new Exception('No se pudo guardar el traslado.');
    }

    $idSolicitud = $solicitud->insert_id;
    $solicitud->close();
    $con->commit();

    echo json_encode([
        'exito' => true,
        'mensaje' => 'Traslado guardado correctamente.',
        'id_solicitud' => $idSolicitud
    ]);
} catch (Throwable $error) {
    $con->rollback();
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => $error->getMessage()]);
}

$con->close();
?>