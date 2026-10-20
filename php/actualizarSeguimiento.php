<?php
require_once 'conexion.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'chofer' || empty($_SESSION['id_conductor'])) {
    http_response_code(403);
    echo json_encode(['exito' => false, 'mensaje' => 'Acceso no permitido.']);
    exit;
}

$idSolicitud = (int)($_POST['idSolicitud'] ?? 0);
$accion = $_POST['accion'] ?? '';
$latitud = trim($_POST['latitud'] ?? '');
$longitud = trim($_POST['longitud'] ?? '');

if ($idSolicitud < 1 || !in_array($accion, ['iniciar', 'ubicacion', 'finalizar'], true) ||
    !is_numeric($latitud) || !is_numeric($longitud)) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Los datos de ubicación no son válidos.']);
    exit;
}

$latitud = (string)(float)$latitud;
$longitud = (string)(float)$longitud;
$idConductor = (int)$_SESSION['id_conductor'];

$con->begin_transaction();
try {
    $consulta = $con->prepare("SELECT estado FROM solicitudes_traslado
        WHERE id_solicitud = ? AND id_conductor = ? FOR UPDATE");
    $consulta->bind_param('ii', $idSolicitud, $idConductor);
    $consulta->execute();
    $traslado = $consulta->get_result()->fetch_assoc();
    $consulta->close();

    if (!$traslado) {
        throw new Exception('El traslado no está asignado a tu cuenta.');
    }

    if ($accion === 'iniciar') {
        if ($traslado['estado'] !== 'programado') {
            throw new Exception('Este traslado ya fue iniciado o no está disponible.');
        }
        $otroActivo = $con->prepare("SELECT id_solicitud FROM solicitudes_traslado
            WHERE id_conductor = ? AND estado = 'en_curso' AND id_solicitud <> ? LIMIT 1");
        $otroActivo->bind_param('ii', $idConductor, $idSolicitud);
        $otroActivo->execute();
        $tieneActivo = $otroActivo->get_result()->num_rows > 0;
        $otroActivo->close();
        if ($tieneActivo) {
            throw new Exception('Finalizá primero el recorrido que ya está en curso.');
        }
        $actualizar = $con->prepare("UPDATE solicitudes_traslado SET estado = 'en_curso'
            WHERE id_solicitud = ? AND estado = 'programado'");
        $actualizar->bind_param('i', $idSolicitud);
        $actualizar->execute();
        $actualizar->close();
        $estado = 'salida';
    } elseif ($accion === 'ubicacion') {
        if ($traslado['estado'] !== 'en_curso') {
            throw new Exception('El traslado no está en curso.');
        }
        $estado = 'en_ruta';
    } else {
        if ($traslado['estado'] !== 'en_curso') {
            throw new Exception('El traslado no está en curso.');
        }
        $actualizar = $con->prepare("UPDATE solicitudes_traslado SET estado = 'llegado',
            hora_llegada_efectiva = NOW() WHERE id_solicitud = ?");
        $actualizar->bind_param('i', $idSolicitud);
        $actualizar->execute();
        $actualizar->close();
        $estado = 'finalizado';
    }

    $seguimiento = $con->prepare("INSERT INTO seguimiento_traslados
        (id_solicitud, latitud, longitud, estado_actual) VALUES (?, ?, ?, ?)");
    $seguimiento->bind_param('isss', $idSolicitud, $latitud, $longitud, $estado);
    $seguimiento->execute();
    $seguimiento->close();
    $con->commit();

    echo json_encode(['exito' => true, 'mensaje' => 'Ubicación actualizada.']);
} catch (Throwable $error) {
    $con->rollback();
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => $error->getMessage()]);
}

$con->close();
?>