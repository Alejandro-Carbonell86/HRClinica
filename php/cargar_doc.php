<?php
// CONFIGURAR HEADER PARA JSON
header('Content-Type: application/json');


// INCLUIR CONEXIÓN
require_once 'conexion.php';

// VERIFICAR DATOS RECIBIDOS
if (!isset($_FILES['archivo']) || !isset($_POST['nombre'])) {
    echo json_encode([
        'exito' => false,
        'mensaje' => 'Faltan datos: archivo o nombre'
    ]);
    exit;
}

$archivo = $_FILES['archivo'];
$nombre = trim($_POST['nombre']);

if (empty($nombre)) {
    echo json_encode([
        'exito' => false,
        'mensaje' => 'El nombre del documento es obligatorio'
    ]);
    exit;
}

// PROCESAR ARCHIVO
if ($archivo['error'] === 0) {
    
    // Obtener extensión
    $extension = strtolower(pathinfo($archivo['name'], PATHINFO_EXTENSION));
    
    // Validar extensiones permitidas
    $extensiones_permitidas = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
    if (!in_array($extension, $extensiones_permitidas)) {
        echo json_encode([
            'exito' => false,
            'mensaje' => "Extensión '$extension' no permitida. Solo: " . implode(', ', $extensiones_permitidas)
        ]);
        exit;
    }
    
    // CREAR NOMBRE ÚNICO CON UNIQID
    $nombre_unico = uniqid() . '.' . $extension;
    
    // DEFINIR RUTAS

    // Ruta física en el servidor
    $directorio = __DIR__ . '/../documentos/';
    
    // Crear directorio si no existe
    if (!is_dir($directorio)) {
        if (!mkdir($directorio, 0777, true)) {
            echo json_encode([
                'exito' => false,
                'mensaje' => 'No se pudo crear el directorio: ' . $directorio
            ]);
            exit;
        }
    }
    
    // Verificar permisos
    if (!is_writable($directorio)) {
        echo json_encode([
            'exito' => false,
            'mensaje' => 'El directorio no tiene permisos de escritura'
        ]);
        exit;
    }
    
    // Ruta completa para guardar
    $ruta_completa = $directorio . $nombre_unico;
    
    // Ruta para la base de datos (para acceder desde web)
    $ruta_bd = "/HR_Clinica/documentos/" . $nombre_unico;
    
    // MOVER ARCHIVO
    if (move_uploaded_file($archivo['tmp_name'], $ruta_completa)) {
        
        // GUARDAR EN BASE DE DATOS
        $stmt = $con->prepare("INSERT INTO documentos (titulo, archivo_nombre, 
        archivo_ruta) VALUES (?, ?, ?)");
        
        if (!$stmt) {
            echo json_encode([
                'exito' => false,
                'mensaje' => 'Error al preparar la consulta: ' . $con->error
            ]);
            exit;
        }
        
        $stmt->bind_param("sss", $nombre_unico, $nombre, $ruta_bd);
        
        if ($stmt->execute()) {
            // ÉXITO - Devolver JSON con todos los datos
            echo json_encode([
                'exito' => true,
                'mensaje' => 'Documento subido correctamente',
                'datos' => [
                    'id' => $stmt->insert_id,
                    'titulo' => $nombre,
                    'archivo' => $nombre_unico,
                    'ruta' => $ruta_bd,
                    'tamano' => $archivo['size'],
                    'tipo' => $archivo['type'],
                    'fecha' => date('Y-m-d H:i:s')
                ]
            ]);
        } else {
            // Error al guardar en BD
            echo json_encode([
                'exito' => false,
                'mensaje' => 'Error al guardar en base de datos: ' . $stmt->error
            ]);
        }
        
        $stmt->close();
        
    } else {
        // Error al mover el archivo
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Error al mover el archivo. Verifica permisos.'
        ]);
    }
    
} else {
    // ERROR EN LA SUBIDA DEL ARCHIVO
    $errores = [
        UPLOAD_ERR_INI_SIZE   => 'El archivo excede el límite de php.ini',
        UPLOAD_ERR_FORM_SIZE  => 'El archivo excede el límite del formulario',
        UPLOAD_ERR_PARTIAL    => 'El archivo se subió parcialmente',
        UPLOAD_ERR_NO_FILE    => 'No se seleccionó ningún archivo',
        UPLOAD_ERR_NO_TMP_DIR => 'Falta la carpeta temporal',
        UPLOAD_ERR_CANT_WRITE => 'Error al escribir en disco',
        UPLOAD_ERR_EXTENSION  => 'Una extensión de PHP detuvo la subida'
    ];
    
    $mensaje = $errores[$archivo['error']] ?? 'Error desconocido (' . $archivo['error'] . ')';
    
    echo json_encode([
        'exito' => false,
        'mensaje' => $mensaje
    ]);
}

// CERRAR CONEXIÓN
if (isset($con) && $con->ping()) {
    $con->close();
}
?>